import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma.js';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ params, request, locals }) {
	if (!locals.admin) return json({ error: 'Unauthorized' }, { status: 401 });

	const data = await request.json();

	const item = await prisma.menuItem.update({
		where: { id: params.id },
		data: {
			name: data.name,
			description: data.description ?? '',
			price: parseInt(data.price),
			image: data.image,
			category: data.category,
			badge: data.badge || null,
			isFeatured: data.isFeatured ?? false,
			sortOrder: data.sortOrder ?? 0
		}
	});

	return json(item);
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params, locals }) {
	if (!locals.admin) return json({ error: 'Unauthorized' }, { status: 401 });

	await prisma.menuItem.delete({ where: { id: params.id } });
	return json({ success: true });
}
