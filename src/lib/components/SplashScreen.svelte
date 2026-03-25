<script>
	import { onMount } from 'svelte';

	let phase = $state('logo');
	let show = $state(true);

	onMount(() => {
		// Check if already shown this session
		if (sessionStorage.getItem('splash_shown')) {
			show = false;
			phase = 'done';
			return;
		}

		// Faster timing for instant access
		setTimeout(() => { phase = 'text'; }, 200);

		// Fade out after 600ms
		setTimeout(() => {
			phase = 'done';
			setTimeout(() => {
				show = false;
				sessionStorage.setItem('splash_shown', '1');
			}, 300);
		}, 600);
	});
</script>

{#if show}
	<div
		class="splash-overlay"
		class:splash-exit={phase === 'done'}
	>
		<!-- Animated background elements -->
		<div class="splash-bg-glow splash-glow-1"></div>
		<div class="splash-bg-glow splash-glow-2"></div>
		<div class="splash-bg-glow splash-glow-3"></div>

		<!-- Main content -->
		<div class="splash-content">
			<!-- Logo -->
			<div class="splash-logo" class:splash-logo-active={phase !== 'initial'}>
				<img src="/logo.png" alt="Warung Badidud" class="splash-logo-img" />
				<div class="splash-logo-ring"></div>
			</div>

			<!-- Text -->
			<div class="splash-text" class:splash-text-active={phase === 'text' || phase === 'done'}>
				<h1 class="splash-title">Warung Badidud</h1>
				<div class="splash-divider"></div>
				<p class="splash-subtitle">Cita Rasa Nusantara</p>
			</div>
		</div>

		<!-- Loading dots -->
		<div class="splash-loader" class:splash-loader-active={phase === 'text'}>
			<span class="splash-dot"></span>
			<span class="splash-dot"></span>
			<span class="splash-dot"></span>
		</div>
	</div>
{/if}

<style>
	.splash-overlay {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #1a0000 0%, #2d0a0a 30%, #0d0d0d 100%);
		transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		overflow: hidden;
	}

	.splash-exit {
		opacity: 0;
		transform: scale(1.05);
		pointer-events: none;
	}

	/* Animated background glows */
	.splash-bg-glow {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.3;
		animation: glow-float 4s ease-in-out infinite alternate;
	}

	.splash-glow-1 {
		width: 300px;
		height: 300px;
		background: radial-gradient(circle, #b91c1c, transparent);
		top: 20%;
		left: 30%;
		animation-delay: 0s;
	}

	.splash-glow-2 {
		width: 200px;
		height: 200px;
		background: radial-gradient(circle, #f97316, transparent);
		bottom: 30%;
		right: 25%;
		animation-delay: 1.5s;
	}

	.splash-glow-3 {
		width: 150px;
		height: 150px;
		background: radial-gradient(circle, #fbbf24, transparent);
		top: 50%;
		left: 60%;
		animation-delay: 0.8s;
	}

	@keyframes glow-float {
		0% { transform: translate(0, 0) scale(1); }
		100% { transform: translate(20px, -20px) scale(1.2); }
	}

	/* Content container */
	.splash-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		position: relative;
		z-index: 1;
	}

	/* Logo */
	.splash-logo {
		position: relative;
		animation: logo-enter 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	.splash-logo-img {
		width: 120px;
		height: 120px;
		object-fit: contain;
		filter: drop-shadow(0 0 40px rgba(185, 28, 28, 0.5));
		animation: logo-pulse 2s ease-in-out infinite;
	}

	.splash-logo-ring {
		position: absolute;
		inset: -16px;
		border-radius: 50%;
		border: 2px solid rgba(185, 28, 28, 0.3);
		animation: ring-expand 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	@keyframes logo-enter {
		0% {
			opacity: 0;
			transform: scale(0.3) rotate(-10deg);
		}
		60% {
			transform: scale(1.1) rotate(3deg);
		}
		100% {
			opacity: 1;
			transform: scale(1) rotate(0deg);
		}
	}

	@keyframes logo-pulse {
		0%, 100% {
			filter: drop-shadow(0 0 40px rgba(185, 28, 28, 0.5));
		}
		50% {
			filter: drop-shadow(0 0 60px rgba(185, 28, 28, 0.8));
		}
	}

	@keyframes ring-expand {
		0% {
			opacity: 0;
			transform: scale(0.5);
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: scale(1.5);
		}
	}

	/* Text */
	.splash-text {
		text-align: center;
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.splash-text-active {
		opacity: 1;
		transform: translateY(0);
	}

	.splash-title {
		font-size: 2.5rem;
		font-weight: 900;
		font-style: italic;
		color: white;
		letter-spacing: -0.02em;
		text-shadow: 0 2px 20px rgba(185, 28, 28, 0.5);
	}

	.splash-divider {
		width: 60px;
		height: 3px;
		background: linear-gradient(90deg, transparent, #b91c1c, #f97316, transparent);
		margin: 0.75rem auto;
		border-radius: 999px;
		animation: divider-glow 2s ease-in-out infinite alternate;
	}

	@keyframes divider-glow {
		0% { box-shadow: 0 0 10px rgba(185, 28, 28, 0.3); }
		100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.5); }
	}

	.splash-subtitle {
		font-size: 1rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.6);
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}

	/* Loading dots */
	.splash-loader {
		position: absolute;
		bottom: 15%;
		display: flex;
		gap: 8px;
		opacity: 0;
		transition: opacity 0.4s ease;
		z-index: 1;
	}

	.splash-loader-active {
		opacity: 1;
	}

	.splash-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgba(185, 28, 28, 0.8);
		animation: dot-bounce 1.2s ease-in-out infinite;
	}

	.splash-dot:nth-child(2) { animation-delay: 0.15s; }
	.splash-dot:nth-child(3) { animation-delay: 0.3s; }

	@keyframes dot-bounce {
		0%, 80%, 100% {
			transform: scale(0.6);
			opacity: 0.4;
		}
		40% {
			transform: scale(1.2);
			opacity: 1;
			background: #f97316;
		}
	}

	@media (max-width: 640px) {
		.splash-logo-img {
			width: 90px;
			height: 90px;
		}
		.splash-title {
			font-size: 1.8rem;
		}
		.splash-subtitle {
			font-size: 0.8rem;
		}
	}
</style>
