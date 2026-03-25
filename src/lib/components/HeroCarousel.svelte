<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { isEditMode } from '$lib/stores/adminStore.js';
	import { page } from '$app/stores';
	import EditableText from './EditableText.svelte';
	import { invalidateAll } from '$app/navigation';

	/** @type {{ slides: any[] }} */
	let { slides } = $props();

	const isAdmin = $derived($page.data?.isAdmin ?? false);

	let currentSlide = $state(0);
	let isAutoPlay = $state(true);
	let uploading = $state(false);
	let loadedSlides = $state(new Set());

	/** @type {HTMLInputElement|null} */
	let fileInputRef = $state(null);
	let activeUploadIndex = $state(-1);

	function preloadSlide(index) {
		if (loadedSlides.has(index)) return;
		const slide = slides[index];
		if (slide?.image) {
			const img = new Image();
			img.src = slide.image;
			loadedSlides.add(index);
		}
	}

	onMount(() => {
		// Preload first 2 slides immediately
		preloadSlide(0);
		if (slides.length > 1) preloadSlide(1);

		let interval;
		const startAutoPlay = () => {
			interval = setInterval(() => {
				if (isAutoPlay && slides.length > 0) {
					currentSlide = (currentSlide + 1) % slides.length;
					// Preload next slide
					const nextIndex = (currentSlide + 1) % slides.length;
					preloadSlide(nextIndex);
				}
			}, 5000);
		};
		startAutoPlay();
		return () => { if (interval) clearInterval(interval); };
	});

	const goToSlide = (index) => {
		currentSlide = index;
		isAutoPlay = false;
		setTimeout(() => { isAutoPlay = true; }, 10000);
	};

	async function saveSlides(updatedSlides) {
		await fetch('/api/content/hero', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updatedSlides)
		});
		await invalidateAll();
	}

	function updateSlideField(index, field, value) {
		const updated = [...slides];
		updated[index] = { ...updated[index], [field]: value };
		saveSlides(updated);
	}

	function triggerFileUpload(index) {
		activeUploadIndex = index;
		fileInputRef?.click();
	}

	async function handleFileUpload(e) {
		const file = e.target?.files?.[0];
		if (!file || activeUploadIndex < 0) return;

		uploading = true;
		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await fetch('/api/upload', { method: 'POST', body: formData });
			const data = await res.json();
			if (data.url) {
				updateSlideField(activeUploadIndex, 'image', data.url);
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

<!-- Hero Carousel -->
<section class="relative min-h-screen overflow-hidden bg-black pt-18">
	<div class="relative h-[calc(100vh-80px)] w-full">
		{#each slides as slide, index (index)}
			{#if index === currentSlide}
				<div
					class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
					in:fade={{ duration: 800 }}
					out:fade={{ duration: 800 }}
				>
					<img
						alt={slide.title}
						class="absolute inset-0 h-full w-full object-cover brightness-50"
						src={slide.image}
						loading={index === 0 ? 'eager' : 'lazy'}
						decoding="async"
						fetchpriority={index === 0 ? 'high' : 'auto'}
					/>
					<div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

					<div class="relative z-10 mx-auto h-full max-w-7xl px-6 flex flex-col justify-center">
						<div class="max-w-3xl">
							<span
								class="mb-6 inline-block rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
							>
								Menu Unggulan
							</span>

							<h1 class="mb-4 text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tighter text-white">
								{#if $isEditMode && isAdmin}
									<EditableText
										value={slide.title}
										tag="span"
										className="text-5xl md:text-7xl font-extrabold text-white"
										onSave={(v) => updateSlideField(index, 'title', v)}
									/>
									<span class="block italic text-red-500">
										<EditableText
											value={slide.subtitle}
											tag="span"
											className="text-5xl md:text-7xl font-extrabold italic text-red-500"
											onSave={(v) => updateSlideField(index, 'subtitle', v)}
										/>
									</span>
								{:else}
									{slide.title}
									<span class="block italic text-red-500">{slide.subtitle}</span>
								{/if}
							</h1>

							<p class="mb-10 text-lg font-medium leading-relaxed text-gray-200">
								{#if $isEditMode && isAdmin}
									<EditableText
										value={slide.description}
										tag="p"
										className="text-lg font-medium text-gray-200"
										onSave={(v) => updateSlideField(index, 'description', v)}
									/>
								{:else}
									{slide.description}
								{/if}
							</p>

							<!-- Image edit controls -->
							{#if $isEditMode && isAdmin}
								<div class="mb-4 rounded-xl bg-black/60 p-4 backdrop-blur-sm border border-amber-400/30">
									<p class="mb-3 text-xs font-bold text-amber-400 uppercase tracking-wider">
										<span class="material-symbols-outlined text-xs align-middle mr-1">image</span>
										Ganti Background Slide {index + 1}
									</p>
									<div class="flex flex-col gap-2 sm:flex-row sm:items-center">
										<input
											type="text"
											value={slide.image}
											onchange={(e) => updateSlideField(index, 'image', e.target.value)}
											class="flex-1 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs text-white placeholder:text-gray-400 focus:border-amber-400 focus:outline-none"
											placeholder="Paste image URL di sini..."
										/>
										<span class="text-xs text-gray-400 hidden sm:block">atau</span>
										<button
											onclick={() => triggerFileUpload(index)}
											disabled={uploading}
											class="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-gray-900 transition-all hover:bg-amber-400 disabled:opacity-50"
										>
											{#if uploading}
												<span class="material-symbols-outlined text-sm animate-spin">progress_activity</span>
												Uploading...
											{:else}
												<span class="material-symbols-outlined text-sm">upload_file</span>
												Pilih File
											{/if}
										</button>
									</div>
								</div>
							{/if}

							<div class="flex flex-wrap gap-4">
								<a
									href="/menu"
									class="flex items-center gap-2 rounded-full bg-red-700 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-red-800 active:scale-95"
								>
									<span>Lihat Menu & Pesan</span>
									<span class="material-symbols-outlined text-xl">arrow_forward</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			{/if}
		{/each}
	</div>

	<!-- Indicator Dots -->
	<div class="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
		{#each slides as slide, index (index)}
			{@const isActive = index === currentSlide}
			<button
				onclick={() => goToSlide(index)}
				aria-label="Go to slide {index + 1}"
				class="h-3 rounded-full transition-all duration-300 {isActive ? 'w-8 bg-red-600' : 'w-3 bg-white/50 hover:bg-white/70'}"
			></button>
		{/each}
	</div>
</section>
