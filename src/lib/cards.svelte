<script>
	export let text, cardsRef, i;
</script>

<div class="card {text.name}" bind:this={cardsRef[i]}>
	<p>{text.text}</p>
</div>

<style>
	.card {
		background-color: var(--black-coral-2);
		border: solid 1.7px var(--black-coral-1);
		border-radius: 6px;
		line-height: 1.7rem;
		font-size: 1.18rem;
		font-weight: 200;
		width: 40ch;
		padding: 0.8em;
		margin: 15em 0 0em;
		opacity: 0;
	}
</style>
