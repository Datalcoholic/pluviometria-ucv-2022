<script>
	import Svg from './svg.svelte';
	import { svgContainerSize } from '../stores/appStores';
	import { year2022 } from '../stores/dataStore';
	import * as d3 from 'd3';
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

	// Scales
	//Days
	const dayScale = d3.scaleLinear().domain([1, 31]).range([0, width]);
	//Month
	const monthScale = d3
		.scaleBand()
		.domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
		.range([height, 0]);
	//Fill
	const mm = rainData2022.flat(1).map((m) => m.mm);
	const mmExtend = d3.extent(mm);
	const fillScale = d3
		.scaleSequential(
			d3.interpolateRgbBasis([palette.indigoDye2, palette.indigoDye1])
		)
		.domain(mmExtend);
	console.log('year2022 :>> ', $year2022);
</script>

<Svg {width} {height}>
	<!-- test -->
</Svg>

<!-- markup (zero or more items) goes here -->
<style>
</style>
