<script>
	import Svg from './svg.svelte';
	import { svgContainerSize } from '../stores/appStores';
	import { year2022 } from '../stores/dataStore';
	$: width = $svgContainerSize?.width;
	$: height = $svgContainerSize?.height;

	let rainData2022 = $year2022?.map((d) => {
		let data = d.monthlyData;
		data = data.map((d) => {
			let { date, day, month, year, mm } = d;
			return { date: new Date(date), day, month, year, mm };
		});
		return data;
	});
	//console.log('rainData2022 :>> ', rainData2022);
	console.log('year2022 :>> ', $year2022);
</script>

<Svg {width} {height}>
	<!-- test -->
</Svg>

<!-- markup (zero or more items) goes here -->
<style>
</style>
