# igbo-annotation-tool

CSC 451 NLP project Assignment to build an Igbo annotation tool.

## Prerequisites

- Python 3.8+
- Node.js 18+
- npm

## Getting Started

### Backend Setup

1. Clone the repository
2. Install the Python dependencies:

```bash
cd api
pip install -r requirements.txt
```

3. Run the API for development:

```bash
fastapi dev app.py
```

The API will be available at http://127.0.0.1:8000 \
Swagger API documentation can be accessed at http://127.0.0.1:8000/docs \
Redoc API documentation can be accessed at http://127.0.0.1:8000/redoc

To deploy on local network, run the API with the following command:

```bash
uvicorn api.app:app --host 0.0.0.0 --port 8000
```

OR

```bash
fastapi dev api/app.py --host 0.0.0.0 --port 8000
```

### Frontend Setup

1. Install the frontend dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173

If deploying on a local network, remember to update the API Base URL in [fontend/src/config.js](frontend/src/config.js) to the local network IP address.

## Example Usage

Try annotating this text:

```
Chinua Achebe bụ onye edemede Nigeria
```

Expected output will identify "Chinua Achebe" as a PERSON and "Nigeria" as a LOCATION in the annotation results.
