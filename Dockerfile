# ==============================================================================
# AntartidaLabs Production Dockerfile
# Lightweight Python 3 container (Zero external dependencies)
# ==============================================================================
FROM python:3.11-alpine

# Set non-root user for security
RUN addgroup -S antartida && adduser -S antartida -G antartida

WORKDIR /app

# Copy application files
COPY public /app/public
COPY server.py /app/server.py

# Switch to non-root user
USER antartida

# Expose server port
EXPOSE 3000

ENV PORT=3000 \
    PYTHONUNBUFFERED=1

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/contacto/contexto || exit 1

# Start server
CMD ["python3", "server.py"]
