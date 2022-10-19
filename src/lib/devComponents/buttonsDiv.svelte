<script>
	export let onclick;
</script>

<section class="buttons-container">
	<button on:click={onclick.getRainyDays}>Rainy Days</button>
	<button on:click={onclick.getconsecutiveRainyDays}>Cons Rainy Days</button>
</section>

<style>
	.buttons-container {
		display: flex;
	}
</style>
