<script>
	import gsap from 'gsap';
	export let month, i, pathRect, tx, ty, pathTriangle, rectWidth;
	let triangleRef;
	let labelRef;
	function enter(node, { delay = 0 }) {
		const [area, triangle, label] = node.querySelectorAll([
			'.area',
			'.triangle',
			'.label',
			'label-dias',
		]);

		const tl = gsap.timeline({
			ease: 'expo.in',
			transformOrigin: 'left center',
		});

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

{#if month.length > 1}
	<g class="marker-2022" in:enter={{ delay: i * 0.08 }}>
		<path
			class="area"
			d={pathRect}
			fill={month.isShow ? 'var(--sandy-brown-3)' : 'none'}
			stroke="var(--sandy-brown-2)"
			style="translate:{tx}px 
      {ty}px"
		/>
		{#if month.isShow}
			<path
				bind:this={triangleRef}
				class="triangle"
				d={pathTriangle}
				stroke="var(--sandy-brown-2)"
				fill="none"
				style="translate:{tx}px 
      {-rectWidth / 5}px"
			/>
			<g class="label">
				<text
					bind:this={labelRef}
					class="label-text"
					x={tx + triangleRef?.getBBox().x + triangleRef?.getBBox().width + 10}
					y={triangleRef?.getBBox().y + triangleRef?.getBBox().height / 2}
					fill="var(--sandy-brown-2)"
					stroke="var(--orange-soda)"
				>
					{month.length}
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
{/if}

<style>
	.marker-2022 {
		stroke-width: 1px;
	}
	.area {
		transform-origin: left center;
	}
	.label-text {
		font-size: 1.5rem;
		font-weight: 400;
		stroke: var(--orange-soda);
		/* fill: var(--sandy-brown-2); */
		stroke-width: 1px;
		paint-order: stroke;
	}
	.label-dias {
		font-size: 0.98rem;
		fill: var(--sandy-brown-2);
	}
</style>
