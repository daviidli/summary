import { assert, expect } from 'chai';
import { IInputData } from '../../src/interfaces/IRanker';
import Rake from '../../src/services/Rake';

describe('Rake', function () {
	it('should initialize with text input', async function () {
		try {
			const text = 'This is a sentence. This is another more important sentence.';
			const input: IInputData = { input: text };

			const rake = new Rake();
			await rake.initialize(input);

			expect(rake.getText()).to.deep.equal(text);
			expect(rake.getSentences()).to.deep.equal([
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

			const rake = new Rake();
			await rake.initialize(input);

			expect(rake.getText()).to.deep.equal(text);
			expect(rake.getSentences()).to.deep.equal([]);
		} catch (err) {
			assert.fail(err);
		}
	});

	it('should initialize with url input', async function () {
		try {
			const rake = new Rake();
			const input: IInputData = {
				input: 'https://summsumm.herokuapp.com/',
				isUrl: true,
			};
			await rake.initialize(input);

			expect(rake.getText()).to.deep.equal('\n');
			expect(rake.getSentences()).to.deep.equal([]);
		} catch (err) {
			assert.fail(err);
		}
	});

	it('should fail to initialize with invalid url', async function () {
		try {
			const rake = new Rake();
			await rake.initialize({ input: 'not a url', isUrl: true });

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

			const rake = new Rake();
			await rake.initialize(input);

			expect(rake.getText()).to.deep.equal(text);
			expect(rake.getSentences()).to.deep.equal([
				'the dog hadn’t been fed for days',
				'he howled and barked and whined, until a steak suddenly appeared in the backyard',
				'it was charred beyond belief, but to the dog, unlike the human next door, it was perfect',
			]);

			const expectedRanking = [
				{
					sentenceIndex: 1,
					sentence: 'he howled and barked and whined, until a steak suddenly appeared in the backyard',
					keywords: ['howled', 'barked', 'whined', 'steak suddenly appeared', 'backyard'],
					score: 4,
					rank: 0,
				},
				{
					sentenceIndex: 2,
					sentence:
						'it was charred beyond belief, but to the dog, unlike the human next door, it was perfect',
					keywords: ['charred beyond belief', 'dog', 'unlike', 'human next door', 'perfect'],
					score: 3.5,
					rank: 1,
				},
				{
					sentenceIndex: 0,
					sentence: 'the dog hadn’t been fed for days',
					keywords: ['dog hadn’t', 'fed', 'days'],
					score: 2,
					rank: 2,
				},
			];

			expect(rake.getRank()).to.deep.equal(expectedRanking);
		} catch (err) {
			assert.fail(err);
		}
	});

	it('should get top 3 keywords', async function () {
		try {
			// story from https://medium.com/the-quintessential-q/three-sentence-stories-c8dca4bbe22f
			const text =
				'The dog hadn’t been fed for days. He howled and barked and whined, until a steak suddenly appeared in the backyard. It was charred beyond belief, but to the dog, unlike the human next door, it was perfect.';
			const input: IInputData = { input: text };

			const rake = new Rake();
			await rake.initialize(input);
			rake.getRank();

			const expectedKeywords = [
				{ keyword: 'steak', degree: 3, frequency: 1, degFreq: 3 },
				{ keyword: 'suddenly', degree: 3, frequency: 1, degFreq: 3 },
				{ keyword: 'appeared', degree: 3, frequency: 1, degFreq: 3 },
			];
			expect(rake.getKeywords(3)).to.deep.equal(expectedKeywords);
		} catch (err) {
			assert.fail(err);
		}
	});
});
