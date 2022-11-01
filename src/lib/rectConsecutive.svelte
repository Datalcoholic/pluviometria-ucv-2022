<script>
	import { areaPath } from '../Utilities/utils';
	import * as d3 from 'd3';
	export let data, xScale, yScale;
	const dayFormat = d3.timeFormat('%d');
	const monthFormat = d3.timeFormat('%b');
	const consecutiveData = data.map((month) => {
		const cons = month.consecutiveRainyDays.consecutiveRainyDays.map((d) => {
			const start = new Date(d3.min(d));
			const end = new Date(d3.max(d));
			const day = +dayFormat(start);
			const path = areaPath(
				xScale(+dayFormat(start)),
				xScale(+dayFormat(end)),
				45,
				5,
				10
			);
			const m = monthFormat(new Date(`2022-${month.month}-1`));
			return {
				month: m,
				day,
				path,
				start: +dayFormat(start),
				end: +dayFormat(end),
			};
		});
		return cons.map((d) => d);
	});
</script>

<g class="consecutive-paths">
	{#each consecutiveData.flat(1) as month}
		<path
			d={month.path}
			style="translate:{xScale(month.day)}px {yScale(month.month) - 45 / 2}px"
			fill="var(--sandy-brown-3)"
		/>
	{/each}
</g>

<style>
	/* your styles go here */
</style>
