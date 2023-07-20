export default function dateToISO(date: Date, yearAdjust: number = 0): string {
	date.setFullYear(date.getFullYear() + yearAdjust);
	return date.toISOString().split('T')[0];
}
