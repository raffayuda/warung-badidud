<script>
	import { menuItems } from '$lib/data/menu.js';
</script>

<!-- Menu Products Section -->
<section class="bg-white py-24" id="menu">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mb-16 flex flex-col items-start justify-between md:flex-row md:items-end">
			<div>
				<h2 class="mb-2 text-4xl font-extrabold tracking-tight">Populer Kami</h2>
				<p class="text-gray-600">Pilihan juara yang paling dicari pelanggan setia kami.</p>
			</div>
			<a
				href="/menu"
				class="mt-4 flex items-center gap-2 rounded-full bg-red-700 px-6 py-3 font-bold text-white transition-all duration-300 hover:bg-red-800 hover:scale-105 md:mt-0"
			>
				<span>Lihat Semua Menu</span>
				<span class="material-symbols-outlined">arrow_forward</span>
			</a>
		</div>

		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each menuItems as item (item.id)}
				<div
					class="group overflow-hidden rounded-xl bg-white shadow-sm transition-transform duration-300 hover:scale-[1.02]"
				>
					<div class="relative h-64 overflow-hidden">
						<img
							alt={item.name}
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
							src={item.image}
						/>
						{#if item.badge}
							<span
								class="absolute top-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase text-white"
								class:bg-amber-500={item.badge === 'Best Seller'}
								class:bg-orange-500={item.badge === 'Chef Pick'}
							>
								{item.badge}
							</span>
						{/if}
					</div>

					<div class="p-6">
						<h3 class="mb-1 text-lg font-bold">{item.name}</h3>
						<p class="mb-4 line-clamp-2 text-xs text-gray-600">{item.description}</p>

						<div class="flex items-center justify-between">
							<span class="text-xl font-bold tracking-tight text-red-700">{item.price}</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
