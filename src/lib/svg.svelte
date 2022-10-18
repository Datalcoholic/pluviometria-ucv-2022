<script>
	export let width, height;
</script>

<svg {width} {height}>
	<slot />
</svg>

<!-- markup (zero or more items) goes here -->
<style>
	svg {
		/* background-color: #d3d3d3; */
	}
</style>
