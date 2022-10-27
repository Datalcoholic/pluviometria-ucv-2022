import { writable } from 'svelte/store';
import { json } from 'd3';

const year2022 = writable();
const prevYears = writable();

const data2022 = await json(
	'https://raw.githubusercontent.com/Datalcoholic/pluviometria-ucv-2022/master/data/year2022.json'
);

const prev = await json(
	'https://raw.githubusercontent.com/Datalcoholic/pluviometria-ucv-2022/master/data/previusYearsStatistics.json'
);

await year2022.set(data2022);
await prevYears.set(prev);

export { year2022, prevYears };
