#!/usr/bin/env python3
"""Annotation views"""

from fastapi import APIRouter, Query
from api.models.annotation_request import (
    AnnotationRequest,
    BatchAnnotationRequest,
)
from api.utils.igbo_ner import get_ner_pipeline
from api.utils.igbo_pos import get_pos_pipeline
from api.utils.igbo_sentiment_analysis import get_sentiment_pipeline
from api.utils import AggregationStrategy
from api.utils.converter import convert_numpy_types
from typing import Annotated

router = APIRouter(
    prefix="/annotate",
    tags=["annotation"],
    responses={404: {"message": "Not found"}},
)
aggregation_description = "Aggregation strategy for the results"


@router.post("/ner", summary="Named Entity Recognition (NER)")
async def ner(
    request: AnnotationRequest,
    strategy: Annotated[
        AggregationStrategy,
        Query(description=aggregation_description),
    ] = "simple",
):
    """
    Annotate the given text with Named Entity Recognition (NER)
    """
    pipeline = get_ner_pipeline(strategy)
    annotations = pipeline(request.text)
    converted_annotations = convert_numpy_types(annotations)
    return converted_annotations


@router.post("/pos", summary="Part of Speech (POS)")
async def pos(
    request: AnnotationRequest,
    strategy: Annotated[
        AggregationStrategy,
        Query(description=aggregation_description),
    ] = "simple",
):
    """
    Annotate the given text showing its Part of Speech (POS)
    """
    pipeline = get_pos_pipeline(strategy)
    annotations = pipeline(request.text)
    converted_annotations = convert_numpy_types(annotations)
    return converted_annotations


@router.post("/sentiment-analysis")
async def sentiment_analysis(
    request: BatchAnnotationRequest,
):
    """Perform sentiment analysis on the given texts"""
    pipeline = get_sentiment_pipeline()
    results = []

    for text in request.texts:
        annotations = pipeline(text)
        converted_annotations = convert_numpy_types(annotations)
        results.append(converted_annotations)

    return results
