import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma.js';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request, locals }) {
	if (!locals.admin) return json({ error: 'Unauthorized' }, { status: 401 });

	const features = await request.json();

	await prisma.feature.deleteMany();
	await prisma.feature.createMany({
		data: features.map((/** @type {any} */ f, /** @type {number} */ i) => ({
			icon: f.icon,
			title: f.title,
			description: f.description,
			sortOrder: i
		}))
	});

	const updated = await prisma.feature.findMany({ orderBy: { sortOrder: 'asc' } });
	return json(updated);
}
