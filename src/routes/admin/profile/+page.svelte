<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	export let data;
	export let form;

	let showPassword = false;
	let showNewPassword = false;
	let showConfirmPassword = false;
	let activeTab = 'profile'; // 'profile' or 'password'
	let isSubmitting = false;

	$: if (form?.success) {
		setTimeout(() => {
			form = null;
		}, 3000);
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
	<div class="max-w-2xl mx-auto">
		<!-- Header -->
		<div class="mb-8">
			<h1 class="text-3xl font-bold text-white mb-2">Pengaturan Profil</h1>
			<p class="text-slate-400">Kelola akun dan keamanan Anda</p>
		</div>

		<!-- Tabs -->
		<div class="flex gap-4 mb-6 border-b border-slate-700">
			<button
				on:click={() => (activeTab = 'profile')}
				class="px-6 py-3 font-medium text-sm transition-colors {activeTab === 'profile'
					? 'border-b-2 border-orange-500 text-white'
					: 'text-slate-400 hover:text-slate-300'}"
			>
				Profil
			</button>
			<button
				on:click={() => (activeTab = 'password')}
				class="px-6 py-3 font-medium text-sm transition-colors {activeTab === 'password'
					? 'border-b-2 border-orange-500 text-white'
					: 'text-slate-400 hover:text-slate-300'}"
			>
				Ubah Password
			</button>
		</div>

		<!-- Alert Messages -->
		{#if form?.error}
			<div transition:slide class="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
				<p class="text-red-400 text-sm font-medium">{form.error}</p>
			</div>
		{/if}

		{#if form?.success}
			<div transition:slide class="mb-4 p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
				<p class="text-green-400 text-sm font-medium">{form.message}</p>
			</div>
		{/if}

		<!-- Profile Tab -->
		{#if activeTab === 'profile'}
			<div transition:slide>
				<div class="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6 space-y-6">
					<!-- Account Info -->
					<div class="space-y-4">
						<h2 class="text-lg font-semibold text-white">Informasi Akun</h2>
						<div class="grid gap-4">
							<div>
								<label class="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
									Username
								</label>
								<div
									class="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-300"
								>
									{data.admin.username}
								</div>
							</div>

							<div>
								<label class="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
									Bergabung Sejak
								</label>
								<div
									class="px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-300"
								>
									{new Date(data.admin.createdAt).toLocaleDateString('id-ID', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</div>
							</div>
						</div>
					</div>

					<!-- Edit Profile Form -->
					<form method="POST" action="?/updateProfile" use:enhance={() => {
						isSubmitting = true;
						return async ({ update }) => {
							isSubmitting = false;
							await update();
						};
					}} class="space-y-4">
						<h2 class="text-lg font-semibold text-white">Edit Profil</h2>

						<div>
							<label for="name" class="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
								Nama Lengkap
							</label>
							<input
								type="text"
								id="name"
								name="name"
								value={data.admin.name || ''}
								required
								class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition"
								placeholder="Masukkan nama lengkap"
							/>
						</div>

						<div>
							<label for="email" class="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={data.admin.email || ''}
								required
								class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition"
								placeholder="masukkan@email.com"
							/>
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							class="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
						</button>
					</form>
				</div>
			</div>
		{/if}

		<!-- Password Tab -->
		{#if activeTab === 'password'}
			<div transition:slide>
				<div class="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-xl p-6">
					<form method="POST" action="?/changePassword" use:enhance={() => {
						isSubmitting = true;
						return async ({ update }) => {
							isSubmitting = false;
							await update();
						};
					}} class="space-y-4">
						<h2 class="text-lg font-semibold text-white mb-4">Ubah Password</h2>

						<div>
							<label
								for="oldPassword"
								class="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2"
							>
								Password Lama
							</label>
							<div class="relative">
								<input
									type={showPassword ? 'text' : 'password'}
									id="oldPassword"
									name="oldPassword"
									required
									class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition"
									placeholder="Masukkan password lama"
								/>
								<button
									type="button"
									on:click={() => (showPassword = !showPassword)}
									class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
								>
									{#if showPassword}
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
									{:else}
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
									{/if}
								</button>
							</div>
						</div>

						<div>
							<label
								for="newPassword"
								class="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2"
							>
								Password Baru
							</label>
							<div class="relative">
								<input
									type={showNewPassword ? 'text' : 'password'}
									id="newPassword"
									name="newPassword"
									required
									class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition"
									placeholder="Masukkan password baru (minimal 6 karakter)"
								/>
								<button
									type="button"
									on:click={() => (showNewPassword = !showNewPassword)}
									class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
								>
									{#if showNewPassword}
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
									{:else}
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
									{/if}
								</button>
							</div>
						</div>

						<div>
							<label
								for="confirmPassword"
								class="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2"
							>
								Konfirmasi Password Baru
							</label>
							<div class="relative">
								<input
									type={showConfirmPassword ? 'text' : 'password'}
									id="confirmPassword"
									name="confirmPassword"
									required
									class="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition"
									placeholder="Konfirmasi password baru"
								/>
								<button
									type="button"
									on:click={() => (showConfirmPassword = !showConfirmPassword)}
									class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
								>
									{#if showConfirmPassword}
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
											/>
										</svg>
									{:else}
										<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
									{/if}
								</button>
							</div>
						</div>

						<div class="bg-slate-900/30 border border-slate-700/30 rounded-lg p-3 text-sm text-slate-400">
							<p class="font-medium text-slate-300 mb-2">Persyaratan Password:</p>
							<ul class="space-y-1 list-disc list-inside">
								<li>Minimal 6 karakter</li>
								<li>Berbeda dengan password lama</li>
								<li>Kedua password harus sama</li>
							</ul>
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							class="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{isSubmitting ? 'Mengubah Password...' : 'Ubah Password'}
						</button>
					</form>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(body) {
		background: linear-gradient(to bottom, #0f172a, #1e293b);
	}
</style>
