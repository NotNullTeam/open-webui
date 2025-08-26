<script lang="ts">
  import { onMount, getContext } from 'svelte';
  import { toast } from 'svelte-sonner';
  import { listCases, createCase, deleteCaseById } from '$lib/apis/cases';
  import type { CaseItem, CaseListResponse } from '$lib/types/cases';
  import { goto } from '$app/navigation';

  const i18n = getContext('i18n');

  let loading = false;
  let creating = false;
  let page = 1;
  let pageSize = 10;
  let casesRes: CaseListResponse | null = null;

  // Create form
  let form = {
    title: '',
    query: '',
    vendor: '',
    category: ''
  };

  const load = async () => {
    loading = true;
    try {
      casesRes = await listCases(localStorage.token, { page, page_size: pageSize });
    } catch (e) {
      toast.error(`${e}`);
    }
    loading = false;
  };

  const submitCreate = async () => {
    if (!form.query?.trim()) {
      toast.error($i18n.t('Query cannot be empty.'));
      return;
    }
    creating = true;
    try {
      const res = await createCase(localStorage.token, {
        query: form.query,
        title: form.title || undefined,
        vendor: form.vendor || undefined,
        category: form.category || undefined
      });
      toast.success($i18n.t('Case created'));
      // Navigate to details (use snake_case id from response)
      if (res?.id) {
        goto(`/workspace/cases/${res.id}`);
        return;
      }
      await load();
    } catch (e) {
      toast.error(`${e}`);
    }
    creating = false;
  };

  const openCase = (c: CaseItem) => {
    goto(`/workspace/cases/${c.id}`);
  };

  const removeCase = async (c: CaseItem) => {
    if (!confirm($i18n.t('Delete this case?'))) return;
    try {
      await deleteCaseById(localStorage.token, c.id);
      toast.success($i18n.t('Case deleted'));
      await load();
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  onMount(load);
</script>

<div class="max-w-5xl mx-auto py-3">
  <div class="mb-4">
    <div class="text-lg font-semibold">{$i18n.t('Cases')}</div>
    <div class="text-xs text-gray-500">{$i18n.t('List existing cases and create new')}</div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="border dark:border-gray-800 rounded-xl p-3">
      <div class="font-medium mb-2">{$i18n.t('Create Case')}</div>
      <div class="space-y-2">
        <input class="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-900" placeholder={$i18n.t('Title (optional)')} bind:value={form.title} />
        <input class="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-900" placeholder={$i18n.t('Vendor (optional)')} bind:value={form.vendor} />
        <input class="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-900" placeholder={$i18n.t('Category (optional)')} bind:value={form.category} />
        <textarea class="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-900 h-32" placeholder={$i18n.t('Describe the issue / query')} bind:value={form.query} />
        <div class="flex gap-2">
          <button class="px-3 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black disabled:opacity-50" on:click={submitCreate} disabled={creating}>
            {creating ? $i18n.t('Creating...') : $i18n.t('Create')}
          </button>
          <button class="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800" on:click={() => (form = { title: '', query: '', vendor: '', category: '' })}>{$i18n.t('Reset')}</button>
        </div>
      </div>
    </div>

    <div class="border dark:border-gray-800 rounded-xl p-3">
      <div class="flex items-center justify-between mb-2">
        <div class="font-medium">{$i18n.t('My Cases')}</div>
        <div class="text-xs text-gray-500">{casesRes ? casesRes.total : 0} {$i18n.t('total')}</div>
      </div>
      {#if loading}
        <div class="text-sm text-gray-500">{$i18n.t('Loading...')}</div>
      {:else if casesRes && casesRes.items.length > 0}
        <div class="divide-y divide-gray-200 dark:divide-gray-800">
          {#each casesRes.items as c}
            <div class="py-2 flex items-center justify-between">
              <div class="min-w-0">
                <div class="font-medium truncate">{c.title}</div>
                <div class="text-xs text-gray-500 truncate">{c.status} {c.vendor ? `• ${c.vendor}` : ''} {c.category ? `• ${c.category}` : ''}</div>
              </div>
              <div class="flex gap-2 ml-3">
                <button class="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800" on:click={() => openCase(c)}>{$i18n.t('Open')}</button>
                <button class="px-2 py-1 rounded-lg bg-red-600 text-white" on:click={() => removeCase(c)}>{$i18n.t('Delete')}</button>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="text-sm text-gray-500">{$i18n.t('No cases yet.')}</div>
      {/if}
    </div>
  </div>
</div>
