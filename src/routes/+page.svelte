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
	<title>Warung Badiduud - Waroeng Badiduud Ayam Geprek Enak Bogor</title>
	<meta name="description" content="Warung Badiduud (Waroeng Badiduud) adalah restoran ayam geprek terbaik dengan cita rasa nusantara autentik. Menu favorit: ayam geprek, paket hemat, rice bowl, dan cemilan berkualitas. Harga terjangkau, rasa istimewa!" />
	<meta name="keywords" content="warung badiduud, warung badidud, waroeng badiduud, waroeng badidud, ayam geprek, warung ayam, restoran nusantara, makanan murah, ayam goreng, rice bowl, paket hemat, kuliner Bogor, makanan enak, cemilan" />
	<meta name="author" content="Warung Badiduud" />
	<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
	
	<!-- Additional SEO Meta Tags -->
	<meta name="language" content="id-ID" />
	<meta name="geo.placename" content="Bogor, Indonesia" />
	<meta name="geo.country" content="ID" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://badidiud.boday.my.id/" />
	<meta property="og:title" content="Warung Badiduud - Waroeng Badiduud Ayam Geprek Enak" />
	<meta property="og:description" content="Warung Badiduud menyajikan ayam geprek, paket hemat, rice bowl dengan cita rasa nusantara autentik. Harga terjangkau, rasa bintang lima!" />
	<meta property="og:image" content="https://badidiud.boday.my.id/og-image.jpg" />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://badidiud.boday.my.id/" />
	<meta name="twitter:title" content="Warung Badiduud - Waroeng Badiduud Ayam Geprek Enak" />
	<meta name="twitter:description" content="Warung Badiduud menyajikan ayam geprek, paket hemat, rice bowl dengan cita rasa nusantara autentik." />
	<meta name="twitter:image" content="https://badidiud.boday.my.id/og-image.jpg" />
	
	<!-- Canonical URL -->
	<link rel="canonical" href="https://badidiud.boday.my.id/" />
	
	<!-- Structured Data - Restaurant with Alternative Names -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Restaurant",
			"name": "Warung Badiduud",
			"alternateName": ["Waroeng Badiduud", "Warung Badidud", "Waroeng Badidud"],
			"description": "Warung (Waroeng) Badiduud adalah restoran ayam geprek dan makanan nusantara dengan cita rasa autentik, harga terjangkau, dan kualitas bintang lima",
			"url": "https://badidiud.boday.my.id",
			"logo": "https://badidiud.boday.my.id/logo.png",
			"image": "https://badidiud.boday.my.id/og-image.jpg",
			"telephone": "+62-812-345-678",
			"priceRange": "Rp",
			"servesCuisine": ["Indonesian", "Javanese", "Nusantara"],
			"address": {
				"@type": "PostalAddress",
				"addressCountry": "ID",
				"addressLocality": "Bogor, Indonesia"
			},
			"openingHoursSpecification": {
				"@type": "OpeningHoursSpecification",
				"dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
				"opens": "10:00",
				"closes": "22:00"
			},
			"menu": "https://badidiud.boday.my.id/menu",
			"acceptsReservations": false,
			"sameAs": [
				"https://www.instagram.com/warungbadiduud",
				"https://www.facebook.com/warungbadiduud"
			]
		}
	</script>

	<!-- Additional Schema for LocalBusiness (untuk Local SEO) -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "LocalBusiness",
			"name": "Warung Badiduud",
			"alternateName": ["Waroeng Badiduud"],
			"description": "Restoran ayam geprek terbaik di Bogor dengan menu nusantara autentik",
			"url": "https://badidiud.boday.my.id",
			"address": {
				"@type": "PostalAddress",
				"addressCountry": "ID",
				"addressLocality": "Bogor"
			},
			"areaServed": {
				"@type": "City",
				"name": "Bogor"
			},
			"serviceType": "Restaurant"
		}
	</script>
</svelte:head>

<Header />
<HeroCarousel slides={data.heroSlides} />
<FeaturesSection features={data.features} />
<MenuSection menuItems={data.featuredMenuItems} />
<StorySection story={data.story} />
<Footer />
