/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {
	return {
		isAdmin: !!locals.admin
	};
}
