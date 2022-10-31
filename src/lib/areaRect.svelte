<script>
	import * as d3 from 'd3';
	import RainyDaysMarker from './rainyDaysMarker.svelte';
	export let data, monthScale, dayScale, format;

	const dataArea = data.map((month, i) => {
		const min = d3.min(month, (d) => d.indexDay);
		const max = d3.max(month, (d) => d.indexDay);
		const length = d3.count(month, (d) => d.indexDay);
		const date = d3.min(month, (d) => d.date);
		const m = format(date);

		return {
			min,
			max,
			length,
			month: i + 1,
			m,
		};
	});

	let rectWidth = 30;

	function areaPath(start, end, height, r) {
		const width = end - start + 30;
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
		const width = end - start + 30;
		const path = d3.path();
		const gap = 14;
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

	// TODO:

	// Completar la animacion de entreda con el borde + triangulo indicador +etiqueta
</script>

<g class="area">
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
			tx={dayScale(1) - 15}
			ty={monthScale(month.m) - rectWidth / 2}
			{rectWidth}
		/>
	{/each}
</g>

<style>
</style>
