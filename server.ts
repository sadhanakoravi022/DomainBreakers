import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { runGeminiDiagnosis } from './server/gemini';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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
