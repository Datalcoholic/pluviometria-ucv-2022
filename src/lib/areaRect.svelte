<script>
	import * as d3 from 'd3';
	import { scale } from 'svelte/transition';
	import PrevDaysMarker from './prevDaysMarker.svelte';
	import RainyDaysMarker from './rainyDaysMarker.svelte';
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

	function areaPath(start, end, height, r) {
		const width = end - start;
		const path = d3.path();
		const x = 0;
		const y = 0;
		path.moveTo(x + width / 2, y);
		path.lineTo(width - width / 2, y);
		path.arcTo(width, y, width, height, r);
		path.lineTo(width, height / 2);
		path.arcTo(width, height, width / 2, height, r);
		path.lineTo(x + width / 2, height);
		path.arcTo(x, height, x, height / 2, r);
		path.lineTo(x, height / 2);
		path.arcTo(x, y, x + height / 2, y, r);
		path.closePath();
		return path.toString();
	}
	function triangle(start, end, y, tWidth, height, r) {
		const width = end - start;
		const path = d3.path();
		const gap = 10;
		const x = gap + width;
		//const y = 0;
		path.moveTo(x, y + height * 0.5);
		path.lineTo(x, y + height * 0.5);
		path.arcTo(x, y + height, x + tWidth * 0.7, y + height - height / 2, r);
		path.lineTo(x + tWidth * 0.65, y + height * 0.65);
		path.arcTo(
			x + tWidth,
			y + height * 0.5,
			x + tWidth * 0.05,
			y + height * 0.05,
			r
		);
		path.lineTo(x + tWidth * 0.3, y + height * 0.15);
		path.arcTo(x, y, x, y + height * 0.35, r);
		path.lineTo(x, y + height * 0.4);
		path.closePath();

		return path.toString();
	}
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
