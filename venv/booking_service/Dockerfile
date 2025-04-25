FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies with time synchronization fix
RUN apt-get update -o Acquire::Check-Valid-Until=false && \
    apt-get install -y --no-install-recommends \
        tzdata \
        gcc \
        python3-dev \
        libpq-dev && \
    ln -fs /usr/share/zoneinfo/UTC /etc/localtime && \
    dpkg-reconfigure --frontend noninteractive tzdata && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "user_service.wsgi:application"]