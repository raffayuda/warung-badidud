import prisma from '$lib/server/prisma.js';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const [heroSlides, features, featuredMenuItems, storyContent] = await Promise.all([
		prisma.heroSlide.findMany({ orderBy: { sortOrder: 'asc' } }),
		prisma.feature.findMany({ orderBy: { sortOrder: 'asc' } }),
		prisma.menuItem.findMany({ where: { isFeatured: true }, orderBy: { sortOrder: 'asc' } }),
		prisma.siteContent.findFirst({ where: { key: 'story' } })
	]);

	return {
		heroSlides,
		features,
		featuredMenuItems: featuredMenuItems.map((item) => ({
			...item,
			// Format price for featured items display
			priceFormatted: `Rp ${Math.round(item.price / 1000)}k`
		})),
		story: storyContent ? JSON.parse(storyContent.value) : null
	};
}
