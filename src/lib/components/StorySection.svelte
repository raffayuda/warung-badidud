<script>
	import { isEditMode } from '$lib/stores/adminStore.js';
	import { page } from '$app/stores';
	import EditableText from './EditableText.svelte';
	import { invalidateAll } from '$app/navigation';

	/** @type {{ story: any }} */
	let { story } = $props();

	const isAdmin = $derived($page.data?.isAdmin ?? false);
	let uploading = $state(false);

	/** @type {HTMLInputElement|null} */
	let fileInputRef = $state(null);

	const storyData = $derived(story ?? {
		title: 'Dari Dapur Kecil Menuju',
		titleHighlight: 'Hati Indonesia',
		paragraphs: [],
		quote: '',
		quoteAuthor: '',
		image: ''
	});

	async function saveStory(updated) {
		await fetch('/api/content/site', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ key: 'story', value: updated })
		});
		await invalidateAll();
	}

	function updateField(field, value) {
		const updated = { ...storyData, [field]: value };
		saveStory(updated);
	}

	function updateParagraph(index, value) {
		const paragraphs = [...storyData.paragraphs];
		paragraphs[index] = value;
		const updated = { ...storyData, paragraphs };
		saveStory(updated);
	}

	async function handleFileUpload(e) {
		const file = e.target?.files?.[0];
		if (!file) return;

		uploading = true;
		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await fetch('/api/upload', { method: 'POST', body: formData });
			const data = await res.json();
			if (data.url) {
				updateField('image', data.url);
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

<!-- Editorial Story Section -->
<section class="overflow-hidden py-24" id="tentang">
	<div class="mx-auto max-w-7xl px-6">
		<div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
			<div class="relative">
				<div
					class="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-amber-100 blur-3xl"
				></div>

				<img
					alt="Cook"
					class="relative z-10 h-[600px] w-full rounded-3xl object-cover shadow-2xl"
					src={storyData.image}
				/>

				{#if $isEditMode && isAdmin}
					<div class="relative z-20 mt-2 flex gap-2">
						<input
							type="text"
							value={storyData.image}
							onchange={(e) => updateField('image', e.target.value)}
							class="flex-1 rounded-lg border-2 border-amber-400 bg-amber-50 px-3 py-2 text-xs"
							placeholder="URL gambar atau upload file"
						/>
						<button
							onclick={() => fileInputRef?.click()}
							disabled={uploading}
							class="flex items-center gap-1 rounded-lg bg-amber-500 px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-amber-600 disabled:opacity-50"
						>
							{#if uploading}
								<span class="material-symbols-outlined text-xs animate-spin">progress_activity</span>
							{:else}
								<span class="material-symbols-outlined text-xs">upload_file</span>
							{/if}
							Pilih File
						</button>
					</div>
				{/if}

				<div class="absolute -bottom-6 -right-6 z-20 max-w-xs rounded-2xl bg-red-700 p-8 text-white shadow-2xl">
					{#if $isEditMode && isAdmin}
						<EditableText
							value={storyData.quote}
							tag="p"
							className="mb-4 text-lg italic text-white"
							onSave={(v) => updateField('quote', v)}
						/>
						<EditableText
							value={storyData.quoteAuthor}
							tag="p"
							className="text-sm font-bold text-white"
							onSave={(v) => updateField('quoteAuthor', v)}
						/>
					{:else}
						<p class="mb-4 text-lg italic">
							"{storyData.quote}"
						</p>
						<p class="text-sm font-bold">{storyData.quoteAuthor}</p>
					{/if}
				</div>
			</div>

			<div class="flex flex-col gap-8">
				<h2 class="text-5xl font-extrabold leading-tight">
					{#if $isEditMode && isAdmin}
						<EditableText
							value={storyData.title}
							tag="span"
							className="text-5xl font-extrabold"
							onSave={(v) => updateField('title', v)}
						/>
						{' '}
						<span class="italic text-red-600">
							<EditableText
								value={storyData.titleHighlight}
								tag="span"
								className="text-5xl font-extrabold italic text-red-600"
								onSave={(v) => updateField('titleHighlight', v)}
							/>
						</span>
					{:else}
						{storyData.title} <span class="italic text-red-600">{storyData.titleHighlight}</span>
					{/if}
				</h2>

				<div class="space-y-6 leading-relaxed text-gray-700">
					{#each storyData.paragraphs as paragraph, index}
						{#if $isEditMode && isAdmin}
							<EditableText
								value={paragraph}
								tag="p"
								className="leading-relaxed text-gray-700"
								onSave={(v) => updateParagraph(index, v)}
							/>
						{:else}
							<p>{paragraph}</p>
						{/if}
					{/each}
				</div>

				<div class="pt-4">
					<a
						href="/lokasi"
						class="inline-block rounded-full bg-orange-100 px-10 py-4 font-bold text-orange-900 transition-colors hover:bg-orange-200"
					>
						Kunjungi Kami
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
