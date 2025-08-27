import { WEBUI_API_BASE_URL } from '$lib/constants';

// Types kept lightweight here; full shapes in $lib/types/cases

// ==== Case CRUD ====
export const listCases = async (
  token: string,
  params: {
    page?: number;
    page_size?: number;
    status?: string;
    vendor?: string;
    category?: string;
  } = {}
) => {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set('page', String(params.page));
  if (params.page_size) searchParams.set('page_size', String(params.page_size));
  if (params.status) searchParams.set('status', params.status);
  if (params.vendor) searchParams.set('vendor', params.vendor);
  if (params.category) searchParams.set('category', params.category);

  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/?${searchParams.toString()}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const createCase = async (
  token: string,
  body: {
    query: string;
    title?: string;
    vendor?: string;
    category?: string;
    attachments?: any[];
  }
) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const getCaseById = async (token: string, caseId: string) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const deleteCaseById = async (token: string, caseId: string) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const updateCaseById = async (
  token: string,
  caseId: string,
  body: { title?: string; status?: string; vendor?: string; category?: string }
) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const getCaseStatus = async (token: string, caseId: string) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}/status`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

// ==== Nodes & Edges ====
export const listCaseNodes = async (token: string, caseId: string) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}/nodes`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const listCaseEdges = async (token: string, caseId: string) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}/edges`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const getNodeDetail = async (token: string, caseId: string, nodeId: string) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}/nodes/${nodeId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const createNode = async (
  token: string,
  caseId: string,
  body: { title: string; content: any; node_type: string; status?: string; metadata?: object }
) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}/nodes`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const updateNode = async (
  token: string,
  caseId: string,
  nodeId: string,
  body: { title?: string; status?: string; content?: any; metadata?: object }
) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}/nodes/${nodeId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const deleteNode = async (token: string, nodeId: string) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/nodes/${nodeId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const createEdge = async (
  token: string,
  caseId: string,
  body: { source_node_id: string; target_node_id: string; edge_type: string; metadata?: object }
) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}/edges`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const deleteEdge = async (token: string, edgeId: string) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/edges/${edgeId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

// ==== Node Actions ====
export const rateNode = async (
  token: string,
  caseId: string,
  nodeId: string,
  body: { rating: number; comment?: string }
) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}/nodes/${nodeId}/rate`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const createInteraction = async (
  token: string,
  caseId: string,
  body: { parent_node_id: string; response_data: any; retrieval_weight?: number; filter_tags?: string[] }
) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}/interactions`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const getNodeKnowledge = async (
  token: string,
  caseId: string,
  nodeId: string,
  params: { topK?: number; vendor?: string; retrievalWeight?: number } = {}
) => {
  const sp = new URLSearchParams();
  if (params.topK) sp.set('topK', String(params.topK));
  if (params.vendor) sp.set('vendor', params.vendor);
  if (params.retrievalWeight != null) sp.set('retrievalWeight', String(params.retrievalWeight));
  const res = await fetch(
    `${WEBUI_API_BASE_URL}/cases/${caseId}/nodes/${nodeId}/knowledge?${sp.toString()}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    }
  )
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

// Hybrid knowledge retrieval
export const getNodeKnowledgeHybrid = async (
  token: string,
  caseId: string,
  nodeId: string,
  params: { topK?: number; vendor?: string; retrievalWeight?: number } = {}
) => {
  const sp = new URLSearchParams();
  if (params.topK) sp.set('topK', String(params.topK));
  if (params.vendor) sp.set('vendor', params.vendor);
  if (params.retrievalWeight !== undefined)
    sp.set('retrievalWeight', String(params.retrievalWeight));

  const res = await fetch(
    `${WEBUI_API_BASE_URL}/cases/${caseId}/nodes/${nodeId}/knowledge/hybrid?${sp.toString()}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    }
  )
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const getNodeCommands = async (
  token: string,
  caseId: string,
  nodeId: string,
  vendor?: string
) => {
  const sp = new URLSearchParams();
  if (vendor) sp.set('vendor', vendor);
  const res = await fetch(
    `${WEBUI_API_BASE_URL}/cases/${caseId}/nodes/${nodeId}/commands?${sp.toString()}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`
      }
    }
  )
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const regenerateNode = async (
  token: string,
  caseId: string,
  nodeId: string,
  body: { prompt?: string; regeneration_strategy?: string; model?: string; async_mode?: boolean } = {}
) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}/nodes/${nodeId}/regenerate`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const listNodeTasks = async (token: string, caseId: string, nodeId: string) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}/nodes/${nodeId}/tasks`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const stopNodeTasks = async (token: string, caseId: string, nodeId: string) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}/nodes/${nodeId}/tasks/stop`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

// ==== Feedback ====
export const upsertCaseFeedback = async (
  token: string,
  caseId: string,
  body: {
    outcome: string;
    rating?: number;
    comment?: string;
    corrected_solution?: string;
    knowledge_contribution?: object;
    additional_context?: object;
  }
) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}/feedback`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const getCaseFeedback = async (token: string, caseId: string) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}/feedback`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

// ==== Stats & Layout ====
export const getCaseStats = async (token: string, caseId: string) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}/stats`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const saveCaseLayout = async (
  token: string,
  caseId: string,
  body: { nodePositions: any[]; viewportState?: object }
) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}/layout`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};

export const getCaseLayout = async (token: string, caseId: string) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/cases/${caseId}/layout`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
    .then(async (r) => {
      if (!r.ok) throw await r.json();
      return r.json();
    })
    .catch((err) => {
      console.error(err);
      throw err?.detail ?? err;
    });
  return res;
};
