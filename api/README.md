# Igbo Annotation API

This is the API for the Igbo Annotation project. It is a RESTful API that provides endpoints for the following:

- Named Entity Recognition (NER)
- Part of Speech (POS) Tagging

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

## Part of Speech Tagging

The Part of Speech (POS) tagging endpoint is `/annotate/pos`. It accepts a POST request with a JSON payload containing the text to be analyzed. The response is a JSON object containing the tokens with their POS tags. Similar to NER, it can be customized by providing a specific aggregation strategy.

We used [`ignatius/igbo_model`](https://huggingface.co/ignatius/igbo_model) model for this feature.

The POS tags follow the Universal Dependencies (UD) tagset. The definitions of these tags can be found on the [UD website](https://universaldependencies.org/u/pos/).

Example request to `/annotate/pos?strategy=simple`:

```json
{
  "text": "Chinua Achebe bụ onye edemede Nigeria"
}
```

Example response:

```json
[
  {
    "entity_group": "PROPN",
    "score": 0.18584652245044708,
    "word": "Chinua Achebe",
    "start": 0,
    "end": 13
  },
  {
    "entity_group": "VERB",
    "score": 0.12501755356788635,
    "word": "bụ",
    "start": 14,
    "end": 16
  },
  {
    "entity_group": "NOUN",
    "score": 0.20387955009937286,
    "word": "onye edemede",
    "start": 17,
    "end": 29
  },
  {
    "entity_group": "PROPN",
    "score": 0.17606505751609802,
    "word": "Nigeria",
    "start": 30,
    "end": 37
  }
]
```
