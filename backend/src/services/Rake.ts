import Ranker from './Ranker';
import { getKeywords, create2dArray } from './utils/Tokenizer';
import { IRakeScore } from '../interfaces/IRake';
import IRank from '../interfaces/IRank';

export default class Rake extends Ranker {
	private wordStats: IRakeScore[] = [];

	public getRank(): IRank[] {
		if (this.ranking.length !== 0) {
			return this.ranking;
		}

		const keywords = this.sentences.map((sentence) => getKeywords(sentence));
		const allKeywords = keywords.flat();
		const wordMap = Rake.getWordMap(allKeywords);
		const scores = create2dArray(wordMap.size, wordMap.size);

		allKeywords.forEach((keyword) => Rake.updateScores(scores, wordMap, keyword));

		this.wordStats = [...wordMap.keys()].map((keyword, i) => {
			const degree = scores[i].reduce((acc, curr) => acc + curr, 0);
			const frequency = scores[i][i];
			return {
				keyword,
				degree,
				frequency,
				degFreq: degree / frequency,
			};
		});

		const results = this.sentences.map((sentence, sentenceIndex) => ({
			sentenceIndex,
			sentence,
			keywords: keywords[sentenceIndex],
			score: keywords[sentenceIndex].reduce((acc, curr: string) => {
				const index = wordMap.get(curr);
				if (index === undefined) {
					return acc;
				}
				return acc + this.wordStats[index].degFreq;
			}, 0),
		}));

		this.wordStats = this.wordStats.sort((a, b) => {
			if (a.degFreq < b.degFreq) return 1;
			if (a.degFreq > b.degFreq) return -1;
			return 0;
		});

		this.ranking = results
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

	public getKeywords(n: number | null = null): IRakeScore[] {
		if (n === null) {
			return this.wordStats;
		}
		return this.wordStats.slice(0, n);
	}

	private static getWordMap(keywords: string[]): Map<string, number> {
		const map = new Map();
		let index = 0;

		keywords.forEach((keyword) => {
			keyword.split(' ').forEach((word) => {
				if (!map.has(word)) {
					map.set(word, index);
					index += 1;
				}
			});
		});

		return map;
	}

	private static updateScores(scores: number[][], wordMap: Map<string, number>, keyword: string): void {
		const words = keyword.split(' ');
		if (words.length === 1) {
			const wordIndex = wordMap.get(words[0]);
			if (wordIndex !== undefined) {
				scores[wordIndex][wordIndex] += 1;
			} else {
				console.error(`Word "${words[0]}" was not found in keywords`);
			}
		} else {
			for (let i = 0; i < words.length; i += 1) {
				for (let j = i; j < words.length; j += 1) {
					const iIndex = wordMap.get(words[i]);
					const jIndex = wordMap.get(words[j]);

					if (iIndex !== undefined && jIndex !== undefined && iIndex === jIndex) {
						scores[iIndex][jIndex] += 1;
					} else if (iIndex !== undefined && jIndex !== undefined) {
						scores[iIndex][jIndex] += 1;
						scores[jIndex][iIndex] += 1;
					} else {
						console.error(`Word "${words[i]}" or "${words[j]}" was not found in keywords`);
					}
				}
			}
		}
	}
}
