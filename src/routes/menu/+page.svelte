<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { isEditMode } from '$lib/stores/adminStore.js';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();

	const isAdmin = $derived($page.data?.isAdmin ?? false);
	let allMenuItems = $derived(data.menuItems);

	let selectedCategory = $state('Makanan Utama');
	let selectedItem = $state(null);
	let showEditModal = $state(false);
	let editingItem = $state(null);
	let isNewItem = $state(false);
	let uploading = $state(false);

	/** @type {HTMLInputElement|null} */
	let fileInputRef = $state(null);

	const categories = $derived([...new Set(allMenuItems.map((/** @type {any} */ i) => i.category))]);

	const filteredItems = $derived(
		allMenuItems.filter((/** @type {any} */ item) => item.category === selectedCategory)
	);

	const formatPrice = (/** @type {number|string} */ price) => {
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

	// Admin functions
	function openAddModal() {
		isNewItem = true;
		editingItem = {
			name: '',
			description: '',
			price: 0,
			image: '',
			category: selectedCategory,
			badge: '',
			isFeatured: false,
			sortOrder: allMenuItems.length
		};
		showEditModal = true;
	}

	function openEditModal(item) {
		isNewItem = false;
		editingItem = { ...item };
		showEditModal = true;
	}

	function closeEditModal() {
		showEditModal = false;
		editingItem = null;
	}

	async function saveItem() {
		if (!editingItem) return;

		const url = isNewItem ? '/api/menu' : `/api/menu/${editingItem.id}`;
		const method = isNewItem ? 'POST' : 'PUT';

		await fetch(url, {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(editingItem)
		});

		closeEditModal();
		await invalidateAll();
	}

	async function deleteItem(id) {
		if (!confirm('Yakin ingin menghapus menu ini?')) return;

		await fetch(`/api/menu/${id}`, { method: 'DELETE' });
		closeDetail();
		await invalidateAll();
	}

	async function handleFileUpload(e) {
		const file = e.target?.files?.[0];
		if (!file || !editingItem) return;

		uploading = true;
		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await fetch('/api/upload', { method: 'POST', body: formData });
			const data = await res.json();
			if (data.url) {
				editingItem.image = data.url;
			}
		} catch (err) {
			console.error('Upload failed:', err);
		} finally {
			uploading = false;
			if (fileInputRef) fileInputRef.value = '';
		}
	}
</script>

<!-- Hidden file input -->
<input
	type="file"
	accept="image/*"
	class="hidden"
	bind:this={fileInputRef}
	onchange={handleFileUpload}
/>

<svelte:head>
	<title>Menu Warung Badiduud - Waroeng Badiduud Ayam Geprek, Paket Hemat & Cemilan</title>
	<meta name="description" content="Menu Warung Badiduud (Waroeng Badiduud): ayam geprek crispy, paket hemat, rice bowl, dan cemilan nusantara dengan harga terjangkau. Cita rasa autentik, bahan berkualitas!" />
	<meta name="keywords" content="menu warung badiduud, menu waroeng badiduud, warung badidud menu, waroeng badidud menu, ayam geprek murah, paket hemat enak, rice bowl, cemilan, daftar menu, harga ayam geprek" />
	<meta name="author" content="Warung Badiduud" />
	<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
	<meta name="language" content="id-ID" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://badidiud.boday.my.id/menu" />
	<meta property="og:title" content="Menu Warung Badiduud - Ayam Geprek & Cemilan Enak" />
	<meta property="og:description" content="Menu lengkap Warung Badiduud: ayam geprek, paket hemat, rice bowl, dan cemilan nusantara dengan harga terjangkau." />
	<meta property="og:image" content="https://badidiud.boday.my.id/og-image.jpg" />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://badidiud.boday.my.id/menu" />
	<meta name="twitter:title" content="Menu Warung Badiduud - Ayam Geprek & Cemilan" />
	<meta name="twitter:description" content="Menu lengkap Warung Badiduud: ayam geprek, paket hemat, rice bowl, dan cemilan nusantara dengan harga terjangkau." />
	<meta name="twitter:image" content="https://badidiud.boday.my.id/og-image.jpg" />
	
	<!-- Canonical URL -->
	<link rel="canonical" href="https://badidiud.boday.my.id/menu" />
	
	<!-- Structured Data - Menu -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Menu",
			"name": "Menu Warung Badiduud",
			"alternateName": ["Menu Waroeng Badiduud", "Menu Warung Badidud", "Menu Waroeng Badidud"],
			"description": "Daftar menu lengkap Warung Badiduud (Waroeng Badiduud) dengan ayam geprek, paket hemat, rice bowl, dan cemilan nusantara",
			"url": "https://badidiud.boday.my.id/menu",
			"hasMenuSection": [
				{
					"@type": "MenuSection",
					"name": "Makanan Utama",
					"hasMenuItem": [
						{
							"@type": "MenuItem",
							"name": "Ayam Geprek",
							"description": "Ayam goreng crispy dengan sambal geprek pedas nusantara",
							"offers": {
								"@type": "Offer",
								"priceCurrency": "IDR",
								"price": "15000"
							}
						}
					]
				},
				{
					"@type": "MenuSection",
					"name": "Cemilan",
					"hasMenuItem": [
						{
							"@type": "MenuItem",
							"name": "Cemilan Nusantara",
							"description": "Aneka cemilan tradisional Indonesia"
						}
					]
				}
			]
		}
	</script>
