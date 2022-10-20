<script>
	import * as d3 from 'd3';
	import { flip } from 'svelte/animate';

	export let monthScale, dayScale, fillScale, sizeScale, days, format;
	const dayFormat = d3.timeFormat('%e');
	const w = 10;
	const h = 25;
	const r = 2.5;
</script>

<g class="rects">
	{#each days as day, i (`${i}_${day.day}`)}
		<rect
			x={dayScale(day.indexDay) - sizeScale(day.mm) / 2}
			y={monthScale(format(day.date)) - sizeScale(day.mm) / 2}
			width={sizeScale(day.mm)}
			height={sizeScale(day.mm)}
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
	}
</style>
