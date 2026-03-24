import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma.js';
import { verifyPassword, createSession } from '$lib/server/auth.js';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username')?.toString() ?? '';
		const password = data.get('password')?.toString() ?? '';

		if (!username || !password) {
			return fail(400, { error: 'Username dan password wajib diisi', username });
		}

		const admin = await prisma.admin.findUnique({ where: { username } });
		if (!admin || !verifyPassword(password, admin.password)) {
			return fail(401, { error: 'Username atau password salah', username });
		}

		const token = await createSession(admin.id);

		cookies.set('session', token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
			maxAge: 7 * 24 * 60 * 60 // 7 days
		});

		throw redirect(303, '/');
	}
};

/** @type {import('./$types').PageServerLoad} */
export function load({ locals }) {
	if (locals.admin) {
		throw redirect(303, '/');
	}
}
