<script>
	import * as d3 from 'd3';
	import { flip } from 'svelte/animate';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import { elasticIn, elasticOut } from 'svelte/easing';
	import gsap from 'gsap';

	export let monthScale, dayScale, fillScale, sizeScale, days, format;
	const dayFormat = d3.timeFormat('%e');
	const w = 10;
	const h = 25;
	const r = 2.2;

	$: console.log('days :>> ', days);
	function theScale(node, { delay = 0, duration = 400, easing = elasticIn }) {
		return {
			delay,
			duration,
			css: (t) => {
				const eased = easing(t);
				return `scale:${eased}`;
			},
		};
	}
</script>

<g class="rects">
	{#each days as day, i (`${day.year}_${day.month}_${day.day}`)}
		<rect
			x={dayScale(day.indexDay) - sizeScale(day.mm) / 2}
			y={monthScale(format(day.date)) - sizeScale(day.mm) / 2}
			width={sizeScale(day.mm)}
			height={sizeScale(day.mm)}
			rx={r}
			fill={day.mm !== 0 ? fillScale(day.mm) : 'var(--black-coral)'}
			stroke={d3.hsl(fillScale(day.mm)).darker(2)}
			in:fly={{ duration: 800, delay: i * 10, y: -15, easing: elasticOut }}
			out:fade|local={{ duration: 200 }}
			animate:flip={{ duration: 850, easing: elasticOut }}
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
