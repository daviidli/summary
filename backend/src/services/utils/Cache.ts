import fs from 'fs';
import path from 'path';
import md5 from 'md5';
import { ICache } from '../../interfaces/ICache';

export function isInCache(input: string): boolean {
	const dir = path.join(__dirname, '..', '..', 'cache');
	const hash = md5(input);
	if (fs.existsSync(dir)) {
		const files = fs.readdirSync(dir);
		return files.indexOf(hash) >= 0;
	}
	return false;
}

export function getFromCache(input: string): ICache {
	const hash = md5(input);
	const file = path.join(__dirname, '..', '..', 'cache', hash);
	const contents: string = fs.readFileSync(file).toString();
	return JSON.parse(contents);
}

export function writeToCache(input: string, data: ICache): void {
	const dir = path.join(__dirname, '..', '..', 'cache');
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}

	const hash = md5(input);
	const file = path.join(dir, hash);
	fs.writeFileSync(file, JSON.stringify(data));
}
