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

# Expose ports (3000 default, 80 compatible)
EXPOSE 3000 80

ENV PORT=3000 \
    PYTHONUNBUFFERED=1

# Start server
CMD ["python3", "server.py"]
