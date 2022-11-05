<script>
	import Svg from './svg.svelte';
	import { startOfMonth } from 'date-fns';
	import {
		svgContainerSize,
		localeEs,
		cardsStored,
		card1Stored,
	} from '../stores/appStores';
	import { data } from '../stores/dataStore2.js';
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
	$: prevYears = data.prevYears;
	$: year2022 = data.year2022;
	$: width = $svgContainerSize?.width < 600 ? 660 : $svgContainerSize?.width;
	$: height = $svgContainerSize?.height;

	//Palette
	const palette = {
		indigoDye1: 'hsl(28, 83%, 81%)',
		indigoDye2: 'hsl(28, 83%, 55%)',
		blackcoral1: 'hsl(213, 23%, 42%)',
	};
	const margin = { top: 35, right: 20, bottom: 15, left: 15 };

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

	$: dataForCard1 = getRainData2022($year2022);
	let rainData2022; //= getRainData2022($year2022);
	// // Top 3 rainy days 2022
	$: top3PrevYears = $prevYears?.maxRainyDay?.map((d, i) => {
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

	// let isTop3 = false;
	$: topRainyDays2022 = dataForCard1
		? dataForCard1
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
				})
		: [];
	$: consecutiveRainyDays = $year2022?.map(
		(month) => month.consecutiveRainyDays.consecutiveRainyDays
	);
	$: prevMeans = $prevYears?.rainyDaysMean;
	// // Scales
	// //Days
	$: rangeDays = d3.range(1, 31.5, width < 650 ? 7 : 1);
	$: daysExt = d3.extent(rangeDays);
	$: dayScale = d3
		.scaleLinear()
		.domain(daysExt)
		.range([margin.left + 55, width - margin.left - margin.right]);

	//BREAK:
	//Month
	const monthFormat = d3.timeFormat('%b');
	$: months = dataForCard1?.map((d, i) => {
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
	//BREAK:
	$: monthScale = months
		? d3
				.scaleBand()
				.domain(months)
				.paddingOuter(0.5)
				.paddingInner(0.1)
				.range([margin.top, height - margin.top - margin.bottom])
		: undefined;

	//Fill
	$: mm = dataForCard1?.flat(1).map((m) => m.mm);
	$: mmExtend = mm ? d3.extent(mm) : undefined;
	//BREAK:
	$: fillScale = mm
		? d3
				.scaleLinear()
				.domain(mmExtend)
				.range([palette.indigoDye1, palette.indigoDye2])
				.interpolate(d3.interpolateHsl)
		: undefined;

	// Size
	//BREAK:
	$: sizeScale = mm
		? d3.scaleSqrt().domain([mmExtend[0], 105]).range([2, 35])
		: undefined;

	// Mean
	$: meansRange = prevMeans?.map((d) => d.monthMean);
	$: meanExt = meansRange ? d3.extent(meansRange) : undefined;
	$: meanScale = meanExt
		? d3
				.scaleLinear()
				.domain(meanExt)
				.range([margin.right, width - margin.left])
		: undefined;

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
	$: dataForCard4 = dataForCard1 ? getRainyDays() : undefined;
	$: console.log('dataForCard4 :>> ', dataForCard4);

	const dateFormat = d3.timeFormat('%d.%b.%Y');
	const getconsecutiveRainyDays = () => {
		let data = dataForCard4.map((month, i) => {
			const arrfilter = consecutiveRainyDays[i]?.map((date) => {
				return date.map((d) => {
					return dateFormat(new Date(d));
				});
			});

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

	$: dataForCard5 = dataForCard4 ? getconsecutiveRainyDays() : undefined;
	console.log('dataForCard5 :>> ', dataForCard5);

	//Scroll Animations
	gsap.registerPlugin(ScrollTrigger);

	$: card1IsVisible = $card1Stored;
	let card2IsVisible = false;
	let card3IsVisible = false;
	let card4IsVisible = false;
	let card5IsVisible = false;
	let isAnnotation = false;

	onMount(() => {
		ScrollTrigger.defaults({
			start: 'top 90%',
			end: 'top 8%',
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
				card1Stored.set(true);
			},
			onLeave: (self) => {
				gsap.to($cardsStored[cardIndex1], {
					opacity: 0,
					duration: 0.5,
				});
				//card1IsVisible = false;
			},
			onEnterBack: (self) => {
				card1Stored.set(true);
				gsap.to($cardsStored[cardIndex1], {
					opacity: 1,
					duration: 0.5,
				});
				rainData2022 = dataForCard1;
				// isTop3 = false;
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
	<!-- <Leyend range={mmExtend} fill={fillScale} size={sizeScale} /> -->
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
			days={card1IsVisible
				? rainData2022?.flat(1)
				: rainData2022
				? rainData2022.flat()
				: []}
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
