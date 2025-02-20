#!/usr/bin/env python3
"""Annotation views"""

from fastapi import APIRouter, Body
from api.utils.igbo_ner import igbo_pipeline
from api.utils.converter import convert_numpy_types
from typing import Annotated

router = APIRouter(
    prefix="/annotate",
    tags=["annotation"],
    responses={404: {"message": "Not found"}},
)


@router.post("/")
async def annotate(
    text: Annotated[str, Body(description="Text to annotate")],
):
    """Annotate the given text"""
    annotations = igbo_pipeline(text)
    converted_annotations = convert_numpy_types(annotations)
    return converted_annotations
