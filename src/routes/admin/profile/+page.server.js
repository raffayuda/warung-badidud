import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma.js';
import { hashPassword, verifyPassword } from '$lib/server/auth.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	if (!locals.admin) {
		throw redirect(303, '/login');
	}

	const admin = await prisma.admin.findUnique({
		where: { id: locals.admin.id },
		select: {
			id: true,
			username: true,
			name: true,
			email: true,
			createdAt: true
		}
	});

	if (!admin) {
		throw redirect(303, '/login');
	}

	return { admin };
}

/** @type {import('./$types').Actions} */
export const actions = {
	updateProfile: async ({ request, locals }) => {
		if (!locals.admin) {
			return fail(401, { error: 'Tidak terautentikasi' });
		}

		const data = await request.formData();
		const name = data.get('name')?.toString() ?? '';
		const email = data.get('email')?.toString() ?? '';

		if (!name || !email) {
			return fail(400, { error: 'Nama dan email wajib diisi' });
		}

		// Validasi email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, { error: 'Format email tidak valid' });
		}

		try {
			const updated = await prisma.admin.update({
				where: { id: locals.admin.id },
				data: {
					name: name.trim(),
					email: email.trim()
				},
				select: {
					id: true,
					username: true,
					name: true,
					email: true
				}
			});

			return { success: true, message: 'Profil berhasil diperbarui', admin: updated };
		} catch (error) {
			if (error.code === 'P2002') {
				return fail(400, { error: 'Email sudah digunakan' });
			}
			console.error('Update profile error:', error);
			return fail(500, { error: 'Gagal memperbarui profil' });
		}
	},

	changePassword: async ({ request, locals }) => {
		if (!locals.admin) {
			return fail(401, { error: 'Tidak terautentikasi' });
		}

		const data = await request.formData();
		const oldPassword = data.get('oldPassword')?.toString() ?? '';
		const newPassword = data.get('newPassword')?.toString() ?? '';
		const confirmPassword = data.get('confirmPassword')?.toString() ?? '';

		// Validasi input
		if (!oldPassword || !newPassword || !confirmPassword) {
			return fail(400, { error: 'Semua field wajib diisi' });
		}

		if (newPassword.length < 6) {
			return fail(400, { error: 'Password baru harus minimal 6 karakter' });
		}

		if (newPassword !== confirmPassword) {
			return fail(400, { error: 'Konfirmasi password tidak cocok' });
		}

		if (oldPassword === newPassword) {
			return fail(400, { error: 'Password baru harus berbeda dengan password lama' });
		}

		try {
			const admin = await prisma.admin.findUnique({
				where: { id: locals.admin.id }
			});

			if (!admin) {
				return fail(401, { error: 'Admin tidak ditemukan' });
			}

			// Verifikasi password lama
			if (!verifyPassword(oldPassword, admin.password)) {
				return fail(401, { error: 'Password lama salah' });
			}

			// Hash password baru dan update
			const hashedPassword = hashPassword(newPassword);
			await prisma.admin.update({
				where: { id: locals.admin.id },
				data: { password: hashedPassword }
			});

			return { success: true, message: 'Password berhasil diubah' };
		} catch (error) {
			console.error('Change password error:', error);
			return fail(500, { error: 'Gagal mengubah password' });
		}
	}
};
