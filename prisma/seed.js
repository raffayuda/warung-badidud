import { PrismaClient } from '@prisma/client';
import { randomBytes, scryptSync } from 'crypto';

const prisma = new PrismaClient();

function hashPassword(password) {
	const salt = randomBytes(16).toString('hex');
	const hash = scryptSync(password, salt, 64).toString('hex');
	return `${salt}:${hash}`;
}

async function main() {
	console.log('🌱 Seeding database...');

	// Seed Admin
	await prisma.admin.upsert({
		where: { username: 'admin' },
		update: {},
		create: {
			username: 'admin',
			password: hashPassword('admin123')
		}
	});
	console.log('✅ Admin user created');

	// Seed Hero Slides
	await prisma.heroSlide.deleteMany();
	await prisma.heroSlide.createMany({
		data: [
			{
				title: 'Lezatnya Ayam Goreng',
				subtitle: 'Cita Rasa Ungggulan',
				description:
					'Nikmati kelezatan ayam goreng dengan bahan-bahan berkualitas tinggi dan resep nusantara yang otentik.',
				image:
					'https://lh3.googleusercontent.com/aida-public/AB6AXuDndlYRDGBpylCOWmK9Ds7fatODdb0MqBsC7PcrpHUpbbYB339uFQ5bwA1qoN-kS0mzyRu62ZM6YzNsx2tsZjr7kLYfSfDfeJMffV5lIlWavFyXotNO3NZYMzArJG-mn3QDVdJEBn4AaTsMNGR63ESqGeMU5oQowDfBcZKI0viTtFtjX-lpll8h7QwcZK8LSYYZaUB2YliRaLbNHzLZEG1Eo3svmdLGqKaM_Grnu9U38vdaxM1nNjsAg4hlCSXj8h2GO9qvwapfnXU',
				sortOrder: 0
			},
			{
				title: 'Sambal Matah Segar',
				subtitle: 'Khas Bali Autentik',
				description:
					'Bumbu rempah Bali yang segar mengiringi setiap gigitan ayam goreng renyah kami.',
				image:
					'https://lh3.googleusercontent.com/aida-public/AB6AXuD3kxUYi_f6M0o-t7Y0-dE-ukVZLI28LHoQ3AhP6FTo0oczjOrisXmJB0Z98rTwcZ1opJBoOPcGr_Q-Su7X0RSM99vxb4GmYgj9HEMW-a-Ulohl-07ZEs4CvW5YNDzbjKN5qBnSFW10olV9iG1KrcJDl9qY-wJw6S1Ewqdwe08uLpsyrcELreeNq8MMZAMF0JHees1dMyYPfW0H0ezzOhqz9lavNWak3P6JtmOXYiZgNbUbZ5izkhFt_CZal9bZlH6ng6bFlH40r1I',
				sortOrder: 1
			},
			{
				title: 'Keju Leleh Gurih',
				subtitle: 'Mozzarella Premium',
				description:
					'Kelembutan keju yang meleleh di atas panas ayam goreng kami menciptakan harmoni rasa yang sempurna.',
				image:
					'https://lh3.googleusercontent.com/aida-public/AB6AXuAnmT7VYGJFjp5aD8Pfouq8cpiLUPtR64eUoCJsEImuqRwtuQmmJG8o8uU0rrVG5DI3f3Oky1-ofONobdMvx3Sn2pJdqNVWGvHNFXCJZ-47FW9KMArSA8NzsPHGDBqtk4G3gBiowkAU8AGLMkukJQiP5ABbs5BTF7Q8eV0D4P0spxkeNTJYm4MNlc-iQ77gPRvoQ1u3ryYTcHZSGmF_FUVhnGLaM-D_UpaPFozDjizfEnxj7jxfT08UdGKXU1rltrcRyvamTGilx44',
				sortOrder: 2
			}
		]
	});
	console.log('✅ Hero slides created');

	// Seed Features
	await prisma.feature.deleteMany();
	await prisma.feature.createMany({
		data: [
			{
				icon: 'verified',
				title: '100% Halal & Segar',
				description: 'Daging ayam pilihan dari peternakan lokal yang dipotong setiap subuh.',
				sortOrder: 0
			},
			{
				icon: 'restaurant',
				title: 'Resep Nusantara',
				description: 'Warisan bumbu rempah asli yang diracik khusus untuk lidah Indonesia.',
				sortOrder: 1
			},
			{
				icon: 'fastfood',
				title: 'Banyak Varian',
				description: 'Dari Sambal Matah hingga Keju Leleh, semua ada untuk seleramu.',
				sortOrder: 2
			},
			{
				icon: 'delivery_dining',
				title: 'Pengiriman Cepat',
				description: 'Tetap hangat dan renyah sampai ke depan pintu rumah Anda.',
				sortOrder: 3
			}
		]
	});
	console.log('✅ Features created');

	// Seed Menu Items (all from allMenuItems)
	await prisma.menuItem.deleteMany();
	const allMenuItems = [
		// MAKANAN UTAMA
		{ name: 'Ayam Geprek', description: '', price: 13000, image: 'menu-images/ayam-geprek.png', category: 'Makanan Utama', badge: null, isFeatured: false, sortOrder: 0 },
		{ name: 'Ayam Geprek Nasi Putih', description: '', price: 15000, image: 'menu-images/ayam-geprek-nasi-putih.png', category: 'Makanan Utama', badge: null, isFeatured: false, sortOrder: 1 },
		{ name: 'Ayam Geprek Nasi Tutug Oncom', description: '', price: 18000, image: 'menu-images/ayam-geprek-nasi-oncom.png', category: 'Makanan Utama', badge: null, isFeatured: false, sortOrder: 2 },
		{ name: 'Ayam Bakar', description: '', price: 13000, image: 'menu-images/ayam-bakar.png', category: 'Makanan Utama', badge: null, isFeatured: false, sortOrder: 3 },
		{ name: 'Ayam Bakar Nasi Putih', description: '', price: 15000, image: 'menu-images/ayam-bakar-nasi-putih.png', category: 'Makanan Utama', badge: null, isFeatured: false, sortOrder: 4 },
		{ name: 'Ayam Bakar Nasi Tutug Oncom', description: '', price: 18000, image: 'menu-images/ayam-bakar-oncom.png', category: 'Makanan Utama', badge: null, isFeatured: false, sortOrder: 5 },
		{ name: 'Rice Box Saus Tiram', description: '', price: 17000, image: 'menu-images/rice-box-tiram.png', category: 'Makanan Utama', badge: null, isFeatured: false, sortOrder: 6 },
		{ name: 'Rice Box Saus Lada Hitam', description: '', price: 17000, image: 'menu-images/rice-box-tiram.png', category: 'Makanan Utama', badge: null, isFeatured: false, sortOrder: 7 },
		{ name: 'Chicken Rice Spicy Mayo + Ayam Suwir', description: '', price: 15000, image: 'menu-images/chicken-rice-spicy.png', category: 'Makanan Utama', badge: null, isFeatured: false, sortOrder: 8 },
		{ name: 'Chicken Karaage', description: '', price: 17000, image: 'menu-images/chicken-karaage.png', category: 'Makanan Utama', badge: null, isFeatured: false, sortOrder: 9 },
		{ name: 'Chicken Teriyaki', description: '', price: 17000, image: 'menu-images/chicken-teriyaki.png', category: 'Makanan Utama', badge: null, isFeatured: false, sortOrder: 10 },
		{ name: 'Sate Ayam', description: 'per porsi', price: 10000, image: 'menu-images/sate-ayam.png', category: 'Makanan Utama', badge: null, isFeatured: false, sortOrder: 11 },
		{ name: 'Chicken Steak', description: '', price: 15000, image: 'menu-images/chicken-steak.png', category: 'Makanan Utama', badge: null, isFeatured: false, sortOrder: 12 },
		{ name: 'Chicken Katsu', description: '', price: 15000, image: 'menu-images/chicken-katsu.png', category: 'Makanan Utama', badge: null, isFeatured: false, sortOrder: 13 },
		{ name: 'Mie Gemes', description: '', price: 12000, image: 'menu-images/mie-gemes.png', category: 'Makanan Utama', badge: null, isFeatured: false, sortOrder: 14 },
		// CEMILAN
		{ name: 'Sandwich', description: '+keju 12.000', price: 10000, image: 'menu-images/sandwich.png', category: 'Cemilan', badge: null, isFeatured: false, sortOrder: 15 },
		{ name: 'Hotdog', description: '', price: 10000, image: 'menu-images/hotdog.png', category: 'Cemilan', badge: null, isFeatured: false, sortOrder: 16 },
		{ name: 'Cireng Ayam Suwir', description: '', price: 8000, image: 'menu-images/cireng-suwir.png', category: 'Cemilan', badge: null, isFeatured: false, sortOrder: 17 },
		{ name: 'Pempek', description: '', price: 8000, image: 'menu-images/pempek.png', category: 'Cemilan', badge: null, isFeatured: false, sortOrder: 18 },
		{ name: 'Banana Bowl', description: '', price: 8000, image: 'menu-images/banana-bowl.png', category: 'Cemilan', badge: null, isFeatured: false, sortOrder: 19 },
		{ name: 'Sosis Bakar', description: '', price: 2000, image: 'menu-images/sosis-bakar.png', category: 'Cemilan', badge: null, isFeatured: false, sortOrder: 20 },
		{ name: 'Sosis Bakar Jumbo', description: '', price: 5000, image: 'menu-images/sosis-bakar.png', category: 'Cemilan', badge: null, isFeatured: false, sortOrder: 21 },
		{ name: 'Dumpling Keju', description: '', price: 4000, image: 'menu-images/dumpling-keju.png', category: 'Cemilan', badge: null, isFeatured: false, sortOrder: 22 },
		{ name: 'Fish Roll', description: '', price: 2500, image: 'menu-images/fish-roll.png', category: 'Cemilan', badge: null, isFeatured: false, sortOrder: 23 },
		{ name: 'Chikuwa', description: '', price: 2000, image: 'menu-images/chikuwa.png', category: 'Cemilan', badge: null, isFeatured: false, sortOrder: 24 },
		{ name: 'French Fries', description: '', price: 8000, image: 'menu-images/french-fries.png', category: 'Cemilan', badge: null, isFeatured: false, sortOrder: 25 },
		{ name: 'Roti Bakar', description: '', price: 8000, image: 'menu-images/roti-bakar.png', category: 'Cemilan', badge: null, isFeatured: false, sortOrder: 26 },
		{ name: 'Pisang Selimut', description: '', price: 8000, image: 'menu-images/pisang-selimut.png', category: 'Cemilan', badge: null, isFeatured: false, sortOrder: 27 },
		// NASI MANGKUK
		{ name: 'Chicken Mayo', description: 'Rice Bowl', price: 10000, image: 'menu-images/rice-bowl-mayo.png', category: 'Nasi Mangkuk', badge: null, isFeatured: false, sortOrder: 28 },
		{ name: 'Chicken Crumble Mayo', description: 'Rice Bowl', price: 10000, image: 'menu-images/rice-bowl-crumble.png', category: 'Nasi Mangkuk', badge: null, isFeatured: false, sortOrder: 29 },
		{ name: 'Katsu Hot Lava', description: 'Rice Bowl', price: 10000, image: 'menu-images/rice-bowl-katsu.png', category: 'Nasi Mangkuk', badge: null, isFeatured: false, sortOrder: 30 },
		{ name: 'Chicken Drakor', description: 'Rice Bowl', price: 10000, image: 'menu-images/rice-bowl-drakor.png', category: 'Nasi Mangkuk', badge: null, isFeatured: false, sortOrder: 31 },
		// FEATURED (homepage populer section)
		{
			name: 'Sambal Matah',
			description: 'Ayam goreng renyah dengan siraman sambal matah Bali yang segar.',
			price: 28000,
			image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3kxUYi_f6M0o-t7Y0-dE-ukVZLI28LHoQ3AhP6FTo0oczjOrisXmJB0Z98rTwcZ1opJBoOPcGr_Q-Su7X0RSM99vxb4GmYgj9HEMW-a-Ulohl-07ZEs4CvW5YNDzbjKN5qBnSFW10olV9iG1KrcJDl9qY-wJw6S1Ewqdwe08uLpsyrcELreeNq8MMZAMF0JHees1dMyYPfW0H0ezzOhqz9lavNWak3P6JtmOXYiZgNbUbZ5izkhFt_CZal9bZlH6ng6bFlH40r1I',
			category: 'Spesial',
			badge: 'Best Seller',
			isFeatured: true,
			sortOrder: 32
		},
		{
			name: 'Geprek Pedas',
			description: 'Ayam geprek dengan level pedas yang bisa kamu tentukan sendiri.',
			price: 25000,
			image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArKDrmud4ffuqob8WR3LTqYt4s1KP0Gu_LBv1u-1DyZCncDpdcELGVTkNgkHq-hsG_SrvDt8aJwUyGU4lu-zmxHBHWveZFHVeNi5OV0B5OSGXawBi2qscvXhtZbmnA7M1de6rD_cHZaJM5Uv3eBlDsIy0FY0LtPld-R5rybhKed_b1usuqXjtibyOBTqg_CB_cKOAVXRSJyJgjlCqqE8Qx6agebTkMw9YvSY7PrROtBYBR99Amj6EeN_nX5jnOX92VaBXxHdmoJ1U',
			category: 'Spesial',
			badge: null,
			isFeatured: true,
			sortOrder: 33
		},
		{
			name: 'Keju Leleh',
			description: 'Gurihnya keju mozzarella yang meleleh di atas ayam panas.',
			price: 32000,
			image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnmT7VYGJFjp5aD8Pfouq8cpiLUPtR64eUoCJsEImuqRwtuQmmJG8o8uU0rrVG5DI3f3Oky1-ofONobdMvx3Sn2pJdqNVWGvHNFXCJZ-47FW9KMArSA8NzsPHGDBqtk4G3gBiowkAU8AGLMkukJQiP5ABbs5BTF7Q8eV0D4P0spxkeNTJYm4MNlc-iQ77gPRvoQ1u3ryYTcHZSGmF_FUVhnGLaM-D_UpaPFozDjizfEnxj7jxfT08UdGKXU1rltrcRyvamTGilx44',
			category: 'Spesial',
			badge: 'Chef Pick',
			isFeatured: true,
			sortOrder: 34
		},
		{
			name: 'Kremes Renyah',
			description: 'Tekstur kriuk yang bikin ketagihan dengan bumbu meresap.',
			price: 22000,
			image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8_3ArbwuAOvVf8GssvKS3IycmCURzMrRkQKgNB7yWuqmpHfke5qfwMPuV0QEM2-1lRXAkenuKm_6Ju4alvtOLzhqiHlUg3HG2Qfl1g7I8e-WAht0dPe6Mheyc76MBJroKgKMAZXj04db09kBWPMZGfVftfIX0jlz-e9VFmkPq9KLG8arYPA9V7p1_SqBKCI3D0fl8H55ksNM8X87coZJ1Nb3iRWZ9nAbqoRqeybByXPts0t-6WHch-vF8uO5IAunE2x9XwtQTbJM',
			category: 'Spesial',
			badge: null,
			isFeatured: true,
			sortOrder: 35
		}
	];

	await prisma.menuItem.createMany({ data: allMenuItems });
	console.log('✅ Menu items created');

	// Seed SiteContent - Story Section
	const siteContents = [
		{
			key: 'story',
			value: JSON.stringify({
				title: 'Dari Dapur Kecil Menuju',
				titleHighlight: 'Hati Indonesia',
				paragraphs: [
					'Perjalanan Ayam Juara dimulai dari kecintaan kami terhadap kuliner nusantara yang otentik. Kami percaya bahwa ayam goreng yang lezat lahir dari bahan-bahan berkualitas tinggi dan kesabaran dalam proses memasaknya.',
					'Setiap cabang kami membawa semangat UMKM untuk terus bertumbuh, merangkul masyarakat sekitar, dan memberikan kebahagiaan melalui hidangan yang kami sajikan. Kami tidak hanya menjual makanan, kami menyajikan cerita perjuangan dan kehangatan keluarga.'
				],
				quote: 'Citarasa bukan sekedar bumbu, tapi tentang rasa syukur dalam setiap suapan.',
				quoteAuthor: '— Founder Ayam Juara',
				image:
					'https://lh3.googleusercontent.com/aida-public/AB6AXuCE9r5qUczq0cDy6IdzzPLOco-FWkjTsGb0Yr3jL4ZijuH-LCeDoNnXPGud1GYYrkrASEW1wjHpQSXXwS9qP7b84yYcNoZy8OopPPkgBZ7CEwOJWxW6BmcSf-UzdnvQnGT62Ke0mR3CCDf_TA9WCotoZkKoQNZv9WOWxXRTksUXAswQdsJgv0b4ZVoh0cD2vMW1A9eTyXyAyqZjRCkLUVjDesrIpC1STR3D2SanqaJ52JwWtWsmDV7is3P08tgNEYyQQ1gDsjR2fHg'
			})
		},
		{
			key: 'about',
			value: JSON.stringify({
				heroTitle: 'Tentang Warung Badiduud',
				heroSubtitle:
					'Kami menghadirkan cita rasa nusantara yang autentik dengan bahan berkualitas terbaik untuk keluarga Indonesia',
				heroBadge: 'Sejak 2020',
				storyTitle: 'Cerita Dibalik Kelezatan',
				storyParagraphs: [
					'<strong class="text-gray-900">Warung Badiduud</strong> bermula dari kecintaan kami terhadap kuliner nusantara yang autentik. Pada tahun 2020, kami memulai perjalanan untuk menghadirkan ayam goreng dengan cita rasa yang mengingatkan pada masakan rumah nenek.',
					'Setiap resep kami wariskan dari generasi ke generasi, dengan perpaduan bumbu rempah pilihan yang diracik secara tradisional. Kami bangga menyajikan hidangan yang tidak hanya lezat, tetapi juga mengandung nilai-nilai kearifan lokal.',
					'Komitmen kami terhadap kualitas dan kehalalan bahan menjadikan Warung Badiduud pilihan terpercaya untuk keluarga Indonesia. Dari dapur kami ke meja Anda, setiap hidangan disiapkan dengan cinta dan kebanggaan.'
				],
				stats: [
					{ value: '5+', label: 'Tahun Pengalaman', icon: 'workspace_premium', color: 'red' },
					{ value: '100%', label: 'Halal Certified', icon: 'verified_user', color: 'green' },
					{ value: '10K+', label: 'Pelanggan Puas', icon: 'people', color: 'amber' }
				],
				values: [
					{
						icon: 'volunteer_activism',
						title: 'Kualitas Terbaik',
						description: 'Bahan segar pilihan dari pemasok terpercaya untuk hasil terbaik',
						color: 'red'
					},
					{
						icon: 'shield',
						title: '100% Halal',
						description: 'Terjamin kehalalannya dengan sertifikat resmi dari MUI',
						color: 'green'
					},
					{
						icon: 'history_edu',
						title: 'Resep Tradisional',
						description: 'Warisan bumbu nusantara yang autentik dari generasi ke generasi',
						color: 'amber'
					},
					{
						icon: 'sentiment_very_satisfied',
						title: 'Kepuasan Pelanggan',
						description: 'Komitmen kami untuk memberikan pengalaman kuliner terbaik',
						color: 'blue'
					}
				],
				team: [
					{
						name: 'Chef Ahmad',
						role: 'Head Chef',
						description: 'Ahli bumbu nusantara dengan pengalaman 15 tahun',
						color: 'red'
					},
					{
						name: 'Siti Nurhaliza',
						role: 'Founder & CEO',
						description: 'Pencinta kuliner nusantara dan pendiri Warung Badiduud',
						color: 'green'
					},
					{
						name: 'Budi Santoso',
						role: 'Operations Manager',
						description: 'Menjaga kualitas dan kepuasan pelanggan setiap hari',
						color: 'blue'
					}
				],
				ctaTitle: 'Ingin Mencoba Kelezatan Kami?',
				ctaDescription:
					'Kunjungi outlet kami atau pesan online dan nikmati cita rasa nusantara yang autentik'
			})
		},
		{
			key: 'location',
			value: JSON.stringify({
				name: 'Warung Badiduud',
				address: 'Jl. Raya Utama No. 123, Jakarta',
				phone: '+62 812 345 678',
				whatsappNumber: '62812345678',
				email: 'info@ayamjuara.com',
				mapEmbedUrl:
					'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.572139324415!2d106.73988630000001!3d-6.575556199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5006574a1d3%3A0x446318eda69f5fd!2sWaroeng%20Badiduud!5e0!3m2!1sid!2sid!4v1774268272622!5m2!1sid!2sid',
				hoursDetail: [
					{ day: 'Senin - Jumat', time: '09:00 - 22:00' },
					{ day: 'Sabtu - Minggu', time: '08:00 - 23:00' }
				],
				features: [
					{ icon: 'dining', label: 'Dine-in' },
					{ icon: 'delivery_dining', label: 'Takeaway' },
					{ icon: 'two_wheeler', label: 'Delivery' },
					{ icon: 'local_parking', label: 'Parkir Luas' },
					{ icon: 'wifi', label: 'Free WiFi' },
					{ icon: 'wheelchair_pickup', label: 'Akses Kursi Roda' }
				],
				heroFeatures: [
					{ icon: 'store', label: '1 Lokasi' },
					{ icon: 'access_time', label: 'Buka Setiap Hari' },
					{ icon: 'local_shipping', label: 'Gratis Delivery' },
					{ icon: 'local_parking', label: 'Parkir Luas' }
				],
				deliveryZones: [
					{ name: 'Jakarta Pusat', maxDistance: '10 km', status: 'Aktif' },
					{ name: 'Jakarta Selatan', maxDistance: '15 km', status: 'Aktif' },
					{ name: 'Jakarta Barat', maxDistance: '12 km', status: 'Terbatas' }
				]
			})
		}
	];

	for (const content of siteContents) {
		await prisma.siteContent.upsert({
			where: { key: content.key },
			update: { value: content.value },
			create: content
		});
	}
	console.log('✅ Site content created');

	console.log('🎉 Seeding complete!');
}

main()
	.catch((e) => {
		console.error('❌ Seeding failed:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
