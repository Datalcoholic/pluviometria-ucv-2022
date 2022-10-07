<script>
	import SvgGraph from './lib/svg-graph.svelte';
</script>

<main class="main">
	<h1>Title</h1>
	<article class="svg-container">
		<SvgGraph />
	</article>
</main>

<style>
	.main {
		display: grid;
		justify-content: center;
		align-items: center;
	}
	.svg-container {
		width: 800px;
		height: 900px;
		outline: solid tomato;
	}
</style>
