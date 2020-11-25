import IRank from '../interfaces/IRank';
import { IInputData } from '../interfaces/IRanker';
import { getFromCache, isInCache, writeToCache } from './utils/Cache';
import SentenceSegmenter from './utils/SentenceSegmenter';
import WebParser from './utils/WebParser';

export default abstract class Ranker {
	protected text: string = '';

	protected sentences: string[] = [];

	protected ranking: IRank[] = [];

	public async initialize({ input, isUrl }: IInputData) {
		if (isInCache(input)) {
			const { text, sentences } = getFromCache(input);
			this.text = text;
			this.sentences = sentences;
			return;
		}

		if (isUrl) {
			this.text = await WebParser(input);
		} else {
			this.text = input;
		}

		this.sentences = await SentenceSegmenter(this.text);

		writeToCache(input, { text: this.text, sentences: this.sentences });
	}

	public getText(): string {
		return this.text;
	}

	public getSentences(): string[] {
		return this.sentences;
	}

	public abstract getRank(): IRank[];
}
