export type CaseItem = {
  id: string;
  title: string;
  status: string;
  vendor?: string | null;
  category?: string | null;
  metadata?: Record<string, any> | null;
  created_at: number;
  updated_at: number;
};

export type CaseListResponse = {
  total: number;
  page: number;
  page_size: number;
  items: CaseItem[];
};

export type CaseNode = {
  id: string;
  case_id: string;
  title: string;
  content: string; // may be JSON string or plain text
  node_type: 'USER_QUERY' | 'AI_ANALYSIS' | 'USER_RESPONSE' | string;
  status: 'COMPLETED' | 'AWAITING_USER_INPUT' | 'PROCESSING' | string;
  metadata?: Record<string, any> | null;
  created_at?: number;
};

export type CaseEdge = {
  id: string;
  case_id: string;
  source_node_id: string;
  target_node_id: string;
  edge_type: string;
  metadata?: Record<string, any> | null;
};

export type CaseWithGraph = CaseItem & {
  nodes: CaseNode[];
  edges: CaseEdge[];
};
