const express = require('express');
const crypto = require('crypto');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_ORIGIN = process.env.PUBLIC_ORIGIN || 'http://localhost:3000';
const CONTACT_SECRET = process.env.CONTACT_SECRET || 'clave_secreta_local_antartidalabs_2024';
const CONTACT_RECIPIENT = process.env.CONTACT_RECIPIENT || 'contacto@antartidalabs.com';
const CONTACT_SENDER = process.env.CONTACT_SENDER || 'no-reply@antartidalabs.com';

const RATE_LIMIT_MAX = 5;
const RATE_WINDOW_MS = 15 * 60 * 1000;
const CONTEXT_TTL_MS = 30 * 60 * 1000;

const rateLimits = new Map();
const submissionStore = new Map();

const INTEREST_NAMES = {
  general: 'Consulta general',
  lab: 'AI Research LAB — solución integrada',
  '01': 'Research Launch',
  '02': 'Research Integration',
  '03': 'One Stop Research IT',
  '04': 'Research Workspace',
  '05': 'GPU Compute',
  '06': 'Research Storage',
  '07': 'Hybrid Research',
  '08': 'Research Data Platform',
  '09': 'Data Engineering',
  '10': 'Data Preparation',
  '11': 'Research MLOps',
  '12': 'Reproducible Research',
  '13': 'Model Access',
  '14': 'Model Deployment',
  '15': 'Research Security',
  '16': 'Research Cost Control',
  '17': 'Research Helpdesk',
  '18': 'AI Engineering',
  '19': 'AI Research Consulting'
};

