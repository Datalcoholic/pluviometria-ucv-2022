<script>
	import { onMount } from 'svelte';
	import { svgContainerSize } from './stores/appStores';
	import SvgGraph from './lib/svg-graph.svelte';
	import ScrolleCards from './lib/scrolleCards.svelte';

	let containerRef;
	// let containerSize;
	$: console.log('containerSize :>> ', $svgContainerSize);

	onMount(() => {
		const resizeObserver = new ResizeObserver((entries) => {
			const entry = entries.at(0);
			// containerSize = {
			// 	...containerSize,
			// 	width: entry.contentRect.width,
			// 	height: entry.contentRect.height,
			// };
			svgContainerSize.set({
				width: entry.contentRect.width,
				height: entry.contentRect.height,
			});
		});

		resizeObserver.observe(containerRef);
		return () => resizeObserver.unobserve(containerRef);
	});
</script>

<main class="main">
	<article class="main-container">
		<h1>Title</h1>
		<section class="svg-container" bind:this={containerRef}>
			<SvgGraph />
		</section>
		<ScrolleCards />
	</article>
</main>

<style>
	.main {
		display: grid;
		justify-items: center;
		align-items: center;
	}

	.main-container {
		/* position: relative; */
		outline: solid tomato;
		top: 60px;
		height: 200%;
		display: grid;
		justify-items: center;
	}
	.svg-container {
		width: clamp(600px, 70vw, 900px);
		height: 700px;
		position: sticky;
		top: 0px;
	}
</style>
