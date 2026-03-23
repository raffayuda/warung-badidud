<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { heroSlides } from '$lib/data/menu.js';

	let currentSlide = $state(0);
	let isAutoPlay = $state(true);

	// Auto-rotate slides setiap 5 detik
	onMount(() => {
		let interval;

		const startAutoPlay = () => {
			interval = setInterval(() => {
				if (isAutoPlay) {
					currentSlide = (currentSlide + 1) % heroSlides.length;
				}
			}, 5000);
		};

		startAutoPlay();

		return () => {
			if (interval) clearInterval(interval);
		};
	});

	const goToSlide = (index) => {
		currentSlide = index;
		isAutoPlay = false;
		// Resume auto-play setelah 10 detik user tidak interact
		setTimeout(() => {
			isAutoPlay = true;
		}, 10000);
	};

	const nextSlide = () => {
		currentSlide = (currentSlide + 1) % heroSlides.length;
		isAutoPlay = false;
		setTimeout(() => {
			isAutoPlay = true;
		}, 10000);
	};

	const prevSlide = () => {
		currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
		isAutoPlay = false;
		setTimeout(() => {
			isAutoPlay = true;
		}, 10000);
	};
</script>

<!-- Hero Carousel -->
<section class="relative min-h-screen overflow-hidden bg-black pt-20">
	<!-- Slides Container -->
	<div class="relative h-[calc(100vh-80px)] w-full">
		{#each heroSlides as slide, index (slide.id)}
			{#if index === currentSlide}
				<div
					class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
					in:fade
					out:fade
				>
					<!-- Background Image -->
					<img
						alt={slide.title}
						class="absolute inset-0 h-full w-full object-cover brightness-50"
						src={slide.image}
					/>

					<!-- Gradient Overlay -->
					<div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

					<!-- Content -->
					<div class="relative z-10 mx-auto h-full max-w-7xl px-6 flex flex-col justify-center">
						<div class="max-w-3xl">
							<span
								class="mb-6 inline-block rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
							>
								Menu Unggulan
							</span>

							<h1 class="mb-4 text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tighter text-white">
								{slide.title}
								<span class="block italic text-red-500">{slide.subtitle}</span>
							</h1>

							<p class="mb-10 text-lg font-medium leading-relaxed text-gray-200">
								{slide.description}
							</p>

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

	<!-- Navigation Buttons -->
	<!-- <button
		onclick={prevSlide}
		aria-label="Previous slide"
		class="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition-all duration-300 hover:bg-white/40 backdrop-blur-sm"
	>
		<span class="material-symbols-outlined text-2xl">chevron_left</span>
	</button>

	<button
		onclick={nextSlide}
		aria-label="Next slide"
		class="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition-all duration-300 hover:bg-white/40 backdrop-blur-sm"
	>
		<span class="material-symbols-outlined text-2xl">chevron_right</span>
	</button> -->

	<!-- Indicator Dots -->
	<div class="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
		{#each heroSlides as slide, index (slide.id)}
			{@const isActive = index === currentSlide}
			<button
				onclick={() => goToSlide(index)}
				aria-label="Go to slide {index + 1}"
				class="h-3 rounded-full transition-all duration-300 {isActive ? 'w-8 bg-red-600' : 'w-3 bg-white/50 hover:bg-white/70'}"
			></button>
		{/each}
	</div>
</section>

