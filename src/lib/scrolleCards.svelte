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
			text: 'Los dias que se registaron mayor candidad de lluvias se fueron el 22 de Abril, 26 de Agosto y 26 de Septiembre ',
		},
		{
			name: 'card-3',
			text: 'En contraste los dias con mayor cantidad de lluvia registrados historicamente fueron el 17 de Noviembre de 2008, 22 de Octubre de 1994 y el 2 de Septiembre de 2020',
		},

		{
			name: 'card-4',
			text: 'Para este 2022 tenemos que Agosto fue el mes con mas dias lluvioso con 1,6 veces sobre el promedio historico, seguido por Junio con 1,4 veces sobre el promedio y Septiembre con 1,4 veces sobre el promedio. Destaca Marzo el cual registro 2 veces mas dias lluviosos sobre el promedio',
		},
		{
			name: 'card-5',
			text: 'No solo los dias de lluvias y la cantidad de la misma son factores a tomar en cuenta, tambien se toman los dias consecutivos de lluvias, ya que a mas dias consecutivos lloviendo mayor es la propencion de los suelos a saturarse. Este añp el mes con mayor dias continuos de lluvias fue Agosto con 7 dias',
		},
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
		height: 3500px;
		/* outline: solid turquoise; */
		/* position: absolute; */
		display: flex;
		flex-direction: column;
		align-items: center;
		/* gap: 2.5em; */
		padding-top: 10em;
		z-index: 25;
	}
</style>
