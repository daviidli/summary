import stopwords from '../../constants/stopwords.json';
import punctuation from '../../constants/punctuation';

export function isStopword(word: string) {
	return stopwords.indexOf(word.toLowerCase().trim()) >= 0;
}

export function getKeywords(sentence: string): string[] {
	const keywords: string[] = [];

	let current = '';
	sentence.split(' ').forEach((token, i, arr) => {
		if (isStopword(token)) {
			if (current.length) {
				keywords.push(current);
				current = '';
			}
			return;
		}

		const matches = [...token.matchAll(punctuation.regex)];
		const cleanedToken = token.replace(punctuation.regex, '');
		switch (matches.length) {
			case 0:
				current = current.length ? `${current} ${token}` : token;
				break;
			case 1:
				if (matches[0].index === 0) {
					if (current.length) keywords.push(current);
					current = cleanedToken;
				} else {
					if (current.length) {
						keywords.push(`${current} ${cleanedToken}`);
					} else {
						keywords.push(cleanedToken);
					}
					current = '';
				}
				break;
			case 2:
				if (current.length) keywords.push(current);
				keywords.push(cleanedToken);
				current = '';
				break;
			default:
				console.error('keywords matched >2');
				break;
		}

		if (i === arr.length - 1) {
			if (current.length !== 0) {
				keywords.push(current);
			}
		}
	});

	return keywords;
}

export function getTokens(sentence: string): string[] {
	const tokens: string[] = [];

	sentence.split(' ').forEach((token) => {
		const cleanedToken = token.replace(punctuation.regex, '');

		if (isStopword(cleanedToken)) {
			return;
		}

		tokens.push(cleanedToken);
	});

	return tokens;
}

export function create2dArray(rows: number, cols: number): number[][] {
	return [...Array(rows)].map(() => Array(cols).fill(0));
}
