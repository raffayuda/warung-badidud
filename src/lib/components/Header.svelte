<script>
	import { page } from '$app/stores';

	let isMenuOpen = $state(false);
	const isAdmin = $derived($page.data?.isAdmin ?? false);

	const navItems = [
		{ id: 'beranda', label: 'Beranda', href: '/', icon: 'home' },
		{ id: 'menu', label: 'Menu', href: '/menu', icon: 'restaurant_menu' },
		{ id: 'tentang', label: 'Tentang Kami', href: '/tentang', icon: 'info' },
		{ id: 'lokasi', label: 'Lokasi', href: '/lokasi', icon: 'location_on' }
	];

	function getActiveSection(pathname) {
		if (!pathname) return 'beranda';
		if (pathname === '/') return 'beranda';
		if (pathname.startsWith('/menu')) return 'menu';
		if (pathname.startsWith('/tentang')) return 'tentang';
		if (pathname.startsWith('/lokasi')) return 'lokasi';
		return 'beranda';
	}
</script>

<!-- Navbar -->
<nav
	class="fixed z-50 w-full bg-gradient-to-r from-red-600 to-red-700 shadow-lg shadow-red-700/30"
	style="top: {isAdmin ? '40px' : '0'};"
	aria-label="Primary navigation"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
		<!-- Logo -->
		<a href="/" class="group flex items-center gap-3">
			<div class="flex items-center justify-center">
				<img src="/logo.png" alt="Warung Badiduud" class="w-12 transition-transform duration-300 group-hover:scale-110" />
			</div>
			<span class="text-xl font-black tracking-tight text-white italic">
				Waroeng Badiduud
			</span>
		</a>

		<!-- Desktop Menu -->
		<div class="hidden items-center gap-2 md:flex">
			{#each navItems as item}
				{@const isActive = getActiveSection($page.url.pathname) === item.id}
				<a
					href={item.href}
					data-sveltekit-preload-data="hover"
					class="relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 {isActive
						? 'bg-white/20 text-white shadow-md'
						: 'text-red-100 hover:bg-white/10 hover:text-white'}"
				>
					{item.label}
					{#if isActive}
						<span
							class="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white"
						></span>
					{/if}
				</a>
			{/each}
		</div>

		<!-- CTA Button -->
		<div class="hidden md:block">
			<a
				href="/lokasi"
				class="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-red-700 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/30"
			>
				Kunjungi
			</a>
		</div>

		<!-- Mobile Menu Button -->
		<button
			onclick={() => (isMenuOpen = !isMenuOpen)}
			class="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 transition-colors duration-300 hover:bg-white/20 md:hidden"
			aria-label="Toggle menu"
			aria-expanded={isMenuOpen}
		>
			<span class="material-symbols-outlined text-white">
				{isMenuOpen ? 'close' : 'menu'}
			</span>
		</button>
	</div>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="border-t border-white/10 bg-red-700/95 backdrop-blur-md md:hidden">
			<div class="flex flex-col gap-1 px-6 py-4">
				{#each navItems as item}
					{@const isActive = getActiveSection($page.url.pathname) === item.id}
					<a
						href={item.href}
						data-sveltekit-preload-data="hover"
						onclick={() => (isMenuOpen = false)}
						class="group flex items-center justify-between rounded-xl px-4 py-3 text-base font-semibold transition-all duration-300 {isActive
							? 'bg-white/20 text-white shadow-md'
							: 'text-red-100 hover:bg-white/10 hover:text-white'}"
					>
						<span>{item.label}</span>
						<span
							class="material-symbols-outlined text-sm opacity-0 transition-all duration-300 group-hover:opacity-100"
						>
							arrow_forward
						</span>
					</a>
				{/each}
				<div class="mt-4 pt-4">
					<a
						href="/lokasi"
						data-sveltekit-preload-data="hover"
						onclick={() => (isMenuOpen = false)}
						class="flex items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-bold text-red-700 shadow-md transition-all duration-300 hover:scale-105"
					>
						<span class="material-symbols-outlined text-base">location_on</span>
						Kunjungi Lokasi
					</a>
				</div>
			</div>
		</div>
	{/if}
</nav>
