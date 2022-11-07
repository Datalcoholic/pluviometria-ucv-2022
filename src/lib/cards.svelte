<script>
	export let cardsRef;
</script>

<div class="card card-1" bind:this={cardsRef[0]}>
	<p>
		Para este <strong class="this-year">2022</strong> las lluvias en Caracas se han
		distribuido de la siguiente manera:
	</p>
</div>
<div class="card card-2" bind:this={cardsRef[1]}>
	<p>
		Los días que se registraron mayor cantidad de lluvias se fueron el
		<strong class="this-year"> 22 de Abril </strong>,
		<strong class="this-year"> 26 de Agosto </strong> y
		<strong class="this-year"> 26 de Septiembre </strong>
	</p>
</div>
<div class="card card-3" bind:this={cardsRef[2]}>
	<p>
		En contraste los días con la mayor cantidad de lluvia registrados
		históricamente fueron el
		<strong class="prev-year"> 17 de Noviembre de 2008 </strong>,
		<strong class="prev-year"> 22 de Octubre de 1994 </strong> y el
		<strong class="prev-year"> 2 de Septiembre de 2020 </strong>
	</p>
</div>
<div class="card card-4" bind:this={cardsRef[3]}>
	<p>
		Para este
		<strong class="this-year"> 2022 </strong> tenemos que
		<strong class="this-year"> Agosto </strong> fue el mes con más días
		lluviosos con
		<strong class="this-year"> 1,6 </strong>
		veces sobre el
		<strong class="prev-year"> promedio </strong> histórico, seguido por
		<strong class="this-year"> Junio </strong> con
		<strong class="this-year"> 1,4 </strong> veces sobre el
		<strong class="prev-year"> promedio </strong> y
		<strong class="this-year"> Septiembre </strong> con
		<strong class="this-year"> 1,4 </strong> veces sobre el
		<strong class="prev-year"> promedio </strong>. Destaca
		<strong class="this-year"> Marzo </strong> el cual registró
		<strong class="this-year"> 2 </strong> veces más días lluviosos sobre el
		<strong class="prev-year"> promedio </strong>
	</p>
</div>
<div class="card card-5" bind:this={cardsRef[4]}>
	<p>
		No solo los días de lluvias y la cantidad de la misma son factores a tomar
		en cuenta, también se toman los días consecutivos de lluvias, ya que a más
		días consecutivos lloviendo mayor es la propensión de los suelos a
		saturarse. Este año el mes con mayor días continuos de lluvias fue <strong
			class="this-year"
		>
			Agosto
		</strong>
		con <strong class="this-year"> 7 </strong> días
	</p>
</div>

<style>
	/* .card {
		background-color: var(--black-coral-2);
		border: solid 1.7px var(--black-coral-1);
		border-radius: 6px;
		line-height: 1.7rem;
		font-size: 1.18rem;
		font-weight: 200;
		width: 40ch;
		padding: 0.8em;
		margin: 20em 0 0em;
		opacity: 0;
	} */
	.this-year {
		color: var(--sandy-brown-2);
	}
	.prev-year {
		color: var(--indigo-dye-4);
	}
</style>
