<script>
	import Header from '$lib/components/Header.svelte';
	import HeroCarousel from '$lib/components/HeroCarousel.svelte';
	import FeaturesSection from '$lib/components/FeaturesSection.svelte';
	import MenuSection from '$lib/components/MenuSection.svelte';
	import StorySection from '$lib/components/StorySection.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data } = $props();
</script>

<Header />
<HeroCarousel slides={data.heroSlides} />
<FeaturesSection features={data.features} />
<MenuSection menuItems={data.featuredMenuItems} />
<StorySection story={data.story} />
<Footer />
