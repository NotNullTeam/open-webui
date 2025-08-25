<script lang="ts">
  import { onMount, getContext } from 'svelte';
  import { toast } from 'svelte-sonner';
  import { getHealth, getStatistics } from '$lib/apis/system';

  const i18n = getContext('i18n');

  let loading = false;
  let health: any = null;
  let stats: any = null;

  const load = async () => {
    loading = true;
    try {
      health = await getHealth(localStorage.token);
      stats = await getStatistics(localStorage.token);
    } catch (e) {
      toast.error(`${e}`);
    }
    loading = false;
  };

  onMount(load);
</script>

<div class="max-w-5xl mx-auto py-3">
  <div class="mb-4">
    <div class="text-lg font-semibold">{$i18n.t('System')}</div>
    <div class="text-xs text-gray-500">{$i18n.t('Health and statistics')}</div>
  </div>

  <div class="flex items-center gap-2 mb-3">
    <button class="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800" on:click={load} disabled={loading}>
      {loading ? $i18n.t('Loading...') : $i18n.t('Refresh')}
    </button>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="border dark:border-gray-800 rounded-xl p-3">
      <div class="font-medium mb-2">{$i18n.t('Health')}</div>
      {#if health}
        <div class="text-xs text-gray-600 space-y-1">
          <div>{$i18n.t('Status')}: {health.status}</div>
          <div>{$i18n.t('Version')}: {health.version}</div>
          <div>{$i18n.t('Time')}: {health.time}</div>
        </div>
      {:else}
        <div class="text-xs text-gray-500">{$i18n.t('No data')}</div>
      {/if}
    </div>

    <div class="border dark:border-gray-800 rounded-xl p-3">
      <div class="font-medium mb-2">{$i18n.t('Statistics')}</div>
      {#if stats}
        <div class="text-xs text-gray-600 space-y-1">
          <div>{$i18n.t('Cases')}: {stats?.summary?.total_cases}</div>
          <div>{$i18n.t('Users')}: {stats?.summary?.total_users}</div>
          <div>{$i18n.t('Knowledge')}: {stats?.summary?.total_knowledge}</div>
          <div>{$i18n.t('Chats')}: {stats?.summary?.total_chats}</div>
        </div>
      {:else}
        <div class="text-xs text-gray-500">{$i18n.t('No data')}</div>
      {/if}
    </div>
  </div>

  {#if stats}
    <div class="mt-4 border dark:border-gray-800 rounded-xl p-3">
      <div class="font-medium mb-2">{$i18n.t('Raw')}</div>
      <pre class="text-[12px] bg-gray-50 dark:bg-gray-900 p-2 rounded-lg overflow-auto max-h-96"><code>{JSON.stringify(stats, null, 2)}</code></pre>
    </div>
  {/if}
</div>
