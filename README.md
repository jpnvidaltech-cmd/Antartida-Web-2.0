# AntartidaLabs — Web Institucional y Comercial v2.0

Sitio web oficial de **AntartidaLabs**, ensamblado y optimizado siguiendo las especificaciones del **Manual Funcional v1.1**, las directrices de diseño de `antarctica_scientific_modern` y la paleta accesible WCAG AA definida en `.agents/rules/estilo-colores.md`.

---

## 🏛️ Arquitectura del Proyecto

El proyecto implementa una arquitectura One-Page comercial centrada en la investigación académica en Inteligencia Artificial y cómputo gestionado.

```
Antartida_Web_v2.0/
├── public/
│   ├── index.html              # Maquetado semántico completo (Inicio, Propuesta, 19 Servicios, Nosotros, Contacto)
│   ├── css/
│   │   └── style.css           # Tokens CSS, variables (--color-primary, --color-accent, etc.) y diseño responsivo
│   ├── js/
│   │   └── app.js              # Lógica interactiva: navegación, acordeones, preselección de CTAs y motor del formulario
│   └── assets/
│       ├── AntartidaLabs-vector.svg # Isotipo y logotipo oficial en formato vectorial SVG
│       └── AntartidaLabs-symbol.png # Símbolo institucional
├── server.py                   # Servidor de producción y desarrollo en Python 3 (cero dependencias externas)
├── server.js                   # Alternativa backend en Node.js / Express
├── package.json                # Configuración y scripts para entorno Node.js
├── Dockerfile                  # Contenedor optimizado y seguro para despliegue en VPS
├── docker-compose.yml          # Orquestación lista para VPS Linux
├── .env.example                # Plantilla de variables de entorno
├── .env                        # Configuración activa local
└── Manual_Funcional_v1.1.md    # Especificación funcional canónica del sitio
```

---

## 🎨 Paleta y Tokens de Diseño

Basado en `.agents/rules/estilo-colores.md`:
- `--color-primary`: `#005A9C` (Hover: `#004B82`, Active: `#003B6D`)
- `--color-accent`: `#048CF2`
- `--color-signal-cyan`: `#09E5E9`
- `--color-bg`: `#FFFFFF`
- `--color-surface-dim`: `#F5F8FC`
- `--color-text`: `#05183D`
- `--color-muted`: `#475569`
- Tipografía: **Noto Sans** (Google Fonts).

---

## 🚀 Ejecución en Local

### Opción 1: Python 3 (Recomendada para macOS / Linux sin dependencias)
No requiere `pip` ni instalación de paquetes adicionales (utiliza únicamente la librería estándar de Python):
```bash
python3 server.py
```
El servidor iniciará en `http://localhost:3000`.

### Opción 2: Node.js / Express
Si cuentas con Node.js instalado:
```bash
npm install
npm start
```

---

## 📩 Motor de Contacto (Capítulo 6 del Manual Funcional)

El backend expone dos endpoints:
1. `GET /contacto/contexto`:
   - Emite `submission_id` (128 bits aleatorio en hex), `form_token` firmado criptográficamente con HMAC-SHA256 (`CONTACT_SECRET`) y fecha de vencimiento (`expires_at`, 30 minutos).
2. `POST /contacto/consulta`:
   - Exige encabezado `X-Contact-Intent` (`send` o `verify`).
   - Normaliza cadenas con Unicode NFC y trim.
   - Valida longitudes por puntos de código Unicode (nombre: 2-120, empresa: 0-160, email: RFC-compliant, interes: 21 opciones válidas, mensaje: 10-3000).
   - Bloquea intentos automatizados mediante campo honeypot oculto `website`.
   - Limita la tasa de envíos a **5 solicitudes por cada 15 minutos** por red de cliente (usando hash seguro de IP con secreto).
   - **Modo Local:** Si no se configuran credenciales SMTP reales en `.env`, el servidor simula el despacho imprimiendo el correo formateado en la terminal sin arrojar error 500 y retornando `200 accepted`.

---

## 🌐 Despliegue en VPS Linux

### Con Docker y Docker Compose:
1. Clonar el repositorio en el servidor VPS.
2. Copiar `.env.example` a `.env` y configurar variables reales:
   ```bash
   cp .env.example .env
   nano .env
   ```
3. Iniciar el servicio en segundo plano:
   ```bash
   docker compose up -d --build
   ```

### Configuración con Nginx como Reverse Proxy (opcional):
```nginx
server {
    server_name tu-dominio.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## ✅ Cumplimiento de Requisitos
- [x] **Arquitectura One-Page:** Navegación fluida por anclas (`#inicio`, `#propuesta`, `#servicios`, `#nosotros`, `#contacto`, `#privacidad`).
- [x] **Hero Section:** Símbolo en contenedor de 264x264px sobre fondo blanco con isotipo vectorial original (`AntartidaLabs-vector.svg`).
- [x] **Catálogo Completo:** 6 familias (A a F) y las **19 fichas comerciales** con controles interactivos independientes ("Ver detalle" inline y "Solicitar información").
- [x] **Preselección Inteligente:** Vinculación directa desde fichas y CTAs comerciales sin borrar los datos previamente completados por el usuario.
- [x] **Contrato de Seguridad y Anti-spam:** Honeypot invisible, tokens HMAC, sanitización NFC y rate-limiting en memoria.
