<script>
	import * as d3 from 'd3';
	import { scale } from 'svelte/transition';
	import PrevDaysMarker from './prevDaysMarker.svelte';
	import RainyDaysMarker from './rainyDaysMarker.svelte';
	import { areaPath, triangle } from '../Utilities/utils';
	export let data, data2, monthScale, dayScale, meanScale, format;
	const numFormat = d3.format('.1f');
	const dataArea = data.map((month, i) => {
		const min = d3.min(month, (d) => d.indexDay);
		const max = d3.max(month, (d) => d.indexDay);
		const length = d3.count(month, (d) => d.indexDay);
		const date = d3.min(month, (d) => d.date);
		const m = format(date);
		const isShow = length > data2[i].monthMean ? true : false;
		const howManyTimes = numFormat(length / data2[i].monthMean);

		return {
			min,
			max,
			length,
			month: i + 1,
			m,
			isShow,
			howManyTimes,
		};
	});
	console.log('dataArea :>> ', dataArea);

	const dataMean = data2.map((d, i) => {
		let { month, monthMean } = d;
		month = format(new Date(`2022-${month}-1`));
		const isShow = monthMean > dataArea[i].length ? true : false;

		return { m: month, mean: monthMean, isShow };
	});

	let rectWidth = 30;
	let rectWidthPreV = 40;
</script>

<g class="area">
	<g id="prev-years">
		{#each dataMean as month, i}
			<PrevDaysMarker
				{month}
				{i}
				pathRect={areaPath(dayScale(1), dayScale(month.mean), rectWidthPreV, 8)}
				pathTriangle={triangle(
					0,
					dayScale(month.mean),
					monthScale(month.m),
					20,
					15,
					2
				)}
				tx={dayScale(1)}
				ty={monthScale(month.m) - rectWidthPreV / 2}
				rectWidth={rectWidthPreV}
			/>
		{/each}
	</g>

	<g id="current-year">
		{#each dataArea as month, i}
			<RainyDaysMarker
				{month}
				{i}
				pathRect={areaPath(
					dayScale(month.min),
					dayScale(month.max),
					rectWidth,
					8
				)}
				pathTriangle={triangle(
					dayScale(month.min),
					dayScale(month.max),
					monthScale(month.m),
					20,
					15,
					2
				)}
				tx={dayScale(1)}
				ty={monthScale(month.m) - rectWidth / 2}
				{rectWidth}
			/>
		{/each}
	</g>
</g>

<style>
</style>
