# summary

_Client based extractive text summarization using TextRank and RAKE_

___[DEMO](https://daviidli.github.io/summary)___
* TextRank and RAKE Summary: gives first n number of ranked sentences as summary in the order of the original text
* TextRank and RAKE Full Ranks: gives rank of every sentence using selected method

### [TextRank](https://nlpforhackers.io/textrank-text-summarization/) 
Uses Google's PageRank algorithm but instead of webpages, it ranks sentences.
Cosine Similarity is used to compute the similarity of sentences. 

### [RAKE (Rapid Automatic Keyword Extraction)](https://www.researchgate.net/publication/227988510_Automatic_Keyword_Extraction_from_Individual_Documents)
Method for summarization that extracts keywords from text and then computes a score for 
each word. Each sentence has a score of the sum of its keyword's scores. The sentences 
are then ranked by the sentence score. Tends to give preference to longer keywords and 
sentences

