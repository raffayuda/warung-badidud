<script>
	import { enhance } from '$app/forms';
	import Header from '$lib/components/Header.svelte';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Login Admin - Waroeng Badiduud</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="googlebot" content="noindex" />
</svelte:head>

<Header />

<main class="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
	<div class="mx-auto w-full max-w-md px-6">
		<div class="overflow-hidden rounded-3xl bg-white shadow-2xl">
			<!-- Header -->
			<div class="bg-gradient-to-r from-red-600 to-red-700 px-8 py-10 text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-md"
				>
					<span class="material-symbols-outlined text-4xl text-white">admin_panel_settings</span>
				</div>
				<h1 class="text-2xl font-bold text-white">Admin Login</h1>
				<p class="mt-2 text-sm text-red-200">Masuk untuk mengelola konten website</p>
			</div>

			<!-- Form -->
			<div class="p-8">
				{#if form?.error}
					<div
						class="mb-6 flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700"
					>
						<span class="material-symbols-outlined text-lg">error</span>
						<span>{form.error}</span>
					</div>
				{/if}

				<form
					method="POST"
					use:enhance={() => {
						loading = true;
						return async ({ update }) => {
							loading = false;
							await update();
						};
					}}
				>
					<div class="space-y-5">
						<div>
							<label for="username" class="mb-2 block text-sm font-semibold text-gray-700">
								Username
							</label>
							<input
								id="username"
								name="username"
								type="text"
								value={form?.username ?? ''}
								required
								class="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10"
								placeholder="Masukkan username"
							/>
						</div>

						<div>
							<label for="password" class="mb-2 block text-sm font-semibold text-gray-700">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								class="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 transition-all duration-200 placeholder:text-gray-400 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10"
								placeholder="Masukkan password"
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							class="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-4 font-bold text-white shadow-lg shadow-red-600/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
						>
							{#if loading}
								<span class="material-symbols-outlined animate-spin text-lg">progress_activity</span>
								<span>Memproses...</span>
							{:else}
								<span class="material-symbols-outlined text-lg">login</span>
								<span>Masuk</span>
							{/if}
						</button>
					</div>
				</form>
			</div>
		</div>

		<p class="mt-6 text-center text-sm text-gray-500">
			<a href="/" class="text-red-600 hover:underline">← Kembali ke halaman utama</a>
		</p>
	</div>
</main>
