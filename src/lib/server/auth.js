import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import prisma from './prisma.js';

/**
 * Hash a password using scrypt
 * @param {string} password
 * @returns {string}
 */
export function hashPassword(password) {
	const salt = randomBytes(16).toString('hex');
	const hash = scryptSync(password, salt, 64).toString('hex');
	return `${salt}:${hash}`;
}

/**
 * Verify a password against its hash
 * @param {string} password
 * @param {string} storedHash
 * @returns {boolean}
 */
export function verifyPassword(password, storedHash) {
	const [salt, hash] = storedHash.split(':');
	const hashBuffer = Buffer.from(hash, 'hex');
	const keyBuffer = scryptSync(password, salt, 64);
	return timingSafeEqual(hashBuffer, keyBuffer);
}

/**
 * Create a new session for an admin user
 * @param {string} adminId
 * @returns {Promise<string>} session token
 */
export async function createSession(adminId) {
	const token = randomBytes(32).toString('hex');
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

	await prisma.session.create({
		data: {
			token,
			adminId,
			expiresAt
		}
	});

	return token;
}

/**
 * Validate a session token
 * @param {string} token
 * @returns {Promise<import('@prisma/client').Admin | null>}
 */
export async function validateSession(token) {
	if (!token) return null;

	const session = await prisma.session.findUnique({
		where: { token },
		include: { admin: true }
	});

	if (!session) return null;
	if (session.expiresAt < new Date()) {
		await prisma.session.delete({ where: { id: session.id } });
		return null;
	}

	return session.admin;
}

/**
 * Delete a session by token
 * @param {string} token
 * @returns {Promise<void>}
 */
export async function deleteSession(token) {
	if (!token) return;
	try {
		await prisma.session.delete({ where: { token } });
	} catch {
		// Session may already be deleted
	}
}
