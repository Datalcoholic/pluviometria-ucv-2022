<script>
	import * as d3 from 'd3';
	export let data, monthScale, dayScale, format;

	const dataArea = data.map((month, i) => {
		const min = d3.min(month, (d) => d.indexDay);
		const max = d3.max(month, (d) => d.indexDay);
		const length = d3.count(month, (d) => d.indexDay);

		return {
			min,
			max,
			length,
			month: i + 1,
		};
	});

	let rectWidth = 30;

	console.log('dataArea :>> ', dataArea);

	function areaPath(start, end, height, r) {
		const width = end - start;
		const path = d3.path();
		const x = 0;
		const y = 0;
		path.moveTo(x + 30, y);
		path.lineTo(width - 30, y);
		path.arcTo(width, y, width, height, r);
		path.lineTo(width, height / 2);
		path.arcTo(width, height, width / 2, height, r);
		path.lineTo(x + width / 2, height);
		path.arcTo(x, height, x, height / 2, r);
		path.lineTo(x, height / 2);
		path.arcTo(x, y, x + 30, y, r);
		path.closePath();
		return path.toString();
	}

	console.log('data :>> ', data);
</script>

{#each dataArea as month}
	<path
		d={areaPath(dayScale(month.min), dayScale(month.max), rectWidth, 8)}
		fill="none"
		stroke="coral"
		style="translate:{0}px {monthScale(
			format(new Date(`2022-${month.month}-01`))
		) -
			rectWidth / 2}px"
	/>
{/each}

<style>
	/* your styles go here */
</style>
