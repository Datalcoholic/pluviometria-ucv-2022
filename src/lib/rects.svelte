<script>
	import * as d3 from 'd3';
	export let monthScale, dayScale, fillScale, days, format;
	const dayFormat = d3.timeFormat('%e');
	const w = 10;
	const h = 30;
	const r = 5;
</script>

<g class="rects">
	{#each days as day}
		<rect
			x={dayScale(+dayFormat(day.date))}
			y={monthScale(format(day.date))}
			width={w}
			height={h}
			rx={r}
			fill={day.mm !== 0 ? fillScale(day.mm) : 'none'}
			>{dayFormat(day.date)}
		</rect>
	{/each}
</g>

<style>
	.rects {
		stroke: var(--black-coral-1);
		stroke-width: 0.5px;
	}
</style>
