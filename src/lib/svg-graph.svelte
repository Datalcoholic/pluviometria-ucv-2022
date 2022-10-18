<script>
	import Svg from './svg.svelte';
	import { startOfMonth } from 'date-fns';
	import { svgContainerSize, localeEs } from '../stores/appStores';
	import { year2022 } from '../stores/dataStore';
	import * as d3 from 'd3';
	import YAxis from './yAxis.svelte';
	import XAvis from './xAxis.svelte';
	import Rects from './rects.svelte';

	d3.timeFormatDefaultLocale($localeEs);
	d3.formatDefaultLocale($localeEs);

	$: width = $svgContainerSize?.width < 600 ? 660 : $svgContainerSize?.width;
	$: height = $svgContainerSize?.height;

	//Palette
	const palette = {
		indigoDye1: 'hsl(203, 77%, 67%)',
		indigoDye2: 'hsl(203, 77%, 16%)',
		blackcoral1: 'hsla(213, 23%, 42%, 1)',
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
	const rangeDays = d3.range(1, 32, 1);
	$: dayScale = d3
		.scaleBand()
		.domain(rangeDays)
		.paddingInner(-1)
		.paddingOuter(0.8)
		.range([margin.right + 45, width - margin.left - margin.right]);
	//Month
	const monthFormat = d3.timeFormat('%b');
	const months = rainData2022.map((d) => {
		const firstDateOfTheMonth = d[0].date;
		return monthFormat(startOfMonth(firstDateOfTheMonth));
	});

	$: monthScale = d3
		.scaleBand()
		.domain(months)
		.paddingOuter(1)
		.paddingInner(1)
		.range([margin.top, height]);

	//Fill
	const mm = rainData2022.flat(1).map((m) => m.mm);
	const mmExtend = d3.extent(mm);
	const fillScale = d3
		.scaleLinear()
		.domain(mmExtend)
		.range([palette.indigoDye2, palette.indigoDye1])
		.interpolate(d3.interpolateHsl);
</script>

<Svg {width} {height}>
	<YAxis scale={monthScale} {months} x={margin.right} />
	<XAvis scale={dayScale} days={rangeDays} y={margin.top} />
	<Rects
		{monthScale}
		{dayScale}
		{fillScale}
		days={rainData2022.flat(1)}
		format={monthFormat}
	/>
</Svg>

<style>
</style>
