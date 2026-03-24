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

	onMount(() => {
		let interval;
		const startAutoPlay = () => {
			interval = setInterval(() => {
				if (isAutoPlay && slides.length > 0) {
					currentSlide = (currentSlide + 1) % slides.length;
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
</script>

<!-- Hero Carousel -->
<section class="relative min-h-screen overflow-hidden bg-black pt-20">
	<div class="relative h-[calc(100vh-80px)] w-full">
		{#each slides as slide, index (slide.id)}
			{#if index === currentSlide}
				<div
					class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
					in:fade
					out:fade
				>
					<img
						alt={slide.title}
						class="absolute inset-0 h-full w-full object-cover brightness-50"
						src={slide.image}
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

							{#if $isEditMode && isAdmin}
								<div class="mb-4 flex items-center gap-2">
									<span class="text-xs text-amber-400">Image URL:</span>
									<input
										type="text"
										value={slide.image}
										onchange={(e) => updateSlideField(index, 'image', e.target.value)}
										class="flex-1 rounded-lg border border-amber-400 bg-black/50 px-3 py-1 text-xs text-white"
									/>
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
		{#each slides as slide, index (slide.id)}
			{@const isActive = index === currentSlide}
			<button
				onclick={() => goToSlide(index)}
				aria-label="Go to slide {index + 1}"
				class="h-3 rounded-full transition-all duration-300 {isActive ? 'w-8 bg-red-600' : 'w-3 bg-white/50 hover:bg-white/70'}"
			></button>
		{/each}
	</div>
</section>
