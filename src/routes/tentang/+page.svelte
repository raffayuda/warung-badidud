<script>
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { isEditMode } from '$lib/stores/adminStore.js';
	import { page } from '$app/stores';
	import EditableText from '$lib/components/EditableText.svelte';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();

	const isAdmin = $derived($page.data?.isAdmin ?? false);
	const about = $derived(data.about ?? {});

	async function saveAbout(updated) {
		await fetch('/api/content/site', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ key: 'about', value: updated })
		});
		await invalidateAll();
	}

	function updateField(field, value) {
		saveAbout({ ...about, [field]: value });
	}

	function updateParagraph(index, value) {
		const paragraphs = [...(about.storyParagraphs || [])];
		paragraphs[index] = value;
		saveAbout({ ...about, storyParagraphs: paragraphs });
	}

	function updateValue(index, field, value) {
		const values = [...(about.values || [])];
		values[index] = { ...values[index], [field]: value };
		saveAbout({ ...about, values });
	}

	function updateTeam(index, field, value) {
		const team = [...(about.team || [])];
		team[index] = { ...team[index], [field]: value };
		saveAbout({ ...about, team });
	}

	function updateStat(index, field, value) {
		const stats = [...(about.stats || [])];
		stats[index] = { ...stats[index], [field]: value };
		saveAbout({ ...about, stats });
	}

	const colorMap = {
		red: { bg: 'from-red-500 to-red-700', light: 'from-red-100 to-pink-100', text: 'text-red-700', icon: 'text-red-300', bgCircle: 'bg-red-100' },
		green: { bg: 'from-green-500 to-green-700', light: 'from-green-100 to-emerald-100', text: 'text-green-700', icon: 'text-green-300', bgCircle: 'bg-green-100' },
		amber: { bg: 'from-amber-500 to-orange-700', light: 'from-amber-100 to-orange-100', text: 'text-amber-700', icon: 'text-amber-300', bgCircle: 'bg-amber-100' },
		blue: { bg: 'from-blue-500 to-cyan-700', light: 'from-blue-100 to-cyan-100', text: 'text-blue-700', icon: 'text-blue-300', bgCircle: 'bg-blue-100' }
	};
</script>

<svelte:head>
	<title>Tentang Kami - Warung Badidud | Cerita Dibalik Kelezatan Ayam Nusantara</title>
	<meta name="description" content="Kenali lebih dekat Warung Badidud - Cerita di balik ayam geprek dengan cita rasa nusantara yang autentik. Komitmen kami menghadirkan makanan berkualitas untuk keluarga Indonesia." />
	<meta name="keywords" content="tentang warung badidud, cerita warung badidud, sejarah ayam geprek, makanan nusantara, kuliner indonesia, warung makan enak" />
	<meta name="author" content="Warung Badidud" />
	<meta name="robots" content="index, follow" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://warungbadidud.com/tentang" />
	<meta property="og:title" content="Tentang Kami - Warung Badidud" />
	<meta property="og:description" content="Kenali lebih dekat Warung Badidud - Cerita di balik ayam geprek dengan cita rasa nusantara yang autentik." />
	<meta property="og:image" content="https://warungbadidud.com/og-image.jpg" />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://warungbadidud.com/tentang" />
	<meta name="twitter:title" content="Tentang Kami - Warung Badidud" />
	<meta name="twitter:description" content="Kenali lebih dekat Warung Badidud - Cerita di balik ayam geprek dengan cita rasa nusantara yang autentik." />
	<meta name="twitter:image" content="https://warungbadidud.com/og-image.jpg" />
	
	<!-- Canonical URL -->
	<link rel="canonical" href="https://warungbadidud.com/tentang" />
	
	<!-- Structured Data - Organization -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Organization",
			"name": "Warung Badidud",
			"description": "Warung makan yang menyajikan ayam geprek dan makanan nusantara dengan cita rasa autentik sejak 2020",
			"url": "https://warungbadidud.com",
			"logo": "https://warungbadidud.com/logo.png",
			"foundingDate": "2020",
			"founders": [{
				"@type": "Person",
				"name": "Pendiri Warung Badidud"
			}],
			"sameAs": [
				"https://wa.me/62812345678"
			]
		}
	</script>
</svelte:head>

<Header />

