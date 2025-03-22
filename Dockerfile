FROM python:3.10-slim

WORKDIR /app

# Copy requirements first for better layer caching
COPY api/requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY api/ ./api/

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "api.app:app", "--host", "0.0.0.0", "--port", "8000"]
