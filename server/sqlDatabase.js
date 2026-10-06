import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const dbDir = path.join(process.cwd(), 'data');
fs.mkdirSync(dbDir, { recursive: true });

const db = new DatabaseSync(path.join(dbDir, 'domainbreakers.sqlite'));
db.exec('PRAGMA journal_mode = WAL');
db.exec('PRAGMA busy_timeout = 5000');
db.exec(`
  CREATE TABLE IF NOT EXISTS client_progress (
    client_id TEXT PRIMARY KEY,
    data TEXT NOT NULL DEFAULT '{}',
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

export function getProgressForClient(clientId: string) {
  const row = db
    .prepare('SELECT data FROM client_progress WHERE client_id = ?')
    .get(clientId) as { data?: string } | undefined;

  if (!row?.data) {
    return {};
  }

  return JSON.parse(row.data);
}

export function saveProgressForClient(clientId: string, data: unknown) {
  const payload = JSON.stringify(data ?? {});
  db.prepare(
    `INSERT INTO client_progress (client_id, data, updated_at)
     VALUES (?, ?, datetime('now'))
     ON CONFLICT(client_id) DO UPDATE SET data = excluded.data, updated_at = datetime('now')`
  ).run(clientId, payload);

  return data;
}
