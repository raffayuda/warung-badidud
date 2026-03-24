import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma.js';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request, locals }) {
	if (!locals.admin) return json({ error: 'Unauthorized' }, { status: 401 });

	const slides = await request.json();

	// Delete all and recreate
	await prisma.heroSlide.deleteMany();
	await prisma.heroSlide.createMany({
		data: slides.map((/** @type {any} */ s, /** @type {number} */ i) => ({
			title: s.title,
			subtitle: s.subtitle,
			description: s.description,
			image: s.image,
			sortOrder: i
		}))
	});

	const updated = await prisma.heroSlide.findMany({ orderBy: { sortOrder: 'asc' } });
	return json(updated);
}
