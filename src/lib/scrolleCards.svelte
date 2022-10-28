<script>
	import Cards from './cards.svelte';
	import { cardsStored } from '../stores/appStores';

	// CARDS
	const cards = [
		{
			name: 'card-1',
			text: 'Para este 2022 las lluvias en Caracas se han distribuido de la siguiente manera: ',
		},

		{
			name: 'card-2',
			text: 'Los dias que se registaron mayor candidad de lluvias se produjeron el 22 de Abril, 26 de Agosto y 26 de Septiembre ',
		},
		{
			name: 'card-3',
			text: 'En contraste los dias con mayor cantidad de lluvia registrados historicamente fueron el 17 de Noviembre de 2008, 22 de Octubre de 1994 y el 2 de Septiembre de 2020',
		},

		{
			name: 'card-4',
			text: 'Lo cual pone a mes tal tantas veces por encima/de bajo del promedio de tantos meses',
		},
		{
			name: 'card-5',
			text: 'Pero lo que realmente hay que tomar en cuenta son los días consecutivos de lluvias. Donde tenemos que se produjeron tantos días en mes “este” tantos días en el mes cual y tantos días en este mes.',
		},

		{
			name: 'card-6',
			text: 'Lo cual pone (Estadisticas comparativas respecto a los meses anteriores)',
		},

		{ name: 'card-7', text: 'Distribuidos de la siguiente manera en el mes' },
	];

	let cardsRef = [];
	cardsStored.set(cardsRef);
</script>

<section class="cards-container">
	{#each cards as card, i (card.name)}
		<Cards text={card} {cardsRef} {i} />
	{/each}
</section>

<style>
	.cards-container {
		width: 45vw;
		height: 1500px;
		/* outline: solid turquoise; */
		/* position: absolute; */
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3.5em;
		z-index: 25;
	}
</style>
