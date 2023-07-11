export default function capitalize(string: string): string {
	const array = string.split(/[-,_, ]/gm);
	const capitalized = array.map(
		(string) => string.charAt(0).toUpperCase() + string.slice(1)
	);

	return capitalized.join(' ');
}
