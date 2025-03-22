# Igbo Annotation API

This is the API for the Igbo Annotation project. It is a RESTful API that provides endpoints for the following:

- Named Entity Recognition

## Named Entity Recognition

The Named Entity Recognition endpoint is `/annotate/ner`. It accepts a POST request with a JSON payload containing the text to be analyzed. The response is a JSON object containing the named entities found in the text. It can also be customized by providing a specific aggregation strategy.

We used [`mbeukman/xlm-roberta-base-finetuned-igbo-finetuned-ner-igbo`](https://huggingface.co/mbeukman/xlm-roberta-base-finetuned-igbo-finetuned-ner-igbo) model for this feature.

Example request to `/annotate/ner?strategy=simple`:

```json
{
  "text": "Chinua Achebe bụ onye edemede Nigeria"
}
```

Example response:

```json
[
  {
    "entity_group": "PER",
    "score": 0.9999270439147949,
    "word": "Chinua Achebe",
    "start": 0,
    "end": 13
  },
  {
    "entity_group": "LOC",
    "score": 0.9998887777328491,
    "word": "Nigeria",
    "start": 29,
    "end": 37
  }
]
```
