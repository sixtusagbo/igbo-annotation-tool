#!/usr/bin/env python3
"""Annotation views"""

from fastapi import APIRouter, Query
from api.models.ner_request import NERRequest
from api.utils.igbo_ner import get_ner_pipeline, AggregationStrategy
from api.utils.converter import convert_numpy_types
from typing import Annotated

router = APIRouter(
    prefix="/annotate",
    tags=["annotation"],
    responses={404: {"message": "Not found"}},
)


@router.post("/ner")
async def ner(
    request: NERRequest,
    strategy: Annotated[
        AggregationStrategy,
        Query(
            description="Aggregation strategy for NER results", example="simple"
        ),
    ] = "simple",
):
    """
    Annotate the given text with Named Entity Recognition (NER)
    """
    pipeline = get_ner_pipeline(strategy)
    annotations = pipeline(request.text)
    converted_annotations = convert_numpy_types(annotations)
    return converted_annotations


@router.post("/pos")
async def pos():
    """Annotate the given text showing it's Part of Speech (POS)"""
    return {"message": "Not implemented yet"}


@router.post("/sentiment-analysis")
async def sentiment_analysis():
    """Perform sentiment analysis on the given text"""
    return {"message": "Not implemented yet"}
