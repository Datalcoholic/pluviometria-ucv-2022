import * as d3 from 'd3';

function areaPath(start, end, height, r) {
	const width = end - start;
	const path = d3.path();
	const x = 0;
	const y = 0;
	path.moveTo(x + width / 2, y);
	path.lineTo(width - width / 2, y);
	path.arcTo(width, y, width, height, r);
	path.lineTo(width, height / 2);
	path.arcTo(width, height, width / 2, height, r);
	path.lineTo(x + width / 2, height);
	path.arcTo(x, height, x, height / 2, r);
	path.lineTo(x, height / 2);
	path.arcTo(x, y, x + height / 2, y, r);
	path.closePath();
	return path.toString();
}
function triangle(start, end, y, tWidth, height, r) {
	const width = end - start;
	const path = d3.path();
	const gap = 10;
	const x = gap + width;
	//const y = 0;
	path.moveTo(x, y + height * 0.5);
	path.lineTo(x, y + height * 0.5);
	path.arcTo(x, y + height, x + tWidth * 0.7, y + height - height / 2, r);
	path.lineTo(x + tWidth * 0.65, y + height * 0.65);
	path.arcTo(
		x + tWidth,
		y + height * 0.5,
		x + tWidth * 0.05,
		y + height * 0.05,
		r
	);
	path.lineTo(x + tWidth * 0.3, y + height * 0.15);
	path.arcTo(x, y, x, y + height * 0.35, r);
	path.lineTo(x, y + height * 0.4);
	path.closePath();

	return path.toString();
}
export { areaPath, triangle };
