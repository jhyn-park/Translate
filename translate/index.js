// place in translate/index.js
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./.credentials/gd-virtual-staging-6f4a9306293c.json');
const i18nextConfig = require('../i18next-scanner.config');

const spreadsheetDocId = '스프레드시트 문서ID';
const ns = 'translation';
const lngs = i18nextConfig.options.lngs;
const loadPath = i18nextConfig.options.resource.loadPath;
const localesPath = loadPath.replace('/{{lng}}/{{ns}}.json', '');
const rePluralPostfix = new RegExp(/_plural|_[\d]/g);
const sheetId = 스프레드 시트 문서 번호; // your sheet id
const NOT_AVAILABLE_CELL = '_N/A';
const columnKeyToHeader = {
	key: '키',
	'ko-KR': '한글',
	'en-US': '영어',
	'ja-JP': '일본어',
	'my-MM': '미얀마어',
	'vi-VN': '베트남어',
	'zh-CN': '중국어',
};

/**
 * getting started from https://theoephraim.github.io/node-google-spreadsheet
 */
async function loadSpreadsheet() {
	// eslint-disable-next-line no-console
	console.info(
		'\u001B[32m',
		'=====================================================================================================================\n',
		'# i18next auto-sync using Spreadsheet\n\n',
		'  * Download translation resources from Spreadsheet and make /assets/locales/{{lng}}/{{ns}}.json\n',
		'  * Upload translation resources to Spreadsheet.\n\n',
		`The Spreadsheet for translation is here (\u001B[34mhttps://docs.google.com/spreadsheets/d/${spreadsheetDocId}/#gid=${sheetId}\u001B[0m)\n`,
		'=====================================================================================================================',
		'\u001B[0m',
	);

	// spreadsheet key is the long id in the sheets URL
	const doc = new GoogleSpreadsheet(spreadsheetDocId);

	// load directly from json file if not in secure environment
	await doc.useServiceAccountAuth(creds);

	await doc.loadInfo(); // loads document properties and worksheets

	return doc;
}

function getPureKey(key = '') {
	return key.replace(rePluralPostfix, '');
}

module.exports = {
	localesPath,
	loadSpreadsheet,
	getPureKey,
	ns,
	lngs,
	sheetId,
	columnKeyToHeader,
	NOT_AVAILABLE_CELL,
};
