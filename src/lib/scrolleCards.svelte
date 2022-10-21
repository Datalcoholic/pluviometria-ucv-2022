<script>
	import Cards from './cards.svelte';

	// CARDS
	const cards = [
		{
			name: 'card-1',
			text: 'Esta ha sido la distribución de lluvias hasta la fecha de este 2022',
		},

		{
			name: 'card-2',
			text: 'En la cual tenemos que los meses que presentan la mayor cantidad de  días con lluvias son Junio con un total de “ “ días, Agosto con “ “ días y Septiembre con “ “ días',
		},

		{
			name: 'card-3',
			text: 'Lo cual pone a mes tal tantas veces por encima/de bajo del promedio de tantos meses',
		},
		{
			name: 'card-4',
			text: 'Pero lo que realmente hay que tomar en cuenta son los días consecutivos de lluvias. Donde tenemos que se produjeron tantos días en mes “este” tantos días en el mes cual y tantos días en este mes.',
		},

		{
			name: 'card-5',
			text: 'Lo cual pone (Estadisticas comparativas respecto a los meses anteriores)',
		},

		{ name: 'card-6', text: 'Distribuidos de la siguiente manera en el mes' },
	];
</script>

<section class="cards-container">
	{#each cards as card}
		<Cards text={card} />
	{/each}
</section>

<style>
	.cards-container {
		width: 65vw;
		height: 1500px;
		outline: solid turquoise;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3.5em;
	}
</style>
