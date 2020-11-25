import chai, { expect } from 'chai';

import chaiAsPromised from 'chai-as-promised';
import path from 'path';
import PythonRunner, { getScriptPath } from '../../../src/services/utils/PythonRunner';

chai.use(chaiAsPromised);

function getTestScriptPath(script: string) {
	return path.join(__dirname, '..', '..', 'scripts', script);
}

describe('PythonRunner', function () {
	describe('getScriptPath', function () {
		it('should throw error when script is empty', function () {
			expect(getScriptPath.bind('', '')).to.throw(Error, 'Script name not given');
		});

		it('should get the correct path for given script', function () {
			expect(getScriptPath('someScript.py')).to.match(/.*?\/src\/scripts\/someScript\.py/);
		});
	});

	it(`should fail to spawn a process as script doesn't exist`, async function () {
		const result = PythonRunner(getTestScriptPath('nonexistent.py'));
		await expect(result).to.eventually.rejectedWith(Error, `python: can't open file`);
	});

	it('should fail from python script', async function () {
		const result = PythonRunner(getTestScriptPath('error.py'));
		await expect(result).to.eventually.rejectedWith(Error, `raise Exception('This is an error')`);
	});

	it('should pass arguments to python script', async function () {
		const args = ['a', 'b', 'c'];
		const result = PythonRunner(getTestScriptPath('args.py'), ...args);
		await expect(result).to.eventually.equal('abc\n');
	});

	it('should read data from python script output', async function () {
		const result = PythonRunner(getTestScriptPath('output.py'));
		await expect(result).to.eventually.equal('Hello World!\n');
	});
});
