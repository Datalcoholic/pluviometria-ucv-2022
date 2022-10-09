import * as d3 from 'd3';
import { readFile, writeFile } from 'fs';

let rawData = await readFile('../data/Maximos.csv', 'utf-8', (err, data) => {
	if (err) throw err;
	let resp = data.split('\n');
	const [dia, mes, año, mm] = resp[0].split(',').map((d) => d.toLowerCase());
	resp = resp.map((d, i) => {
		if (i !== 0) {
			const [di, m, a, value] = d.split(',');
			return {
				date: `${di}-${m}-${a}`,
				mm: +value,
			};
		}
	});
	let toSave = JSON.stringify(resp);
	console.log('resp :>> ', resp);
	writeFile('test.json', toSave, (err) => {
		if (err) throw err;
	});
});

console.log('rawData :>> ', rawData);
