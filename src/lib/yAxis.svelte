<script>
	import * as d3 from 'd3';

	export let scale, months, x;
	const monthFormat = d3.timeFormat('%b');
</script>

<g class="y-axis">
	{#each months as month}
		<text {x} y={scale(month)}>{monthFormat(month)}</text>
	{/each}
</g>

<style>
	.y-axis {
		fill: currentColor;
	}
</style>
