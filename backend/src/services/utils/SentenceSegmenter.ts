import json5 from 'json5';
import PythonRunner, { getScriptPath } from './PythonRunner';

export default async function SentenceSegmenter(text: string): Promise<string[]> {
	if (text.length === 0) {
		return [];
	}

	try {
		const sentences = await PythonRunner(getScriptPath('segment_sentence.py'), `"${text}"`);
		return Promise.resolve(json5.parse(sentences));
	} catch (err) {
		return Promise.reject(err);
	}
}
