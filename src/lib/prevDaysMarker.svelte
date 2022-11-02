<script>
	import { easeQuadIn } from 'd3';
	import * as d3 from 'd3';
	import gsap from 'gsap';
	export let month, i, pathRect, tx, ty, pathTriangle, rectWidth;
	let triangleRef;
	let labelRef;
	const formatMean = d3.format('.1f');

	function enter(node, { delay = 0 }) {
		const [area, triangle, label] = node.querySelectorAll([
			'.area',
			'.triangle',
			'.label',
			'label-dias',
		]);

		const tl = gsap.timeline({ ease: 'expo.in' });

		tl.from(area, { scaleX: 0 }, '+=0.8')
			.from(triangle, {
				x: -2,
				opacity: 0,
			})
			.from(label, {
				x: -8,
				opacity: 0,
			})
			.delay(delay);

		return {
			delay,
		};
	}
</script>

<defs />

<g class="marker-prev" in:enter={{ delay: i * 0.3 }}>
	<path
		class="area"
		d={pathRect}
		fill="url(#line-pattern)"
		stroke={month.isShow ? 'var(--indigo-dye-4)' : 'var(--indigo-dye-3)'}
		style="translate:{tx}px 
      {ty}px"
	/>
	{#if month.isShow}
		<!-- content here -->
		<path
			bind:this={triangleRef}
			class="triangle"
			d={pathTriangle}
			stroke="var(--indigo-dye-4)"
			fill="none"
			style="translate:{0}px 
			 {-rectWidth / 5}px"
		/>
		<g class="label">
			<text
				bind:this={labelRef}
				class="label-text"
				x={triangleRef?.getBBox().x + triangleRef?.getBBox().width + 10}
				y={triangleRef?.getBBox().y + triangleRef?.getBBox().height / 2}
				fill="none"
			>
				{formatMean(month.mean)}
			</text>

			<text
				class="label-dias"
				x={labelRef?.getBBox().x + labelRef?.getBBox().width + 8}
				y={triangleRef?.getBBox().y + triangleRef?.getBBox().height / 2}
				fill="none">dias</text
			>
		</g>
	{/if}
</g>

<style>
	.marker-prev {
		stroke-width: 1px;
	}
	.label-text {
		font-size: 0.9rem;
		font-weight: 400;
		stroke: var(--indigo-dye-4);
		/* fill: var(--indigo-dye-4); */
		stroke-width: 1px;
	}
	.label-dias {
		font-size: 0.88rem;
		fill: var(--indigo-dye-4);
	}
</style>
