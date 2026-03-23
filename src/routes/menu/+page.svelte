<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { allMenuItems } from '$lib/data/menu.js';

	let selectedCategory = $state('Makanan Utama');
	let selectedItem = $state(null);

	const categories = ['Makanan Utama', 'Cemilan', 'Nasi Mangkuk'];

	const filteredItems = $derived(allMenuItems.filter((item) => item.category === selectedCategory));

	const formatPrice = (price) => {
		return typeof price === 'number' ? `Rp ${price.toLocaleString('id-ID')}` : price;
	};

	function openDetail(item) {
		selectedItem = item;
		document.body.style.overflow = 'hidden';
	}

	function closeDetail() {
		selectedItem = null;
		document.body.style.overflow = '';
	}

	function orderViaWhatsApp(item) {
		const message = `Halo Warung Badiduud, saya ingin memesan ${item.name} seharga ${formatPrice(item.price)}. Apakah tersedia?`;
		const url = `https://wa.me/62812345678?text=${encodeURIComponent(message)}`;
		window.open(url, '_blank', 'noopener,noreferrer');
	}
</script>

<svelte:head>
	<title>Daftar Menu - Warung Badiduud</title>
</svelte:head>

<Header />

<main class="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
	<div class="mx-auto max-w-7xl px-6">
		<!-- Header Section -->
		<div class="mb-16 text-center">
			<div class="mb-4 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2">
				<span class="material-symbols-outlined text-red-700 text-sm">restaurant_menu</span>
				<span class="text-sm font-semibold text-red-700">Pilihan Lezat</span>
			</div>
			<h1 class="mb-4 text-5xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
				Daftar Menu
			</h1>
			<p class="text-lg text-gray-600 max-w-2xl mx-auto">
				Pilih kategori dan nikmati kelezatan menu kami dengan bahan berkualitas terbaik
			</p>
		</div>

		<!-- Category Tabs -->
		<div class="mb-12 flex flex-wrap justify-center gap-3">
			{#each categories as category}
				<button
					onclick={() => (selectedCategory = category)}
					class="group relative overflow-hidden rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 md:px-8 md:py-4 md:text-base {selectedCategory === category
						? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-700/30 scale-105'
						: 'bg-white text-gray-700 shadow-md hover:shadow-lg hover:scale-105 border border-gray-200'}"
				>
					<span class="relative z-10 flex items-center gap-2">
						{#if category === 'Makanan'}
							<span class="material-symbols-outlined text-sm">lunch_dining</span>
						{:else if category === 'Cemilan'}
							<span class="material-symbols-outlined text-sm">cookie</span>
						{:else}
							<span class="material-symbols-outlined text-sm">rice_bowl</span>
						{/if}
						{category}
					</span>
				</button>
			{/each}
		</div>

		<!-- Results Count -->
		<div class="mb-8 flex items-center justify-between">
			<p class="text-sm text-gray-600">
				Menampilkan
				<span class="font-bold text-red-700">{filteredItems.length}</span>
				menu dari kategori
				<span class="font-semibold text-gray-900">{selectedCategory}</span>
			</p>
		</div>

		<!-- Menu Items Grid -->
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each filteredItems as item}
				<div
					class="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-red-700/10 hover:-translate-y-1 cursor-pointer"
					onclick={() => openDetail(item)}
				>
					<!-- Image Container -->
					<div class="relative h-52 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
						<img
							alt={item.name}
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
							src={item.image}
							loading="lazy"
						/>
						<!-- Overlay Gradient -->
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						></div>
						<!-- Badge -->
						{#if item.badge}
							<span
								class="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 text-xs font-bold uppercase text-white shadow-lg"
							>
								<span class="material-symbols-outlined text-xs">star</span>
								{item.badge}
							</span>
						{/if}
						<!-- View Detail Button -->
						<button
							class="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-red-700 shadow-lg opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 scale-75 hover:bg-red-700 hover:text-white"
							aria-label="Lihat detail"
							onclick={(e) => {
								e.stopPropagation();
								openDetail(item);
							}}
						>
							<span class="material-symbols-outlined text-lg">visibility</span>
						</button>
					</div>

					<!-- Content -->
					<div class="p-5">
						<h3 class="mb-2 text-lg font-bold text-gray-900 line-clamp-1">{item.name}</h3>

						{#if item.description}
							<p class="mb-3 text-sm text-gray-600 line-clamp-2">{item.description}</p>
						{/if}

						<div class="flex items-center justify-between">
							<span class="text-xl font-black text-red-700">{formatPrice(item.price)}</span>
							<span class="text-xs text-gray-500">Klik untuk detail</span>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Empty State -->
		{#if filteredItems.length === 0}
			<div class="flex flex-col items-center justify-center py-20">
				<div
					class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100"
				>
					<span class="material-symbols-outlined text-4xl text-red-700">restaurant</span>
				</div>
				<p class="mb-2 text-xl font-bold text-gray-900">Menu Tidak Tersedia</p>
				<p class="text-gray-600">Maaf, kategori ini sedang tidak tersedia</p>
			</div>
		{/if}
	</div>

	<!-- Detail Modal -->
	{#if selectedItem}
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md animate-fade-in overflow-y-auto"
			style="padding-top: 40px; padding-bottom: 40px;"
			onclick={closeDetail}
			role="dialog"
			aria-modal="true"
		>
			<div
				class="relative my-auto w-full max-w-4xl overflow-hidden rounded-[32px] bg-white shadow-2xl animate-scale-in"
				onclick={(e) => e.stopPropagation()}
			>
				<!-- Close Button -->
				<button
					onclick={closeDetail}
					class="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-red-700 hover:text-white hover:scale-110 hover:shadow-xl"
					aria-label="Tutup"
				>
					<span class="material-symbols-outlined text-xl">close</span>
				</button>

				<div class="grid grid-cols-1 md:grid-cols-2">
					<!-- Image Section -->
					<div class="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 md:h-full">
						<img
							alt={selectedItem.name}
							class="h-full w-full object-cover"
							src={selectedItem.image}
						/>
						<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r"></div>
						{#if selectedItem.badge}
							<div class="absolute top-5 left-5">
								<span
									class="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-amber-500/30"
								>
									<span class="material-symbols-outlined text-sm">star</span>
									{selectedItem.badge}
								</span>
							</div>
						{/if}
						<!-- Category Badge -->
						<div class="absolute bottom-5 left-5">
							<span class="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-900 shadow-lg backdrop-blur-sm">
								<span class="material-symbols-outlined text-sm text-red-700">restaurant_menu</span>
								{selectedItem.category}
							</span>
						</div>
					</div>

					<!-- Content Section -->
					<div class="flex flex-col overflow-y-auto p-6 md:p-10" style="max-height: calc(100vh - 120px);">
						<!-- Title & Price -->
						<div class="mb-8">
							<h2 class="mb-3 text-2xl font-bold leading-tight text-gray-900 md:text-3xl">
								{selectedItem.name}
							</h2>
							<div class="flex items-baseline gap-2">
								<span class="text-4xl font-black tracking-tight text-red-700">
									{formatPrice(selectedItem.price)}
								</span>
							</div>
						</div>

						<!-- Description -->
						{#if selectedItem.description}
							<div class="mb-8">
								<h3 class="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-500">
									<span class="material-symbols-outlined text-lg text-red-700">description</span>
									Deskripsi
								</h3>
								<p class="text-base leading-relaxed text-gray-700">
									{selectedItem.description}
								</p>
							</div>
						{:else}
							<div class="mb-8">
								<p class="text-base leading-relaxed text-gray-600 italic">
									Nikmati kelezatan {selectedItem.name} dengan cita rasa nusantara yang autentik.
								</p>
							</div>
						{/if}

						<!-- Features -->
						<div class="mb-8">
							<h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500">
								Keunggulan
							</h3>
							<div class="grid grid-cols-2 gap-3">
								<div class="flex items-center gap-3 rounded-xl bg-green-50 p-3 transition-colors hover:bg-green-100">
									<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
										<span class="material-symbols-outlined text-sm text-green-700">
											verified
										</span>
									</div>
									<span class="text-sm font-semibold text-green-800">100% Halal</span>
								</div>
								<div class="flex items-center gap-3 rounded-xl bg-red-50 p-3 transition-colors hover:bg-red-100">
									<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
										<span class="material-symbols-outlined text-sm text-red-700">
											local_fire_department
										</span>
									</div>
									<span class="text-sm font-semibold text-red-800">Bumbu Segar</span>
								</div>
								<div class="flex items-center gap-3 rounded-xl bg-amber-50 p-3 transition-colors hover:bg-amber-100">
									<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
										<span class="material-symbols-outlined text-sm text-amber-700">
											restaurant
										</span>
									</div>
									<span class="text-sm font-semibold text-amber-800">Resep Asli</span>
								</div>
								<div class="flex items-center gap-3 rounded-xl bg-blue-50 p-3 transition-colors hover:bg-blue-100">
									<div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
										<span class="material-symbols-outlined text-sm text-blue-700">
											delivery_dining
										</span>
									</div>
									<span class="text-sm font-semibold text-blue-800">Siap Diantar</span>
								</div>
							</div>
						</div>

						<!-- Spacer -->
						<div class="flex-1"></div>

						<!-- CTA Buttons -->
						<div class="mt-6 space-y-3">
							<a
								href="https://wa.me/62812345678?text={encodeURIComponent(`Halo Warung Badiduud, saya ingin memesan ${selectedItem.name} seharga ${formatPrice(selectedItem.price)}. Apakah tersedia?`)}"
								target="_blank"
								rel="noopener noreferrer"
								class="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-green-600 to-green-700 py-4 font-bold text-white shadow-lg shadow-green-700/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-green-700/40 hover:from-green-700 hover:to-green-800"
							>
								<span class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110">
									chat
								</span>
								<span>Pesan via WhatsApp</span>
							</a>
							
							<button
								onclick={closeDetail}
								class="flex items-center justify-center gap-2 rounded-2xl border-2 border-gray-200 py-2 px-4 font-bold text-gray-700 transition-all duration-300 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900"
							>
								<span class="material-symbols-outlined">close</span>
								<span>Tutup</span>
							</button>
						</div>

						<!-- Info Note -->
						<div class="mt-5 flex items-start gap-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 p-4">
							<span class="material-symbols-outlined mt-0.5 text-amber-700">info</span>
							<p class="text-sm leading-relaxed text-amber-900">
								<span class="font-bold">Cara Pesan:</span> Klik tombol di atas untuk terhubung
								dengan WhatsApp kami. Tim kami akan merespons pesanan Anda dengan cepat.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>

<Footer />

<style>
	main {
		min-height: calc(100vh - 80px);
	}

	:global(.animate-fade-in) {
		animation: fadeIn 0.2s ease-out;
	}

	:global(.animate-scale-in) {
		animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	:global(.overflow-y-auto::-webkit-scrollbar) {
		width: 8px;
	}

	:global(.overflow-y-auto::-webkit-scrollbar-track) {
		background: #f1f1f1;
		border-radius: 4px;
	}

	:global(.overflow-y-auto::-webkit-scrollbar-thumb) {
		background: #c1c1c1;
		border-radius: 4px;
	}

	:global(.overflow-y-auto::-webkit-scrollbar-thumb:hover) {
		background: #a1a1a1;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes scaleIn {
		from {
			opacity: 0;
			transform: scale(0.95) translateY(10px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}
</style>
