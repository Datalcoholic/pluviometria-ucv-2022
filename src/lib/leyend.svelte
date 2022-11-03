<script>
	import * as d3 from 'd3';
	export let range, fill, size;
	const rectRange = d3.range(range[0], 120, 20).map((d) => {
		return {
			value: d,
			size: size(d),
			fill: fill(d),
		};
	});
	const numFormat = d3.format('.0f');
</script>

<g class="leyend">
	{#each rectRange as r, i}
		<rect
			x={r.size * 2 + i * r.size * 1}
			y={40 - r.size}
			width={r.size}
			height={r.size}
			fill={r.fill}
			rx={2.2}
		/>
		<text x={r.size * 2 + i * r.size * 1 + r.size / 2} y={55}
			>{numFormat(r.value)}mm</text
		>
	{/each}
</g>

<style>
	text {
		fill: var(--white-coral-1);
		font-size: 0.8rem;
		text-anchor: middle;
	}
	.leyend {
		translate: 68% 0;
	}
</style>
