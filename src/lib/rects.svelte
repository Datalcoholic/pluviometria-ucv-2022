<script>
	import * as d3 from 'd3';
	export let monthScale, dayScale, fillScale, days, format;
	const dayFormat = d3.timeFormat('%e');
	const w = 10;
	const h = 20;
	const r = 4.5;
</script>

<g class="rects">
	{#each days as day}
		<rect
			x={dayScale(+dayFormat(day.date)) - w / 2}
			y={monthScale(format(day.date)) - h / 2}
			width={w}
			height={h}
			rx={r}
			fill={day.mm !== 0 ? fillScale(day.mm) : 'var(--black-coral)'}
			>{dayFormat(day.date)}
		</rect>
	{/each}
</g>

<style>
	.rects {
		stroke: var(--black-coral-1);
		stroke-width: 2px;
		paint-order: stroke;
		alignment-baseline: central;
	}
</style>
