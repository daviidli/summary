import { expect } from 'chai';

import { isStopword, getKeywords } from '../../../src/services/utils/Tokenizer';

describe('Tokenizer', function () {
	describe('isStopWord', function () {
		it('should return false for empty string', function () {
			expect(isStopword('')).to.equal(false);
		});

		it('should return false for non-stopwords', function () {
			expect(isStopword('Dave')).to.equal(false);
		});

		it('should return true for stop word', function () {
			expect(isStopword('is')).to.equal(true);
		});
	});

	describe('getKeywords', function () {
		it('should return empty array for empty string sentence', function () {
			const sentence = '';
			const keywords: string[] = [];
			expect(getKeywords(sentence)).to.deep.equal(keywords);
		});

		it('should return keywords for sentence with no punctuation and stopwords', function () {
			const sentence = 'John Smith Jane Doe';
			const keywords: string[] = ['John Smith Jane Doe'];
			expect(getKeywords(sentence)).to.deep.equal(keywords);
		});

		it('should return keywords for sentence with stopwords', function () {
			const sentence = 'John is happy today';
			const keywords: string[] = ['John', 'happy today'];
			expect(getKeywords(sentence)).to.deep.equal(keywords);
		});

		it('should return keywords for sentence with punctuation', function () {
			const sentence = 'John Smith, meeting "Jane (Doe)"';
			const keywords: string[] = ['John Smith', 'meeting', 'Jane', 'Doe'];
			expect(getKeywords(sentence)).to.deep.equal(keywords);
		});

		it('should return keywords for sentence with stopwords and punctuation', function () {
			const sentence = 'Mr. Krabs wanted to go get a burger at the restaurant, Krusty Krab.';
			const keywords: string[] = ['Mr', 'Krabs wanted', 'go get', 'burger', 'restaurant', 'Krusty Krab'];
			expect(getKeywords(sentence)).to.deep.equal(keywords);
		});
	});
});
