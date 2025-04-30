FROM python:3.9.18-bullseye

# Set environment variables
ENV DEBIAN_FRONTEND=noninteractive \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Install system dependencies with retries and clean up
RUN set -eux; \
    apt-get update || apt-get update || true; \
    apt-get install -y --no-install-recommends \
        gcc \
        python3-dev \
        libpq-dev \
        && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

EXPOSE 8001

CMD ["gunicorn", "--bind", "0.0.0.0:8002", "booking_service.wsgi:application"]