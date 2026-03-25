import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: { 
		adapter: adapter({
			// Use edge function for better performance
			routes: {
				include: ['/*'],
				exclude: []
			}
		})
	}
};

export default config;
