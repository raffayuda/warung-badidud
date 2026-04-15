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
	<title>Warung Badidud | Waroeng Badidud | Warung Badiduud | Waroeng Badiduud - Ayam Geprek Enak Bogor</title>
	<meta name="description" content="Warung Badidud / Waroeng Badidud / Warung Badiduud / Waroeng Badiduud - Restoran ayam geprek terbaik dengan cita rasa nusantara autentik. Menu: ayam geprek, paket hemat, rice bowl, cemilan berkualitas. Harga terjangkau, rasa istimewa di Bogor!" />
	<meta name="keywords" content="warung badidud, waroeng badidud, warung badiduud, waroeng badiduud, warung badiduud bogor, waroeng badiduud bogor, ayam geprek, warung ayam, restoran nusantara, makanan murah, ayam goreng, rice bowl, paket hemat, kuliner Bogor, makanan enak, cemilan" />
	<meta name="author" content="Warung Badidud" />
	<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
	
	<!-- Additional SEO Meta Tags -->
	<meta name="language" content="id-ID" />
	<meta name="geo.placename" content="Bogor, Indonesia" />
	<meta name="geo.country" content="ID" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://badidud.boday.my.id/" />
	<meta property="og:title" content="Warung Badidud (Waroeng Badidud / Badiduud) - Ayam Geprek Enak Bogor" />
	<meta property="og:description" content="Warung Badidud / Waroeng Badidud menyajikan ayam geprek, paket hemat, rice bowl dengan cita rasa nusantara autentik. Harga terjangkau, rasa bintang lima!" />
	<meta property="og:image" content="https://badidud.boday.my.id/og-image.jpg" />
	
	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:url" content="https://badidud.boday.my.id/" />
	<meta name="twitter:title" content="Warung Badidud (Waroeng Badidud / Badiduud) - Ayam Geprek Enak" />
	<meta name="twitter:description" content="Warung Badidud / Waroeng Badidud menyajikan ayam geprek, paket hemat, rice bowl dengan cita rasa nusantara autentik." />
	<meta name="twitter:image" content="https://badidud.boday.my.id/og-image.jpg" />
	
	<!-- Canonical URL -->
	<link rel="canonical" href="https://badidud.boday.my.id/" />
	
	<!-- Structured Data - Restaurant with Alternative Names -->
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Restaurant",
			"name": "Warung Badidud",
			"alternateName": ["Waroeng Badidud", "Warung Badiduud", "Waroeng Badiduud"],
			"description": "Warung Badidud (Waroeng Badidud / Warung Badiduud / Waroeng Badiduud) adalah restoran ayam geprek dan makanan nusantara dengan cita rasa autentik, harga terjangkau, dan kualitas bintang lima di Bogor",
			"url": "https://badidud.boday.my.id",
			"logo": "https://badidud.boday.my.id/logo.png",
			"image": "https://badidud.boday.my.id/og-image.jpg",
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
			"menu": "https://badidud.boday.my.id/menu",
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
			"name": "Warung Badidud",
			"alternateName": ["Waroeng Badidud", "Warung Badiduud", "Waroeng Badiduud"],
			"description": "Restoran ayam geprek terbaik di Bogor dengan menu nusantara autentik. Dikenal juga sebagai Waroeng Badidud, Warung Badiduud, atau Waroeng Badiduud.",
			"url": "https://badidud.boday.my.id",
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