app.use(express.json({ limit: '32kb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Helper functions
function generateToken(submissionId, expiresAtTs) {
  const hmac = crypto.createHmac('sha256', CONTACT_SECRET);
  hmac.update(`${submissionId}:${expiresAtTs}`);
  return `${expiresAtTs}.${hmac.digest('hex')}`;
}

function verifyToken(submissionId, formToken) {
  if (!formToken || !formToken.includes('.')) return { valid: false, reason: 'format' };
  const [expiresStr, sig] = formToken.split('.');
  const expiresAtTs = parseInt(expiresStr, 10);
  if (Date.now() > expiresAtTs * 1000) return { valid: false, reason: 'expired' };

  const expected = crypto.createHmac('sha256', CONTACT_SECRET)
    .update(`${submissionId}:${expiresAtTs}`)
    .digest('hex');

  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return { valid: false, reason: 'signature' };
  }
  return { valid: true };
}

function getNetworkHash(ip) {
  return crypto.createHmac('sha256', CONTACT_SECRET).update(ip).digest('hex');
}

function checkRateLimit(ip) {
  const netHash = getNetworkHash(ip);
  const now = Date.now();
  const cutoff = now - RATE_WINDOW_MS;
  const list = (rateLimits.get(netHash) || []).filter(t => t > cutoff);
  rateLimits.set(netHash, list);

  if (list.length >= RATE_LIMIT_MAX) {
    const retryAfter = Math.max(1, Math.ceil((list[0] + RATE_WINDOW_MS - now) / 1000));
    return { allowed: false, retryAfter };
  }
  return { allowed: true };
}

function recordRateLimit(ip) {
  const netHash = getNetworkHash(ip);
  const now = Date.now();
  const list = (rateLimits.get(netHash) || []).filter(t => t > now - RATE_WINDOW_MS);
  list.push(now);
  rateLimits.set(netHash, list);
}

function normalizeText(text) {
  if (!text) return '';
  return text.normalize('NFC').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// GET /contacto/contexto
app.get('/contacto/contexto', (req, res) => {
  const submissionId = crypto.randomBytes(16).toString('hex');
  const expiresAt = new Date(Date.now() + CONTEXT_TTL_MS);
  const expiresAtTs = Math.floor(expiresAt.getTime() / 1000);
  const formToken = generateToken(submissionId, expiresAtTs);

  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.json({
    code: 'context_ready',
    submission_id: submissionId,
    form_token: formToken,
    expires_at: expiresAt.toISOString()
  });
});

// POST /contacto/consulta
app.post('/contacto/consulta', async (req, res) => {
  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress || '127.0.0.1';
  const intent = (req.headers['x-contact-intent'] || '').toLowerCase();

  if (!['send', 'verify'].includes(intent)) {
    return res.status(400).json({ code: 'request_rejected', message: 'Encabezado X-Contact-Intent inválido' });
  }

  const { nombre, empresa, email, interes, mensaje, submission_id, form_token, website } = req.body || {};

  // Honeypot check
  if (website) {
    return res.json({ code: 'accepted', submission_id });
  }

  if (!submission_id || !form_token) {
    return res.status(400).json({ code: 'request_rejected' });
  }

  const tokenStatus = verifyToken(submission_id, form_token);
  if (!tokenStatus.valid) {
    return res.status(403).json({
      code: tokenStatus.reason === 'expired' ? 'token_expired' : 'request_rejected',
      submission_id
    });
  }

  // Normalization
  const normNombre = normalizeText(nombre);
  const normEmpresa = normalizeText(empresa);
  const rawEmail = (email || '').trim();
  const [localPart, domainPart] = rawEmail.includes('@') ? rawEmail.split('@') : [rawEmail, ''];
  const normEmail = domainPart ? `${localPart}@${domainPart.toLowerCase()}` : rawEmail.toLowerCase();
  const normInteres = (interes || '').trim();
  const normMensaje = normalizeText(mensaje);

  // Validation
  const errors = {};
  const nombreLen = Array.from(normNombre).length;
  if (!normNombre || nombreLen < 2) {
    errors.nombre = 'Ingresá tu nombre y apellido, entre 2 y 120 caracteres.';
  } else if (nombreLen > 120) {
    errors.nombre = 'Usá hasta 120 caracteres para el nombre y apellido.';
  }

  const empresaLen = Array.from(normEmpresa).length;
  if (empresaLen > 160) {
    errors.empresa = 'Usá hasta 160 caracteres para la empresa o institución.';
  }

  if (!normEmail) {
    errors.email = 'Ingresá tu correo electrónico.';
  } else if (normEmail.length > 254 || !EMAIL_REGEX.test(normEmail)) {
    errors.email = 'Ingresá un correo válido de hasta 254 caracteres, por ejemplo nombre@institucion.org.';
  }

  if (!INTEREST_NAMES[normInteres]) {
    errors.interes = 'Elegí un producto, servicio o motivo de consulta de la lista.';
  }

  const msgLen = Array.from(normMensaje).length;
  if (!normMensaje || msgLen < 10 || msgLen > 3000) {
    errors.mensaje = 'Escribí un mensaje de entre 10 y 3000 caracteres.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      code: 'validation_error',
      submission_id,
      errors
    });
  }

  // Fingerprint
  const fpData = JSON.stringify([normNombre, normEmpresa, normEmail, normInteres, normMensaje]);
  const fingerprint = crypto.createHmac('sha256', CONTACT_SECRET).update(fpData).digest('hex');

  const existing = submissionStore.get(submission_id);
  if (existing) {
    if (existing.fingerprint !== fingerprint) {
      return res.status(409).json({ code: 'conflict', submission_id });
    }
    if (existing.status === 'accepted') {
      return res.json({ code: 'accepted', submission_id });
    }
    if (existing.status === 'processing') {
      return res.status(409).json({ code: 'processing', submission_id });
    }
  }

  if (intent === 'verify') {
    if (existing && existing.status === 'accepted') {
      return res.json({ code: 'accepted', submission_id });
    }
    return res.status(504).json({ code: 'uncertain', submission_id });
  }

  // Rate limit
  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    return res.status(429).json({
      code: 'rate_limited',
      submission_id,
      retry_after: rate.retryAfter
    });
  }
  recordRateLimit(ip);

  submissionStore.set(submission_id, {
    fingerprint,
    status: 'processing',
    created: Date.now()
  });

  // Email dispatch
  const interesLabel = INTEREST_NAMES[normInteres] || normInteres;
  const subject = `Consulta web AntartidaLabs | ${interesLabel}`;
  const nowIso = new Date().toISOString();
  const textBody = `Fecha y hora: ${nowIso}\nID de consulta: ${submission_id}\nNombre y apellido: ${normNombre}\nEmpresa / Institución: ${normEmpresa || 'No informada'}\nEmail de contacto: ${normEmail}\nInterés seleccionado: [${normInteres}] ${interesLabel}\n\nMensaje:\n${normMensaje}\n`;

  if (!process.env.SMTP_HOST) {
    console.log('\n======================================================================');
    console.log('>>> [SIMULACIÓN LOCAL] CORREO INSTITUCIONAL DE CONTACTO GENERADO');
    console.log('======================================================================');
    console.log(`Para:     ${CONTACT_RECIPIENT}`);
    console.log(`De:       ${CONTACT_SENDER}`);
    console.log(`Reply-To: ${normEmail}`);
    console.log(`Asunto:   ${subject}`);
    console.log('----------------------------------------------------------------------');
    console.log(textBody);
    console.log('======================================================================\n');
    submissionStore.get(submission_id).status = 'accepted';
    return res.json({ code: 'accepted', submission_id });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER ? {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      } : undefined
    });

    await transporter.sendMail({
      from: CONTACT_SENDER,
      to: CONTACT_RECIPIENT,
      replyTo: normEmail,
      subject,
      text: textBody
    });

    submissionStore.get(submission_id).status = 'accepted';
    res.json({ code: 'accepted', submission_id });
  } catch (err) {
    console.error('SMTP error:', err);
    submissionStore.get(submission_id).status = 'temporary_failure';
    res.status(503).json({ code: 'temporary_failure', submission_id });
  }
});

app.listen(PORT, () => {
  console.log(`AntartidaLabs Web Server (Node.js) iniciado en http://localhost:${PORT}`);
});
