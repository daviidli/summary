import { assert, expect } from 'chai';
import { IInputData } from '../../src/interfaces/IRanker';
import TextRank from '../../src/services/TextRank';

describe('TextRank', function () {
	it('should initialize with text input', async function () {
		try {
			const text = 'This is a sentence. This is another more important sentence.';
			const input: IInputData = { input: text };

			const textRank = new TextRank();
			await textRank.initialize(input);

			expect(textRank.getText()).to.deep.equal(text);
			expect(textRank.getSentences()).to.deep.equal([
				'this is a sentence',
				'this is another more important sentence',
			]);
		} catch (err) {
			assert.fail(err);
		}
	});

	it('should initialize with empty text input', async function () {
		try {
			const text = '';
			const input: IInputData = { input: text };

			const textRank = new TextRank();
			await textRank.initialize(input);

			expect(textRank.getText()).to.deep.equal(text);
			expect(textRank.getSentences()).to.deep.equal([]);
		} catch (err) {
			assert.fail(err);
		}
	});

	it('should initialize with url input', async function () {
		try {
			const textRank = new TextRank();
			const input: IInputData = {
				input: 'https://summsumm.herokuapp.com/',
				isUrl: true,
			};

			await textRank.initialize(input);

			expect(textRank.getText()).to.deep.equal('\n');
			expect(textRank.getSentences()).to.deep.equal([]);
		} catch (err) {
			assert.fail(err);
		}
	});

	it('should fail to initialize with invalid url', async function () {
		try {
			const textRank = new TextRank();
			const input: IInputData = {
				// just a really short wiki article
				input: 'not a url',
				isUrl: true,
			};
			await textRank.initialize(input);

			assert.fail();
		} catch (err) {
			const errMsg = err.toString().split('\n')[0];
			expect(errMsg).to.deep.equal('Error: URL not valid.');
		}
	});

	it('should rank sentences', async function () {
		try {
			const text =
				'The dog hadn’t been fed for days. He howled and barked and whined, until a steak suddenly appeared in the backyard. It was charred beyond belief, but to the dog, unlike the human next door, it was perfect.';
			const input: IInputData = { input: text };

			const textRank = new TextRank();
			await textRank.initialize(input);

			expect(textRank.getText()).to.deep.equal(text);
			expect(textRank.getSentences()).to.deep.equal([
				'the dog hadn’t been fed for days',
				'he howled and barked and whined, until a steak suddenly appeared in the backyard',
				'it was charred beyond belief, but to the dog, unlike the human next door, it was perfect',
			]);

			const expectedRanking = [
				{
					sentenceIndex: 0,
					sentence: 'the dog hadn’t been fed for days',
					score: 0.3333333333333333,
					rank: 0,
				},
				{
					sentenceIndex: 1,
					sentence: 'he howled and barked and whined, until a steak suddenly appeared in the backyard',
					score: 0.3333333333333333,
					rank: 1,
				},
				{
					sentenceIndex: 2,
					sentence:
						'it was charred beyond belief, but to the dog, unlike the human next door, it was perfect',
					score: 0.3333333333333333,
					rank: 2,
				},
			];

			expect(textRank.getRank()).to.deep.equal(expectedRanking);
		} catch (err) {
			assert.fail(err);
		}
	});
});
