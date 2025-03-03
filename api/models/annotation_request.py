"""
Pydantic models for annotation request validation.
"""

from pydantic import BaseModel


class AnnotationRequest(BaseModel):
    """
    Request model for text annotation.

    Attributes:
        text (str): The text content to be annotated. This should be a valid string containing Igbo text that needs to be processed for named entities.
    """

    text: str
