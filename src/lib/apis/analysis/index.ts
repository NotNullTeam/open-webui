import { WEBUI_API_BASE_URL } from '$lib/constants';

export const parseLog = async (
  token: string,
  body: { logType: string; vendor: string; logContent: string; contextInfo?: object }
) => {
  const res = await fetch(`${WEBUI_API_BASE_URL}/analysis/log-parsing`, {
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
