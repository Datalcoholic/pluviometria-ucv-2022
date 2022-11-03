<section class="footer">
	<h3>Titke</h3>
	<p>
		Datos facilitados por el profesor <strong>Alfredo Gil</strong> Ing. hidrometeorologista
		de la Universidad Central de Venezuela (UCV).
	</p>
	<div class="credits">
		<p>Vizualización:</p>
		<a
			class="contact"
			href="https://www.instagram.com/dataalcoholic"
			target="_blank"
			rel="noopener noreferrer"
		>
			<div class="icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 50 50"
					width="40px"
					height="40px"
					><path
						d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"
					/></svg
				>
			</div>
			<strong>@DataAlcoholic</strong>
		</a>
	</div>
</section>

<style>
	.footer {
		display: grid;
		justify-items: start;
		width: 60ch;
		font-size: 1.085rem;
		margin: 1.5em 0 0em;
	}

	.credits > p,
	.contact {
		margin: 0.5em 0 0;
	}
	.credits {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}
	.contact {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.3em;
		font-size: 1.2rem;
		color: inherit;
		text-decoration: none;
		transition: scale 0.5s, color 0.3s;
	}
	.contact:hover {
		scale: 1.1;
		gap: 0.4;
		color: var(--sandy-brown-2);
	}
	.icon {
		fill: var(--white-coral-1);
	}
</style>
