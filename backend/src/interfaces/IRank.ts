interface IRank {
	sentenceIndex: number;
	sentence: string;
	rank: number;
	keywords?: string[];
	score?: number;
}

export default IRank;
