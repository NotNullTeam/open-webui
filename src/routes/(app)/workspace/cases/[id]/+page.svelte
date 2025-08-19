<script lang="ts">
  import { onMount, getContext } from 'svelte';
  import { page } from '$app/stores';
  import { toast } from 'svelte-sonner';
  import {
    getCaseById,
    getCaseStats,
    getCaseStatus,
    listCaseNodes,
    listCaseEdges,
    rateNode,
    regenerateNode,
    listNodeTasks,
    stopNodeTasks,
    getNodeKnowledge,
    getNodeCommands,
    createInteraction,
    saveCaseLayout,
    getCaseLayout
  } from '$lib/apis/cases';
  import type { CaseWithGraph, CaseNode, CaseEdge } from '$lib/types/cases';

  const i18n = getContext('i18n');

  let caseId = '';
  $: caseId = $page.params.id;

  let loading = false;
  let data: CaseWithGraph | null = null;
  let nodes: CaseNode[] = [];
  let edges: CaseEdge[] = [];
  let stats: any = null;
  let statusInfo: any = null;
  let selectedNodeId: string | null = null;
  $: selectedNode = nodes.find((n) => n.id === selectedNodeId);

  // Panels
  let knowledge: any = null;
  let commandsRes: any = null;
  let listTasksRes: any = null;
  let layoutRes: any = null;

  // Interaction form
  let interaction = {
    parent_node_id: '',
    response_data: '{"text": "additional info"}',
    retrieval_weight: 0.7,
    filter_tags: ''
  };

  const load = async () => {
    loading = true;
    try {
      data = await getCaseById(localStorage.token, caseId);
      nodes = data.nodes ?? [];
      edges = data.edges ?? [];
      stats = await getCaseStats(localStorage.token, caseId);
      statusInfo = await getCaseStatus(localStorage.token, caseId);
      if (!selectedNodeId && nodes.length > 0) selectedNodeId = nodes[0].id;
    } catch (e) {
      toast.error(`${e}`);
    }
    loading = false;
  };

  const refreshNodes = async () => {
    try {
      const r1 = await listCaseNodes(localStorage.token, caseId);
      nodes = r1.nodes || [];
      const r2 = await listCaseEdges(localStorage.token, caseId);
      edges = r2.edges || [];
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  const submitRating = async (rating: number, comment: string) => {
    if (!selectedNodeId) return;
    try {
      await rateNode(localStorage.token, caseId, selectedNodeId, { rating, comment });
      toast.success($i18n.t('Rated'));
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  const doRegenerate = async () => {
    if (!selectedNodeId) return;
    try {
      const res = await regenerateNode(localStorage.token, caseId, selectedNodeId, { async_mode: true });
      toast.success($i18n.t('Regenerate submitted'));
      listTasksRes = await listNodeTasks(localStorage.token, caseId, selectedNodeId);
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  const doListTasks = async () => {
    if (!selectedNodeId) return;
    try {
      listTasksRes = await listNodeTasks(localStorage.token, caseId, selectedNodeId);
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  const doStopTasks = async () => {
    if (!selectedNodeId) return;
    try {
      await stopNodeTasks(localStorage.token, caseId, selectedNodeId);
      toast.success($i18n.t('Stop signal sent'));
      await doListTasks();
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  const loadKnowledge = async () => {
    if (!selectedNodeId) return;
    try {
      knowledge = await getNodeKnowledge(localStorage.token, caseId, selectedNodeId, { topK: 5 });
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  const loadCommands = async () => {
    if (!selectedNodeId) return;
    try {
      const vendor = data?.vendor || undefined;
      commandsRes = await getNodeCommands(localStorage.token, caseId, selectedNodeId, vendor || undefined);
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  const submitInteraction = async () => {
    try {
      const payload = {
        parent_node_id: interaction.parent_node_id || selectedNodeId || nodes[0]?.id,
        response_data: JSON.parse(interaction.response_data || '{}'),
        retrieval_weight: Number(interaction.retrieval_weight) || 0.7,
        filter_tags: interaction.filter_tags ? interaction.filter_tags.split(',').map((s) => s.trim()).filter(Boolean) : undefined
      };
      await createInteraction(localStorage.token, caseId, payload);
      toast.success($i18n.t('Interaction created'));
      await refreshNodes();
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  const saveLayout = async () => {
    try {
      const positions = nodes.map((n, idx) => ({ id: n.id, x: (idx % 5) * 120, y: Math.floor(idx / 5) * 90 }));
      layoutRes = await saveCaseLayout(localStorage.token, caseId, { nodePositions: positions, viewportState: { zoom: 1 } });
      toast.success($i18n.t('Layout saved'));
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  const loadLayout = async () => {
    try {
      layoutRes = await getCaseLayout(localStorage.token, caseId);
    } catch (e) {
      toast.error(`${e}`);
    }
  };

  const refreshAll = async () => {
    await load();
    await refreshNodes();
  };

  onMount(async () => {
    await load();
  });
</script>

<div class="max-w-6xl mx-auto py-3">
  <div class="mb-3 flex items-center justify-between">
    <div>
      <div class="text-lg font-semibold">{data?.title}</div>
      <div class="text-xs text-gray-500">{data?.status} {data?.vendor ? `• ${data.vendor}` : ''} {data?.category ? `• ${data.category}` : ''}</div>
    </div>
    <div class="flex gap-2">
      <button class="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800" on:click={refreshAll}>{$i18n.t('Refresh')}</button>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
    <div class="lg:col-span-1 space-y-3">
      <div class="border dark:border-gray-800 rounded-xl p-3">
        <div class="font-medium mb-2">{$i18n.t('Nodes')}</div>
        <div class="space-y-1 max-h-[320px] overflow-auto">
          {#each nodes as n}
            <button
              class="w-full text-left p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 {selectedNodeId === n.id ? 'bg-gray-100 dark:bg-gray-800' : ''}"
              on:click={() => (selectedNodeId = n.id)}
            >
              <div class="font-medium truncate">{n.title}</div>
              <div class="text-[11px] text-gray-500">{n.node_type} • {n.status}</div>
            </button>
          {/each}
        </div>
      </div>

      <div class="border dark:border-gray-800 rounded-xl p-3">
        <div class="font-medium mb-2">{$i18n.t('Edges')}</div>
        <div class="text-xs text-gray-500 max-h-[160px] overflow-auto">
          {#each edges as e}
            <div class="py-1 truncate">{e.source_node_id} → {e.target_node_id} ({e.edge_type})</div>
          {/each}
          {#if (edges?.length ?? 0) === 0}
            <div class="text-gray-400">{$i18n.t('No edges')}</div>
          {/if}
        </div>
      </div>

      <div class="border dark:border-gray-800 rounded-xl p-3">
        <div class="font-medium mb-2">{$i18n.t('Case Stats')}</div>
        {#if stats}
          <div class="text-xs text-gray-600">{$i18n.t('Nodes')}: {stats.nodeCount} • {$i18n.t('Edges')}: {stats.edgeCount}</div>
          <div class="text-[11px] text-gray-500 mt-1">{JSON.stringify(stats.nodeTypeDistribution)}</div>
        {:else}
          <div class="text-xs text-gray-500">{$i18n.t('No data')}</div>
        {/if}
      </div>

      <div class="border dark:border-gray-800 rounded-xl p-3">
        <div class="font-medium mb-2">{$i18n.t('Layout')}</div>
        <div class="flex gap-2">
          <button class="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800" on:click={saveLayout}>{$i18n.t('Save')}</button>
          <button class="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800" on:click={loadLayout}>{$i18n.t('Load')}</button>
        </div>
        {#if layoutRes}
          <div class="text-[11px] text-gray-500 mt-2 break-words">{JSON.stringify(layoutRes)}</div>
        {/if}
      </div>
    </div>

    <div class="lg:col-span-2 space-y-3">
      <div class="border dark:border-gray-800 rounded-xl p-3">
        <div class="font-medium mb-2">{$i18n.t('Selected Node')}</div>
        {#if selectedNode}
          <div class="text-xs text-gray-500 mb-1">{selectedNode.node_type} • {selectedNode.status}</div>
          <div class="text-[13px] whitespace-pre-wrap break-words bg-gray-50 dark:bg-gray-900 p-2 rounded-lg" title="node-content">{selectedNode.content}</div>
          <div class="mt-2 flex gap-2">
            <button class="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800" on:click={doRegenerate}>{$i18n.t('Regenerate')}</button>
            <button class="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800" on:click={doListTasks}>{$i18n.t('List Tasks')}</button>
            <button class="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800" on:click={doStopTasks}>{$i18n.t('Stop Tasks')}</button>
            <button class="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800" on:click={loadKnowledge}>{$i18n.t('Knowledge')}</button>
            <button class="px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800" on:click={loadCommands}>{$i18n.t('Commands')}</button>
          </div>

          <div class="mt-3">
            <div class="text-sm font-medium mb-1">{$i18n.t('Rate Node')}</div>
            <div class="flex gap-2 items-center">
              <input type="number" min="1" max="5" value="5" bind:this={ratingInput} class="w-16 p-1 rounded-lg bg-gray-100 dark:bg-gray-900" />
              <input type="text" placeholder={$i18n.t('Comment (optional)')} bind:this={commentInput} class="flex-1 p-1 rounded-lg bg-gray-100 dark:bg-gray-900" />
              <button class="px-2 py-1 rounded-lg bg-black text-white dark:bg-white dark:text-black" on:click={() => submitRating(Number(ratingInput.value || 5), commentInput.value || '')}>{$i18n.t('Submit')}</button>
            </div>
          </div>

          {#if listTasksRes}
            <div class="mt-3 text-[11px] text-gray-500">{JSON.stringify(listTasksRes)}</div>
          {/if}

          {#if knowledge}
            <div class="mt-3">
              <div class="text-sm font-medium mb-1">{$i18n.t('Related Knowledge')}</div>
              {#if knowledge.sources?.length}
                <div class="space-y-2">
                  {#each knowledge.sources as s}
                    <div class="p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
                      <div class="text-xs text-gray-500">score: {s.score?.toFixed ? s.score.toFixed(3) : s.score}</div>
                      <div class="text-[13px] whitespace-pre-wrap break-words">{s.content}</div>
                    </div>
                  {/each}
                </div>
              {:else}
                <div class="text-xs text-gray-500">{$i18n.t('No results')}</div>
              {/if}
            </div>
          {/if}

          {#if commandsRes}
            <div class="mt-3">
              <div class="text-sm font-medium mb-1">{$i18n.t('Vendor Commands')}</div>
              <div class="text-xs text-gray-500 mb-1">{commandsRes.vendor}</div>
              {#if commandsRes.commands?.length}
                <div class="space-y-2">
                  {#each commandsRes.commands as c}
                    <div class="p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
                      <div class="text-[13px] whitespace-pre-wrap break-words">{Array.isArray(c) ? c.join('\n') : JSON.stringify(c)}</div>
                    </div>
                  {/each}
                </div>
              {:else}
                <div class="text-xs text-gray-500">{$i18n.t('No commands')}</div>
              {/if}
            </div>
          {/if}
        {:else}
          <div class="text-sm text-gray-500">{$i18n.t('Select a node')}</div>
        {/if}
      </div>

      <div class="border dark:border-gray-800 rounded-xl p-3">
        <div class="font-medium mb-2">{$i18n.t('New Interaction')}</div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div>
            <label class="text-xs text-gray-500">{$i18n.t('Parent Node')}</label>
            <select class="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-900" bind:value={interaction.parent_node_id}>
              <option value="">{$i18n.t('Auto: selected node')}</option>
              {#each nodes as n}
                <option value={n.id}>{n.title} ({n.node_type})</option>
              {/each}
            </select>
          </div>
          <div>
            <label class="text-xs text-gray-500">{$i18n.t('Retrieval Weight')}</label>
            <input type="number" step="0.1" min="0" max="1" class="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-900" bind:value={interaction.retrieval_weight} />
          </div>
        </div>
        <div class="mt-2">
          <label class="text-xs text-gray-500">{$i18n.t('Filter Tags (comma-separated)')}</label>
          <input class="w-full p-2 rounded-lg bg-gray-100 dark:bg-gray-900" bind:value={interaction.filter_tags} />
        </div>
        <div class="mt-2">
          <label class="text-xs text-gray-500">{$i18n.t('Response Data (JSON)')}</label>
          <textarea class="w-full h-28 p-2 rounded-lg bg-gray-100 dark:bg-gray-900" bind:value={interaction.response_data} />
        </div>
        <div class="mt-2">
          <button class="px-3 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black" on:click={submitInteraction}>{$i18n.t('Create')}</button>
        </div>
      </div>
    </div>
  </div>
</div>

<script lang="ts">
  // local bindings for rating inputs
  let ratingInput: HTMLInputElement;
  let commentInput: HTMLInputElement;
</script>
