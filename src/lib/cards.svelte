<script>
	export let text;
</script>

<div class="card {text.name}">
	<p>{text.text}</p>
</div>

<style>
	.card {
		background-color: var(--black-coral-1);
		line-height: 1.5rem;
		font-size: 1.25rem;
		width: 55ch;
		padding: 0.8em;
		margin: 2em 0;
		border-radius: 8px;
	}
</style>
