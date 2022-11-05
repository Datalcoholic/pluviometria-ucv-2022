import { writable } from 'svelte/store';
import { json } from 'd3';

const data2022 = json(
	'https://raw.githubusercontent.com/Datalcoholic/pluviometria-ucv-2022/master/data/year2022.json'
);

const dataPrev = json(
	'https://raw.githubusercontent.com/Datalcoholic/pluviometria-ucv-2022/master/data/previusYearsStatistics.json'
);
const year2022 = writable();
const prevYears = writable();
Promise.all([data2022, dataPrev]).then((resp) => {
	year2022.set(resp[0]);
	prevYears.set(resp[1]);
});
const data = { year2022, prevYears };
export { data };
