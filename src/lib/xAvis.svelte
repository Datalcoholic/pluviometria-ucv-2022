<script>
	export let scale, days, y;
</script>

<g class="x-axis">
	{#each days as day}
		<text x={scale(day)} {y}>{day}</text>
	{/each}
</g>

<!-- markup (zero or more items) goes here -->
<style>
	.x-axis {
		fill: currentColor;
	}
</style>
