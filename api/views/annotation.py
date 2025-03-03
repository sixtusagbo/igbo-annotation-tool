#!/usr/bin/env python3
"""Annotation views"""

from fastapi import APIRouter, Query
from api.models.annotation_request import AnnotationRequest
from api.utils.igbo_ner import get_pipeline, AggregationStrategy
from api.utils.converter import convert_numpy_types
from typing import Annotated

router = APIRouter(
    prefix="/annotate",
    tags=["annotation"],
    responses={404: {"message": "Not found"}},
)


@router.post("/")
async def annotate(
    request: AnnotationRequest,
    strategy: Annotated[
        AggregationStrategy,
        Query(
            description="Aggregation strategy for NER results", example="simple"
        ),
    ] = "simple",
):
    """
    Annotate the given text using specified aggregation strategy.
    """
    pipeline = get_pipeline(strategy)
    annotations = pipeline(request.text)
    converted_annotations = convert_numpy_types(annotations)
    return converted_annotations
