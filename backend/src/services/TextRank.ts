import * as math from 'mathjs';
import Ranker from './Ranker';
import IRank from '../interfaces/IRank';
import { getTokens, create2dArray } from './utils/Tokenizer';

export default class TextRank extends Ranker {
	private eps: number;

	private damp: number;

	public constructor(eps = 0.0001, damp = 0.6) {
		super();
		this.eps = eps;
		this.damp = damp;
	}

	public getRank(): IRank[] {
		if (this.ranking.length !== 0) {
			return this.ranking;
		}

		const similarityMatrix = this.getSimilarityMatrix();
		const ranks = this.rankSentences(similarityMatrix);

		const sentences = this.getSentences();

		this.ranking = ranks
			.map((rank, i) => ({
				sentenceIndex: i,
				sentence: sentences[i],
				score: rank,
			}))
			.sort((a, b) => {
				if (a.score < b.score) return 1;
				if (a.score > b.score) return -1;
				return 0;
			})
			.map((res, rank) => ({
				...res,
				rank,
			}));

		return this.ranking;
	}

	private static normalize(vec: number[]): number {
		return math.sqrt(vec.reduce((acc, n) => acc + n * n));
	}

	private static cosineSimilarity(vecA: number[], vecB: number[]): number {
		return math.dot(vecA, vecB) / (TextRank.normalize(vecA) * TextRank.normalize(vecB));
	}

	private static getSimilarity(a: string[], b: string[]): number {
		const allWords = [...new Set([...a, ...b])];

		const vecA = Array(allWords.length).fill(0);
		const vecB = Array(allWords.length).fill(0);

		a.forEach((word) => {
			vecA[allWords.indexOf(word)] += 1;
		});

		b.forEach((word) => {
			vecB[allWords.indexOf(word)] += 1;
		});

		return TextRank.cosineSimilarity(vecA, vecB);
	}

	private getSimilarityMatrix() {
		const sentenceWords = this.sentences.map((sentence) => getTokens(sentence));

		const matrix = create2dArray(sentenceWords.length, sentenceWords.length);

		for (let i = 0; i < sentenceWords.length; i += 1) {
			for (let j = 0; j < sentenceWords.length; j += 1) {
				if (i === j) {
					matrix[i][j] = 1;
				} else {
					matrix[i][j] = TextRank.getSimilarity(sentenceWords[i], sentenceWords[j]);
				}
			}

			const sum = math.sum(matrix[i]);
			if (sum > 0) {
				matrix[i] = matrix[i].map((similarity) => similarity / sum);
			}
		}

		return matrix;
	}

	private rankSentences(matrix: number[][]): number[] {
		const { length } = matrix;
		if (length === 0) {
			return [];
		}

		let prev: number[] = Array(length).fill(1 / length);
		// eslint-disable-next-line no-constant-condition
		while (true) {
			const m: number[][] = math.multiply(math.transpose(matrix), prev);
			const a = math.multiply(m, this.damp);
			const current = math.add(a, (1 - this.damp) / length);
			const delta: number = math.sum(math.abs(math.subtract(current, prev) as number));

			if (Number.isNaN(delta)) {
				return [];
			}

			if (delta <= this.eps) {
				return current as number[];
			}

			prev = current as number[];
		}
	}
}