<div class="min-h-screen bg-gradient-to-b from-white to-gray-50">
	<main class="pt-19">
		<!-- Hero Section -->
		<section class="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-red-800 py-20">
			<div class="absolute inset-0 opacity-10">
				<div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div>
			</div>

			<div class="relative mx-auto max-w-7xl px-6 text-center">
				<div class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 backdrop-blur-md">
					<span class="material-symbols-outlined text-white">restaurant</span>
					<span class="text-sm font-semibold text-white">{about.heroBadge ?? 'Sejak 2020'}</span>
				</div>

				<h1 class="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
					{#if $isEditMode && isAdmin}
						<EditableText value={about.heroTitle ?? 'Tentang Warung Badiduud'} tag="span" className="text-5xl md:text-6xl font-extrabold text-white" onSave={(v) => updateField('heroTitle', v)} />
					{:else}
						{about.heroTitle ?? 'Tentang Warung Badiduud'}
					{/if}
				</h1>

				<p class="mx-auto max-w-3xl text-lg text-red-100">
					{#if $isEditMode && isAdmin}
						<EditableText value={about.heroSubtitle ?? ''} tag="span" className="text-lg text-red-100" onSave={(v) => updateField('heroSubtitle', v)} />
					{:else}
						{about.heroSubtitle ?? 'Kami menghadirkan cita rasa nusantara yang autentik dengan bahan berkualitas terbaik untuk keluarga Indonesia'}
					{/if}
				</p>
			</div>
		</section>

		<!-- Story Section -->
		<section class="py-20">
			<div class="mx-auto max-w-7xl px-6">
				<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
					<div class="relative">
						<div class="grid grid-cols-2 gap-4">
							<div class="space-y-4">
								<div class="overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 p-8">
									<span class="material-symbols-outlined text-6xl text-amber-600">cottage</span>
								</div>
								<div class="overflow-hidden rounded-2xl bg-gradient-to-br from-red-100 to-pink-100 p-8">
									<span class="material-symbols-outlined text-6xl text-red-600">local_fire_department</span>
								</div>
							</div>
							<div class="space-y-4 pt-8">
								<div class="overflow-hidden rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 p-8">
									<span class="material-symbols-outlined text-6xl text-green-600">verified</span>
								</div>
								<div class="overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 p-8">
									<span class="material-symbols-outlined text-6xl text-blue-600">favorite</span>
								</div>
							</div>
						</div>
					</div>

					<div class="flex flex-col justify-center">
						<h2 class="mb-6 text-4xl font-bold text-gray-900">
							{#if $isEditMode && isAdmin}
								<EditableText value={about.storyTitle ?? 'Cerita Dibalik Kelezatan'} tag="span" className="text-4xl font-bold text-gray-900" onSave={(v) => updateField('storyTitle', v)} />
							{:else}
								{about.storyTitle ?? 'Cerita Dibalik Kelezatan'}
							{/if}
						</h2>

						<div class="space-y-6 text-gray-600">
							{#each (about.storyParagraphs ?? []) as paragraph, index}
								{#if $isEditMode && isAdmin}
									<EditableText value={paragraph} tag="p" className="text-gray-600" onSave={(v) => updateParagraph(index, v)} />
								{:else}
									<p>{@html paragraph}</p>
								{/if}
							{/each}
						</div>

						{#if about.stats}
							<div class="mt-8 flex flex-wrap gap-4">
								{#each about.stats as stat, index}
									<div class="flex items-center gap-3">
										<div class="flex h-12 w-12 items-center justify-center rounded-full {colorMap[stat.color]?.bgCircle ?? 'bg-red-100'}">
											<span class="material-symbols-outlined {colorMap[stat.color]?.text ?? 'text-red-700'}">{stat.icon}</span>
										</div>
										<div>
											{#if $isEditMode && isAdmin}
												<EditableText value={stat.value} tag="p" className="text-2xl font-bold text-gray-900" onSave={(v) => updateStat(index, 'value', v)} />
												<EditableText value={stat.label} tag="p" className="text-sm text-gray-600" onSave={(v) => updateStat(index, 'label', v)} />
											{:else}
												<p class="text-2xl font-bold text-gray-900">{stat.value}</p>
												<p class="text-sm text-gray-600">{stat.label}</p>
											{/if}
										</div>
									</div>
								{/each}
							</div>
						{/if}
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
					{#each (about.values ?? []) as value, index}
						<div class="group rounded-2xl bg-white p-8 text-center shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
							<div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br {colorMap[value.color]?.bg ?? 'from-red-500 to-red-700'} text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
								<span class="material-symbols-outlined text-3xl">{value.icon}</span>
							</div>
							{#if $isEditMode && isAdmin}
								<EditableText value={value.title} tag="h3" className="mb-3 text-xl font-bold text-gray-900" onSave={(v) => updateValue(index, 'title', v)} />
								<EditableText value={value.description} tag="p" className="text-gray-600" onSave={(v) => updateValue(index, 'description', v)} />
							{:else}
								<h3 class="mb-3 text-xl font-bold text-gray-900">{value.title}</h3>
								<p class="text-gray-600">{value.description}</p>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="bg-gradient-to-r from-red-600 to-red-700 py-20">
			<div class="mx-auto max-w-4xl px-6 text-center">
				<h2 class="mb-6 text-4xl font-bold text-white">
					{#if $isEditMode && isAdmin}
						<EditableText value={about.ctaTitle ?? 'Ingin Mencoba Kelezatan Kami?'} tag="span" className="text-4xl font-bold text-white" onSave={(v) => updateField('ctaTitle', v)} />
					{:else}
						{about.ctaTitle ?? 'Ingin Mencoba Kelezatan Kami?'}
					{/if}
				</h2>
				<p class="mb-8 text-lg text-red-100">
					{#if $isEditMode && isAdmin}
						<EditableText value={about.ctaDescription ?? ''} tag="span" className="text-lg text-red-100" onSave={(v) => updateField('ctaDescription', v)} />
					{:else}
						{about.ctaDescription ?? 'Kunjungi outlet kami atau pesan online dan nikmati cita rasa nusantara yang autentik'}
					{/if}
				</p>
				<div class="flex flex-wrap justify-center gap-4">
					<a href="/menu" class="rounded-full bg-white px-8 py-4 text-base font-bold text-red-700 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
						Lihat Menu
					</a>
					<a href="/lokasi" class="rounded-full bg-red-800 px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-red-900">
						Lokasi Outlet
					</a>
				</div>
			</div>
		</section>
	</main>

	<Footer />
</div>
