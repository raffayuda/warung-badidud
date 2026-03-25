<script>
	import './layout.css';
	import { navigating } from '$app/stores';
	import favicon from '$lib/assets/favicon.svg';
	import AdminToolbar from '$lib/components/AdminToolbar.svelte';
	import SplashScreen from '$lib/components/SplashScreen.svelte';

	let { children, data } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<SplashScreen />
<AdminToolbar />

<!-- Loading Progress Indicator -->
{#if $navigating}
	<div class="loading-progress">
		<div class="loading-bar"></div>
	</div>
{/if}

<!-- Add padding when admin toolbar is visible -->
{#if data?.isAdmin}
	<div style="padding-top: 40px;">
		{@render children()}
	</div>
{:else}
	{@render children()}
{/if}

<style>
	.loading-progress {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 3px;
		z-index: 99999;
		background: rgba(0, 0, 0, 0.1);
	}

	.loading-bar {
		height: 100%;
		background: linear-gradient(90deg, #dc2626, #f97316);
		width: 100%;
		animation: loading-pulse 1s ease-in-out infinite;
		transform-origin: left;
	}

	@keyframes loading-pulse {
		0% {
			transform: scaleX(0);
			transform-origin: left;
		}
		50% {
			transform: scaleX(0.7);
			transform-origin: left;
		}
		100% {
			transform: scaleX(1);
			transform-origin: right;
		}
	}
</style>
