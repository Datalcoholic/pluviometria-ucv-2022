import { writable } from 'svelte/store';
import { json } from 'd3';

const year2022 = writable();
const prevYears = writable();
async function get2022() {
	const resp = await json(
		'https://raw.githubusercontent.com/Datalcoholic/pluviometria-ucv-2022/master/data/year2022.json'
	);
	return resp;
}

async function getPrev() {
	const resp = await json(
		'https://raw.githubusercontent.com/Datalcoholic/pluviometria-ucv-2022/master/data/previusYearsStatistics.json'
	);
	return resp;
}
year2022.set(await get2022());
prevYears.set(await getPrev());

export { year2022, prevYears };
