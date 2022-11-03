<script>
	import Svg from './svg.svelte';
	import { startOfMonth } from 'date-fns';
	import { svgContainerSize, localeEs, cardsStored } from '../stores/appStores';
	import { year2022, prevYears } from '../stores/dataStore';
	import * as d3 from 'd3';
	import gsap from 'gsap';
	import ScrollTrigger from 'gsap/ScrollTrigger';
	import YAxis from './yAxis.svelte';
	import XAvis from './xAxis.svelte';
	import Rects from './rects.svelte';
	import ButtonsDiv from './devComponents/buttonsDiv.svelte';
	import { onMount } from 'svelte';
	import AreaRect from './areaRect.svelte';
	import RectConsecutive from './rectConsecutive.svelte';
	import Leyend from './leyend.svelte';
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

	const getRainData2022 = (arr) => {
		return arr?.map((d) => {
			let data = d.monthlyData;
			data = data.map((d, i) => {
				let { date, day, month, year, mm } = d;
				const indexDay = i + 1;
				return { date: new Date(date), day, month, year, mm, indexDay };
			});
			return data.filter((d) => d.mm > 0);
		});
	};

	const dataForCard1 = getRainData2022($year2022);
	let rainData2022; //= getRainData2022($year2022);

	// Top 3 rainy days 2022
	const top3PrevYears = $prevYears.maxRainyDay.map((d, i) => {
		const { date, day, month, year, mm } = d;
		const position = i === 1 || i === 2 ? 'top-right' : 'top-left';
		return {
			date: new Date(date),
			day,
			indexDay: day,
			month,
			year,
			mm,
			position,
		};
	});
	let isTop3 = false;
	let topRainyDays2022 = dataForCard1
		.flat(1)
		.sort((a, b) => b.mm - a.mm)
		.splice(0, 3)
		.map((d, i) => {
			const { date, day, indexDay, month, year, mm } = d;
			const position = i === 0 || i === 1 ? 'top-left' : 'bottom-left';
			return {
				date,
				day,
				indexDay,
				month,
				year,
				mm,
				position,
			};
		});

	const consecutiveRainyDays = $year2022?.map(
		(month) => month.consecutiveRainyDays.consecutiveRainyDays
	);
	const margin = { top: 35, right: 20, bottom: 15, left: 15 };

	const prevMeans = $prevYears.rainyDaysMean;
	// Scales
	//Days
	$: rangeDays = d3.range(1, 31.5, width < 680 ? 7 : 1);
	$: daysExt = d3.extent(rangeDays);
	$: dayScale = d3
		.scaleLinear()
		.domain(daysExt)
		.range([margin.left + 55, width - margin.left - margin.right]);

	// $: dayScale = d3
	// 	.scaleBand()
	// 	.domain(rangeDays)
	// 	.paddingInner(1)
	// 	.paddingOuter(2.5)
	// 	.range([margin.right, width - margin.left]);
	//Month
	const monthFormat = d3.timeFormat('%b');
	const months = dataForCard1?.map((d, i) => {
		let firstDateOfTheMonth;
		if (i + 1 === 11) {
			firstDateOfTheMonth = new Date('2022/11/01');
		} else if (i + 1 === 12) {
			firstDateOfTheMonth = new Date('2022/12/01');
		} else {
			firstDateOfTheMonth = d[0]?.date;
		}
		return monthFormat(startOfMonth(firstDateOfTheMonth));
	});

	$: monthScale = d3
		.scaleBand()
		.domain(months)
		.paddingOuter(0.5)
		.paddingInner(0.1)
		.range([margin.top, height - margin.top - margin.bottom]);

	//Fill
	const mm = dataForCard1?.flat(1).map((m) => m.mm);
	const mmExtend = d3.extent(mm);
	const fillScale = d3
		.scaleLinear()
		.domain(mmExtend)
		.range([palette.indigoDye1, palette.indigoDye2])
		.interpolate(d3.interpolateHsl);

	// Size
	const sizeScale = d3.scaleSqrt().domain([mmExtend[0], 105]).range([0, 35]);

	// Mean
	const meansRange = prevMeans.map((d) => d.monthMean);
	const meanExt = d3.extent(meansRange);
	$: meanScale = d3
		.scaleLinear()
		.domain(meanExt)
		.range([margin.right, width - margin.left]);

	// Filter functions
	const getRainyDays = () => {
		//let data = rainData2022.map((d) => d.filter((a) => a.mm !== 0));
		let data = dataForCard1;
		data = data.map((d) => {
			return d.map((a, i) => {
				return { ...a, indexDay: i + 1 };
			});
		});
		//rainData2022 = data;
		return data;
	};
	const dataForCard4 = getRainyDays();

	const dateFormat = d3.timeFormat('%d.%b.%Y');
	const getconsecutiveRainyDays = () => {
		let data = dataForCard4.map((month, i) => {
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
				return { ...a, indexDay: a.day };
			});
		});
		return data;
	};

	const dataForCard5 = getconsecutiveRainyDays();

	//Scroll Animations
	gsap.registerPlugin(ScrollTrigger);

	let card1IsVisible = false;
	let card2IsVisible = false;
	let card3IsVisible = false;
	let card4IsVisible = false;
	let card5IsVisible = false;
	let isAnnotation = false;

	onMount(() => {
		ScrollTrigger.defaults({
			start: 'top 85%',
			end: '70% 25%',
			// markers: { startColor: 'white', endColor: '#ff6347' },
		});
		const cardIndex1 = 0;
		const card1 = ScrollTrigger.create({
			trigger: $cardsStored[cardIndex1],
			onEnter: (self) => {
				gsap.to($cardsStored[cardIndex1], {
					opacity: 1,
					duration: 0.5,
				});
				rainData2022 = dataForCard1;
				card1IsVisible = true;
			},
			onLeave: (self) => {
				gsap.to($cardsStored[cardIndex1], {
					opacity: 0,
					duration: 0.5,
				});
				//card1IsVisible = false;
			},
			onEnterBack: (self) => {
				card1IsVisible = true;
				gsap.to($cardsStored[cardIndex1], {
					opacity: 1,
					duration: 0.5,
				});
				rainData2022 = dataForCard1;
				isTop3 = false;
			},
		});

		const cardIndex2 = 1;
		const card2 = ScrollTrigger.create({
			trigger: $cardsStored[cardIndex2],
			onEnter: (self) => {
				gsap.to($cardsStored[cardIndex2], {
					opacity: 1,
					duration: 0.5,
				});
				card2IsVisible = true;
			},
			onLeave: () => {
				gsap.to($cardsStored[cardIndex2], {
					opacity: 0,
				});
				card2IsVisible = false;
			},
			onEnterBack: (self) => {
				card1IsVisible = true;
				gsap.to($cardsStored[cardIndex2], {
					opacity: 1,
					duration: 0.5,
				});
				rainData2022 = dataForCard1;
				card2IsVisible = true;
			},
			onLeaveBack: (self) => {
				card2IsVisible = false;
			},
		});
		const cardIndex3 = 2;
		const card3 = ScrollTrigger.create({
			trigger: $cardsStored[cardIndex3],
			onEnter: (self) => {
				gsap.to($cardsStored[cardIndex3], {
					opacity: 1,
					duration: 0.5,
				});
				card3IsVisible = true;
				//rainData2022 = dataForCard3;
				//getRainyDays();
			},
			onLeave: () => {
				gsap.to($cardsStored[cardIndex3], {
					opacity: 0,
				});
				card3IsVisible = false;
			},
			onEnterBack: (self) => {
				card1IsVisible = true;
				gsap.to($cardsStored[cardIndex3], {
					opacity: 1,
					duration: 0.5,
				});
				card3IsVisible = true;
				rainData2022 = dataForCard1;
			},
			onLeaveBack: (self) => {
				gsap.to($cardsStored[cardIndex3], {
					opacity: 0,
					duration: 0.5,
				});
				card3IsVisible = false;
			},
		});

		const cardIndex4 = 3;
		const card4 = ScrollTrigger.create({
			trigger: $cardsStored[cardIndex4],
			onEnter: (self) => {
				gsap.to($cardsStored[cardIndex4], {
					opacity: 1,
					duration: 0.5,
				});
				rainData2022 = dataForCard4;
				card4IsVisible = true;
			},
			onLeave: () => {
				gsap.to($cardsStored[cardIndex4], {
					opacity: 0,
				});
				card4IsVisible = false;
			},
			onEnterBack: () => {
				gsap.to($cardsStored[cardIndex4], {
					opacity: 1,
				});
				card4IsVisible = true;
				rainData2022 = dataForCard4;
				card5IsVisible = false;
			},
			onLeaveBack: (self) => {
				gsap.to($cardsStored[cardIndex4], {
					opacity: 0,
				});
				card4IsVisible = false;
			},
		});

		const cardIndex5 = 4;
		const card5 = ScrollTrigger.create({
			trigger: $cardsStored[cardIndex5],
			onEnter: (self) => {
				gsap.to($cardsStored[cardIndex5], {
					opacity: 1,
					duration: 0.5,
				});
				rainData2022 = dataForCard5;
				card5IsVisible = true;
			},
			onLeave: () => {
				gsap.to($cardsStored[cardIndex5], {
					opacity: 0,
				});
			},
			onEnterBack: (self) => {
				gsap.to($cardsStored[cardIndex5], {
					opacity: 1,
				});
			},
			onLeaveBack: (self) => {
				gsap.to($cardsStored[cardIndex5], {
					opacity: 1,
				});
			},
		});
	});
