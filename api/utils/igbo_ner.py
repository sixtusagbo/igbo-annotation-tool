#!/usr/bin/env python3
"""This module sets up the tokenizer and model for processing Igbo text"""

from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForTokenClassification
from typing import Literal

AggregationStrategy = Literal["none", "simple", "first", "average", "max"]

model_name = "mbeukman/xlm-roberta-base-finetuned-igbo-finetuned-ner-igbo"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForTokenClassification.from_pretrained(model_name)


def get_pipeline(strategy: AggregationStrategy = "simple"):
    """
    Get NER pipeline with configurable aggregation strategy

    Args:
        strategy: One of "none", "simple", "first", "average", or "max"
    """
    return pipeline(
        "ner",
        model=model,
        tokenizer=tokenizer,
        aggregation_strategy=None if strategy == "none" else strategy,
    )
