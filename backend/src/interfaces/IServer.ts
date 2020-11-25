import { IRakeScore } from './IRake';
import IRank from './IRank';

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

export interface ISummarySelection {
	textRank?: TextRankInfo[];
	rake?: RakeInfo[];
}

export interface ISummaryURL {
	url: string;
	selections: ISummarySelection;
}

export interface ISummaryText {
	text: string;
	selections: ISummarySelection;
}

export interface ITextRankResult {
	text?: string;
	sentences?: string[];
	ranks?: IRank[];
}

export interface IRakeResult {
	text?: string;
	sentences?: string[];
	ranks?: IRank[];
	keywords?: IRakeScore[];
}

export interface IResult {
	textRank?: ITextRankResult;
	rake?: IRakeResult;
}
