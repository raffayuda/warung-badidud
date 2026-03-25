import { validateSession } from '$lib/server/auth.js';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const sessionToken = event.cookies.get('session');

	if (sessionToken) {
		const admin = await validateSession(sessionToken);
		if (admin) {
			event.locals.admin = {
				id: admin.id,
				username: admin.username,
				name: admin.name,
				email: admin.email
			};
		} else {
			// Invalid/expired session, clear the cookie
			event.cookies.delete('session', { path: '/' });
		}
	}

	return resolve(event);
}
