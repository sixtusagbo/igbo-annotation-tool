#!/usr/bin/env python3
"""This module sets up the tokenizer and model for processing Igbo text"""

from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForTokenClassification

model_name = "mbeukman/xlm-roberta-base-finetuned-igbo-finetuned-ner-igbo"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForTokenClassification.from_pretrained(model_name)
igbo_pipeline = pipeline(
    "ner", model=model, tokenizer=tokenizer, aggregation_strategy="simple"
)
