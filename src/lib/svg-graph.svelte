<script>
	import Svg from './svg.svelte';
	import { startOfMonth } from 'date-fns';
	import { svgContainerSize, localeEs, cardsStored } from '../stores/appStores';
	import { year2022 } from '../stores/dataStore';
	import * as d3 from 'd3';
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import YAxis from './yAxis.svelte';
	import XAvis from './xAxis.svelte';
	import Rects from './rects.svelte';
	import ButtonsDiv from './devComponents/buttonsDiv.svelte';
	import { onMount } from 'svelte';
	d3.timeFormatDefaultLocale($localeEs);
	d3.formatDefaultLocale($localeEs);

	$: width = $svgContainerSize?.width < 600 ? 660 : $svgContainerSize?.width;
	$: height = $svgContainerSize?.height;

	//Palette
	const palette = {
		indigoDye1: 'hsl(28, 83%, 81%)',
		indigoDye2: 'hsl(28, 83%, 55%)',
		blackcoral1: 'hsla(213, 23%, 42%, 1)',
	};

	let rainData2022 = $year2022?.map((d) => {
		let data = d.monthlyData;
		data = data.map((d, i) => {
			let { date, day, month, year, mm } = d;
			const indexDay = i + 1;
			return { date: new Date(date), day, month, year, mm, indexDay };
		});
		return data;
	});
	console.log('rainData2022 :>> ', rainData2022);

	const consecutiveRainyDays = $year2022?.map(
		(month) => month.consecutiveRainyDays.consecutiveRainyDays
	);
	console.log('$year2022 :>> ', $year2022);
	console.log('consecutiveRainyDays :>> ', consecutiveRainyDays);
	const margin = { top: 35, right: 20, bottom: 15, left: 15 };

	// Scales
	//Days
	const rangeDays = d3.range(1, 32, 1);
	$: dayScale = d3
		.scaleBand()
		.domain(rangeDays)
		.paddingInner(-1)
		.paddingOuter(0.8)
		.range([margin.right + 45, width - margin.left - margin.right]);
	//Month
	const monthFormat = d3.timeFormat('%b');
	const months = rainData2022.map((d) => {
		const firstDateOfTheMonth = d[0].date;
		return monthFormat(startOfMonth(firstDateOfTheMonth));
	});

	$: monthScale = d3
		.scaleBand()
		.domain(months)
		.paddingOuter(1)
		.paddingInner(1)
		.range([margin.top, height]);

	//Fill
	const mm = rainData2022.flat(1).map((m) => m.mm);
	const mmExtend = d3.extent(mm);
	const fillScale = d3

		.scaleLinear()
		.domain(mmExtend)
		.range([palette.indigoDye1, palette.indigoDye2])
		.interpolate(d3.interpolateHsl);

	// Size

	const sizeScale = d3.scaleSqrt().domain(mmExtend).range([0, 25]);

	// Filter functions
	const getRainyDays = () => {
		let data = rainData2022.map((d) => d.filter((a) => a.mm !== 0));
		data = data.map((d) => {
			return d.map((a, i) => {
				return { ...a, indexDay: i + 1 };
			});
		});
		rainData2022 = data;
	};
	const dateFormat = d3.timeFormat('%d.%b.%Y');
	const getconsecutiveRainyDays = () => {
		let data = rainData2022.map((month, i) => {
			const arrfilter = consecutiveRainyDays[i]?.map((date) => {
				// console.log('date :>> ', date);
				return date.map((d) => {
					return dateFormat(new Date(d));
				});
			});
			//console.log('month :>> ', month, 'dates:', arrfilter.flat(1));

			return month.filter((d) =>
				arrfilter.flat(1).includes(dateFormat(d.date))
			);
		});
		data = data.map((d) => {
			return d.map((a, i) => {
				return { ...a, indexDay: i + 1 };
			});
		});
		rainData2022 = data;
		console.log('cosecutive :>> ', data);
	};

	//Scroll Animations
	gsap.registerPlugin(ScrollTrigger);

	let card1IsVisible = false;

	onMount(() => {
		ScrollTrigger.defaults({
			start: 'top 85%',
			end: 'bottom 25%',
			markers: { startColor: 'white', endColor: '#ff6347' },
		});
		const card1 = ScrollTrigger.create({
			trigger: $cardsStored[0],
			onEnter: (self) => {
				gsap.to($cardsStored[0], {
					opacity: 0,
					duration: 0.5,
				});
				card1IsVisible = true;
			},
			onLeave: (self) => {
				gsap.to($cardsStored[0], {
					opacity: 1,
					duration: 0.5,
				});
				// card1IsVisible = false;
			},
			onEnterBack: (self) => {
				card1IsVisible = true;
			},
		});

		const card2 = ScrollTrigger.create({
			trigger: $cardsStored[1],
			onEnter: (self) => {
				gsap.to($cardsStored[1], {
					opacity: 0,
					duration: 0.5,
				});
			},
			onLeave: () => {
				gsap.to($cardsStored[1], {
					opacity: 1,
				});
			},
		});
	});
</script>

<ButtonsDiv onclick={{ getRainyDays, getconsecutiveRainyDays }} />
<Svg {width} {height}>
	<YAxis scale={monthScale} {months} x={margin.right} />
	<XAvis scale={dayScale} days={rangeDays} y={margin.top} />
	<Rects
		{monthScale}
		{dayScale}
		{fillScale}
		{sizeScale}
		days={card1IsVisible ? rainData2022.flat(1) : []}
		format={monthFormat}
	/>
</Svg>

<style>
</style>
