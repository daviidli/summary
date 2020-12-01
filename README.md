# summary

Extractive text summarization using TextRank and RAKE.

## [Demo](https://dvdli.dev/summary)

## API

_Hosted for demo purposes only. Please host your own server if you require consistent performance._

### Selection types:
```typescript
enum TextRankSelections {
	Text = 'text',
	Sentences = 'sentences',
	Ranks = 'ranks',
}
```

```typescript
enum RakeSelections {
	Text = 'text',
	Sentences = 'sentences',
	Ranks = 'ranks',
	Keywords = 'keywords',
}
```

### Getting the summary for a URL:

Endpoint: `https://summsumm.herokuapp.com/summary/url/`
POST Request body:
```typescript
interface UrlRequest {
	url: string;
	selections: {
		textRank?: TextRankSelections[];
		rake?: RakeSelections[];
	}
}
```
- API will return the requested selections only

### Getting the summary of inputted text:

Endpoint: `https://summsumm.herokuapp.com/summary/text/`
POST Request body:
```typescript
interface TextRequest {
	text: string;
	selections: {
		textRank?: TextRankSelections[];
		rake?: RakeSelections[];
	}
}
```
- API will return the requested selections only

### Response
```typescript
interface Response {
	textRank?: TextRankResponse;
	rake?: RakeResponse;
}
```

```typescript
// response is based on selections made in request

interface TextRankResponse {
	text?: string;
	sentences?: string[];
	ranks?: Rank[];	// shown below
}

interface RakeResponse {
	text?: string;
	sentences?: string[];
	ranks?: Rank[]; // shown below
	keywords?: KeywordScore[]; // shown below
}
```

```typescript
interface Rank {
	sentenceIndex: number;
	sentence: string;
	rank: number;
	keywords?: string[];
	score?: number;
}

interface KeywordScore {
	keyword: string;
	degree: number;
	frequency: number;
	degFreq: number;
}
```

## Algorithms

### [TextRank](https://nlpforhackers.io/textrank-text-summarization/)
Uses Google's PageRank algorithm but instead of webpages, it ranks sentences. Cosine similarity is used to compute the similarity of sentences.

### [RAKE (Rapid Automatic Keyword Extraction)](https://www.researchgate.net/publication/227988510_Automatic_Keyword_Extraction_from_Individual_Documents)
Method for summarization that extracts keywords from text and then computes a score for each word. Each sentence has a score of the sum of its keyword's scores. The sentences are then ranked by the sentence score. Tends to give preference to longer keywords and sentences



[Original v1 code](https://github.com/daviidli/summary/tree/v1)
