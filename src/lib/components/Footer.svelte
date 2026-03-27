<script>
	// Simple Footer Component for small UMKM
	const currentYear = new Date().getFullYear();

	const socialLinks = [
		{ name: 'WhatsApp', icon: 'chat', href: 'https://wa.me/62895365453833' }
	];
</script>

<!-- Simple Footer -->
<footer class="w-full bg-gray-800 pt-8 pb-6">
	<div class="mx-auto max-w-6xl px-6">
		<!-- Main Footer Content -->
		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<!-- Brand Section -->
			<div>
				<div class="mb-4 flex items-center gap-2">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600"
					>
						<img src="logo.png" alt="Waroeng Badiduud" class="w-full h-full object-contain" />
					</div>
					<h3 class="text-xl font-bold text-white">Waroeng Badiduud</h3>
				</div>
				<p class="text-sm text-gray-400">
					Makanan enak dengan harga terjangkau untuk keluarga Anda.
				</p>
			</div>

			<!-- Contact Section -->
			<div>
				<h4 class="mb-4 text-sm font-semibold text-white">Hubungi Kami</h4>
				<ul class="space-y-2 text-sm text-gray-400">
					<li class="flex items-center gap-2">
						<span class="material-symbols-outlined text-sm">call</span>
						<a href="tel:+62895365453833" class="hover:text-white">+62 895 365 453 833</a>
					</li>
					<li class="flex items-center gap-2">
						<span class="material-symbols-outlined text-sm">location_on</span>
						<span>Indonesia</span>
					</li>
				</ul>
			</div>

			<!-- Social Links -->
			<div>
				<h4 class="mb-4 text-sm font-semibold text-white">Ikuti Kami</h4>
				<div class="flex gap-3">
					{#each socialLinks as social}
						<a
							href={social.href}
							aria-label={social.name}
							class="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-700 text-white transition-colors hover:bg-red-600"
						>
							<span class="material-symbols-outlined text-lg">{social.icon}</span>
						</a>
					{/each}
				</div>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="mt-8 border-t border-gray-700 pt-6">
			<p class="text-center text-sm text-gray-400">
				© {currentYear} Waroeng Badiduud. All rights reserved.
			</p>
		</div>
	</div>
</footer>
