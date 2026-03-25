<script>
	import { onMount } from 'svelte';

	let { src, alt, class: className = '', loading = 'lazy', decoding = 'async', fetchpriority } = $props();
	let isLoaded = $state(false);
	let isError = $state(false);
	let imgRef = $state(null);

	function handleLoad() {
		isLoaded = true;
	}

	function handleError() {
		isError = true;
		isLoaded = true;
	}
</script>

<div class="relative h-full w-full">
	{#if !isLoaded}
		<div class="absolute inset-0 flex items-center justify-center bg-gray-100">
			<div class="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-red-600"></div>
		</div>
	{/if}

	<img
		bind:this={imgRef}
		{src}
		{alt}
		class={className}
		class:opacity-0={!isLoaded}
		class:opacity-100={isLoaded}
		transition:fade={{ duration: 400 }}
		{loading}
		{decoding}
		{fetchpriority}
		onload={handleLoad}
		onerror={handleError}
	/>

	{#if isError}
		<div class="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
			<span class="material-symbols-outlined">image_not_supported</span>
		</div>
	{/if}
</div>

<style>
	.opacity-0 {
		opacity: 0;
	}

	.opacity-100 {
		opacity: 1;
	}
</style>
