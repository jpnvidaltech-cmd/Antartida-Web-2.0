#!/usr/bin/env python3
"""
AntartidaLabs Web Server & Contact Backend
Complies with Manual Funcional v1.1 (Chapter 6 Contract)
Zero external dependencies (uses standard library Python 3.9+)
"""

import os
import sys
import json
import time
import hmac
import hashlib
import secrets
import smtplib
import unicodedata
import re
from datetime import datetime, timezone, timedelta
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse

# ==============================================================================
# Configuration & Environment Variables
# ==============================================================================
PORT = int(os.environ.get('PORT', 3000))
PUBLIC_ORIGIN = os.environ.get('PUBLIC_ORIGIN', 'http://localhost:3000')
CONTACT_SECRET = os.environ.get('CONTACT_SECRET', 'clave_secreta_local_antartidalabs_2024')
CONTACT_RECIPIENT = os.environ.get('CONTACT_RECIPIENT', 'contacto@antartidalabs.com')
CONTACT_SENDER = os.environ.get('CONTACT_SENDER', 'no-reply@antartidalabs.com')

# SMTP Settings (optional; if missing, simulation mode logs to console)
SMTP_HOST = os.environ.get('SMTP_HOST', '')
SMTP_PORT = int(os.environ.get('SMTP_PORT', 587))
SMTP_USER = os.environ.get('SMTP_USER', '')
SMTP_PASS = os.environ.get('SMTP_PASS', '')
SMTP_SECURE = os.environ.get('SMTP_SECURE', 'false').lower() == 'true'

# Rate limiting & TTLs (Chapter 6.9)
RATE_LIMIT_MAX = 5
RATE_WINDOW_SECONDS = 15 * 60  # 15 minutes
CONTEXT_TTL_SECONDS = 30 * 60  # 30 minutes

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(BASE_DIR, 'public')

# In-memory storage for rate limits and submission deduplication
# rate_limits: { hashed_network_id: [timestamp, timestamp, ...] }
rate_limits = {}

# submission_store: { submission_id: { 'fingerprint': str, 'status': str, 'created_at': float, 'expires_at': float } }
submission_store = {}

# Valid 21 interest options per Manual v1.1
INTEREST_NAMES = {
    'general': 'Consulta general',
    'lab': 'AI Research LAB — solución integrada',
    '01': '[A-1] Research Launch',
    '02': '[A-2] Research Integration',
    '03': '[A-3] One Stop Research IT',
    '04': '[B-1] Research Workspace',
    '05': '[B-2] GPU Compute',
    '06': '[B-3] Research Storage',
    '07': '[B-4] Hybrid Research',
    '08': '[C-1] Research Data Platform',
    '09': '[C-2] Data Engineering',
    '10': '[C-3] Data Preparation',
    '11': '[D-1] Research MLOps',
    '12': '[D-2] Reproducible Research',
    '13': '[D-3] Model Access',
    '14': '[D-4] Model Deployment',
    '15': '[E-1] Research Security',
    '16': '[E-2] Research Cost Control',
    '17': '[E-3] Research Helpdesk',
    '18': '[F-1] AI Engineering',
    '19': '[F-2] AI Research Consulting'
}

# ==============================================================================
# Token & Security Helpers
# ==============================================================================
def generate_token(submission_id: str, expires_at_ts: int) -> str:
    message = f"{submission_id}:{expires_at_ts}".encode('utf-8')
    sig = hmac.new(CONTACT_SECRET.encode('utf-8'), message, hashlib.sha256).hexdigest()
    return f"{expires_at_ts}.{sig}"

