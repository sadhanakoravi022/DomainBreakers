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

async function requestProgress(method, body) {
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

  return payload;
}

export async function loadSqlProgress() {
  const payload = await requestProgress('GET');
  return payload.progress;
}

export async function saveSqlProgress(progress) {
  await requestProgress('PUT', { progress });
}
