import * as d3 from 'd3';

import { readFile, writeFile } from 'fs';

let rawData = await readFile('../data/Maximos.csv', 'utf-8', (err, data) => {
	if (err) throw err;
	let resp = data.split('\n');
	const [dia, mes, año, mm] = resp[0].split(',').map((d) => d.toLowerCase());
	resp.filter((d, i) => i > 0);
	resp = resp.map((d, i) => {
		const [di, m, a, value] = d.split(',');
		return {
			date: new Date(`${m}-${di}-${a}`),
			day: +di,
			month: +m,
			year: +a,
			mm: +value,
		};
	});
	let currentYearInterval = {
		start: new Date('01-01-2022'),
		end: new Date('31-12-2022'),
	};
	let thisYear2022 = resp.filter(
		(d) =>
			d.date >= currentYearInterval.start || d.date <= currentYearInterval.end
	);
	thisYear2022 = Array.from(
		d3.group(thisYear2022, (m) => m.month),
		([month, monthlyData]) => ({
			month,
			monthlyData,
		})
	);
	//console.log('resp :>> ', thisYear2022);
	let toSave = JSON.stringify(thisYear2022);
	writeFile('year2022.json', toSave, (err) => {
		if (err) throw err;
	});
});
