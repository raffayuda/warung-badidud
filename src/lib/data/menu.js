/**
 * @typedef MenuItem
 * @property {string} id - Unique identifier
 * @property {string} name - Menu item name
 * @property {string} description - Description of the dish
 * @property {string|number} price - Price (can be string or number)
 * @property {string} image - Image URL
 * @property {string} category - Category (Makanan, Cemilan, Rice Bowl)
 * @property {string} [badge] - Optional badge
 */

/** @type {MenuItem[]} */
export const allMenuItems = [
	// MAKANAN - Chicken
	{
		id: 'ayam-geprek',
		name: 'Ayam Geprek',
		description: '',
		price: 13000,
		image: 'menu-images/ayam-geprek.png',
		category: 'Makanan Utama',
		badge: undefined
	},
	{
		id: 'ayam-geprek-nasi-putih',
		name: 'Ayam Geprek Nasi Putih',
		description: '',
		price: 15000,
		image: 'menu-images/ayam-geprek-nasi-putih.png',
		category: 'Makanan Utama',
		badge: undefined
	},
	{
		id: 'ayam-geprek-nasi-tutug',
		name: 'Ayam Geprek Nasi Tutug Oncom',
		description: '',
		price: 18000,
		image: 'menu-images/ayam-geprek-nasi-oncom.png',
		category: 'Makanan Utama',
		badge: undefined
	},
	{
		id: 'ayam-bakar',
		name: 'Ayam Bakar',
		description: '',
		price: 13000,
		image: 'menu-images/ayam-bakar.png',
		category: 'Makanan Utama',
		badge: undefined
	},
	{
		id: 'ayam-bakar-nasi-putih',
		name: 'Ayam Bakar Nasi Putih',
		description: '',
		price: 15000,
		image: 'menu-images/ayam-bakar-nasi-putih.png',
		category: 'Makanan Utama',
		badge: undefined
	},
	{
		id: 'ayam-bakar-nasi-tutug',
		name: 'Ayam Bakar Nasi Tutug Oncom',
		description: '',
		price: 18000,
		image: 'menu-images/ayam-bakar-oncom.png',
		category: 'Makanan Utama',
		badge: undefined
	},
	{
		id: 'rice-box-tiram',
		name: 'Rice Box Saus Tiram',
		description: '',
		price: 17000,
		image: 'menu-images/rice-box-tiram.png',
		category: 'Makanan Utama',
		badge: undefined
	},
	{
		id: 'rice-box-lada',
		name: 'Rice Box Saus Lada Hitam',
		description: '',
		price: 17000,
		image: 'menu-images/rice-box-tiram.png',
		category: 'Makanan Utama',
		badge: undefined
	},
	{
		id: 'chicken-rice-spicy',
		name: 'Chicken Rice Spicy Mayo + Ayam Suwir',
		description: '',
		price: 15000,
		image: 'menu-images/chicken-rice-spicy.png',
		category: 'Makanan Utama',
		badge: undefined
	},
	{
		id: 'chicken-karaage',
		name: 'Chicken Karaage',
		description: '',
		price: 17000,
		image: 'menu-images/chicken-karaage.png',
		category: 'Makanan Utama',
		badge: undefined
	},
	{
		id: 'chicken-teriyaki',
		name: 'Chicken Teriyaki',
		description: '',
		price: 17000,
		image: 'menu-images/chicken-teriyaki.png',
		category: 'Makanan Utama',
		badge: undefined
	},
	{
		id: 'sate-ayam',
		name: 'Sate Ayam',
		description: 'per porsi',
		price: 10000,
		image: 'menu-images/sate-ayam.png',
		category: 'Makanan Utama',
		badge: undefined
	},
	{
		id: 'chicken-steak',
		name: 'Chicken Steak',
		description: '',
		price: 15000,
		image: 'menu-images/chicken-steak.png',
		category: 'Makanan Utama',
		badge: undefined
	},
	{
		id: 'chicken-katsu',
		name: 'Chicken Katsu',
		description: '',
		price: 15000,
		image: 'menu-images/chicken-katsu.png',
		category: 'Makanan Utama',
		badge: undefined
	},
	{
		id: 'mie-gemes',
		name: 'Mie Gemes',
		description: '',
		price: 12000,
		image: 'menu-images/mie-gemes.png',
		category: 'Makanan Utama',
		badge: undefined
	},

	// CEMILAN
	{
		id: 'sandwich',
		name: 'Sandwich',
		description: '+keju 12.000',
		price: 10000,
		image: 'menu-images/sandwich.png',
		category: 'Cemilan',
		badge: undefined
	},
	{
		id: 'hotdog',
		name: 'Hotdog',
		description: '',
		price: 10000,
		image: 'menu-images/hotdog.png',
		category: 'Cemilan',
		badge: undefined
	},
	{
		id: 'cireng-suwir',
		name: 'Cireng Ayam Suwir',
		description: '',
		price: 8000,
		image: 'menu-images/cireng-suwir.png',
		category: 'Cemilan',
		badge: undefined
	},
	{
		id: 'pempek',
		name: 'Pempek',
		description: '',
		price: 8000,
		image: 'menu-images/pempek.png',
		category: 'Cemilan',
		badge: undefined
	},
	{
		id: 'banana-bowl',
		name: 'Banana Bowl',
		description: '',
		price: 8000,
		image: 'menu-images/banana-bowl.png',
		category: 'Cemilan',
		badge: undefined
	},
	{
		id: 'sosis-bakar',
		name: 'Sosis Bakar',
		description: '',
		price: 2000,
		image: 'menu-images/sosis-bakar.png',
		category: 'Cemilan',
		badge: undefined
	},
	{
		id: 'sosis-bakar-jumbo',
		name: 'Sosis Bakar Jumbo',
		description: '',
		price: 5000,
		image: 'menu-images/sosis-bakar.png',
		category: 'Cemilan',
		badge: undefined
	},
	{
		id: 'dumpling-keju',
		name: 'Dumpling Keju',
		description: '',
		price: 4000,
		image: 'menu-images/dumpling-keju.png',
		category: 'Cemilan',
		badge: undefined
	},
	{
		id: 'fish-roll',
		name: 'Fish Roll',
		description: '',
		price: 2500,
		image: 'menu-images/fish-roll.png',
		category: 'Cemilan',
		badge: undefined
	},
	{
		id: 'chikuwa',
		name: 'Chikuwa',
		description: '',
		price: 2000,
		image: 'menu-images/chikuwa.png',
		category: 'Cemilan',
		badge: undefined
	},
	{
		id: 'french-fries',
		name: 'French Fries',
		description: '',
		price: 8000,
		image: 'menu-images/french-fries.png',
		category: 'Cemilan',
		badge: undefined
	},
	{
		id: 'roti-bakar',
		name: 'Roti Bakar',
		description: '',
		price: 8000,
		image: 'menu-images/roti-bakar.png',
		category: 'Cemilan',
		badge: undefined
	},
	{
		id: 'pisang-selimut',
		name: 'Pisang Selimut',
		description: '',
		price: 8000,
		image: 'menu-images/pisang-selimut.png',
		category: 'Cemilan',
		badge: undefined
	},

	// RICE BOWL - ONLY 10.000
	{
		id: 'rice-bowl-mayo',
		name: 'Chicken Mayo',
		description: 'Rice Bowl',
		price: 10000,
		image: 'menu-images/rice-bowl-mayo.png',
		category: 'Nasi Mangkuk',
		badge: undefined
	},
	{
		id: 'rice-bowl-crumble',
		name: 'Chicken Crumble Mayo',
		description: 'Rice Bowl',
		price: 10000,
		image: 'menu-images/rice-bowl-crumble.png',
		category: 'Nasi Mangkuk',
		badge: undefined
	},
	{
		id: 'rice-bowl-katsu',
		name: 'Katsu Hot Lava',
		description: 'Rice Bowl',
		price: 10000,
		image: 'menu-images/rice-bowl-katsu.png',
		category: 'Nasi Mangkuk',
		badge: undefined
	},
	{
		id: 'rice-bowl-drakor',
		name: 'Chicken Drakor',
		description: 'Rice Bowl',
		price: 10000,
		image: 'menu-images/rice-bowl-drakor.png',
		category: 'Nasi Mangkuk',
		badge: undefined
	}
];

