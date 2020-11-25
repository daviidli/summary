import chai, { expect } from 'chai';

import chaiAsPromised from 'chai-as-promised';
import WebParser from '../../../src/services/utils/WebParser';

chai.use(chaiAsPromised);

describe('WebParser', function () {
	it('should reject with error when url is invalid', async function () {
		const result = WebParser('invalidurl');
		await expect(result).to.eventually.rejectedWith(Error, 'URL not valid.');
	});
});
