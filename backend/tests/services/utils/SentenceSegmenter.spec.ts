import chai, { expect } from 'chai';

import chaiAsPromised from 'chai-as-promised';
import SentenceSegmenter from '../../../src/services/utils/SentenceSegmenter';

chai.use(chaiAsPromised);

describe('SentenceSegmenter', function () {
	it('should return an empty array when no text is given', async function () {
		const result = SentenceSegmenter('');
		await expect(result).to.eventually.deep.equal([]);
	});

	it('should return an array of sentences', function () {
		const sentences = [
			'This is a sentence.',
			'This is another sentence.',
			'Mr. Smith is reading the third sentence',
		];
		const text = sentences.reduce((acc, curr) => `${acc} ${curr}`);
		const result = SentenceSegmenter(text);
		expect(result).to.eventually.deep.equal(sentences);
	});
});
