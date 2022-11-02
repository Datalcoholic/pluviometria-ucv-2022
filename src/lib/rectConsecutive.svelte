<script>
	import { areaPath, triangle } from '../Utilities/utils';
	import * as d3 from 'd3';
	import gsap from 'gsap';
	export let data, xScale, yScale;
	const dayFormat = d3.timeFormat('%d');
	const monthFormat = d3.timeFormat('%b');
	const opacityScale = d3.scaleLinear().domain([1, 7]).range([0.1, 1]);
	const consecutiveData = data.map((month) => {
		const cons = month.consecutiveRainyDays.consecutiveRainyDays.map((d) => {
			const start = new Date(d3.min(d));
			const end = new Date(d3.max(d));
			const day = +dayFormat(start);
			const delta = +dayFormat(end) - day + 1;

			const path = areaPath(
				xScale(+dayFormat(start)),
				xScale(+dayFormat(end)),
				30,
				5,
				10
			);
			const m = monthFormat(new Date(`2022-${month.month}-1`));
			const opacity = opacityScale(delta);
			return {
				month: m,
				day,
				path,
				start: +dayFormat(start),
				end: +dayFormat(end),
				opacity,
				delta,
			};
		});
		return cons.map((d) => d);
	});
	console.log('consecutiveData :>> ', consecutiveData);
	function enter(node, { delay = 0 }) {
		// gsap.from(node, { scaleX: 0, duration: 2 }).delay(delay);
		const [path, triangle, amount, unit] = node.querySelectorAll([
			'path',
			'.triangle',
			'.amount',
			'.unit',
		]);
		const tl = gsap.timeline({ ease: 'expo.in' });
		const length = path.getTotalLength();

		tl.fromTo(
			path,
			{ strokeDasharray: `0 ${length / 2}`, strokeDashoffset: length / 2 },
			{
				duration: 0.7,
				strokeDasharray: `${length / 2} 0`,
				strokeDashoffset: `${length / 2}`,
			}
		)
			.from(path, { fillOpacity: 0, duration: 0.9 })
			.delay(delay);
		if (triangle) {
			tl.add(
				gsap.from(triangle, {
					y: function (i, t, ts) {
						return t.getBoundingClientRect().y - 10;
					},
					opacity: 0,
				})
			);
			tl.add(
				gsap.from([amount, unit], {
					y: -10,
					opacity: 0,
				})
			);
		}

		return { delay };
	}
</script>

{#each consecutiveData.flat(1) as month, i}
	<g class="consecutive-paths" in:enter={{ delay: i * 0.08 }}>
		<path
			d={month.path}
			style="translate:{xScale(month.day)}px {yScale(month.month) - 30 / 2}px"
			fill={d3.rgb('hsl(28, 83%, 81%)').copy({ opacity: month.opacity })}
			stroke="var(--sandy-brown-2)"
		/>
		{#if month.delta === 7}
			<path
				class="triangle"
				d={triangle(0, 0, 0, 20, 15, 2)}
				style="translate:{xScale(month.day) -
					20 +
					xScale(month.delta - 1) / 2 -
					15}px {yScale(month.month) + 15 + 10}px; rotate:{90}deg"
			/>
			<text
				class="amount"
				x={xScale(month.day) - 20 + xScale(month.delta - 1) / 2 - 15}
				y={yScale(month.month) + 15 + 10 + 20 + 18}>{month.delta}</text
			>
			<text
				class="unit"
				x={xScale(month.day) - 20 + xScale(month.delta - 1) / 2 - 15 + 15}
				y={yScale(month.month) + 15 + 10 + 20 + 18}>dias</text
			>
		{/if}
	</g>
{/each}

<style>
	path {
		transform-origin: center;
	}
	.triangle {
		transform-origin: center center;
		transform-box: fill-box;
		stroke: var(--sandy-brown-2);
		fill: none;
	}

	.amount {
		font-size: 1.5rem;
		font-weight: 400;
		stroke: var(--orange-soda);
		fill: var(--sandy-brown-2);
		stroke-width: 1px;
		paint-order: stroke;
	}
	.unit {
		font-size: 0.98rem;
		fill: var(--sandy-brown-2);
	}
</style>
