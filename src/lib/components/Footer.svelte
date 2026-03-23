<script>
	// Modern Footer Component with enhanced design
	const currentYear = new Date().getFullYear();
	
	const menuLinks = [
		{ label: 'Ayam Geprek', href: '#menu' },
		{ label: 'Paket Hemat', href: '#menu' },
		{ label: 'Rice Bowl', href: '#menu' },
		{ label: 'Cemilan', href: '#menu' }
	];

	const companyLinks = [
		{ label: 'Tentang Kami', href: '#tentang' },
		{ label: 'Lokasi', href: '#lokasi' },
		{ label: 'Karir', href: '#' },
		{ label: 'Kebijakan Privasi', href: '#' }
	];

	const socialLinks = [
		{ name: 'Instagram', icon: 'language', href: '#' },
		// { name: 'TikTok', icon: 'video_camera', href: '#' },
		{ name: 'WhatsApp', icon: 'chat', href: '#' }
	];
</script>

<!-- Modern Footer -->
<footer class="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 pb-8">
	<div class="mx-auto max-w-7xl px-6">
		<!-- Main Footer Content -->
		<div class="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
			<!-- Brand Section -->
			<div>
				<div class="mb-6 flex items-center gap-3">
					<div
						class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-700/30"
					>
						<span class="text-2xl font-black text-white">A</span>
					</div>
					<div class="flex flex-col">
						<h3 class="text-2xl font-black tracking-tight text-white">Ayam Juara</h3>
						<span class="text-xs font-medium text-red-300">Warung Badidud</span>
					</div>
				</div>
				<p class="mb-6 text-sm text-gray-400">
					Cita rasa asli nusantara dengan kualitas premium untuk keluarga Indonesia. Setiap
					gigitan adalah pengalaman kuliner yang tak terlupakan.
				</p>
				<!-- Social Links -->
				<div class="flex gap-3">
					{#each socialLinks as social}
						<a
							href={social.href}
							aria-label={social.name}
							class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-all duration-300 hover:scale-110 hover:bg-red-700"
						>
							<span class="material-symbols-outlined text-lg">{social.icon}</span>
						</a>
					{/each}
				</div>
			</div>

			<!-- Menu Links -->
			<div>
				<div class="mb-6 flex items-center gap-2">
					<span class="material-symbols-outlined text-red-500">restaurant</span>
					<h4 class="text-lg font-bold text-white">Menu Favorit</h4>
				</div>
				<ul class="space-y-3">
					{#each menuLinks as link}
						<li>
							<a
								href={link.href}
								class="group flex items-center gap-2 text-sm text-gray-400 transition-all duration-300 hover:text-red-400 hover:translate-x-1"
							>
								<span
									class="h-1.5 w-1.5 rounded-full bg-red-700 opacity-0 transition-all duration-300 group-hover:opacity-100"
								></span>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Company Links -->
			<div>
				<div class="mb-6 flex items-center gap-2">
					<span class="material-symbols-outlined text-red-500">business</span>
					<h4 class="text-lg font-bold text-white">Perusahaan</h4>
				</div>
				<ul class="space-y-3">
					{#each companyLinks as link}
						<li>
							<a
								href={link.href}
								class="group flex items-center gap-2 text-sm text-gray-400 transition-all duration-300 hover:text-red-400 hover:translate-x-1"
							>
								<span
									class="h-1.5 w-1.5 rounded-full bg-red-700 opacity-0 transition-all duration-300 group-hover:opacity-100"
								></span>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact Section -->
			<div>
				<div class="mb-6 flex items-center gap-2">
					<span class="material-symbols-outlined text-red-500">mail</span>
					<h4 class="text-lg font-bold text-white">Hubungi Kami</h4>
				</div>
				<ul class="space-y-4">
					<li>
						<a
							href="tel:+62812345678"
							class="group flex items-center gap-3 text-sm text-gray-400 transition-all duration-300 hover:text-red-400"
						>
							<span
								class="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-red-700"
							>
								<span class="material-symbols-outlined text-sm">call</span>
							</span>
							+62 812 345 678
						</a>
					</li>
					<li>
						<a
							href="mailto:info@ayamjuara.com"
							class="group flex items-center gap-3 text-sm text-gray-400 transition-all duration-300 hover:text-red-400"
						>
							<span
								class="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors group-hover:bg-red-700"
							>
								<span class="material-symbols-outlined text-sm">email</span>
							</span>
							info@ayamjuara.com
						</a>
					</li>
					<li class="flex items-start gap-3">
						<span
							class="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-red-500"
						>
							<span class="material-symbols-outlined text-sm">location_on</span>
						</span>
						<span class="text-sm text-gray-400">
							Jl. Warung Badidud No. 123<br />
							Indonesia
						</span>
					</li>
				</ul>
			</div>
		</div>
		
		<!-- Bottom Bar -->
		<div class="border-t border-white/10 pt-8">
			<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
				<p class="text-center text-sm text-gray-400">
					© {currentYear} Ayam Juara - Warung Badidud. Dibuat dengan
					<span class="text-red-500"> ❤️ </span>
					untuk Indonesia.
				</p>
				<div class="flex gap-6">
					<a
						href="javascript:void(0)"
						class="text-sm text-gray-400 transition-colors hover:text-red-400"
					>
						Syarat & Ketentuan
					</a>
					<a
						href="javascript:void(0)"
						class="text-sm text-gray-400 transition-colors hover:text-red-400"
					>
						Kebijakan Privasi
					</a>
				</div>
			</div>
		</div>
	</div>
</footer>