</script>

<Svg {width} {height}>
	<Leyend range={mmExtend} fill={fillScale} size={sizeScale} />
	<g class="graph">
		<YAxis scale={monthScale} {months} x={margin.right} />
		<XAvis scale={dayScale} days={rangeDays} y={margin.top} />
		{#if card4IsVisible}
			<AreaRect
				data={rainData2022}
				data2={prevMeans}
				{monthScale}
				{dayScale}
				{meanScale}
				format={monthFormat}
			/>
		{/if}
		{#if card5IsVisible}
			<RectConsecutive data={$year2022} xScale={dayScale} yScale={monthScale} />
		{/if}
		<Rects
			{monthScale}
			{dayScale}
			{fillScale}
			{sizeScale}
			days={card1IsVisible ? rainData2022.flat(1) : []}
			format={monthFormat}
			topDays={topRainyDays2022}
			isAnnotation={card2IsVisible}
		/>

		{#if card3IsVisible}
			<Rects
				{monthScale}
				{dayScale}
				{fillScale}
				{sizeScale}
				days={card1IsVisible ? top3PrevYears : []}
				format={monthFormat}
				topDays={top3PrevYears}
				isAnnotation={card3IsVisible}
				period={1900}
			/>
		{/if}
	</g>
</Svg>

<style>
	.graph {
		translate: 0 50px;
	}
</style>
