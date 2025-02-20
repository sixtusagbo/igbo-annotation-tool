#!/usr/bin/env python3
"""API for the igbo language annotation tool"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.views import annotation

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(annotation.router)


@app.get("/")
def read_root():
    """Base route"""
    return {"message": "Hello World!"}
