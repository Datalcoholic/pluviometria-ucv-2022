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
			text: 'Los días que se registraron mayor cantidad de lluvias se fueron el 22 de Abril, 26 de Agosto y 26 de Septiembre ',
		},
		{
			name: 'card-3',
			text: 'En contraste los días con la mayor cantidad de lluvia registrados históricamente fueron el 17 de Noviembre de 2008, 22 de Octubre de 1994 y el 2 de Septiembre de 2020',
		},

		{
			name: 'card-4',
			text: 'Para este 2022 tenemos que Agosto fue el mes con más días lluviosos con 1,6 veces sobre el promedio histórico, seguido por Junio con 1,4 veces sobre el promedio y Septiembre con 1,4 veces sobre el promedio. Destaca Marzo el cual registró 2 veces más días lluviosos sobre el promedio',
		},
		{
			name: 'card-5',
			text: 'No solo los días de lluvias y la cantidad de la misma son factores a tomar en cuenta, también se toman los días consecutivos de lluvias, ya que a más días consecutivos lloviendo mayor es la propensión de los suelos a saturarse. Este año el mes con mayor días continuos de lluvias fue Agosto con 7 días',
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
