<script>
	import { areaPath } from '../Utilities/utils';
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
				45,
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
	function scaleFromCenter(node, { delay = 0 }) {
		// gsap.from(node, { scaleX: 0, duration: 2 }).delay(delay);

		const tl = gsap.timeline({ ease: 'expo.in' });
		const length = node.getTotalLength();

		tl.fromTo(
			node,
			{ strokeDasharray: `0 ${length / 2}`, strokeDashoffset: length / 2 },
			{
				duration: 0.7,
				strokeDasharray: `${length / 2} 0`,
				strokeDashoffset: `${length / 2}`,
			}
		)
			.from(node, { fillOpacity: 0, duration: 0.9 })
			.delay(delay);
		return { delay };
	}
</script>

<g class="consecutive-paths">
	{#each consecutiveData.flat(1) as month, i}
		<path
			in:scaleFromCenter={{ delay: i * 0.08 }}
			d={month.path}
			style="translate:{xScale(month.day)}px {yScale(month.month) - 45 / 2}px"
			fill={d3.rgb('hsl(28, 83%, 81%)').copy({ opacity: month.opacity })}
			stroke="var(--sandy-brown-2)"
		/>
	{/each}
</g>

<style>
	path {
		transform-origin: center;
	}
</style>
