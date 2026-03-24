import prisma from '$lib/server/prisma.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const locationContent = await prisma.siteContent.findFirst({ where: { key: 'location' } });

	return {
		location: locationContent ? JSON.parse(locationContent.value) : null
	};
}
