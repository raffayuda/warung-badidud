import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma.js';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request, locals }) {
	if (!locals.admin) return json({ error: 'Unauthorized' }, { status: 401 });

	const { key, value } = await request.json();

	if (!key || !value) {
		return json({ error: 'key and value are required' }, { status: 400 });
	}

	const updated = await prisma.siteContent.upsert({
		where: { key },
		update: { value: JSON.stringify(value) },
		create: { key, value: JSON.stringify(value) }
	});

	return json({ key: updated.key, value: JSON.parse(updated.value) });
}
