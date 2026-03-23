<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>Tentang Kami - Warung Badiduud</title>
	<meta
		name="description"
		content="Kenali lebih dekat Warung Badiduud - Cerita di balik Ayam Juara dengan cita rasa nusantara yang autentik."
	/>
</svelte:head>

<Header />

<div class="min-h-screen bg-gradient-to-b from-white to-gray-50">
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
					<span class="material-symbols-outlined text-white">restaurant</span>
					<span class="text-sm font-semibold text-white">Sejak 2020</span>
				</div>

				<h1 class="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
					Tentang Warung Badiduud
				</h1>

				<p class="mx-auto max-w-3xl text-lg text-red-100">
					Kami menghadirkan cita rasa nusantara yang autentik dengan bahan berkualitas terbaik
					untuk keluarga Indonesia
				</p>
			</div>
		</section>

		<!-- Story Section -->
		<section class="py-20">
			<div class="mx-auto max-w-7xl px-6">
				<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
					<!-- Image Grid -->
					<div class="relative">
						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-4">
								<div
									class="overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 p-8"
								>
									<span class="material-symbols-outlined text-6xl text-amber-600">
										cottage
									</span>
								</div>
								<div
									class="overflow-hidden rounded-2xl bg-gradient-to-br from-red-100 to-pink-100 p-8"
								>
									<span class="material-symbols-outlined text-6xl text-red-600">
										local_fire_department
									</span>
								</div>
							</div>
							<div class="space-y-4 pt-8">
								<div
									class="overflow-hidden rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 p-8"
								>
									<span class="material-symbols-outlined text-6xl text-green-600">
										verified
									</span>
								</div>
								<div
									class="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 p-8"
								>
									<span class="material-symbols-outlined text-6xl text-blue-600">
										favorite
									</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Content -->
					<div class="flex flex-col justify-center">
						<h2 class="mb-6 text-4xl font-bold text-gray-900">
							Cerita Dibalik Kelezatan
						</h2>

						<div class="space-y-6 text-gray-600">
							<p>
								<strong class="text-gray-900">Warung Badiduud</strong> bermula dari
								kecintaan kami terhadap kuliner nusantara yang autentik. Pada tahun
								2020, kami memulai perjalanan untuk menghadirkan ayam goreng dengan
								cita rasa yang mengingatkan pada masakan rumah nenek.
							</p>

							<p>
								Setiap resep kami wariskan dari generasi ke generasi, dengan
								perpaduan bumbu rempah pilihan yang diracik secara tradisional. Kami
								bangga menyajikan hidangan yang tidak hanya lezat, tetapi juga
								mengandung nilai-nilai kearifan lokal.
							</p>

							<p>
								Komitmen kami terhadap kualitas dan kehalalan bahan menjadikan
								Warung Badiduud pilihan terpercaya untuk keluarga Indonesia. Dari
								dapur kami ke meja Anda, setiap hidangan disiapkan dengan cinta dan
								kebanggaan.
							</p>
						</div>

						<div class="mt-8 flex flex-wrap gap-4">
							<div class="flex items-center gap-3">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-full bg-red-100"
								>
									<span class="material-symbols-outlined text-red-700">
										workspace_premium
									</span>
								</div>
								<div>
									<p class="text-2xl font-bold text-gray-900">5+</p>
									<p class="text-sm text-gray-600">Tahun Pengalaman</p>
								</div>
							</div>

							<div class="flex items-center gap-3">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
								>
									<span class="material-symbols-outlined text-green-700">
										verified_user
									</span>
								</div>
								<div>
									<p class="text-2xl font-bold text-gray-900">100%</p>
									<p class="text-sm text-gray-600">Halal Certified</p>
								</div>
							</div>

							<div class="flex items-center gap-3">
								<div
									class="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100"
								>
									<span class="material-symbols-outlined text-amber-700">
										people
									</span>
								</div>
								<div>
									<p class="text-2xl font-bold text-gray-900">10K+</p>
									<p class="text-sm text-gray-600">Pelanggan Puas</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Values Section -->
		<section class="bg-gray-50 py-20">
			<div class="mx-auto max-w-7xl px-6">
				<div class="mb-16 text-center">
					<h2 class="mb-4 text-4xl font-bold text-gray-900">Nilai-Nilai Kami</h2>
					<p class="text-lg text-gray-600 max-w-2xl mx-auto">
						Prinsip yang kami pegang teguh dalam setiap hidangan yang kami sajikan
					</p>
				</div>

				<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					<!-- Value Card 1 -->
					<div
						class="group rounded-2xl bg-white p-8 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
					>
						<div
							class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
						>
							<span class="material-symbols-outlined text-3xl">volunteer_activism</span>
						</div>
						<h3 class="mb-3 text-xl font-bold text-gray-900">Kualitas Terbaik</h3>
						<p class="text-gray-600">
							Bahan segar pilihan dari pemasok terpercaya untuk hasil terbaik
						</p>
					</div>

					<!-- Value Card 2 -->
					<div
						class="group rounded-2xl bg-white p-8 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
					>
						<div
							class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-green-700 text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
						>
							<span class="material-symbols-outlined text-3xl">shield</span>
						</div>
						<h3 class="mb-3 text-xl font-bold text-gray-900">100% Halal</h3>
						<p class="text-gray-600">
							Terjamin kehalalannya dengan sertifikat resmi dari MUI
						</p>
					</div>

					<!-- Value Card 3 -->
					<div
						class="group rounded-2xl bg-white p-8 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
					>
						<div
							class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-700 text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
						>
							<span class="material-symbols-outlined text-3xl">history_edu</span>
						</div>
						<h3 class="mb-3 text-xl font-bold text-gray-900">Resep Tradisional</h3>
						<p class="text-gray-600">
							Warisan bumbu nusantara yang autentik dari generasi ke generasi
						</p>
					</div>

					<!-- Value Card 4 -->
					<div
						class="group rounded-2xl bg-white p-8 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
					>
						<div
							class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-700 text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
						>
							<span class="material-symbols-outlined text-3xl">sentiment_very_satisfied</span>
						</div>
						<h3 class="mb-3 text-xl font-bold text-gray-900">Kepuasan Pelanggan</h3>
						<p class="text-gray-600">
							Komitmen kami untuk memberikan pengalaman kuliner terbaik
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Team Section -->
		<section class="py-20">
			<div class="mx-auto max-w-7xl px-6">
				<div class="mb-16 text-center">
					<h2 class="mb-4 text-4xl font-bold text-gray-900">Tim Kami</h2>
					<p class="text-lg text-gray-600 max-w-2xl mx-auto">
						Orang-orang berbakat di balik kelezatan setiap hidangan
					</p>
				</div>

				<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
					<!-- Team Member 1 -->
					<div
						class="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
					>
						<div
							class="relative h-64 overflow-hidden bg-gradient-to-br from-red-100 to-pink-100"
						>
							<div
								class="absolute inset-0 flex items-center justify-center"
							>
								<span class="material-symbols-outlined text-8xl text-red-300">
									person
								</span>
							</div>
						</div>
						<div class="p-6 text-center">
							<h3 class="text-xl font-bold text-gray-900">Chef Ahmad</h3>
							<p class="text-sm font-medium text-red-700">Head Chef</p>
							<p class="mt-3 text-sm text-gray-600">
								Ahli bumbu nusantara dengan pengalaman 15 tahun
							</p>
						</div>
					</div>

					<!-- Team Member 2 -->
					<div
						class="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
					>
						<div
							class="relative h-64 overflow-hidden bg-gradient-to-br from-green-100 to-emerald-100"
						>
							<div
								class="absolute inset-0 flex items-center justify-center"
							>
								<span class="material-symbols-outlined text-8xl text-green-300">
									person
								</span>
							</div>
						</div>
						<div class="p-6 text-center">
							<h3 class="text-xl font-bold text-gray-900">Siti Nurhaliza</h3>
							<p class="text-sm font-medium text-green-700">Founder & CEO</p>
							<p class="mt-3 text-sm text-gray-600">
								Pencinta kuliner nusantara dan pendiri Warung Badiduud
							</p>
						</div>
					</div>

					<!-- Team Member 3 -->
					<div
						class="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
					>
						<div
							class="relative h-64 overflow-hidden bg-gradient-to-br from-blue-100 to-cyan-100"
						>
							<div
								class="absolute inset-0 flex items-center justify-center"
							>
								<span class="material-symbols-outlined text-8xl text-blue-300">
									person
								</span>
							</div>
						</div>
						<div class="p-6 text-center">
							<h3 class="text-xl font-bold text-gray-900">Budi Santoso</h3>
							<p class="text-sm font-medium text-blue-700">Operations Manager</p>
							<p class="mt-3 text-sm text-gray-600">
								Menjaga kualitas dan kepuasan pelanggan setiap hari
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="bg-gradient-to-r from-red-600 to-red-700 py-20">
			<div class="mx-auto max-w-4xl px-6 text-center">
				<h2 class="mb-6 text-4xl font-bold text-white">
					Ingin Mencoba Kelezatan Kami?
				</h2>
				<p class="mb-8 text-lg text-red-100">
					Kunjungi outlet kami atau pesan online dan nikmati cita rasa nusantara yang
				 autentik
				</p>
				<div class="flex flex-wrap justify-center gap-4">
					<a
						href="#menu"
						class="rounded-full bg-white px-8 py-4 text-base font-bold text-red-700 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
					>
						Lihat Menu
					</a>
					<a
						href="#lokasi"
						class="rounded-full bg-red-800 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-red-900"
					>
						Lokasi Outlet
					</a>
				</div>
			</div>
		</section>
	</main>

	<Footer />
</div>
