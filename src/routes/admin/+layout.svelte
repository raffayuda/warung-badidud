<script>
	import { page } from '$app/stores';

	export let data;
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
	<!-- Navigation Bar -->
	<nav class="border-b border-slate-700/50 bg-slate-800/30 backdrop-blur sticky top-0 z-40">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<div class="flex items-center gap-4">
					<a href="/" class="text-white hover:text-orange-400 transition">
						<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8M3 8l2.26 2.26a9.75 9.75 0 1013.48 0" />
						</svg>
					</a>
					<div class="text-sm text-slate-400">
						<a href="/" class="hover:text-slate-300">Home</a>
						<span class="mx-2">/</span>
						<span class="text-orange-400">Pengaturan Profil</span>
					</div>
				</div>

				
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<slot />
</div>

<style>
	:global(body) {
		background: linear-gradient(to bottom, #0f172a, #1e293b);
	}
</style>
