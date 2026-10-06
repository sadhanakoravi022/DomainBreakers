import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { runGeminiDiagnosis } from './server/gemini';
import { getProgressForClient, saveProgressForClient } from './server/sqlDatabase';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

function getClientId(req: express.Request) {
  const clientId = req.header('X-Client-Id');
  return clientId && clientId.length <= 128 ? clientId : null;
}

app.get('/api/progress', (req, res) => {
  const clientId = getClientId(req);
  if (!clientId) {
    return res.status(400).json({ error: 'Missing or invalid client ID.' });
  }

  return res.json({ progress: getProgressForClient(clientId) });
});

app.put('/api/progress', (req, res) => {
  const clientId = getClientId(req);
  if (!clientId) {
    return res.status(400).json({ error: 'Missing or invalid client ID.' });
  }

  const saved = saveProgressForClient(clientId, req.body?.progress || {});
  return res.json({ progress: saved });
});

// API: Diagnose Assessment
app.post('/api/analyze', async (req, res) => {
  try {
    const diagnosis = await runGeminiDiagnosis(req.body);
    if (diagnosis) {
      return res.json({
        status: 'success',
        source: 'gemini-3.8-flash',
        aiInsights: {
          conceptualDiagnosis: diagnosis.conceptualDiagnosis,
          pedagogicalAdvice: diagnosis.pedagogicalAdvice,
          cognitiveTrapIdentified: diagnosis.cognitiveTrapIdentified,
        },
        result: {
          topLearningGap: {
            whyDetected: diagnosis.whyDetected,
            recommendedActions: diagnosis.recommendedActions,
            diagnosisSummary: diagnosis.conceptualDiagnosis,
          }
        }
      });
    }
  } catch (error: any) {
    console.warn('Diagnosis error in server.ts:', error.message);
  }
  return res.json({ status: 'fallback', source: 'deterministic_engine' });
});

// API: Generate Practice
app.post('/api/generate-practice', (req, res) => {
  res.json({ status: 'ok', source: 'deterministic_engine' });
});

// Serve frontend dist if available
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`DomainBreakers Server running on port ${PORT}`);
});
