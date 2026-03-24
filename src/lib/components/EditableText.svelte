<script>
	import { isEditMode } from '$lib/stores/adminStore.js';
	import { page } from '$app/stores';

	/** @type {{ value: string, tag?: string, className?: string, onSave: (value: string) => void }} */
	let { value, tag = 'span', className = '', onSave } = $props();

	const isAdmin = $derived($page.data?.isAdmin ?? false);
	let editing = $state(false);
	let editValue = $state(value);

	function startEdit() {
		if (!$isEditMode || !isAdmin) return;
		editing = true;
		editValue = value;
	}

	function save() {
		editing = false;
		if (editValue !== value) {
			onSave(editValue);
		}
	}

	function cancel() {
		editing = false;
		editValue = value;
	}

	function handleKeydown(e) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			save();
		}
		if (e.key === 'Escape') {
			cancel();
		}
	}
</script>

{#if editing}
	{#if tag === 'p' || tag === 'div'}
		<textarea
			bind:value={editValue}
			onblur={save}
			onkeydown={handleKeydown}
			class="w-full resize-none rounded-lg border-2 border-amber-400 bg-amber-50 p-2 text-inherit outline-none focus:ring-2 focus:ring-amber-400/50 {className}"
			rows="3"
		></textarea>
	{:else}
		<input
			type="text"
			bind:value={editValue}
			onblur={save}
			onkeydown={handleKeydown}
			class="w-full rounded-lg border-2 border-amber-400 bg-amber-50 px-2 py-1 text-inherit outline-none focus:ring-2 focus:ring-amber-400/50 {className}"
		/>
	{/if}
{:else}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<svelte:element
		this={tag}
		class="{className} {$isEditMode && isAdmin
			? 'cursor-pointer ring-2 ring-transparent hover:ring-amber-400/50 rounded-lg transition-all duration-200 hover:bg-amber-50/50'
			: ''}"
		onclick={startEdit}
	>
		{value}
	</svelte:element>
{/if}
