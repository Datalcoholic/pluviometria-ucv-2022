import * as d3 from 'd3';
import { isAfter, min } from 'date-fns';
import { readFile, writeFile, writeFileSync } from 'fs';

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
	//let toSave = JSON.stringify(thisYear2022);

	//Previus Years Statistics
	let previusYears = resp.filter((d) => d.year < 2022 && d.mm > 0);
	let toSavePrevius = JSON.stringify(previusYears);
	// writeFileSync('previusYears.json', toSavePrevius);
	// let statisticsByYears = Array.from(
	// 	d3.rollup(
	// 		previusYears,
	// 		(d) => d.length,
	// 		(m) => m.month,
	// 		(y) => y.year
	// 	),
	// 	([month, value]) => {
	// 		const objValues = Array.from(value, ([year, numDays]) => ({
	// 			y: year,
	// 			days: numDays,
	// 		}));
	// 		//console.log('objValues :>> ', objValues);
	// 		const max = d3.max(objValues, (d) => d.days);
	// 		//console.log('max :>> ', max);
	// 		const rainyDayMax = objValues.filter((d) => d.days === max);
	// 		return {
	// 			month,
	// 			rainyDaysMean: d3.mean(Array.from(value, ([_, d]) => d)),
	// 			rainyDayMax,
	// 		};
	// 	}
	// );
	//console.log('previusYears :>> ', statisticsByYears);
	//let toSaveStatistics = JSON.stringify(statisticsByYears);
	//writeFileSync('statisticsByYears.json', toSaveStatistics);

	// Previus years rainy days by month

	let previusRainyDaysByMonths = Array.from(
		d3.group(
			previusYears,
			(y) => y.year,
			(d) => d.month
		),
		([year, value]) => {
			const data = Array.from(value, ([month, days]) => ({
				month,
				days,
			}));
			return { year, data };
		}
	);

	let previusRainyDaysRange = previusRainyDaysByMonths.map(({ year, data }) => {
		let rangeValue = data.map((d) => {
			const month = d.month;
			//const minDay = d3.min(d.days, (d) => d.date);
			//const maxDay = d3.max(d.days, (d) => d.date);
			const range = d.days.map((d) => d.date); //.filter(
			//(a) => a.date === minDay || a.date === maxDay
			//);
			return { month, range };
		});

		let rainyDaysLength = data.map((d) => {
			const month = d.month;
			const monthLength = d.days.length;
			return { month, monthLength };
		});
		return { year, rangeValue, rainyDaysLength };
	});

	// console.log('previusRainyDaysByMonth :>> ', previusRainyDaysRange);
	// const ToSavePreviusRainyDaysRange = JSON.stringify(previusRainyDaysRange);
	// writeFileSync('previusRainyDaysRange.json', ToSavePreviusRainyDaysRange);

	// Calculate the longest consecutive rainy days
	let consecutiveLongest = previusRainyDaysByMonths;
	console.log('consecutiveLongest :>> ', consecutiveLongest);

	// testData[0].forEach((d, i) => {
	// 	console.log(
	// 		'testConsecutive :>> ',
	// 		d.date,
	// 		testData[0][i - 1]?.date,
	// 		isAfter(d.date, testData[0][i - 1]?.date)
	// 	);
	// });
	// console.log('consecutiveLongest :>> ', testData);
	// console.log('consecutiveLongest :>> ', consecutiveLongest[0].data[1]);
});
