import { json } from '@sveltejs/kit';
import { deleteSession } from '$lib/server/auth.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies }) {
	const token = cookies.get('session');
	if (token) {
		await deleteSession(token);
		cookies.delete('session', { path: '/' });
	}
	return json({ success: true });
}
