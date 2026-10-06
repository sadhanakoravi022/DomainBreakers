const CLIENT_ID_KEY = 'domainbreakers-client-id';

function getClientId() {
  const storedClientId = window.localStorage.getItem(CLIENT_ID_KEY);
  if (storedClientId) {
    return storedClientId;
  }

  const clientId = window.crypto.randomUUID();
  window.localStorage.setItem(CLIENT_ID_KEY, clientId);
  return clientId;
}

async function requestProgress<T>(method: 'GET' | 'PUT', body?: unknown): Promise<T> {
  const response = await fetch('/api/progress', {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Client-Id': getClientId(),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error || 'Unable to save learning progress.');
  }

  return payload as T;
}

export async function loadSqlProgress() {
  const payload = await requestProgress<{ progress: unknown }>('GET');
  return payload.progress;
}

export async function saveSqlProgress(progress: unknown) {
  await requestProgress<{ progress: unknown }>('PUT', { progress });
}
