<script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	export let rectCenter, generator, x, y, date, mm, stroke;

	const labelFormatDate = d3.timeFormat('%d de %b del %Y');
	let arcRef;
	let dateTextRef;
	let labelRef;

	onMount(() => {
		const arcs = Array.from(
			labelRef.querySelectorAll(['path', '.date', '.mm'])
		);
		const tl = gsap.timeline();

		tl.fromTo(
			arcs[0],
			{
				strokeDashoffset: '0',
				strokeDasharray: '0 100',
			},
			{
				keyframes: {
					'100%': { strokeDasharray: '100 0', strokeDashoffset: 0 },
				},
			}
		)
			.from(arcs[1], { y: -10, opacity: 0 })
			.from(arcs[2], { y: -10, opacity: 0 }, '+=0.02');

		console.log('arcs :>> ', arcs);
	});
</script>

<g class="label" bind:this={labelRef}>
	<path
		bind:this={arcRef}
		d={generator()}
		fill="none"
		style="translate:{x + rectCenter - 1.5}px {y - rectCenter}px"
		{stroke}
	/>
	<text
		class="date"
		bind:this={dateTextRef}
		x={arcRef?.getBBox().width + x + 15}
		y={y - arcRef?.getBBox().height}
		fill={stroke}
	>
		{labelFormatDate(date)}
	</text>
	<text
		class="mm"
		x={arcRef?.getBBox().width + x + 15}
		y={dateTextRef?.getBBox().height - arcRef?.getBBox().height + y + 8}
		fill={stroke}
	>
		{`${mm} mm`}
	</text>
</g>

<style>
	path {
		stroke-width: 1.5px;
	}
	.date {
		font-size: 0.95rem;
		font-weight: 300;
	}
	.mm {
		font-size: 1.2rem;
		font-weight: 700;
	}
	.label:has(text) {
		stroke: var(--black-coral);
		stroke-width: 3px;
		paint-order: stroke;
	}
</style>
