FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
# emergentintegrations is served from the Emergent platform's private index and
# is unused in server.py; skip it so the image can build from public PyPI.
RUN grep -v '^emergentintegrations' requirements.txt > requirements.docker.txt \
    && pip install --no-cache-dir -r requirements.docker.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
