import { expect } from 'chai';
import fs from 'fs';
import path from 'path';
import md5 from 'md5';
import { ICache } from '../../../src/interfaces/ICache';
import { getFromCache, isInCache, writeToCache } from '../../../src/services/utils/Cache';

const dir = path.join(__dirname, '..', '..', '..', 'src', 'cache');

function fileExists(file: string) {
	const filePath = path.join(dir, file);
	return fs.existsSync(filePath);
}

function readFile(file: string) {
	const filePath = path.join(dir, file);
	return fs.readFileSync(filePath).toString();
}

describe('Cache', function () {
	before(function () {
		fs.rmdirSync(dir, { recursive: true });
	});

	after(function () {
		fs.rmdirSync(dir, { recursive: true });
	});

	it('should not have anything in cache', function () {
		expect(isInCache('sometext')).to.deep.equal(false);
	});

	it('should write to cache', function () {
		const filename = '123456';
		const filenameHash = md5(filename);
		const data: ICache = {
			text: 'hello. this is some text.',
			sentences: ['hello', 'this is some text'],
		};

		writeToCache(filename, data);

		expect(fileExists(filenameHash)).to.equal(true);
		expect(readFile(filenameHash)).to.equal(JSON.stringify(data));
	});

	it('should get from cache', function () {
		const filename = '123456';
		const data: ICache = {
			text: 'hello. this is some text.',
			sentences: ['hello', 'this is some text'],
		};
		expect(getFromCache(filename)).to.deep.equal(data);
	});
});
