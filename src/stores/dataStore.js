import { writable } from 'svelte/store';
import { json } from 'd3';

const year2022 = writable();
const prevYears = writable();
json(
	'https://raw.githubusercontent.com/Datalcoholic/pluviometria-ucv-2022/master/data/year2022.json'
).then((resp) => year2022.set(resp));

json(
	'https://raw.githubusercontent.com/Datalcoholic/pluviometria-ucv-2022/master/data/previusYearsStatistics.json'
).then((resp) => prevYears.set(resp));

export { year2022, prevYears };
