import { writable, readable } from 'svelte/store';

let svgContainerSize = writable({ width: 0, height: 0 });
let localeEs = readable({
	dateTime: '%A, %e de %B de %Y, %X',
	date: '%d/%m/%Y',
	time: '%H:%M:%S',
	periods: ['AM', 'PM'],
	days: [
		'domingo',
		'lunes',
		'martes',
		'miércoles',
		'jueves',
		'viernes',
		'sábado',
	],
	shortDays: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
	months: [
		'enero',
		'febrero',
		'marzo',
		'abril',
		'mayo',
		'junio',
		'julio',
		'agosto',
		'septiembre',
		'octubre',
		'noviembre',
		'diciembre',
	],
	shortMonths: [
		'Ene',
		'Feb',
		'Mar',
		'Abr',
		'May',
		'Jun',
		'Jul',
		'Ago',
		'Sep',
		'Oct',
		'Nov',
		'Dic',
	],
});

const cardsStored = writable([]);
const card1Stored = writable(false);
export { svgContainerSize, localeEs, cardsStored, card1Stored };
