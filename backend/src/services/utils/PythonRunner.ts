import path from 'path';
import { spawn } from 'child_process';

export function getScriptPath(script: string): string {
	if (script.length === 0) {
		throw new Error('Script name not given');
	}
	return path.join(__dirname, '..', '..', 'scripts', script);
}

function spawnProcess(script: string, args: string[]) {
	return spawn('python', [script, ...args]);
}

function PythonRunner(script: string, ...args: string[]): Promise<string> {
	return new Promise((resolve, reject) => {
		const process = spawnProcess(script, args);

		process.stdout.on('data', (data) => {
			resolve(String(data));
			process.kill();
		});

		process.stderr.on('data', (data) => {
			reject(new Error(String(data)));
		});

		process.on('close', () => resolve());
	});
}

export default PythonRunner;
