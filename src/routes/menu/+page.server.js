import prisma from '$lib/server/prisma.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const menuItems = await prisma.menuItem.findMany({
		where: { isFeatured: false },
		orderBy: { sortOrder: 'asc' }
	});

	return {
		menuItems
	};
}
