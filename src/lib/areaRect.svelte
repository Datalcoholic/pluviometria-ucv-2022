<script>
	import * as d3 from 'd3';
	export let data, monthScale, dayScale, format, rectMargin;
	console.log('data :>> ', data);

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

	console.log('dataArea :>> ', dataArea);

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
</script>

<g class="area-rect">
	{#each dataArea as month}
		<path
			d={areaPath(dayScale(month.min), dayScale(month.max), rectWidth, 8)}
			fill="none"
			stroke="var(--sandy-brown-2)"
			style="translate:{dayScale(1) - 15}px 
      {monthScale(month.m) - rectWidth / 2}px"
		/>
	{/each}
</g>

<style>
	.area-rect {
		stroke-width: 2px;
	}
</style>
