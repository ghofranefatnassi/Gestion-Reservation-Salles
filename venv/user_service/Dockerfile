FROM python:3.9-slim

# Set environment variables (correct format)
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Fix time sync and install dependencies
RUN ln -sf /usr/share/zoneinfo/UTC /etc/localtime && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
        gcc \
        python3-dev \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "user_service.wsgi:application"]