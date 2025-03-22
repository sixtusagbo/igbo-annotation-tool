#!/usr/bin/env python3
"""This module handles Igbo text POS tagging"""

from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForTokenClassification
from api.utils import AggregationStrategy

model_name = "ignatius/igbo_model"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForTokenClassification.from_pretrained(model_name)


def get_pos_pipeline(strategy: AggregationStrategy = "simple"):
    """
    Get POS pipeline for Igbo text
    """
    return pipeline(
        "token-classification",
        model=model,
        tokenizer=tokenizer,
        aggregation_strategy=None if strategy == "none" else strategy,
    )
