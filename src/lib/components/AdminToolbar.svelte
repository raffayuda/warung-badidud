<script>
	import { page } from '$app/stores';
	import { isEditMode } from '$lib/stores/adminStore.js';
	import { goto } from '$app/navigation';

	const { data } = $derived($page);
	const isAdmin = $derived(data?.isAdmin ?? false);

	async function logout() {
		await fetch('/api/auth/logout', { method: 'POST' });
		window.location.href = '/';
	}

	function toggleEditMode() {
		isEditMode.update((v) => !v);
	}
</script>

{#if isAdmin}
	<div
		class="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-2 shadow-lg"
	>
		<div class="flex items-center gap-3">
			<span class="material-symbols-outlined text-sm text-amber-400">admin_panel_settings</span>
			<span class="text-xs font-semibold text-gray-300">Admin Mode</span>
		</div>

		<div class="flex items-center gap-3">
			<button
				onclick={toggleEditMode}
				class="flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 {$isEditMode
					? 'bg-amber-500 text-gray-900 shadow-lg shadow-amber-500/30'
					: 'bg-white/10 text-gray-300 hover:bg-white/20'}"
			>
				<span class="material-symbols-outlined text-sm">
					{$isEditMode ? 'edit_off' : 'edit'}
				</span>
				{$isEditMode ? 'Exit Edit' : 'Edit Mode'}
			</button>

			<a
				href="/admin/profile"
				class="flex items-center gap-1.5 rounded-full bg-blue-600/80 px-4 py-1.5 text-xs font-bold text-white transition-all duration-200 hover:bg-blue-600"
			>
				<span class="material-symbols-outlined text-sm">person</span>
				Profil
			</a>

			<button
				onclick={logout}
				class="flex items-center gap-1.5 rounded-full bg-red-600/80 px-4 py-1.5 text-xs font-bold text-white transition-all duration-200 hover:bg-red-600"
			>
				<span class="material-symbols-outlined text-sm">logout</span>
				Logout
			</button>
		</div>
	</div>
{/if}
