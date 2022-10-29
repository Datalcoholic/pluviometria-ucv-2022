<script>
	import * as d3 from 'd3';
	export let data, isVisible;

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

<path
	d={areaPath(0, 500, 50, 8)}
	fill="none"
	stroke="coral"
	style="translate:250px 150px"
/>

<style>
	/* your styles go here */
</style>
