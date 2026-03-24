<script>
	import { isEditMode } from '$lib/stores/adminStore.js';
	import { page } from '$app/stores';
	import EditableText from './EditableText.svelte';
	import { invalidateAll } from '$app/navigation';

	/** @type {{ features: any[] }} */
	let { features } = $props();

	const isAdmin = $derived($page.data?.isAdmin ?? false);

	async function saveFeatures(updated) {
		await fetch('/api/content/features', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updated)
		});
		await invalidateAll();
	}

	function updateFeature(index, field, value) {
		const updated = [...features];
		updated[index] = { ...updated[index], [field]: value };
		saveFeatures(updated);
	}
</script>

<!-- Features Section -->
<section class="bg-gray-50 py-24">
	<div class="mx-auto max-w-7xl px-6">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-4">
			{#each features as feature, index (feature.id)}
				<div class="flex flex-col items-start gap-4">
					<div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-700">
						<span class="material-symbols-outlined text-3xl">{feature.icon}</span>
					</div>
					{#if $isEditMode && isAdmin}
						<EditableText
							value={feature.title}
							tag="h3"
							className="text-xl font-bold"
							onSave={(v) => updateFeature(index, 'title', v)}
						/>
						<EditableText
							value={feature.description}
							tag="p"
							className="text-sm leading-relaxed text-gray-600"
							onSave={(v) => updateFeature(index, 'description', v)}
						/>
					{:else}
						<h3 class="text-xl font-bold">{feature.title}</h3>
						<p class="text-sm leading-relaxed text-gray-600">{feature.description}</p>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
