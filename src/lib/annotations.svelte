<script>
	import * as d3 from 'd3';
	import gsap from 'gsap';
	export let rectCenter, position, x, y, date, mm, stroke, i;

	let pathNodeWidth;
	let pathNodeHeight;
	let DateNodeHeight;

	function getPathNodeDimensions(node) {
		pathNodeWidth = node.getBBox().width;
		pathNodeHeight = node.getBBox().height;
	}
	function getDateNodeDimension(node) {
		DateNodeHeight = node.getBBox().height;
	}

	function pathGenerator(type = 'top-right', pX, pY, dH) {
		const path = d3.path();
		let style;
		let pathX;
		let pathY;
		let dateY;

		if (type === 'top-right') {
			path.moveTo(0, 0);
			path.arcTo(0, -65, 150, -60, 50);
			style = `translate:${x + rectCenter - 1.5}px ${y - rectCenter}px`;
			pathX = pX + x + 15;
			pathY = y - pY;
			dateY = dH - pY + y + 8;
		}

		if (type === 'bottom-right') {
			path.moveTo(0, 0);
			path.arcTo(0, 65, 150, 60, 50);
			style = `translate:${x + rectCenter - 1.5}px ${y + rectCenter}px`;
			pathX = pX + x + 15; //arcRef?.getBBox().width + x + 15
			pathY = y + pY + 15;
			dateY = dH + pY + y + 20;
		}
		if (type === 'top-left') {
			path.moveTo(0, 0);
			path.arcTo(0, -65, -20, -60, 50);
			style = `translate:${x - rectCenter + 1.5}px ${y - rectCenter}px`;
			pathX = x - pX - 15;
			pathY = y - pY;
			dateY = dH - pY + y + 8;
		}
		if (type === 'bottom-left') {
			path.moveTo(0, 0);
			path.arcTo(0, 180, -150, -60, 50);
			style = `translate:${x - rectCenter + 1.5}px ${y + rectCenter}px`;
			pathX = x - pX - 15;
			pathY = y + pY;
			dateY = dH + pY + y + 8;
		}
		return { path: path.toString(), style, pathX, pathY, dateY };
	}

	const labelFormatDate = d3.timeFormat('%d de %b del %Y');
	let labelRef;
	const { path, style } = pathGenerator(position);
	$: pathX = pathGenerator(position, pathNodeWidth).pathX;
	$: pathY = pathGenerator(position, pathNodeWidth, pathNodeHeight).pathY;
	$: dateY = pathGenerator(
		position,
		pathNodeWidth,
		pathNodeHeight,
		DateNodeHeight
	).dateY;

	function getNodes(node, { delay = 0 }) {
		const [path, date, mm] = node.querySelectorAll([
			'.label-path',
			'.date',
			'.mm',
		]);
		const tl = gsap.timeline();

		tl.fromTo(
			path,
			{
				strokeDashoffset: '0',
				strokeDasharray: '0 100',
			},
			{
				keyframes: {
					'100%': { strokeDasharray: '100 0', strokeDashoffset: 0 },
				},
			}
		)
			.from(date, { y: -10, opacity: 0 })
			.from(mm, { y: -10, opacity: 0 }, '+=0.02')
			.delay(delay * 0.5);

		return {
			delay: 0,
		};
	}
</script>

<g class="label" bind:this={labelRef} id={position} in:getNodes={{ delay: i }}>
	<path
		class="label-path"
		d={path}
		fill="none"
		{style}
		{stroke}
		use:getPathNodeDimensions
	/>
	<text class="date" x={pathX} y={pathY} fill={stroke} use:getDateNodeDimension>
		{labelFormatDate(date)}
	</text>
	<text class="mm" x={pathX} y={dateY} fill={stroke}>
		{`${mm} mm`}
	</text>
</g>

<style>
	path {
		stroke-width: 1.5px;
	}
	.date {
		font-size: 0.95rem;
		font-weight: 300;
	}
	.mm {
		font-size: 1.2rem;
		font-weight: 700;
	}
	.label:has(text) {
		stroke: var(--black-coral);
		stroke-width: 3px;
		paint-order: stroke;
	}
	#top-left,
	#bottom-left {
		text-anchor: end;
	}
</style>
