import isURL from 'validator/lib/isURL';
import PythonRunner, { getScriptPath } from './PythonRunner';

export default function WebParser(url: string): Promise<string> {
	if (!isURL(url)) {
		return Promise.reject(new Error('URL not valid.'));
	}
	return PythonRunner(getScriptPath('parse_url.py'), url);
}
