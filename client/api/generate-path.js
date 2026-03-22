const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const VALID_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const VALID_WEEKS = [4, 8, 12];

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { skill, level, weeks } = JSON.parse(event.body || '{}');

    if (!skill || typeof skill !== 'string') {
      return { statusCode: 400, body: JSON.stringify({ error: 'skill is required' }) };
    }
    if (!VALID_LEVELS.includes(level)) {
      return { statusCode: 400, body: JSON.stringify({ error: `level must be one of: ${VALID_LEVELS.join(', ')}` }) };
    }
    const weeksNum = Number(weeks);
    if (!VALID_WEEKS.includes(weeksNum)) {
      return { statusCode: 400, body: JSON.stringify({ error: `weeks must be one of: ${VALID_WEEKS.join(', ')}` }) };
    }

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'You are an expert learning path designer. Always respond with valid JSON only, no markdown or extra text.',
        },
        {
          role: 'user',
          content: `Create a ${weeksNum}-week learning path for "${skill}" at ${level} level.

Return this exact JSON schema:
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

Generate ${weeksNum} weeks.`,
        },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error('No content from Groq');

    const result = JSON.parse(content);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Failed to generate learning path' })
    };
  }
};