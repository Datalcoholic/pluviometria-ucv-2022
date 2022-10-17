<script>
	import * as d3 from 'd3';

	export let scale, months, x;
</script>

<g class="y-axis">
	{#each months as month}
		<text {x} y={scale(month)}>{month}</text>
	{/each}
</g>

<style>
	.y-axis {
		fill: currentColor;
	}
</style>
