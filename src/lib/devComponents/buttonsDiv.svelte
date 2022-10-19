<script>
	export let onclick;
</script>

<section class="buttons-container">
	<button on:click={onclick}>Rainy Days</button>
	<button>Cons Rainy Days</button>
</section>

<style>
	.buttons-container {
		display: flex;
	}
</style>
