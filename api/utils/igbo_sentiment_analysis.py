#!/usr/bin/env python3
"""This module handles Igbo text sentiment analysis"""

from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForSequenceClassification

model_name = "ahmadmwali/finetuning-sentiment-igbo21"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)


def get_sentiment_pipeline():
    """
    Get sentiment analysis pipeline for Igbo text
    """
    return pipeline(
        "sentiment-analysis",
        model=model,
        tokenizer=tokenizer,
    )
