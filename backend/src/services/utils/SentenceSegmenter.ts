import fs from 'fs';
import path from 'path';
import json5 from 'json5';
import PythonRunner, { getScriptPath } from './PythonRunner';

function cacheText(text: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const file = path.join(__dirname, '..', '..', 'scripts', 'data.txt');
		fs.writeFile(file, text, (err) => {
			if (err) {
				return reject(err);
			}
			return resolve();
		});
	});
}

export default async function SentenceSegmenter(text: string): Promise<string[]> {
	if (text.length === 0) {
		return [];
	}

	try {
		await cacheText(text);
		const sentences = await PythonRunner(getScriptPath('segment_sentence.py'), `"${text}"`);
		return Promise.resolve(json5.parse(sentences));
	} catch (err) {
		return Promise.reject(err);
	}
}
