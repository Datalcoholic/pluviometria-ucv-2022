import { writable } from 'svelte/store';

let svgContainerSize = writable({ width: 0, height: 0 });

export { svgContainerSize };
