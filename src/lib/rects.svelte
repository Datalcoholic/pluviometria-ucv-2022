<script>
	import * as d3 from 'd3';
	import { flip } from 'svelte/animate';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import { elasticIn, elasticOut } from 'svelte/easing';
	import gsap from 'gsap';
	import Annotations from './annotations.svelte';

	export let monthScale,
		dayScale,
		fillScale,
		sizeScale,
		days,
		format,
		isTop,
		topDays,
		isAnnotation;

	const [top1, top2, top3] = topDays.map((d) => d.date);
	//$: console.log('isTop :>> ', isTop, top1, top2, top3);
	const dayFormat = d3.timeFormat('%e');
	const w = 10;
	const h = 25;
	const r = 2.2;

	// $: console.log('days :>> ', days);
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

	function pathGenerator(params) {
		const path = d3.path();
		path.moveTo(0, 0);
		path.arcTo(0, -65, 150, -60, 50);
		//path.lineTo(200, -80);
		return path.toString();
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
			fill={(isTop && day.date === top1) ||
			(isTop && day.date === top2) ||
			(isTop && day.date === top3)
				? fillScale(day.mm)
				: isTop
				? d3.hsl(fillScale(day.mm)).copy({ opacity: 0.4 })
				: fillScale(day.mm)}
			stroke={d3.hsl(fillScale(day.mm)).darker(2)}
			in:fly={{ duration: 800, delay: i * 10, y: -15, easing: elasticOut }}
			out:fade|local={{ duration: 200 }}
			animate:flip={{ duration: 850, easing: elasticOut }}
			>{dayFormat(day.date)}
		</rect>
	{/each}

	{#if isAnnotation}
		<g class="labels" />
		{#each topDays as top}
			<Annotations
				rectCenter={sizeScale(top.mm) / 2}
				x={dayScale(top.indexDay)}
				y={monthScale(format(top.date))}
				date={top.date}
				mm={top.mm}
				generator={pathGenerator}
				stroke={top.year === 2022 ? 'var(--sandy-brown)' : 'var(--orange-soda)'}
			/>
		{/each}
	{/if}
</g>

<style>
	.rects {
		stroke: var(--black-coral-1);
		stroke-width: 2px;
		paint-order: stroke;
	}
</style>
