<script>
	export let month, i, pathRect, tx, ty, pathTriangle, rectWidth;
	let areaRef;
	let triangleRef;
	let labelRef;
	$: console.log('triangleRef :>> ', triangleRef?.getBBox());
</script>

<g class="marker-2022">
	<path
		bind:this={areaRef}
		class="area"
		d={pathRect}
		fill="none"
		stroke="var(--sandy-brown-2)"
		style="translate:{tx}px 
      {ty}px"
	/>

	<path
		bind:this={triangleRef}
		class="triangle"
		d={pathTriangle}
		stroke="var(--sandy-brown-2)"
		fill="none"
		style="translate:{tx}px 
      {-rectWidth / 5}px"
	/>
	<text
		bind:this={labelRef}
		class="label"
		x={tx + triangleRef?.getBBox().x + triangleRef?.getBBox().width + 10}
		y={triangleRef?.getBBox().y + triangleRef?.getBBox().height / 2}
		fill="none"
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

<style>
	.marker-2022 {
		stroke-width: 2px;
	}
	.label {
		font-size: 1rem;
		font-weight: 400;
		stroke: var(--sandy-brown-2);
		/* fill: var(--sandy-brown-2); */
		stroke-width: 1px;
	}
	.label-dias {
		font-size: 0.98rem;
		fill: var(--sandy-brown-2);
	}
</style>
