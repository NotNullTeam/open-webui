<script lang="ts">
  import { onMount, getContext } from 'svelte';
  import { parseLog } from '$lib/apis/analysis';
  import { toast } from 'svelte-sonner';

  const i18n = getContext('i18n');

  let form = {
    logType: 'system_log',
    vendor: 'Huawei',
    logContent: '',
    contextInfo: '{}'
  };

  let res: any = null;
  let loading = false;
  let showRaw = false;

  const getSummary = () => (res?.analysis_result?.summary || res?.parsed_data?.summary || '');
  const getAnomalies = () => (res?.analysis_result?.anomalies || res?.parsed_data?.anomalies || []);

  const submit = async () => {
    if (!form.logType || !form.vendor || !form.logContent?.trim()) {
      toast.error($i18n.t('Please fill required fields'));
      return;
    }
    loading = true;
    try {
      const payload = {
        logType: form.logType,
        vendor: form.vendor,
        logContent: form.logContent,
        contextInfo: form.contextInfo ? JSON.parse(form.contextInfo) : undefined
      };
      res = await parseLog(localStorage.token, payload);
    } catch (e) {
      toast.error(`${e}`);
    }
    loading = false;
  };
</script>

<div class="max-w-5xl mx-auto py-3">
  <div class="mb-4">
    <div class="text-lg font-semibold">{$i18n.t('Analysis')}</div>
    <div class="text-xs text-gray-500">{$i18n.t('Log parsing and related knowledge')}</div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="border dark:border-gray-800 rounded-xl p-3">
      <div class="font-medium mb-2">{$i18n.t('Input')}</div>
      <div class="grid grid-cols-2 gap-2 mb-2">
        <div>
          <label class="text-xs text-gray-500">{$i18n.t('Log Type')}</label>
          <select class="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-900" bind:value={form.logType}>
            <option value="system_log">system_log</option>
            <option value="ospf_debug">ospf_debug</option>
          </select>
        </div>
        <div>
          <label class="text-xs text-gray-500">{$i18n.t('Vendor')}</label>
          <select class="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-900" bind:value={form.vendor}>
            <option>Huawei</option>
            <option>Cisco</option>
            <option>Juniper</option>
            <option>H3C</option>
          </select>
        </div>
      </div>
      <div class="mb-2">
        <label class="text-xs text-gray-500">{$i18n.t('Log Content')}</label>
        <textarea class="w-full h-40 p-2 rounded-lg bg-gray-100 dark:bg-gray-900" bind:value={form.logContent} />
      </div>
      <div class="mb-2">
        <label class="text-xs text-gray-500">{$i18n.t('Context (JSON, optional)')}</label>
        <textarea class="w-full h-24 p-2 rounded-lg bg-gray-100 dark:bg-gray-900" bind:value={form.contextInfo} />
      </div>
      <div>
        <button class="px-3 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black disabled:opacity-50" on:click={submit} disabled={loading}>
          {loading ? $i18n.t('Analyzing...') : $i18n.t('Analyze')}
        </button>
      </div>
    </div>

    <div class="border dark:border-gray-800 rounded-xl p-3">
      <div class="flex items-center justify-between mb-2">
        <div class="font-medium">{$i18n.t('Result')}</div>
        {#if res}
          <button class="px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs" on:click={() => (showRaw = !showRaw)}>
            {showRaw ? $i18n.t('Structured') : $i18n.t('Raw JSON')}
          </button>
        {/if}
      </div>
      {#if res}
        <div class="text-xs text-gray-500 mb-2">{$i18n.t('Severity')}: {res.severity}</div>
        {#if showRaw}
          <pre class="text-[12px] bg-gray-50 dark:bg-gray-900 p-2 rounded-lg overflow-auto max-h-96"><code>{JSON.stringify(res.analysis_result || res.parsed_data, null, 2)}</code></pre>
        {:else}
          <!-- Summary -->
          {#if getSummary()}
            <div class="mb-3">
              <div class="text-sm font-medium mb-1">{$i18n.t('Summary')}</div>
              <div class="text-[13px] whitespace-pre-wrap break-words bg-gray-50 dark:bg-gray-900 p-2 rounded-lg">{getSummary()}</div>
            </div>
          {/if}
          <!-- Anomalies -->
          <div class="mb-3">
            <div class="text-sm font-medium mb-1">{$i18n.t('Anomalies')}</div>
            {#if getAnomalies()?.length}
              <div class="space-y-2">
                {#each getAnomalies() as a}
                  <div class="p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <div class="text-xs text-gray-500">{a.type} • {a.severity} {a.lineNumber ? `• line ${a.lineNumber}` : ''}</div>
                    {#if a.evidence?.length}
                      <pre class="text-[12px] mt-1 overflow-auto"><code>{a.evidence.join('\n')}</code></pre>
                    {/if}
                  </div>
                {/each}
              </div>
            {:else}
              <div class="text-xs text-gray-500">{$i18n.t('No anomalies')}</div>
            {/if}
          </div>
          <!-- Recommendations -->
          <div class="mb-3">
            <div class="text-sm font-medium mb-1">{$i18n.t('Recommendations')}</div>
            {#if res.recommendations?.length}
              <ul class="list-disc ml-5 text-[13px]">
                {#each res.recommendations as r}
                  <li>{r}</li>
                {/each}
              </ul>
            {:else}
              <div class="text-xs text-gray-500">{$i18n.t('No recommendations')}</div>
            {/if}
          </div>
          <!-- Related Knowledge -->
          <div class="mb-1">
            <div class="text-sm font-medium mb-1">{$i18n.t('Related Knowledge')}</div>
            {#if res.related_knowledge?.length}
              <div class="space-y-2">
                {#each res.related_knowledge as k}
                  <div class="p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <div class="text-xs text-gray-500">{$i18n.t('Score')}: {k.score?.toFixed ? k.score.toFixed(3) : k.score}</div>
                    <div class="text-[13px] whitespace-pre-wrap break-words">{k.content}</div>
                  </div>
                {/each}
              </div>
            {:else}
              <div class="text-xs text-gray-500">{$i18n.t('No results')}</div>
            {/if}
          </div>
        {/if}
      {:else}
        <div class="text-xs text-gray-500">{$i18n.t('No result')}</div>
      {/if}
    </div>
  </div>
</div>
