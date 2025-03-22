#!/usr/bin/env python3
"""
Pydantic models for annotation request validation.
"""

from pydantic import BaseModel
from typing import List


class AnnotationRequest(BaseModel):
    """
    Request model for text annotation.

    Attributes:
        text (str): The text content to be annotated. This should be a valid string containing Igbo text that needs to be processed for named entities.
    """

    text: str


class BatchAnnotationRequest(BaseModel):
    """
    Request model for batch text annotation.

    Attributes:
        texts (List[str]): A list of text contents to be annotated. Each should be a valid string containing Igbo text that needs to be processed.
    """

    texts: List[str]
