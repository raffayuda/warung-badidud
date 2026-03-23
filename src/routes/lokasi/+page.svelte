<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	const location = {
		name: 'Warung Badiduud',
		address: 'Jl. Raya Utama No. 123, Jakarta',
		phone: '+62 812 345 678',
		hours: '09:00 - 22:00 WIB',
		hoursDetail: [
			{ day: 'Senin - Jumat', time: '09:00 - 22:00' },
			{ day: 'Sabtu - Minggu', time: '08:00 - 23:00' }
		],
		lat: -6.2088,
		lng: 106.8456,
		features: [
			{ icon: 'dining', label: 'Dine-in' },
			{ icon: 'delivery_dining', label: 'Takeaway' },
			{ icon: 'two_wheeler', label: 'Delivery' },
			{ icon: 'local_parking', label: 'Parkir Luas' },
			{ icon: 'wifi', label: 'Free WiFi' },
			{ icon: 'wheelchair_pickup', label: 'Akses Kursi Roda' }
		]
	};

	const features = [
		{ icon: 'store', label: '1 Lokasi' },
		{ icon: 'access_time', label: 'Buka Setiap Hari' },
		{ icon: 'local_shipping', label: 'Gratis Delivery' },
		{ icon: 'local_parking', label: 'Parkir Luas' }
	];
</script>

