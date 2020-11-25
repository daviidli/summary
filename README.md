# summary

_Extractive text summarization using TextRank and RAKE_

__v1 demo__: [https://dvdli.dev/summary](https://dvdli.dev/summary)

__v2 demo still a work in progress__



### [TextRank](https://nlpforhackers.io/textrank-text-summarization/)
Uses Google's PageRank algorithm but instead of webpages, it ranks sentences. Cosine similarity is used to compute the similarity of sentences.

### [RAKE (Rapid Automatic Keyword Extraction)](https://www.researchgate.net/publication/227988510_Automatic_Keyword_Extraction_from_Individual_Documents)
Method for summarization that extracts keywords from text and then computes a score for each word. Each sentence has a score of the sum of its keyword's scores. The sentences are then ranked by the sentence score. Tends to give preference to longer keywords and sentences



[Original v1 code](https://github.com/daviidli/summary/tree/v1)