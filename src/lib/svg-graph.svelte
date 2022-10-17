<script>
	import Svg from './svg.svelte';
	import { startOfMonth } from 'date-fns';
	import { svgContainerSize, localeEs } from '../stores/appStores';
	import { year2022 } from '../stores/dataStore';
	import * as d3 from 'd3';
	import YAxis from './yAxis.svelte';
	import XAvis from './xAvis.svelte';

	d3.timeFormatDefaultLocale($localeEs);
	d3.formatDefaultLocale($localeEs);

	$: width = $svgContainerSize?.width;
	$: height = $svgContainerSize?.height;

	//Palette
	const palette = {
		indigoDye1: 'hsl(209, 77%, 50%)',
		indigoDye2: 'hsl(209, 77%, 35%)',
	};

	let rainData2022 = $year2022?.map((d) => {
		let data = d.monthlyData;
		data = data.map((d) => {
			let { date, day, month, year, mm } = d;
			return { date: new Date(date), day, month, year, mm };
		});
		return data;
	});
	console.log('rainData2022 :>> ', rainData2022);
	const margin = { top: 35, right: 20, bottom: 15, left: 15 };

	// Scales
	//Days
	const rangeDays = d3.range(1, 31, 1);
	$: dayScale = d3
		.scaleBand()
		.domain(rangeDays)
		.range([margin.right + 45, width - margin.left]);
	//Month
	const months = rainData2022.map((d) => {
		const firstDateOfTheMonth = d[0].date;
		return startOfMonth(firstDateOfTheMonth);
	});
	console.log('months :>> ', months);
	//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	$: monthScale = d3
		.scaleBand()
		.domain(months)
		.range([margin.top, height - margin.bottom]);

	//Fill
	const mm = rainData2022.flat(1).map((m) => m.mm);
	const mmExtend = d3.extent(mm);
	const fillScale = d3
		.scaleSequential(
			d3.interpolateRgbBasis([palette.indigoDye2, palette.indigoDye1])
		)
		.domain(mmExtend);
</script>

<Svg {width} {height}>
	<YAxis scale={monthScale} {months} x={margin.right} />
	<XAvis scale={dayScale} days={rangeDays} y={margin.top} />
</Svg>

<!-- markup (zero or more items) goes here -->
<style>
</style>
