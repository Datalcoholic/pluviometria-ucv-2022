<script>
	export let scale, days, y;
</script>

<g class="x-axis">
	{#each days as day}
		<text x={scale(day)} {y}>{day}</text>
	{/each}
</g>

<style>
	.x-axis {
		fill: currentColor;
		text-anchor: middle;
		font-weight: var(--axis-labels-font-weight);
		font-size: 0.9rem;
	}
</style>
