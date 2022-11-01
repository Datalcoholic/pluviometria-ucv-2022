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
		topDays, // days to labels
		isAnnotation;

	export let period = 2022;

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
</script>

<g class="rects">
	<defs>
		<pattern id="line" viewBox="0, 0 ,60 ,18" width="60%" height="18%">
			<line
				class="pattern-line"
				x1="0"
				y1="0"
				x2="200"
				y2="0"
				stroke="var(--indigo-dye-3)"
			/>
			<!-- <polygon points="0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2" /> -->
		</pattern>
		<pattern
			id="line-pattern"
			viewBox="1000, 0 ,60 ,18"
			width="100%"
			height="16%"
		>
			<line
				class="pattern-line"
				x1="0"
				y1="0"
				x2="2500"
				y2="0"
				stroke="var(--indigo-dye-5)"
			/>

			<!-- <polygon points="0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2" /> -->
		</pattern>
	</defs>

	{#if period === 2022}
		{#each days as day, i (`${day.year}_${day.month}_${day.day}`)}
			<rect
				x={dayScale(day.indexDay) - sizeScale(day.mm) / 2}
				y={monthScale(format(day.date)) - sizeScale(day.mm) / 2}
				width={sizeScale(day.mm)}
				height={sizeScale(day.mm)}
				rx={r}
				fill={(isAnnotation && day.date === top1) ||
				(isAnnotation && day.date === top2) ||
				(isAnnotation && day.date === top3)
					? fillScale(day.mm)
					: isAnnotation
					? d3.hsl(fillScale(day.mm)).copy({ opacity: 0.4 })
					: fillScale(day.mm)}
				stroke={(isAnnotation && day.date === top1) ||
				(isAnnotation && day.date === top2) ||
				(isAnnotation && day.date === top3)
					? 'var(--sandy-brown-2)'
					: isAnnotation
					? d3.hsl(fillScale(day.mm)).copy({ opacity: 0.4 }).darker(2)
					: d3.hsl(fillScale(day.mm)).darker(2)}
				in:fly={{ duration: 800, delay: i * 10, y: -15, easing: elasticOut }}
				out:fade|local={{ duration: 200 }}
				animate:flip={{ duration: 850, easing: elasticOut }}
				>{dayFormat(day.date)}
			</rect>
		{/each}
		{#if isAnnotation}
			<g class="labels" />
			{#each topDays as top, i}
				<Annotations
					rectCenter={sizeScale(top.mm) / 2}
					x={dayScale(top.indexDay)}
					y={monthScale(format(top.date))}
					date={top.date}
					mm={top.mm}
					position={top.position}
					stroke={'var(--sandy-brown-2)'}
					{i}
				/>
			{/each}
		{/if}
	{:else}
		{#each days as day, i (`${day.year}_${day.month}_${day.day}`)}
			<rect
				x={dayScale(day.indexDay) - sizeScale(day.mm) / 2}
				y={monthScale(format(day.date)) - sizeScale(day.mm) / 2}
				width={sizeScale(day.mm)}
				height={sizeScale(day.mm)}
				rx={r}
				fill="url(#line)"
				stroke="var(--indigo-dye-4)"
				in:fly={{ duration: 800, delay: i * 10, y: -15, easing: elasticOut }}
				out:fade|local={{ duration: 200 }}
				animate:flip={{ duration: 850, easing: elasticOut }}
				>{dayFormat(day.date)}
			</rect>
		{/each}
		{#if isAnnotation}
			<g class="labels" />
			{#each topDays as top, i}
				<Annotations
					rectCenter={sizeScale(top.mm) / 2}
					x={dayScale(top.indexDay)}
					y={monthScale(format(top.date))}
					date={top.date}
					mm={top.mm}
					position={top.position}
					stroke={'var(--indigo-dye-4)'}
					{i}
				/>
			{/each}
		{/if}
	{/if}
</g>

<style>
	.rects {
		stroke: var(--black-coral-1);
		stroke-width: 2px;
		paint-order: stroke;
	}
	#line {
		transform: rotate(45deg);
	}
	#line-pattern {
		transform: rotate(45deg);
	}
	.pattern-line {
		stroke-width: 16px;
	}
</style>