</svelte:head>

<Header />

<main class="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
	<div class="mx-auto max-w-7xl px-6">
		<!-- Header Section -->
		<div class="mb-16 text-center">
			<div class="mb-4 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2">
				<span class="material-symbols-outlined text-sm text-red-700">restaurant_menu</span>
				<span class="text-sm font-semibold text-red-700">Pilihan Lezat</span>
			</div>
			<h1 class="mb-4 text-5xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
				Daftar Menu
			</h1>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				Pilih kategori dan nikmati kelezatan menu kami dengan bahan berkualitas terbaik
			</p>
		</div>

		<!-- Category Tabs -->
		<div class="mb-12 flex flex-wrap justify-center gap-3">
			{#each categories as category}
				<button
					onclick={() => (selectedCategory = category)}
					class="group relative overflow-hidden rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 md:px-8 md:py-4 md:text-base {selectedCategory ===
					category
						? 'scale-105 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-700/30'
						: 'border border-gray-200 bg-white text-gray-700 shadow-md hover:scale-105 hover:shadow-lg'}"
				>
					<span class="relative z-10 flex items-center gap-2">
						{#if category === 'Makanan Utama'}
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

		<!-- Admin Add Button -->
		{#if $isEditMode && isAdmin}
			<div class="mb-8 flex justify-end">
				<button
					onclick={openAddModal}
					class="flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-700"
				>
					<span class="material-symbols-outlined">add</span>
					Tambah Menu
				</button>
			</div>
		{/if}

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
			{#each filteredItems as item (item.id)}
				<div
					class="group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-700/10"
					onclick={() => openDetail(item)}
				>
					<!-- Admin Edit/Delete Buttons -->
					{#if $isEditMode && isAdmin}
						<div class="absolute top-2 right-2 z-10 flex gap-1">
							<button
								onclick={(e) => {
									e.stopPropagation();
									openEditModal(item);
								}}
								class="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600"
								aria-label="Edit"
							>
								<span class="material-symbols-outlined text-sm">edit</span>
							</button>
							<button
								onclick={(e) => {
									e.stopPropagation();
									deleteItem(item.id);
								}}
								class="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700"
								aria-label="Delete"
							>
								<span class="material-symbols-outlined text-sm">delete</span>
							</button>
						</div>
					{/if}

					<!-- Image Container -->
					<div
						class="relative h-52 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
					>
						<img
							alt={item.name}
							class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
							src={item.image}
							loading="lazy"
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						></div>
						{#if item.badge}
							<span
								class="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 text-xs font-bold text-white uppercase shadow-lg"
							>
								<span class="material-symbols-outlined text-xs">star</span>
								{item.badge}
							</span>
						{/if}
					</div>

					<!-- Content -->
					<div class="p-5">
						<h3 class="mb-2 line-clamp-1 text-lg font-bold text-gray-900">{item.name}</h3>
						{#if item.description}
							<p class="mb-3 line-clamp-2 text-sm text-gray-600">{item.description}</p>
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
				<div class="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
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
			class="animate-fade-in fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-md"
			style="padding-top: 40px; padding-bottom: 40px;"
			onclick={closeDetail}
			role="dialog"
			aria-modal="true"
		>
			<div
				class="animate-scale-in relative my-auto w-full max-w-4xl overflow-hidden rounded-[32px] bg-white shadow-2xl"
				onclick={(e) => e.stopPropagation()}
			>
				<button
					onclick={closeDetail}
					class="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-red-700 hover:text-white hover:shadow-xl"
					aria-label="Tutup"
				>
					<span class="material-symbols-outlined text-xl">close</span>
				</button>

				<div class="grid grid-cols-1 md:grid-cols-2">
					<div
						class="relative h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 md:h-full"
					>
						<img
							alt={selectedItem.name}
							class="h-full w-full object-cover"
							src={selectedItem.image}
						/>
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r"
						></div>
						{#if selectedItem.badge}
							<div class="absolute top-5 left-5">
								<span
									class="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-xs font-bold tracking-wider text-white uppercase shadow-lg shadow-amber-500/30"
								>
									<span class="material-symbols-outlined text-sm">star</span>
									{selectedItem.badge}
								</span>
							</div>
						{/if}
						<div class="absolute bottom-5 left-5">
							<span
								class="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold tracking-wider text-gray-900 uppercase shadow-lg backdrop-blur-sm"
							>
								<span class="material-symbols-outlined text-sm text-red-700">restaurant_menu</span>
								{selectedItem.category}
							</span>
						</div>
					</div>

					<div
						class="flex flex-col overflow-y-auto p-6 md:p-10"
						style="max-height: calc(100vh - 120px);"
					>
						<div class="mb-8">
							<h2 class="mb-3 text-2xl leading-tight font-bold text-gray-900 md:text-3xl">
								{selectedItem.name}
							</h2>
							<div class="flex items-baseline gap-2">
								<span class="text-4xl font-black tracking-tight text-red-700">
									{formatPrice(selectedItem.price)}
								</span>
							</div>
						</div>

						{#if selectedItem.description}
							<div class="mb-8">
								<h3
									class="mb-3 flex items-center gap-2 text-sm font-bold tracking-wider text-gray-500 uppercase"
								>
									<span class="material-symbols-outlined text-lg text-red-700">description</span>
									Deskripsi
								</h3>
								<p class="text-base leading-relaxed text-gray-700">{selectedItem.description}</p>
							</div>
						{:else}
							<div class="mb-8">
								<p class="text-base leading-relaxed text-gray-600 italic">
									Nikmati kelezatan {selectedItem.name} dengan cita rasa nusantara yang autentik.
								</p>
							</div>
						{/if}

						<div class="mb-8">
							<h3 class="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase">
								Keunggulan
							</h3>
							<div class="grid grid-cols-2 gap-3">
								<div
									class="flex items-center gap-3 rounded-xl bg-green-50 p-3 transition-colors hover:bg-green-100"
								>
									<div
										class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100"
									>
										<span class="material-symbols-outlined text-sm text-green-700">verified</span>
									</div>
									<span class="text-sm font-semibold text-green-800">100% Halal</span>
								</div>
								<div
									class="flex items-center gap-3 rounded-xl bg-red-50 p-3 transition-colors hover:bg-red-100"
								>
									<div
										class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100"
									>
										<span class="material-symbols-outlined text-sm text-red-700"
											>local_fire_department</span
										>
									</div>
									<span class="text-sm font-semibold text-red-800">Bumbu Segar</span>
								</div>
								<div
									class="flex items-center gap-3 rounded-xl bg-amber-50 p-3 transition-colors hover:bg-amber-100"
								>
									<div
										class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100"
									>
										<span class="material-symbols-outlined text-sm text-amber-700">restaurant</span>
									</div>
									<span class="text-sm font-semibold text-amber-800">Resep Asli</span>
								</div>
								<div
									class="flex items-center gap-3 rounded-xl bg-blue-50 p-3 transition-colors hover:bg-blue-100"
								>
									<div
										class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100"
									>
										<span class="material-symbols-outlined text-sm text-blue-700"
											>delivery_dining</span
										>
									</div>
									<span class="text-sm font-semibold text-blue-800">Siap Diantar</span>
								</div>
							</div>
						</div>

						<div class="flex-1"></div>

						<div class="mt-6 space-y-3">
							<a
								href="https://wa.me/62895365453833?text={encodeURIComponent(
									`Halo Warung Badiduud, saya ingin memesan ${selectedItem.name} seharga ${formatPrice(selectedItem.price)}. Apakah tersedia?`
								)}"
								target="_blank"
								rel="noopener noreferrer"
								class="group flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-green-600 to-green-700 py-4 font-bold text-white shadow-lg shadow-green-700/30 transition-all duration-300 hover:scale-[1.02] hover:from-green-700 hover:to-green-800 hover:shadow-xl hover:shadow-green-700/40"
							>
								<span
									class="material-symbols-outlined transition-transform duration-300 group-hover:scale-110"
									>chat</span
								>
								<span>Pesan via WhatsApp</span>
							</a>

							{#if $isEditMode && isAdmin}
								<button
									onclick={() => openEditModal(selectedItem)}
									class="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-500 px-4 py-2 font-bold text-white transition-all duration-300 hover:bg-amber-600"
								>
									<span class="material-symbols-outlined">edit</span>
									<span>Edit Menu Ini</span>
								</button>
							{/if}

							<button
								onclick={closeDetail}
								class="flex items-center justify-center gap-2 rounded-2xl border-2 border-gray-200 px-4 py-2 font-bold text-gray-700 transition-all duration-300 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
							>
								<span class="material-symbols-outlined">close</span>
								<span>Tutup</span>
							</button>
						</div>

						<div
							class="mt-5 flex items-start gap-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 p-4"
						>
							<span class="material-symbols-outlined mt-0.5 text-amber-700">info</span>
							<p class="text-sm leading-relaxed text-amber-900">
								<span class="font-bold">Cara Pesan:</span> Klik tombol di atas untuk terhubung dengan
								WhatsApp kami. Tim kami akan merespons pesanan Anda dengan cepat.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/if}

	<!-- Edit/Add Menu Item Modal -->
	{#if showEditModal && editingItem}
		<div
			class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
			onclick={closeEditModal}
			role="dialog"
			aria-modal="true"
		>
			<div
				class="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
				onclick={(e) => e.stopPropagation()}
			>
				<div class="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5">
					<h2 class="text-xl font-bold text-white">
						{isNewItem ? 'Tambah Menu Baru' : 'Edit Menu'}
					</h2>
				</div>

				<div class="max-h-[60vh] overflow-y-auto p-6">
					<div class="space-y-4">
						<div>
							<label for="edit-name" class="mb-1 block text-sm font-semibold text-gray-700"
								>Nama</label
							>
							<input
								id="edit-name"
								type="text"
								bind:value={editingItem.name}
								class="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-red-500 focus:outline-none"
							/>
						</div>
						<div>
							<label for="edit-desc" class="mb-1 block text-sm font-semibold text-gray-700"
								>Deskripsi</label
							>
							<textarea
								id="edit-desc"
								bind:value={editingItem.description}
								rows="2"
								class="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-red-500 focus:outline-none"
							></textarea>
						</div>
						<div>
							<label for="edit-price" class="mb-1 block text-sm font-semibold text-gray-700"
								>Harga (Rp)</label
							>
							<input
								id="edit-price"
								type="number"
								bind:value={editingItem.price}
								class="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-red-500 focus:outline-none"
							/>
						</div>
						<div>
							<label for="edit-image" class="mb-1 block text-sm font-semibold text-gray-700"
								>Gambar</label
							>
							<div class="flex gap-2">
								<input
									id="edit-image"
									type="text"
									bind:value={editingItem.image}
									class="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-red-500 focus:outline-none"
									placeholder="URL gambar atau upload file"
								/>
								<button
									onclick={() => fileInputRef?.click()}
									disabled={uploading}
									class="flex items-center gap-1 rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50"
								>
									{#if uploading}
										<span class="material-symbols-outlined animate-spin text-sm"
											>progress_activity</span
										>
									{:else}
										<span class="material-symbols-outlined text-sm">upload_file</span>
									{/if}
									Upload
								</button>
							</div>
							{#if editingItem.image}
								<div class="mt-2 overflow-hidden rounded-lg border border-gray-200">
									<img src={editingItem.image} alt="Preview" class="h-32 w-full object-cover" />
								</div>
							{/if}
						</div>
						<div>
							<label for="edit-category" class="mb-1 block text-sm font-semibold text-gray-700"
								>Kategori</label
							>
							<input
								id="edit-category"
								type="text"
								bind:value={editingItem.category}
								class="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-red-500 focus:outline-none"
							/>
						</div>
						<div>
							<label for="edit-badge" class="mb-1 block text-sm font-semibold text-gray-700"
								>Badge (opsional)</label
							>
							<input
								id="edit-badge"
								type="text"
								bind:value={editingItem.badge}
								class="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-red-500 focus:outline-none"
								placeholder="e.g. Best Seller"
							/>
						</div>
					</div>
				</div>

				<div class="flex gap-3 border-t border-gray-100 px-6 py-4">
					<button
						onclick={closeEditModal}
						class="flex-1 rounded-xl border-2 border-gray-200 py-3 font-bold text-gray-700 hover:bg-gray-50"
					>
						Batal
					</button>
					<button
						onclick={saveItem}
						class="flex-1 rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-3 font-bold text-white shadow-lg hover:scale-[1.02]"
					>
						{isNewItem ? 'Tambah' : 'Simpan'}
					</button>
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
