import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma.js';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request, locals }) {
	if (!locals.admin) return json({ error: 'Unauthorized' }, { status: 401 });

	const slides = await request.json();

	// Update existing slides in-place to preserve IDs
	const results = [];
	for (let i = 0; i < slides.length; i++) {
		const s = slides[i];
		if (s.id) {
			const updated = await prisma.heroSlide.update({
				where: { id: s.id },
				data: {
					title: s.title,
					subtitle: s.subtitle,
					description: s.description,
					image: s.image,
					sortOrder: i
				}
			});
			results.push(updated);
		} else {
			const created = await prisma.heroSlide.create({
				data: {
					title: s.title,
					subtitle: s.subtitle,
					description: s.description,
					image: s.image,
					sortOrder: i
				}
			});
			results.push(created);
		}
	}

	return json(results);
}
