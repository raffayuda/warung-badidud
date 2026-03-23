<script>
	import { features } from '$lib/data/menu.js';
</script>

<!-- Features Section -->
<section class="bg-gray-50 py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-4">
			{#each features as feature (feature.id)}
				<div class="flex flex-col items-start gap-4">
					<div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-700">
						<span class="material-symbols-outlined text-3xl">{feature.icon}</span>
					</div>
					<h3 class="text-xl font-bold">{feature.title}</h3>
					<p class="text-sm leading-relaxed text-gray-600">{feature.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
