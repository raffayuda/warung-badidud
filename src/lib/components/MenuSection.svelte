<script>
	import { isEditMode } from '$lib/stores/adminStore.js';
	import { page } from '$app/stores';
	import { invalidateAll } from '$app/navigation';

	/** @type {{ menuItems: any[] }} */
	let { menuItems } = $props();

	const isAdmin = $derived($page.data?.isAdmin ?? false);

	let showEditModal = $state(false);
	let editingItem = $state(null);
	let isNewItem = $state(false);
	let uploading = $state(false);

	/** @type {HTMLInputElement|null} */
	let fileInputRef = $state(null);

	const formatPrice = (/** @type {number} */ price) => {
		if (typeof price === 'string') return price;
		return `Rp ${Math.round(price / 1000)}k`;
	};

	function openAddModal() {
		isNewItem = true;
		editingItem = {
			name: '',
			description: '',
			price: 0,
			image: '',
			category: 'Spesial',
			badge: '',
			isFeatured: true,
			sortOrder: menuItems.length + 32
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

<!-- Hidden file input for modal -->
<input
	type="file"
	accept="image/*"
	class="hidden"
	bind:this={fileInputRef}
	onchange={handleFileUpload}
/>

<!-- Menu Products Section -->
<section class="bg-white py-24" id="menu">
	<div class="mx-auto max-w-7xl px-6">
		<div class="mb-16 flex flex-col items-start justify-between md:flex-row md:items-end">
			<div>
				<h2 class="mb-2 text-4xl font-extrabold tracking-tight">Populer Kami</h2>
				<p class="text-gray-600">Pilihan juara yang paling dicari pelanggan setia kami.</p>
			</div>
			<div class="mt-4 flex items-center gap-3 md:mt-0">
				{#if $isEditMode && isAdmin}
					<button
						onclick={openAddModal}
						class="flex items-center gap-2 rounded-full bg-green-600 px-5 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-700"
					>
						<span class="material-symbols-outlined text-lg">add</span>
						Tambah
					</button>
				{/if}
				<a
					href="/menu"
					class="flex items-center gap-2 rounded-full bg-red-700 px-6 py-3 font-bold text-white transition-all duration-300 hover:bg-red-800 hover:scale-105"
				>
					<span>Lihat Semua Menu</span>
					<span class="material-symbols-outlined">arrow_forward</span>
				</a>
			</div>
		</div>

		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each menuItems as item (item.id)}
				<div
					class="group relative overflow-hidden rounded-xl bg-white shadow-sm transition-transform duration-300 hover:scale-[1.02]"
				>
					<!-- Admin edit/delete overlay -->
					{#if $isEditMode && isAdmin}
						<div class="absolute top-3 right-3 z-10 flex gap-1.5">
							<button
								onclick={() => openEditModal(item)}
								class="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg transition-all hover:scale-110 hover:bg-amber-600"
								aria-label="Edit"
							>
								<span class="material-symbols-outlined text-sm">edit</span>
							</button>
							<button
								onclick={() => deleteItem(item.id)}
								class="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-all hover:scale-110 hover:bg-red-700"
								aria-label="Delete"
							>
								<span class="material-symbols-outlined text-sm">delete</span>
							</button>
						</div>
					{/if}

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
							<span class="text-xl font-bold tracking-tight text-red-700">
								{item.priceFormatted ?? formatPrice(item.price)}
							</span>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Edit/Add Featured Menu Item Modal -->
{#if showEditModal && editingItem}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
		onclick={closeEditModal}
		role="dialog"
		aria-modal="true"
	>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5">
				<h2 class="text-xl font-bold text-white">
					{isNewItem ? 'Tambah Menu Populer' : 'Edit Menu Populer'}
				</h2>
			</div>

			<div class="max-h-[60vh] overflow-y-auto p-6">
				<div class="space-y-4">
					<div>
						<label for="feat-name" class="mb-1 block text-sm font-semibold text-gray-700">Nama</label>
						<input id="feat-name" type="text" bind:value={editingItem.name}
							class="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-red-500 focus:outline-none" />
					</div>
					<div>
						<label for="feat-desc" class="mb-1 block text-sm font-semibold text-gray-700">Deskripsi</label>
						<textarea id="feat-desc" bind:value={editingItem.description} rows="2"
							class="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-red-500 focus:outline-none"></textarea>
					</div>
					<div>
						<label for="feat-price" class="mb-1 block text-sm font-semibold text-gray-700">Harga (Rp)</label>
						<input id="feat-price" type="number" bind:value={editingItem.price}
							class="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-red-500 focus:outline-none" />
					</div>
					<div>
						<label for="feat-image" class="mb-1 block text-sm font-semibold text-gray-700">Gambar</label>
						<div class="flex gap-2">
							<input id="feat-image" type="text" bind:value={editingItem.image}
								class="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 text-sm focus:border-red-500 focus:outline-none"
								placeholder="URL gambar atau upload file" />
							<button
								onclick={() => fileInputRef?.click()}
								disabled={uploading}
								class="flex items-center gap-1 rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50"
							>
								{#if uploading}
									<span class="material-symbols-outlined text-sm animate-spin">progress_activity</span>
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
						<label for="feat-badge" class="mb-1 block text-sm font-semibold text-gray-700">Badge (opsional)</label>
						<input id="feat-badge" type="text" bind:value={editingItem.badge}
							class="w-full rounded-xl border-2 border-gray-200 px-4 py-3 focus:border-red-500 focus:outline-none"
							placeholder="e.g. Best Seller, Chef Pick" />
					</div>
				</div>
			</div>

			<div class="flex gap-3 border-t border-gray-100 px-6 py-4">
				<button onclick={closeEditModal}
					class="flex-1 rounded-xl border-2 border-gray-200 py-3 font-bold text-gray-700 hover:bg-gray-50">
					Batal
				</button>
				<button onclick={saveItem}
					class="flex-1 rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-3 font-bold text-white shadow-lg hover:scale-[1.02]">
					{isNewItem ? 'Tambah' : 'Simpan'}
				</button>
			</div>
		</div>
	</div>
{/if}
