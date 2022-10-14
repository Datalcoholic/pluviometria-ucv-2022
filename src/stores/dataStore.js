import { writable } from 'svelte/store';
import { json } from 'd3';

const year2022 = writable();

const data2022 = await json(
	'https://raw.githubusercontent.com/Datalcoholic/pluviometria-ucv-2022/master/data/year2022.json'
);

await year2022.set(data2022);

export { year2022 };
