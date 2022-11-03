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
		<h1>¿Han estado las lluvias de este 2022 por encima del promedio?</h1>
		<h3>Datos para Caracas</h3>
		<section class="svg-container" bind:this={containerRef}>
			<SvgGraph />
		</section>
	</article>
	<ScrolleCards />
</main>

<style>
	.main {
		display: grid;
		justify-items: center;
		align-items: center;
		position: relative;
	}

	.main-container {
		/* position: relative; */
		outline: solid #ff6347;
		top: 0px;
		height: 100%;
		/* display: grid;
		justify-items: center; */
		position: sticky;
	}
	.main-container > h1 {
		text-transform: uppercase;
		font-weight: 100;
		font-size: 1.35rem;
		margin-bottom: 0.22em;
	}
	.main-container > h3 {
		font-weight: 100;
		margin-top: 0;
	}
	.svg-container {
		width: clamp(600px, 70vw, 1200px);
		height: 750px;
		container-type: inline-size;
		container-name: svg;
	}
</style>
