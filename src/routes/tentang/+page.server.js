import prisma from '$lib/server/prisma.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const aboutContent = await prisma.siteContent.findFirst({ where: { key: 'about' } });

	return {
		about: aboutContent ? JSON.parse(aboutContent.value) : null
	};
}