def verify_token(submission_id: str, form_token: str) -> tuple[bool, str]:
    if not form_token or '.' not in form_token:
        return False, "invalid_format"
    try:
        parts = form_token.split('.', 1)
        expires_at_ts = int(parts[0])
        provided_sig = parts[1]
    except Exception:
        return False, "invalid_format"

    now_ts = int(time.time())
    if now_ts > expires_at_ts:
        return False, "token_expired"

    expected_sig = hmac.new(
        CONTACT_SECRET.encode('utf-8'),
        f"{submission_id}:{expires_at_ts}".encode('utf-8'),
        hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(provided_sig, expected_sig):
        return False, "invalid_signature"

    return True, "valid"

def get_network_hash(client_ip: str) -> str:
    return hmac.new(CONTACT_SECRET.encode('utf-8'), client_ip.encode('utf-8'), hashlib.sha256).hexdigest()

def check_rate_limit(client_ip: str) -> tuple[bool, int]:
    net_hash = get_network_hash(client_ip)
    now = time.time()
    cutoff = now - RATE_WINDOW_SECONDS

    # Clean old requests
    requests = [t for t in rate_limits.get(net_hash, []) if t > cutoff]
    rate_limits[net_hash] = requests

    if len(requests) >= RATE_LIMIT_MAX:
        # Time remaining until oldest request expires
        oldest = requests[0]
        retry_after = max(1, int(oldest + RATE_WINDOW_SECONDS - now))
        return False, retry_after

    return True, 0

def record_rate_limit(client_ip: str):
    net_hash = get_network_hash(client_ip)
    now = time.time()
    cutoff = now - RATE_WINDOW_SECONDS
    requests = [t for t in rate_limits.get(net_hash, []) if t > cutoff]
    requests.append(now)
    rate_limits[net_hash] = requests

def normalize_text(text: str) -> str:
    if not text:
        return ''
    # Unicode NFC normalization
    norm = unicodedata.normalize('NFC', text)
    # Convert CRLF and CR to LF
    norm = norm.replace('\r\n', '\n').replace('\r', '\n')
    # Trim external whitespace
    return norm.strip()

def count_codepoints(text: str) -> int:
    return len(text)

EMAIL_REGEX = re.compile(
    r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
)

def validate_email_policy(email: str) -> bool:
    if not email or len(email) > 254:
        return False
    return bool(EMAIL_REGEX.match(email))

# ==============================================================================
# HTTP Request Handler
# ==============================================================================
class AntartidaRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PUBLIC_DIR, **kwargs)

    def end_headers(self):
        # Security headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        
        # Ensure fresh assets during updates on mobile browsers (Safari / Chrome)
        clean_path = self.path.split('?')[0]
        if clean_path.endswith('.html') or clean_path == '/' or clean_path.endswith('.css') or clean_path.endswith('.js'):
            self.send_header('Cache-Control', 'no-cache, must-revalidate')
            
        super().end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        
        # Endpoint: GET /contacto/contexto
        if parsed.path == '/contacto/contexto':
            self.handle_get_contexto()
            return

        # Static files fallback
        super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)

        # Endpoint: POST /contacto/consulta
        if parsed.path == '/contacto/consulta':
            self.handle_post_consulta()
            return

        self.send_response(404)
        self.end_headers()

    # --------------------------------------------------------------------------
    # GET /contacto/contexto
    # --------------------------------------------------------------------------
    def handle_get_contexto(self):
        submission_id = secrets.token_hex(16)  # 32 hex characters
        now = datetime.now(timezone.utc)
        expires_at = now + timedelta(seconds=CONTEXT_TTL_SECONDS)
        expires_at_ts = int(expires_at.timestamp())
        expires_at_iso = expires_at.strftime('%Y-%m-%dT%H:%M:%SZ')

        form_token = generate_token(submission_id, expires_at_ts)

        response_payload = {
            'code': 'context_ready',
            'submission_id': submission_id,
            'form_token': form_token,
            'expires_at': expires_at_iso
        }

        body = json.dumps(response_payload).encode('utf-8')
        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    # --------------------------------------------------------------------------
    # POST /contacto/consulta
    # --------------------------------------------------------------------------
    def handle_post_consulta(self):
        client_ip = self.client_address[0]
        # Check X-Forwarded-For if behind a reverse proxy (e.g. VPS Nginx)
        xff = self.headers.get('X-Forwarded-For')
        if xff:
            client_ip = xff.split(',')[0].strip()

        # Check content length <= 32 KiB
        try:
            content_length = int(self.headers.get('Content-Length', 0))
        except ValueError:
            self.send_json_error(400, 'request_rejected', 'Encabezado Content-Length inválido')
            return

        if content_length > 32 * 1024:
            self.send_json_error(413, 'request_rejected', 'Tamaño de payload excedido (máximo 32 KiB)')
            return

        # Check Intent Header (send or verify)
        intent = self.headers.get('X-Contact-Intent', '').lower()
        if intent not in ['send', 'verify']:
            self.send_json_error(400, 'request_rejected', 'Encabezado X-Contact-Intent obligatorio (send o verify)')
            return

        # Read JSON body
        try:
            raw_body = self.rfile.read(content_length).decode('utf-8')
            data = json.loads(raw_body)
        except Exception:
            self.send_json_error(400, 'request_rejected', 'Cuerpo JSON inválido')
            return

        # Expected fields: nombre, empresa, email, interes, mensaje, submission_id, form_token, website
        required_keys = {'nombre', 'empresa', 'email', 'interes', 'mensaje', 'submission_id', 'form_token', 'website'}
        if set(data.keys()) != required_keys:
            self.send_json_error(400, 'request_rejected', 'Campos de formulario inválidos o incompletos')
            return

        # Check honeypot
        if data.get('website'):
            # Silently accept to trap bots without sending email
            self.send_json_response(200, {'code': 'accepted', 'submission_id': data.get('submission_id')})
            return

        submission_id = data.get('submission_id', '')
        form_token = data.get('form_token', '')

        # Validate token
        is_valid_token, token_err = verify_token(submission_id, form_token)
        if not is_valid_token:
            if token_err == 'token_expired':
                self.send_json_response(403, {'code': 'token_expired', 'submission_id': submission_id})
            else:
                self.send_json_response(403, {'code': 'request_rejected', 'submission_id': submission_id})
            return

        # Normalization
        nombre = normalize_text(str(data.get('nombre', '')))
        empresa = normalize_text(str(data.get('empresa', '')))
        raw_email = str(data.get('email', '')).strip()
        # Lowercase only the domain part
        if '@' in raw_email:
            parts = raw_email.split('@', 1)
            email = f"{parts[0]}@{parts[1].lower()}"
        else:
            email = raw_email.lower()
        interes = str(data.get('interes', '')).strip()
        mensaje = normalize_text(str(data.get('mensaje', '')))

        # Field validation
        errors = {}
        nombre_len = count_codepoints(nombre)
        if not nombre or nombre_len < 2:
            errors['nombre'] = 'Ingresá tu nombre y apellido, entre 2 y 120 caracteres.'
        elif nombre_len > 120:
            errors['nombre'] = 'Usá hasta 120 caracteres para el nombre y apellido.'

        empresa_len = count_codepoints(empresa)
        if empresa_len > 160:
            errors['empresa'] = 'Usá hasta 160 caracteres para la empresa o institución.'

        if not email:
            errors['email'] = 'Ingresá tu correo electrónico.'
        elif not validate_email_policy(email):
            errors['email'] = 'Ingresá un correo válido de hasta 254 caracteres, por ejemplo nombre@institucion.org.'

        if interes not in INTEREST_NAMES:
            errors['interes'] = 'Elegí un producto, servicio o motivo de consulta de la lista.'

        mensaje_len = count_codepoints(mensaje)
        if not mensaje or mensaje_len < 10 or mensaje_len > 3000:
            errors['mensaje'] = 'Escribí un mensaje de entre 10 y 3000 caracteres.'

        if errors:
            self.send_json_response(422, {
                'code': 'validation_error',
                'submission_id': submission_id,
                'errors': errors
            })
            return

        # Compute fingerprint of normalized values
        fp_data = json.dumps([nombre, empresa, email, interes, mensaje], ensure_ascii=False)
        fingerprint = hmac.new(CONTACT_SECRET.encode('utf-8'), fp_data.encode('utf-8'), hashlib.sha256).hexdigest()

        # Check existing state for submission_id
        now_ts = time.time()
        existing_sub = submission_store.get(submission_id)
        if existing_sub:
            if existing_sub['fingerprint'] != fingerprint:
                self.send_json_response(409, {'code': 'conflict', 'submission_id': submission_id})
                return
            if existing_sub['status'] == 'accepted':
                self.send_json_response(200, {'code': 'accepted', 'submission_id': submission_id})
                return
            if existing_sub['status'] == 'processing':
                self.send_json_response(409, {'code': 'processing', 'submission_id': submission_id})
                return

        # Handle 'verify' intent
        if intent == 'verify':
            if existing_sub and existing_sub['status'] == 'accepted':
                self.send_json_response(200, {'code': 'accepted', 'submission_id': submission_id})
            else:
                self.send_json_response(504, {'code': 'uncertain', 'submission_id': submission_id})
            return

        # Check Rate Limit (5 per 15 min per network IP)
        allowed, retry_after = check_rate_limit(client_ip)
        if not allowed:
            self.send_json_response(429, {
                'code': 'rate_limited',
                'submission_id': submission_id,
                'retry_after': retry_after
            })
            return

        # Record this invocation against rate limit
        record_rate_limit(client_ip)

        # Mark as processing
        submission_store[submission_id] = {
            'fingerprint': fingerprint,
            'status': 'processing',
            'created_at': now_ts,
            'expires_at': now_ts + CONTEXT_TTL_SECONDS
        }

        # Dispatch email
        send_success = self.dispatch_email(submission_id, nombre, empresa, email, interes, mensaje)

        if send_success:
            submission_store[submission_id]['status'] = 'accepted'
            self.send_json_response(200, {
                'code': 'accepted',
                'submission_id': submission_id
            })
        else:
            submission_store[submission_id]['status'] = 'temporary_failure'
            self.send_json_response(503, {
                'code': 'temporary_failure',
                'submission_id': submission_id
            })

    def dispatch_email(self, submission_id: str, nombre: str, empresa: str, email: str, interes: str, mensaje: str) -> bool:
        interes_label = INTEREST_NAMES.get(interes, interes)
        now_iso = datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
        empresa_text = empresa if empresa else "No informada"

        subject = f"Consulta web AntartidaLabs | {interes_label}"
        body_text = (
            f"Fecha y hora: {now_iso}\n"
            f"ID de consulta: {submission_id}\n"
            f"Nombre y apellido: {nombre}\n"
            f"Empresa / Institución: {empresa_text}\n"
            f"Email de contacto: {email}\n"
            f"Interés seleccionado: [{interes}] {interes_label}\n\n"
            f"Mensaje:\n{mensaje}\n"
        )

        # Local development simulation mode if SMTP_HOST is not configured
        if not SMTP_HOST:
            print("\n" + "="*70)
            print(">>> [SIMULACIÓN LOCAL] CORREO INSTITUCIONAL DE CONTACTO GENERADO")
            print("="*70)
            print(f"Para:     {CONTACT_RECIPIENT}")
            print(f"De:       {CONTACT_SENDER}")
            print(f"Reply-To: {email}")
            print(f"Asunto:   {subject}")
            print("-"*70)
            print(body_text)
            print("="*70 + "\n")
            return True

        # Production SMTP sending
        try:
            msg = (
                f"From: {CONTACT_SENDER}\r\n"
                f"To: {CONTACT_RECIPIENT}\r\n"
                f"Reply-To: {email}\r\n"
                f"Subject: {subject}\r\n"
                f"Date: {now_iso}\r\n"
                f"Content-Type: text/plain; charset=utf-8\r\n\r\n"
                f"{body_text}"
            )

            if SMTP_SECURE:
                server = smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=10)
            else:
                server = smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=10)
                server.starttls()

            if SMTP_USER and SMTP_PASS:
                server.login(SMTP_USER, SMTP_PASS)

            server.sendmail(CONTACT_SENDER, [CONTACT_RECIPIENT], msg.encode('utf-8'))
            server.quit()
            return True
        except Exception as e:
            print(f"[ERROR SMTP] Error al enviar correo: {e}", file=sys.stderr)
            return False

    def send_json_response(self, status: int, data: dict):
        body = json.dumps(data).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def send_json_error(self, status: int, code: str, message: str):
        self.send_json_response(status, {'code': code, 'message': message})

# ==============================================================================
# Main Entry Point
# ==============================================================================
def run():
    print(f"==================================================")
    print(f" AntartidaLabs Web Server v2.0")
    print(f" Servidor iniciado en http://localhost:{PORT}")
    print(f" Directorio público: {PUBLIC_DIR}")
    print(f" Modo correo: {'SMTP (' + SMTP_HOST + ')' if SMTP_HOST else 'Simulación local (Consola)'}")
    print(f"==================================================")

    server = ThreadingHTTPServer(('0.0.0.0', PORT), AntartidaRequestHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
        server.server_close()

if __name__ == '__main__':
    run()
