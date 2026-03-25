<script>
	import Header from '$lib/components/Header.svelte';
	import HeroCarousel from '$lib/components/HeroCarousel.svelte';
	import FeaturesSection from '$lib/components/FeaturesSection.svelte';
	import MenuSection from '$lib/components/MenuSection.svelte';
	import StorySection from '$lib/components/StorySection.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Warung Badidud - Ayam Geprek & Makanan Nusantara Enak</title>
	<meta name="description" content="Warung Badidud menyajikan ayam geprek, paket hemat, rice bowl, dan cemilan dengan cita rasa nusantara autentik. Harga terjangkau, rasa bintang lima!" />
	<meta name="keywords" content="ayam geprek, warung badidud, makanan nusantara, ayam enak, paket hemat, rice bowl, cemilan, kuliner indonesia, makanan murah enak" />
	<meta name="author" content="Warung Badidud" />
	<meta name="robots" content="index, follow" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://warungbadidud.com/" />
	<meta property="og:title" content="Warung Badidud - Ayam Geprek & Makanan Nusantara Enak" />
	<meta property="og:description" content="Warung Badidud menyajikan ayam geprek, paket hemat, rice bowl, dan cemilan dengan cita rasa nusantara autentik." />
	<meta property="og:image" content="https://warungbadidud.com/og-image.jpg" />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://warungbadidud.com/" />
	<meta name="twitter:title" content="Warung Badidud - Ayam Geprek & Makanan Nusantara Enak" />
	<meta name="twitter:description" content="Warung Badidud menyajikan ayam geprek, paket hemat, rice bowl, dan cemilan dengan cita rasa nusantara autentik." />
	<meta name="twitter:image" content="https://warungbadidud.com/og-image.jpg" />
	
	<!-- Canonical URL -->
	<link rel="canonical" href="https://warungbadidud.com/" />
	
	<!-- Structured Data - LocalBusiness -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Restaurant",
			"name": "Warung Badidud",
			"description": "Warung makan yang menyajikan ayam geprek dan makanan nusantara dengan cita rasa autentik",
			"url": "https://warungbadidud.com",
			"logo": "https://warungbadidud.com/logo.png",
			"image": "https://warungbadidud.com/og-image.jpg",
			"telephone": "+62-812-345-678",
			"priceRange": "Rp",
			"servesCuisine": "Indonesian",
			"address": {
				"@type": "PostalAddress",
				"addressCountry": "ID"
			},
			"openingHoursSpecification": {
				"@type": "OpeningHoursSpecification",
				"dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
				"opens": "10:00",
				"closes": "22:00"
			},
			"menu": "https://warungbadidud.com/menu",
			"acceptsReservations": "False"
		}
	</script>
</svelte:head>

<Header />
<HeroCarousel slides={data.heroSlides} />
<FeaturesSection features={data.features} />
<MenuSection menuItems={data.featuredMenuItems} />
<StorySection story={data.story} />
<Footer />
