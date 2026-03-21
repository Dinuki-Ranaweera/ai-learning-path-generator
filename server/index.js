require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');

const app = express();
const PORT = process.env.PORT || 5000;

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json());

const VALID_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const VALID_WEEKS = [4, 8, 12];
const RESOURCE_TYPES = ['article', 'video', 'course', 'book'];

function parseJsonFromResponse(text) {
  let cleaned = text.trim();
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    cleaned = jsonMatch[0];
  }
  return JSON.parse(cleaned);
}

app.post('/api/generate-path', async (req, res) => {
  try {
    const { skill, level, weeks } = req.body;

    if (!skill || typeof skill !== 'string') {
      return res.status(400).json({ error: 'skill is required and must be a string' });
    }
    if (!VALID_LEVELS.includes(level)) {
      return res.status(400).json({
        error: `level must be one of: ${VALID_LEVELS.join(', ')}`,
      });
    }
    const weeksNum = Number(weeks);
    if (!VALID_WEEKS.includes(weeksNum)) {
      return res.status(400).json({
        error: `weeks must be one of: ${VALID_WEEKS.join(', ')}`,
      });
    }

    const chatCompletion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are an expert learning path designer. Always respond with valid JSON only, no markdown or extra text.`,
        },
        {
          role: 'user',
          content: `Create a ${weeksNum}-week learning path for "${skill}" at ${level} level.

Respond with a JSON object exactly in this format (no other text):
{
  "title": "string",
  "description": "string",
  "weeks": [
    {
      "week": 1,
      "topic": "string",
      "description": "string",
      "resources": ["string", "string"],
      "project": "string"
    }
  ]
}

Generate ${weeksNum} weeks. Each week must have: week (1-based), topic, description, resources (array of 2-4 resource names or short descriptions), and project (a hands-on project idea).`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content in Groq response');
    }

    const result = parseJsonFromResponse(content);
    return res.json(result);
  } catch (err) {
    console.error('POST /api/generate-path error:', err);
    const status = err.status === 401 ? 401 : 500;
    return res.status(status).json({
      error: err.message || 'Failed to generate learning path',
    });
  }
});

app.post('/api/generate-resources', async (req, res) => {
  try {
    const { skill, topic } = req.body;

    if (!skill || typeof skill !== 'string') {
      return res.status(400).json({ error: 'skill is required and must be a string' });
    }
    if (!topic || typeof topic !== 'string') {
      return res.status(400).json({ error: 'topic is required and must be a string' });
    }

    const chatCompletion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are an expert curator of learning resources. Always respond with valid JSON only, no markdown or extra text. Use real, well-known resources when possible. For URLs, use actual URLs if you know them, otherwise use placeholder URLs like "https://example.com/resource-name".`,
        },
        {
          role: 'user',
          content: `Find 4-8 learning resources for "${topic}" in the context of learning "${skill}".

Respond with a JSON object exactly in this format (no other text):
{
  "resources": [
    {
      "title": "string",
      "type": "article" | "video" | "course" | "book",
      "url": "string",
      "description": "string"
    }
  ]
}

Each resource must have type as exactly one of: article, video, course, book. Include 4-8 resources with real titles and useful descriptions.`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.6,
    });

    const content = chatCompletion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content in Groq response');
    }

    const parsed = parseJsonFromResponse(content);
    const resources = Array.isArray(parsed.resources) ? parsed.resources : [];

    const validated = resources
      .filter((r) => r && r.title && RESOURCE_TYPES.includes(r.type))
      .map((r) => ({
        title: r.title,
        type: r.type,
        url: r.url || '#',
        description: r.description || '',
      }));

    return res.json({ resources: validated });
  } catch (err) {
    console.error('POST /api/generate-resources error:', err);
    const status = err.status === 401 ? 401 : 500;
    return res.status(status).json({
      error: err.message || 'Failed to generate resources',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
