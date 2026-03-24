import { json } from '@sveltejs/kit';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	if (!locals.admin) return json({ error: 'Unauthorized' }, { status: 401 });

	const formData = await request.formData();
	const file = /** @type {File} */ (formData.get('file'));

	if (!file || typeof file === 'string') {
		return json({ error: 'No file uploaded' }, { status: 400 });
	}

	// Create uploads directory if it doesn't exist
	const uploadsDir = path.resolve('static/uploads');
	if (!existsSync(uploadsDir)) {
		await mkdir(uploadsDir, { recursive: true });
	}

	// Generate unique filename
	const ext = path.extname(file.name) || '.png';
	const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
	const filepath = path.join(uploadsDir, filename);

	// Write file
	const buffer = Buffer.from(await file.arrayBuffer());
	await writeFile(filepath, buffer);

	return json({ url: `/uploads/${filename}` });
}