/** @type {MenuItem[]} */
export const menuItems = [
	{
		id: 'sambal-matah',
		name: 'Sambal Matah',
		description: 'Ayam goreng renyah dengan siraman sambal matah Bali yang segar.',
		price: 'Rp 28k',
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3kxUYi_f6M0o-t7Y0-dE-ukVZLI28LHoQ3AhP6FTo0oczjOrisXmJB0Z98rTwcZ1opJBoOPcGr_Q-Su7X0RSM99vxb4GmYgj9HEMW-a-Ulohl-07ZEs4CvW5YNDzbjKN5qBnSFW10olV9iG1KrcJDl9qY-wJw6S1Ewqdwe08uLpsyrcELreeNq8MMZAMF0JHees1dMyYPfW0H0ezzOhqz9lavNWak3P6JtmOXYiZgNbUbZ5izkhFt_CZal9bZlH6ng6bFlH40r1I',
		category: 'Spesial',
		badge: 'Best Seller'
	},
	{
		id: 'geprek-pedas',
		name: 'Geprek Pedas',
		description: 'Ayam geprek dengan level pedas yang bisa kamu tentukan sendiri.',
		price: 'Rp 25k',
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArKDrmud4ffuqob8WR3LTqYt4s1KP0Gu_LBv1u-1DyZCncDpdcELGVTkNgkHq-hsG_SrvDt8aJwUyGU4lu-zmxHBHWveZFHVeNi5OV0B5OSGXawBi2qscvXhtZbmnA7M1de6rD_cHZaJM5Uv3eBlDsIy0FY0LtPld-R5rybhKed_b1usuqXjtibyOBTqg_CB_cKOAVXRSJyJgjlCqqE8Qx6agebTkMw9YvSY7PrROtBYBR99Amj6EeN_nX5jnOX92VaBXxHdmoJ1U',
		category: 'Spesial',
		badge: null
	},
	{
		id: 'keju-leleh',
		name: 'Keju Leleh',
		description: 'Gurihnya keju mozzarella yang meleleh di atas ayam panas.',
		price: 'Rp 32k',
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnmT7VYGJFjp5aD8Pfouq8cpiLUPtR64eUoCJsEImuqRwtuQmmJG8o8uU0rrVG5DI3f3Oky1-ofONobdMvx3Sn2pJdqNVWGvHNFXCJZ-47FW9KMArSA8NzsPHGDBqtk4G3gBiowkAU8AGLMkukJQiP5ABbs5BTF7Q8eV0D4P0spxkeNTJYm4MNlc-iQ77gPRvoQ1u3ryYTcHZSGmF_FUVhnGLaM-D_UpaPFozDjizfEnxj7jxfT08UdGKXU1rltrcRyvamTGilx44',
		category: 'Spesial',
		badge: 'Chef Pick'
	},
	{
		id: 'kremes-renyah',
		name: 'Kremes Renyah',
		description: 'Tekstur kriuk yang bikin ketagihan dengan bumbu meresap.',
		price: 'Rp 22k',
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8_3ArbwuAOvVf8GssvKS3IycmCURzMrRkQKgNB7yWuqmpHfke5qfwMPuV0QEM2-1lRXAkenuKm_6Ju4alvtOLzhqiHlUg3HG2Qfl1g7I8e-WAht0dPe6Mheyc76MBJroKgKMAZXj04db09kBWPMZGfVftfIX0jlz-e9VFmkPq9KLG8arYPA9V7p1_SqBKCI3D0fl8H55ksNM8X87coZJ1Nb3iRWZ9nAbqoRqeybByXPts0t-6WHch-vF8uO5IAunE2x9XwtQTbJM',
		category: 'Spesial',
		badge: null
	}
];

