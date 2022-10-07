<script>
	import Svg from './svg.svelte';
	import { svgContainerSize } from '../stores/appStores';
	$: width = $svgContainerSize?.width;
	$: height = $svgContainerSize?.height;
</script>

<Svg {width} {height}>
	<!-- test -->
</Svg>

<!-- markup (zero or more items) goes here -->
<style>
</style>
