#!/usr/bin/env python3
"""API for the igbo language annotation tool"""

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "Hello World!"}
