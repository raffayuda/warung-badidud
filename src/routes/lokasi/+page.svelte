<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { isEditMode } from '$lib/stores/adminStore.js';
	import { page } from '$app/stores';
	import EditableText from '$lib/components/EditableText.svelte';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();

	const isAdmin = $derived($page.data?.isAdmin ?? false);
	const loc = $derived(data.location ?? {});

	async function saveLocation(updated) {
		await fetch('/api/content/site', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ key: 'location', value: updated })
		});
		await invalidateAll();
	}

	function updateField(field, value) {
		saveLocation({ ...loc, [field]: value });
	}

	// const heroFeatures = $derived(loc.heroFeatures ?? [
	// 	{ icon: 'store', label: '1 Lokasi' },
	// 	{ icon: 'access_time', label: 'Buka Setiap Hari' },
	// 	{ icon: 'local_shipping', label: 'Ongkir' },
	// 	{ icon: 'local_parking', label: 'Parkir Luas' }
	// ]);
</script>

<svelte:head>
	<title>Lokasi Warung Badiduud - Waroeng Badiduud Bogor | Alamat & Delivery</title>
	<meta name="description" content="Lokasi Warung Badiduud (Waroeng Badiduud) di Bogor. Cek alamat lengkap, jam operasional, nomor layanan delivery, dan directions. Nikmati ayam geprek lezat terdekat!" />
	<meta name="keywords" content="lokasi warung badiduud, lokasi waroeng badiduud, alamat warung badidud, jam buka warung badiduud, delivery warung badiduud, ayam geprek terdekat Bogor, warung badiduud Bogor, lokasi terdekat" />
	<meta name="author" content="Warung Badiduud" />
	<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
	<meta name="language" content="id-ID" />
	<meta name="geo.placename" content="Bogor, Indonesia" />
	<meta name="geo.country" content="ID" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://badidud.boday.my.id/lokasi" />
	<meta property="og:title" content="Lokasi Warung Badiduud - Bogor" />
	<meta property="og:description" content="Temukan lokasi Warung Badiduud di Bogor. Lihat alamat, jam operasional, dan layanan delivery kami." />
	<meta property="og:image" content="https://badidud.boday.my.id/og-image.jpg" />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://badidud.boday.my.id/lokasi" />
	<meta name="twitter:title" content="Lokasi Warung Badiduud - Bogor" />
	<meta name="twitter:description" content="Temukan lokasi Warung Badiduud di Bogor. Lihat alamat, jam operasional, dan layanan delivery kami." />
	<meta name="twitter:image" content="https://badidud.boday.my.id/og-image.jpg" />
	
	<!-- Canonical URL -->
	<link rel="canonical" href="https://badidud.boday.my.id/lokasi" />
	
	<!-- Structured Data - LocalBusiness with Geo -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Restaurant",
			"name": "Warung Badiduud",
			"alternateName": ["Waroeng Badiduud", "Warung Badidud", "Waroeng Badidud"],
			"description": "Warung makan yang menyajikan ayam geprek dan makanan nusantara dengan cita rasa autentik. Lokasi di Bogor dengan fasilitas delivery",
			"url": "https://badidud.boday.my.id/lokasi",
			"telephone": "+62-812-345-678",
			"priceRange": "Rp",
			"servesCuisine": "Indonesian",
			"address": {
				"@type": "PostalAddress",
				"addressCountry": "ID",
				"addressLocality": "Indonesia"
			},
			"geo": {
				"@type": "GeoCoordinates",
				"latitude": "-6.575556",
				"longitude": "106.739886"
			},
			"openingHoursSpecification": {
				"@type": "OpeningHoursSpecification",
				"dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
				"opens": "10:00",
				"closes": "22:00"
			},
			"hasMap": "https://www.google.com/maps/place/Waroeng+Badidud",
			"acceptsReservations": "False",
			"deliveryAvailable": "True"
		}
	</script>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
	<Header />

	<main class="pt-19">
		<!-- Hero Section -->
		<section class="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 py-20">
			<div class="absolute inset-0 opacity-10">
				<div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
			</div>

			<div class="relative mx-auto max-w-7xl px-6 text-center">
				<div class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-md">
					<span class="material-symbols-outlined text-white">location_on</span>
					<span class="text-sm font-semibold text-white">Temukan Kami</span>
				</div>

				<h1 class="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
					Lokasi Outlet
				</h1>

				<p class="mx-auto max-w-3xl text-lg text-red-100">
					Kunjungi Waroeng Badiduud terdekat dan nikmati pengalaman kuliner yang tak terlupakan
				</p>

				<!-- <div class="mt-12 flex flex-wrap justify-center gap-6">
					{#each heroFeatures as feature}
						<div class="flex items-center gap-3 rounded-full bg-white/20 px-5 py-3 backdrop-blur-md">
							<span class="material-symbols-outlined text-white">{feature.icon}</span>
							<span class="text-sm font-semibold text-white">{feature.label}</span>
						</div>
					{/each}
				</div> -->
			</div>
		</section>

		<!-- Map Section -->
		<section class="py-12">
			<div class="mx-auto max-w-7xl px-6">
				<div class="overflow-hidden rounded-3xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-2xl">
					<div class="relative h-[500px] w-full">
						<iframe
							src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.572139324415!2d106.73988630000001!3d-6.575556199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5006574a1d3%3A0x446318eda69f5fd!2sWaroeng%20Badidud!5e0!3m2!1sid!2sid!4v1774412847298!5m2!1sid!2sid'
							width="100%"
							height="100%"
							style="border:0"
							allowfullscreen=""
							loading="lazy"
							referrerpolicy="no-referrer-when-downgrade"
							class="grayscale hover:grayscale-0 transition-all duration-500"
							title="Peta Lokasi Waroeng Badiduud"
						></iframe>

						{#if $isEditMode && isAdmin}
							<div class="absolute top-4 left-4 right-4 z-10">
								<input
									type="text"
									value={loc.mapEmbedUrl ?? ''}
									onchange={(e) => updateField('mapEmbedUrl', e.target.value)}
									class="w-full rounded-lg border-2 border-amber-400 bg-white px-3 py-2 text-xs shadow-lg"
									placeholder="Google Maps Embed URL"
								/>
							</div>
						{/if}

						<div class="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 rounded-2xl bg-white p-6 shadow-2xl">
							<div class="flex items-start gap-4">
								<div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100">
									<span class="material-symbols-outlined text-red-700">location_on</span>
								</div>
								<div>
									<h3 class="font-bold text-gray-900">{loc.name ?? 'Waroeng Badiduud'}</h3>
									{#if $isEditMode && isAdmin}
										<EditableText value={loc.address ?? ''} tag="p" className="text-sm text-gray-600" onSave={(v) => updateField('address', v)} />
									{:else}
										<p class="text-sm text-gray-600">{loc.address ?? ''}</p>
									{/if}
									<a
										href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent(loc.address ?? '')}"
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
						Kunjungi waroeng kami dan nikmati pengalaman kuliner yang tak terlupakan
					</p>
				</div>

				<div class="group relative overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
					<div class="relative bg-gradient-to-br from-red-600 to-red-700 p-8">
						<div class="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-white/10"></div>
						<div class="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/10"></div>

						<div class="relative flex items-center gap-6">
							<div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-lg">
								<span class="material-symbols-outlined text-5xl text-white">store</span>
							</div>
							<div>
								<h3 class="text-3xl font-bold text-white">{loc.name ?? 'Waroeng Badiduud'}</h3>
								<p class="text-red-100">Satu-satunya lokasi resmi kami</p>
							</div>
						</div>
					</div>

					<div class="p-8">
						<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
							<div class="rounded-2xl bg-gray-50 p-6">
								<div class="mb-4 flex items-center gap-3">
									<span class="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
										<span class="material-symbols-outlined text-red-700">location_on</span>
									</span>
									<div><p class="text-sm font-semibold text-gray-900">Alamat</p></div>
								</div>
								{#if $isEditMode && isAdmin}
									<EditableText value={loc.address ?? ''} tag="p" className="text-gray-700" onSave={(v) => updateField('address', v)} />
								{:else}
									<p class="text-gray-700">{loc.address ?? ''}</p>
								{/if}
								<a
									href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent(loc.address ?? '')}"
									target="_blank"
									rel="noopener noreferrer"
									class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-red-700 hover:underline"
								>
									<span class="material-symbols-outlined text-sm">directions</span>
									Buka Navigasi
								</a>
							</div>

							<div class="rounded-2xl bg-gray-50 p-6">
								<div class="mb-4 flex items-center gap-3">
									<span class="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
										<span class="material-symbols-outlined text-green-700">call</span>
									</span>
									<div><p class="text-sm font-semibold text-gray-900">Telepon / WhatsApp</p></div>
								</div>
								<a
									href="https://wa.me/{loc.whatsappNumber ?? '895365453833'}"
									target="_blank"
									rel="noopener noreferrer"
									class="text-lg font-bold text-green-700 hover:underline"
								>
									{#if $isEditMode && isAdmin}
										<EditableText value={loc.phone ?? ''} tag="span" className="text-lg font-bold text-green-700" onSave={(v) => updateField('phone', v)} />
									{:else}
										{loc.phone ?? ''}
									{/if}
								</a>
								<p class="mt-2 text-sm text-gray-600">Tersedia di WhatsApp</p>
							</div>
						</div>

						<!-- Hours Section -->
						<div class="mt-6 rounded-2xl bg-amber-50 p-6">
							<div class="mb-4 flex items-center gap-3">
								<span class="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
									<span class="material-symbols-outlined text-amber-700">schedule</span>
								</span>
								<div><p class="text-lg font-bold text-gray-900">Jam Operasional</p></div>
							</div>
							<div class="space-y-3">
								{#each (loc.hoursDetail ?? []) as schedule}
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
								{#each (loc.features ?? []) as feature}
									<div class="flex items-center gap-3 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-red-50">
										<span class="material-symbols-outlined text-red-700 text-xl">{feature.icon}</span>
										<span class="text-sm font-medium text-gray-700">{feature.label}</span>
									</div>
								{/each}
							</div>
						</div>

						<!-- Action Buttons -->
						<div class="mt-8 flex flex-col gap-3 sm:flex-row">
							<a
								href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent(loc.address ?? '')}"
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
								href="https://wa.me/{loc.whatsappNumber ?? '62812345678'}"
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
				<div class="grid grid-cols-1 gap-12 lg:grid-cols-1">
					<div>
						<h2 class="mb-6 text-4xl font-bold text-white">Layanan Pengiriman</h2>
						<p class="mb-8 text-lg text-gray-400">
							Tidak bisa datang ke outlet? Kami siap antar ke lokasi Anda! Nikmati
							kelezatan Waroeng Badiduud dari kenyamanan rumah Anda.
						</p>

						<div class="space-y-4">
							<div class="flex items-center gap-4">
								<div class="flex h-12 w-12 items-center justify-center rounded-full bg-red-700">
									<span class="material-symbols-outlined text-white">motorcycle</span>
								</div>
								<div>
									<p class="font-bold text-white">Pengiriman Cepat</p>
									<p class="text-sm text-gray-400">Makanan tetap hangat sampai tujuan</p>
								</div>
							</div>
							<div class="flex items-center gap-4">
								<div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-700">
									<span class="material-symbols-outlined text-white">local_offer</span>
								</div>
								<div>
									<p class="font-bold text-white">Ongkir</p>
									<p class="text-sm text-gray-400">Biaya pengiriman akan dikenakan sesuai jarak</p>
								</div>
							</div>
							<div class="flex items-center gap-4">
								<div class="flex h-12 w-12 items-center justify-center rounded-full bg-amber-700">
									<span class="material-symbols-outlined text-white">phone_android</span>
								</div>
								<div>
									<p class="font-bold text-white">Pesan Online</p>
									<p class="text-sm text-gray-400">Mudah melalui WhatsApp</p>
								</div>
							</div>
						</div>

						<div class="mt-8">
							<a href="/menu" class="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-red-700 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
								<span class="material-symbols-outlined">shopping_bag</span>
								Pesan Sekarang
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Contact Section -->
		<section class="py-20">
			<div class="mx-auto max-w-4xl px-6 text-center">
				<h2 class="mb-6 text-4xl font-bold text-gray-900">Masih Ada Pertanyaan?</h2>
				<p class="mb-8 text-lg text-gray-600">
					Tim kami siap membantu Anda. Hubungi kami untuk informasi lebih lanjut.
				</p>

				<div class="flex flex-wrap justify-center gap-4">
					<a
						href="https://wa.me/{loc.whatsappNumber ?? '62812345678'}"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 rounded-full bg-green-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-green-700"
					>
						<span class="material-symbols-outlined">chat</span>
						WhatsApp
					</a>
					<a
						href="mailto:{loc.email ?? 'info@ayamjuara.com'}"
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
