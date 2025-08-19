import { WEBUI_API_BASE_URL } from '$lib/constants';

export const getHealth = async (token: string) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/system/health`, {
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

export const getStatistics = async (token: string) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/system/statistics`, {
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