<svelte:head>
	<title>Lokasi Kami - Warung Badiduud</title>
	<meta
		name="description"
		content="Temukan lokasi Warung Badiduud terdekat. Kunjungi outlet kami dan nikmati ayam goreng lezat dengan cita rasa nusantara."
	/>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
	<Header />

	<main class="pt-19">
		<!-- Hero Section -->
		<section class="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 py-20">
			<!-- Background Pattern -->
			<div class="absolute inset-0 opacity-10">
				<div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
			</div>

			<div class="relative mx-auto max-w-7xl px-6 text-center">
				<div
					class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-md"
				>
					<span class="material-symbols-outlined text-white">location_on</span>
					<span class="text-sm font-semibold text-white">Temukan Kami</span>
				</div>

				<h1 class="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
					Lokasi Outlet
				</h1>

				<p class="mx-auto max-w-3xl text-lg text-red-100">
					Kunjungi Warung Badiduud terdekat dan nikmati pengalaman kuliner yang tak
				 terlupakan
				</p>

				<!-- Features -->
				<div class="mt-12 flex flex-wrap justify-center gap-6">
					{#each features as feature}
						<div class="flex items-center gap-3 rounded-full bg-white/20 px-5 py-3 backdrop-blur-md">
							<span class="material-symbols-outlined text-white">{feature.icon}</span>
							<span class="text-sm font-semibold text-white">{feature.label}</span>
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Map Section -->
		<section class="py-12">
			<div class="mx-auto max-w-7xl px-6">
				<div
					class="overflow-hidden rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl"
				>
					<!-- Map Container with Google Maps Embed -->
					<div class="relative h-[500px] w-full">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.572139324415!2d106.73988630000001!3d-6.575556199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5006574a1d3%3A0x446318eda69f5fd!2sWaroeng%20Badiduud!5e0!3m2!1sid!2sid!4v1774268272622!5m2!1sid!2sid"
							width="100%"
							height="100%"
							style="border:0"
							allowfullscreen=""
							loading="lazy"
							referrerpolicy="no-referrer-when-downgrade"
							class="grayscale hover:grayscale-0 transition-all duration-500"
							title="Peta Lokasi Warung Badiduud"
						></iframe>
						<!-- Overlay Info Card -->
						<div
							class="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 rounded-2xl bg-white p-6 shadow-2xl"
						>
							<div class="flex items-start gap-4">
								<div
									class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100"
								>
									<span class="material-symbols-outlined text-red-700">
										location_on
									</span>
								</div>
								<div>
									<h3 class="font-bold text-gray-900">{location.name}</h3>
									<p class="text-sm text-gray-600">{location.address}</p>
									<a
										href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent(location.address)}"
										target="_blank"
										rel="noopener noreferrer"
										class="mt-3 inline-flex items-center gap-2 text-sm font-bold text-red-700 hover:underline"
									>
										<span class="material-symbols-outlined text-sm">directions</span>
										Buka di Google Maps
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Location Detail Card -->
		<section class="pb-20">
			<div class="mx-auto max-w-4xl px-6">
				<div class="mb-12 text-center">
					<h2 class="mb-4 text-4xl font-bold text-gray-900">Lokasi Kami</h2>
					<p class="text-lg text-gray-600">
						Kunjungi warung kami dan nikmati pengalaman kuliner yang tak terlupakan
					</p>
				</div>

				<div
					class="group relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl"
				>
					<!-- Header with Gradient -->
					<div class="relative bg-gradient-to-br from-red-600 to-red-700 p-8">
						<div
							class="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-white/10"
						></div>
						<div
							class="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/10"
						></div>

						<div class="relative flex items-center gap-6">
							<div
								class="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-lg"
							>
								<span class="material-symbols-outlined text-5xl text-white">
									store
								</span>
							</div>
							<div>
								<h3 class="text-3xl font-bold text-white">
									{location.name}
								</h3>
								<p class="text-red-100">Satu-satunya lokasi resmi kami</p>
							</div>
						</div>
					</div>

					<!-- Content -->
					<div class="p-8">
						<!-- Info Grid -->
						<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
							<!-- Address -->
							<div class="rounded-2xl bg-gray-50 p-6">
								<div class="mb-4 flex items-center gap-3">
									<span
										class="flex h-12 w-12 items-center justify-center rounded-full bg-red-100"
									>
										<span class="material-symbols-outlined text-red-700">
											location_on
										</span>
									</span>
									<div>
										<p class="text-sm font-semibold text-gray-900">Alamat</p>
									</div>
								</div>
								<p class="text-gray-700">{location.address}</p>
								<a
									href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent(location.address)}"
									target="_blank"
									rel="noopener noreferrer"
									class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-red-700 hover:underline"
								>
									<span class="material-symbols-outlined text-sm">directions</span>
									Buka Navigasi
								</a>
							</div>

							<!-- Phone -->
							<div class="rounded-2xl bg-gray-50 p-6">
								<div class="mb-4 flex items-center gap-3">
									<span
										class="flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
									>
										<span class="material-symbols-outlined text-green-700">
											call
										</span>
									</span>
									<div>
										<p class="text-sm font-semibold text-gray-900">Telepon / WhatsApp</p>
									</div>
								</div>
								<a
									href="https://wa.me/62812345678"
									target="_blank"
									rel="noopener noreferrer"
									class="text-lg font-bold text-green-700 hover:underline"
								>
									{location.phone}
								</a>
								<p class="mt-2 text-sm text-gray-600">Tersedia di WhatsApp</p>
							</div>
						</div>

						<!-- Hours Section -->
						<div class="mt-6 rounded-2xl bg-amber-50 p-6">
							<div class="mb-4 flex items-center gap-3">
								<span
									class="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100"
								>
									<span class="material-symbols-outlined text-amber-700">
										schedule
									</span>
								</span>
								<div>
									<p class="text-lg font-bold text-gray-900">Jam Operasional</p>
								</div>
							</div>
							<div class="space-y-3">
								{#each location.hoursDetail as schedule}
									<div class="flex items-center justify-between rounded-xl bg-white px-4 py-3">
										<span class="font-medium text-gray-700">{schedule.day}</span>
										<span class="font-bold text-amber-700">{schedule.time}</span>
									</div>
								{/each}
							</div>
						</div>

						<!-- Features -->
						<div class="mt-6">
							<p class="mb-4 text-sm font-semibold text-gray-900">Fasilitas Tersedia</p>
							<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
								{#each location.features as feature}
									<div
										class="flex items-center gap-3 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-red-50"
									>
										<span class="material-symbols-outlined text-red-700 text-xl">
											{feature.icon}
										</span>
										<span class="text-sm font-medium text-gray-700">{feature.label}</span>
									</div>
								{/each}
							</div>
						</div>

						<!-- Action Buttons -->
						<div class="mt-8 flex flex-col gap-3 sm:flex-row">
							<a
								href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent(location.address)}"
								target="_blank"
								rel="noopener noreferrer"
								class="flex-1 rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-4 text-center text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
							>
								<span class="flex items-center justify-center gap-2">
									<span class="material-symbols-outlined">directions</span>
									Navigasi ke Lokasi
								</span>
							</a>
							<a
								href="https://wa.me/62812345678"
								target="_blank"
								rel="noopener noreferrer"
								class="flex-1 rounded-xl border-2 border-green-700 py-4 text-center text-base font-bold text-green-700 transition-all duration-300 hover:bg-green-700 hover:text-white"
							>
								<span class="flex items-center justify-center gap-2">
									<span class="material-symbols-outlined">chat</span>
									Pesan via WhatsApp
								</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Delivery Zone Section -->
		<section class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
			<div class="mx-auto max-w-7xl px-6">
				<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
					<div>
						<h2 class="mb-6 text-4xl font-bold text-white">
							Layanan Pengiriman
						</h2>
						<p class="mb-8 text-lg text-gray-400">
							Tidak bisa datang ke outlet? Kami siap antar ke lokasi Anda! Nikmati
							kelezatan Warung Badiduud dari kenyamanan rumah Anda.
						</p>

						<div class="space-y-4">
							<div class="flex items-center gap-4">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-full bg-red-700"
								>
									<span class="material-symbols-outlined text-white">
										motorcycle
									</span>
								</div>
								<div>
									<p class="font-bold text-white">Pengiriman Cepat</p>
									<p class="text-sm text-gray-400">
										Makanan tetap hangat sampai tujuan
									</p>
								</div>
							</div>

							<div class="flex items-center gap-4">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-full bg-green-700"
								>
									<span class="material-symbols-outlined text-white">
										local_offer
									</span>
								</div>
								<div>
									<p class="font-bold text-white">Gratis Ongkir</p>
									<p class="text-sm text-gray-400">
										Untuk pesanan minimal Rp 50.000
									</p>
								</div>
							</div>

							<div class="flex items-center gap-4">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-full bg-amber-700"
								>
									<span class="material-symbols-outlined text-white">
										phone_android
									</span>
								</div>
								<div>
									<p class="font-bold text-white">Pesan Online</p>
									<p class="text-sm text-gray-400">
										Mudah melalui aplikasi atau WhatsApp
									</p>
								</div>
							</div>
						</div>

						<div class="mt-8">
							<a
								href="#menu"
								class="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-red-700 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
							>
								<span class="material-symbols-outlined">shopping_bag</span>
								Pesan Sekarang
							</a>
						</div>
					</div>

					<!-- Delivery Info -->
					<div class="relative overflow-hidden rounded-3xl bg-white/10 p-8 backdrop-blur-md">
						<h3 class="mb-6 text-xl font-bold text-white">Area Pengiriman</h3>

						<div class="space-y-4">
							<div
								class="flex items-center justify-between rounded-xl bg-white/10 p-4"
							>
								<div class="flex items-center gap-3">
									<div
										class="flex h-10 w-10 items-center justify-center rounded-full bg-red-700"
									>
										<span class="material-symbols-outlined text-sm text-white">
											location_on
										</span>
									</div>
									<div>
										<p class="font-semibold text-white">Jakarta Pusat</p>
										<p class="text-xs text-gray-400">
											Jarak max: 10 km
										</p>
									</div>
								</div>
								<span class="rounded-full bg-green-700 px-3 py-1 text-xs font-bold text-white">
									Aktif
								</span>
							</div>
							<div
								class="flex items-center justify-between rounded-xl bg-white/10 p-4"
							>
								<div class="flex items-center gap-3">
									<div
										class="flex h-10 w-10 items-center justify-center rounded-full bg-red-700"
									>
										<span class="material-symbols-outlined text-sm text-white">
											location_on
										</span>
									</div>
									<div>
										<p class="font-semibold text-white">Jakarta Selatan</p>
										<p class="text-xs text-gray-400">
											Jarak max: 15 km
										</p>
									</div>
								</div>
								<span class="rounded-full bg-green-700 px-3 py-1 text-xs font-bold text-white">
									Aktif
								</span>
							</div>
							<div
								class="flex items-center justify-between rounded-xl bg-white/10 p-4"
							>
								<div class="flex items-center gap-3">
									<div
										class="flex h-10 w-10 items-center justify-center rounded-full bg-red-700"
									>
										<span class="material-symbols-outlined text-sm text-white">
											location_on
										</span>
									</div>
									<div>
										<p class="font-semibold text-white">Jakarta Barat</p>
										<p class="text-xs text-gray-400">
											Jarak max: 12 km
										</p>
									</div>
								</div>
								<span class="rounded-full bg-amber-700 px-3 py-1 text-xs font-bold text-white">
									Terbatas
								</span>
							</div>
						</div>

						<div class="mt-6 rounded-xl bg-white/10 p-4">
							<p class="text-sm text-gray-400">
								💡 <strong class="text-white">Tips:</strong> Masukkan alamat Anda
								saat checkout untuk memastikan lokasi Anda terjangkau layanan
								pengiriman kami.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Contact Section -->
		<section class="py-20">
			<div class="mx-auto max-w-4xl px-6 text-center">
				<h2 class="mb-6 text-4xl font-bold text-gray-900">
					Masih Ada Pertanyaan?
				</h2>
				<p class="mb-8 text-lg text-gray-600">
					Tim kami siap membantu Anda. Hubungi kami untuk informasi lebih lanjut.
				</p>

				<div class="flex flex-wrap justify-center gap-4">
					<a
						href="https://wa.me/62812345678"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 rounded-full bg-green-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-green-700"
					>
						<span class="material-symbols-outlined">chat</span>
						WhatsApp
					</a>
					<a
						href="mailto:info@ayamjuara.com"
						class="flex items-center gap-2 rounded-full bg-red-700 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
					>
						<span class="material-symbols-outlined">email</span>
						Email
					</a>
				</div>
			</div>
		</section>
	</main>

	<Footer />
</div>
