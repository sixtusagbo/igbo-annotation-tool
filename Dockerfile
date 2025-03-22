FROM python:3.10-slim

WORKDIR /app

# Copy requirements first for better layer caching
COPY api/requirements-prod.txt .

# Install dependencies with pip options to reduce memory usage
RUN pip install --no-cache-dir -r requirements-prod.txt

# Copy the application code
COPY api/ ./api/

# Set environment variables
ENV PORT=10000

# Expose the port the app runs on
EXPOSE ${PORT}

# Command to run the application
CMD uvicorn api.app:app --host 0.0.0.0 --port ${PORT}
