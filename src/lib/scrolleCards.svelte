<script>
	import Cards from './cards.svelte';
	import { cardsStored } from '../stores/appStores';

	let cardsRef = [];
	cardsStored.set(cardsRef);
</script>

<section class="cards-container">
	<!-- {#each cards as card, i (card.name)} -->
	<Cards {cardsRef} />
	<!-- {/each} -->
</section>

<style>
	/* .cards-container {
		height: 3500px;
		outline: solid turquoise;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 10em;
		z-index: 25;
	} */
</style>
