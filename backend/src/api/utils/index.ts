import { IInputData } from '../../interfaces/IRanker';
import {
	ITextRankResult,
	TextRankInfo,
	IRakeResult,
	RakeInfo,
	ISummarySelection,
	IResult,
} from '../../interfaces/IServer';
import TextRank from '../../services/TextRank';
import Rake from '../../services/Rake';

export function arrayHas<T>(arr: T[], item: T): boolean {
	return arr.indexOf(item) >= 0;
}

export async function getTextRankResult(selection: TextRankInfo[], input: IInputData): Promise<ITextRankResult> {
	const result: ITextRankResult = {};

	const textRank = new TextRank();
	await textRank.initialize(input);

	if (arrayHas(selection, TextRankInfo.Text)) {
		result.text = textRank.getText();
	}
	if (arrayHas(selection, TextRankInfo.Sentences)) {
		result.sentences = textRank.getSentences();
	}
	if (arrayHas(selection, TextRankInfo.Ranks)) {
		result.ranks = textRank.getRank();
	}

	return result;
}

export async function getRakeResult(selection: RakeInfo[], input: IInputData): Promise<IRakeResult> {
	const result: IRakeResult = {};

	const rake = new Rake();
	await rake.initialize(input);

	if (arrayHas(selection, RakeInfo.Text)) {
		result.text = rake.getText();
	}
	if (arrayHas(selection, RakeInfo.Sentences)) {
		result.sentences = rake.getSentences();
	}
	if (arrayHas(selection, RakeInfo.Ranks)) {
		result.ranks = rake.getRank();
	}
	if (arrayHas(selection, RakeInfo.Keywords)) {
		result.keywords = rake.getKeywords();
	}

	return result;
}

export async function generateResults(selections: ISummarySelection, input: IInputData): Promise<IResult> {
	const { textRank: textRankSelection, rake: rakeSelection } = selections;

	const result: IResult = {};

	if (textRankSelection !== undefined) {
		result.textRank = await getTextRankResult(textRankSelection, input);
	}
	if (rakeSelection !== undefined) {
		result.rake = await getRakeResult(rakeSelection, input);
	}

	return result;
}
