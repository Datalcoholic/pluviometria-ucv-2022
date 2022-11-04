import * as d3 from 'd3';
import { differenceInDays } from 'date-fns';
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
		([month, monthlyData]) => {
			// get the 2022 year rainy days
			const rainyDays = monthlyData
				.filter((d) => d.mm > 0)
				.map((date) => date.date);
			const rainyDaysLength = rainyDays.length;

			// get the 2022 year consecutive rainy days
			console.log('rainyDays :>> ', rainyDays);
			const consecutiveRainyDays = getMaxConsecutiveDays(
				getConsecutiveDays(rainyDays)
			);

			return {
				month,
				monthlyData,
				rainyDaysLength,
				// rainyDays,
				consecutiveRainyDays,
			};
		}
	);

	// console.log('resp :>> ', thisYear2022);
	// let toSave = JSON.stringify(thisYear2022);
	// writeFileSync('year2022.json', toSave);

	//Previus Years Statistics
	// What I need
	//  [x] the most rainy day
	// [] The rainy amount avegarage per month
	// [] The Consecutive rainy days

	let previusYears = resp.filter((d) => d.year < 2022 && d.mm > 0);
	//let toSavePrevius = JSON.stringify(previusYears);
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
	let statisticsByYears = Array.from(
		d3.rollup(
			previusYears,
			(d) => d.length,
			(d) => d.month,
			(y) => y.year
		),

		([month, values]) => {
			const daysData = Array.from(values, ([year, data]) => {
				return { year, data };
			});
			const monthData = Array.from(values, ([_, data]) => data);
			const monthMean = d3.mean(monthData);
			return {
				month,
				monthMean,
				//daysData,
			};
		}
	);
	console.log('previusYears :>> ', statisticsByYears);
	let toSaveStatistics = JSON.stringify(statisticsByYears);
	// writeFileSync('statisticsByYears.json', toSaveStatistics);

	// Max rainy Day
	let maxRainyDay = previusYears
		.flat()
		.sort((a, b) => b.mm - a.mm)
		.slice(0, 3);

	console.log('maxRainyDay :>> ', maxRainyDay);

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

	//console.log('previusRainyDaysByMonths :>> ', previusRainyDaysByMonths);
	let previusRainyDaysRange = previusRainyDaysByMonths.map(({ year, data }) => {
		let rangeValue = data.map((d) => {
			const month = d.month;
			//const minDay = d3.min(d.days, (d) => d.date);
			//const maxDay = d3.max(d.days, (d) => d.date);
			const range = d.days.map((d) => d.date); //.filter(
			//(a) => a.date === minDay || a.date === maxDay
			//);
			const rainyDaysLength = range.length;
			let rainyDaysConsecutive = getConsecutiveDays(range);
			rainyDaysConsecutive = getMaxConsecutiveDays(rainyDaysConsecutive);
			const { _, lengthConsecutive } = rainyDaysConsecutive;
			return {
				month,
				//rainyDays: range,
				//rainyDaysLength,
				//rainyDaysConsecutive,
				lengthConsecutive,
			};
		});

		// let rainyDaysLength = data.map((d) => {
		// 	const month = d.month;
		// 	const monthLength = d.days.length;
		// 	return { month, monthLength };
		// });
		return {
			year,
			rangeValue,
		};
	});
	previusRainyDaysRange = previusRainyDaysRange.map(({ year, rangeValue }) => {
		let resp = rangeValue.map(({ month, lengthConsecutive }) => ({
			year,
			month,
			lengthConsecutive,
		}));

		return resp;
	});

	let consecutiveDaysMean = Array.from(
		d3.rollup(
			previusRainyDaysRange.flat(),
			(d) => d3.mean(d, (v) => v.lengthConsecutive),
			(d) => d.month
		),
		([month, value]) => ({ month, monthMean: value })
	);

	const ToSavePreviusRainyDaysRange = JSON.stringify(previusRainyDaysRange);
	// writeFileSync('previusRainyDaysRange.json', ToSavePreviusRainyDaysRange);

	const previusYearsStatistics = JSON.stringify({
		maxRainyDay,
		rainyDaysMean: statisticsByYears,
		consecutiveMean: consecutiveDaysMean,
	});
	writeFileSync('previusYearsStatistics.json', previusYearsStatistics);
	// Calculate the longest consecutive rainy days
	// let consecutiveLongest = previusRainyDaysRange[0].rangeValue[5].rainyDays;
	// console.log(
	// 	'consecutiveLongest :>> ',
	// 	getConsecutiveDays(consecutiveLongest)
	// );

	//let dayArray = consecutiveLongest[0].data[0].days;
	function getConsecutiveDays(arr) {
		let i = 0;
		//let daysToCheck = [];
		let resp = arr.reduce((stack, currentObj) => {
			let group = stack[i];
			let prevDate = group ? group[group.length - 1] : currentObj;
			let currentDate = currentObj;
			if (differenceInDays(currentDate, prevDate) > 1) {
				i++;
			}
			if (!stack[i]) stack[i] = [];

			stack[i].push(currentDate);

			// console.log(
			// 	'i',
			// 	i,
			// 	'currentDate:',
			// 	currentDate,
			// 	'Group:',
			// 	group,
			// 	'prevDate :>> ',
			// 	prevDate,
			// 	'delta:',
			// 	differenceInDays(currentDate, prevDate) > 1
			// );
			return stack;
		}, []);
		return resp;
	}
	function getMaxConsecutiveDays(arr) {
		const max = d3.max(arr, (d) => d.length);
		const resp = arr.filter((d) => d.length > 1);
		const lengthConsecutive = resp.flat(2).length;
		return {
			maxConsecutiveRainyDays: max,
			lengthConsecutive,
			//consecutiveRainyDays: resp,
		};
	}
	// console.log(
	// 	'test_Consecutive :>> ',
	// 	getMaxConsecutiveDays(getCansecutiveDays(dayArray))
	// );
});
