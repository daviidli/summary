/* eslint-disable no-console */
import restify from 'restify';
import { generateResults } from './api/utils';
import config from './config';
import { IInputData } from './interfaces/IRanker';
import { ISummaryText, ISummaryURL } from './interfaces/IServer';

async function startServer() {
	const server = restify.createServer();

	server.use(restify.plugins.bodyParser());

	server.listen(config.port, function () {
		console.log(`Server listening on port ${config.port}`);
	});

	server.get('/', function (req, res, next) {
		res.send('Summary v2.0');
		next();
	});

	server.post('/summary/url/', async function (req, res, next) {
		const { selections, url }: ISummaryURL = req.body;
		const input: IInputData = { input: url, isUrl: true };
		try {
			const result = await generateResults(selections, input);
			res.send(result);
		} catch (err) {
			console.error(err);
			res.status(400);
			res.send();
		}
		next();
	});

	server.post('/summary/text/', async function (req, res, next) {
		const { selections, text }: ISummaryText = req.body;
		const input: IInputData = { input: text };
		try {
			const result = await generateResults(selections, input);
			res.send(result);
		} catch (err) {
			console.error(err);
			res.status(400);
			res.send();
		}
		next();
	});
}

startServer();
