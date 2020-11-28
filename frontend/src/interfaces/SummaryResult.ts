export interface RakeScore {
	keyword: string;
	degree: number;
	frequency: number;
	degFreq: number;
}

export interface Rank {
	sentenceIndex: number;
	sentence: string;
	rank: number;
	keywords?: string[];
	score?: number;
	percentage?: number;
}

export interface TextRankResult {
	text?: string;
	sentences?: string[];
	ranks?: Rank[];
}

export interface RakeResult {
	text?: string;
	sentences?: string[];
	ranks?: Rank[];
	keywords?: RakeScore[];
}

export interface SummaryResult {
	textRank?: TextRankResult;
	rake?: RakeResult;
}

export enum TextRankInfo {
	Text = 'text',
	Sentences = 'sentences',
	Ranks = 'ranks',
}

export enum RakeInfo {
	Text = 'text',
	Sentences = 'sentences',
	Ranks = 'ranks',
	Keywords = 'keywords',
}

export interface SummarySelection {
	textRank?: TextRankInfo[];
	rake?: RakeInfo[];
}
