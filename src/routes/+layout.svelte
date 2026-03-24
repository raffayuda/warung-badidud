<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import AdminToolbar from '$lib/components/AdminToolbar.svelte';
	import SplashScreen from '$lib/components/SplashScreen.svelte';

	let { children, data } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<SplashScreen />
<AdminToolbar />

<!-- Add padding when admin toolbar is visible -->
{#if data?.isAdmin}
	<div style="padding-top: 40px;">
		{@render children()}
	</div>
{:else}
	{@render children()}
{/if}