/** @type {Object[]} */
export const heroSlides = [
	{
		id: 'slide-1',
		title: 'Lezatnya Ayam Goreng',
		subtitle: 'Cita Rasa Ungggulan',
		description: 'Nikmati kelezatan ayam goreng dengan bahan-bahan berkualitas tinggi dan resep nusantara yang otentik.',
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDndlYRDGBpylCOWmK9Ds7fatODdb0MqBsC7PcrpHUpbbYB339uFQ5bwA1qoN-kS0mzyRu62ZM6YzNsx2tsZjr7kLYfSfDfeJMffV5lIlWavFyXotNO3NZYMzArJG-mn3QDVdJEBn4AaTsMNGR63ESqGeMU5oQowDfBcZKI0viTtFtjX-lpll8h7QwcZK8LSYYZaUB2YliRaLbNHzLZEG1Eo3svmdLGqKaM_Grnu9U38vdaxM1nNjsAg4hlCSXj8h2GO9qvwapfnXU'
	},
	{
		id: 'slide-2',
		title: 'Sambal Matah Segar',
		subtitle: 'Khas Bali Autentik',
		description: 'Bumbu rempah Bali yang segar mengiringi setiap gigitan ayam goreng renyah kami.',
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3kxUYi_f6M0o-t7Y0-dE-ukVZLI28LHoQ3AhP6FTo0oczjOrisXmJB0Z98rTwcZ1opJBoOPcGr_Q-Su7X0RSM99vxb4GmYgj9HEMW-a-Ulohl-07ZEs4CvW5YNDzbjKN5qBnSFW10olV9iG1KrcJDl9qY-wJw6S1Ewqdwe08uLpsyrcELreeNq8MMZAMF0JHees1dMyYPfW0H0ezzOhqz9lavNWak3P6JtmOXYiZgNbUbZ5izkhFt_CZal9bZlH6ng6bFlH40r1I'
	},
	{
		id: 'slide-3',
		title: 'Keju Leleh Gurih',
		subtitle: 'Mozzarella Premium',
		description: 'Kelembutan keju yang meleleh di atas panas ayam goreng kami menciptakan harmoni rasa yang sempurna.',
		image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnmT7VYGJFjp5aD8Pfouq8cpiLUPtR64eUoCJsEImuqRwtuQmmJG8o8uU0rrVG5DI3f3Oky1-ofONobdMvx3Sn2pJdqNVWGvHNFXCJZ-47FW9KMArSA8NzsPHGDBqtk4G3gBiowkAU8AGLMkukJQiP5ABbs5BTF7Q8eV0D4P0spxkeNTJYm4MNlc-iQ77gPRvoQ1u3ryYTcHZSGmF_FUVhnGLaM-D_UpaPFozDjizfEnxj7jxfT08UdGKXU1rltrcRyvamTGilx44'
	}
];

/** @type {Object[]} */
export const features = [
	{
		id: 'halal',
		icon: 'verified',
		title: '100% Halal & Segar',
		description: 'Daging ayam pilihan dari peternakan lokal yang dipotong setiap subuh.'
	},
	{
		id: 'resep',
		icon: 'restaurant',
		title: 'Resep Nusantara',
		description: 'Warisan bumbu rempah asli yang diracik khusus untuk lidah Indonesia.'
	},
	{
		id: 'varian',
		icon: 'fastfood',
		title: 'Banyak Varian',
		description: 'Dari Sambal Matah hingga Keju Leleh, semua ada untuk seleramu.'
	},
	{
		id: 'delivery',
		icon: 'delivery_dining',
		title: 'Pengiriman Cepat',
		description: 'Tetap hangat dan renyah sampai ke depan pintu rumah Anda.'
	}
];
