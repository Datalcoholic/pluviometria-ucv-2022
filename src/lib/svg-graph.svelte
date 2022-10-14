<script>
	import Svg from './svg.svelte';
	import { svgContainerSize } from '../stores/appStores';
	import { year2022 } from '../stores/dataStore';
	$: width = $svgContainerSize?.width;
	$: height = $svgContainerSize?.height;

	$: console.log('year2022 :>> ', $year2022);
</script>

<Svg {width} {height}>
	<!-- test -->
</Svg>

<!-- markup (zero or more items) goes here -->
<style>
</style>
