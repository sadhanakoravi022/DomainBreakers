import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { runGeminiDiagnosis } from './server/gemini';
import { getProgressForClient, saveProgressForClient } from './server/sqlDatabase';

function apiServerPlugin(): Plugin {
  return {
    name: 'api-server-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const getClientId = () => {
          const clientId = req.headers['x-client-id'];
          return typeof clientId === 'string' && clientId.length <= 128
            ? clientId
            : null;
        };

        // Helper to parse JSON body
        const getBody = (): Promise<any> => {
          return new Promise((resolve) => {
            let data = '';
            req.on('data', chunk => { data += chunk; });
            req.on('end', () => {
              try {
                resolve(data ? JSON.parse(data) : {});
              } catch {
                resolve({});
              }
            });
          });
        };

        if (req.url === '/api/progress' && req.method === 'GET') {
          const clientId = getClientId();
          if (!clientId) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Missing or invalid client ID.' }));
            return;
          }
          try {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ progress: getProgressForClient(clientId) }));
          } catch (error) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Unable to load progress.' }));
          }
          return;
        }

        if (req.url === '/api/progress' && req.method === 'PUT') {
          const clientId = getClientId();
          if (!clientId) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Missing or invalid client ID.' }));
            return;
          }
          const body = await getBody();
          try {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ progress: saveProgressForClient(clientId, body.progress || {}) }));
          } catch (error) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Unable to save progress.' }));
          }
          return;
        }

        if (req.url === '/api/analyze' && req.method === 'POST') {
          try {
            const body = await getBody();
            const geminiDiagnosis = await runGeminiDiagnosis(body);

            res.setHeader('Content-Type', 'application/json');
            if (geminiDiagnosis) {
              res.end(JSON.stringify({
                status: 'success',
                source: 'gemini-3.8-flash',
                aiInsights: {
                  conceptualDiagnosis: geminiDiagnosis.conceptualDiagnosis,
                  pedagogicalAdvice: geminiDiagnosis.pedagogicalAdvice,
                  cognitiveTrapIdentified: geminiDiagnosis.cognitiveTrapIdentified,
                },
                result: {
                  topLearningGap: {
                    whyDetected: geminiDiagnosis.whyDetected,
                    recommendedActions: geminiDiagnosis.recommendedActions,
                    diagnosisSummary: geminiDiagnosis.conceptualDiagnosis,
                  }
                }
              }));
            } else {
              res.end(JSON.stringify({ status: 'fallback', source: 'deterministic_engine' }));
            }
            return;
          } catch (e: any) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ status: 'fallback', error: e.message }));
            return;
          }
        }

        if (req.url === '/api/generate-practice' && req.method === 'POST') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ status: 'ok', source: 'deterministic_engine' }));
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), apiServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
