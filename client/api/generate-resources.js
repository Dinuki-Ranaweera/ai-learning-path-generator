const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const RESOURCE_TYPES = ['article', 'video', 'course', 'book'];

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const { skill, topic } = JSON.parse(event.body || '{}');

    if (!skill || !topic) {
      return { statusCode: 400, body: JSON.stringify({ error: 'skill and topic are required' }) };
    }

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'You are an expert curator of learning resources. Always respond with valid JSON only, no markdown or extra text.',
        },
        {
          role: 'user',
          content: `Find 4-8 learning resources for "${topic}" in the context of learning "${skill}".

Return this exact JSON schema:
{
  "resources": [
    {
      "title": "string",
      "type": "article" | "video" | "course" | "book",
      "url": "string",
      "description": "string"
    }
  ]
}`,
        },
      ],
      temperature: 0.6,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) throw new Error('No content from Groq');

    const parsed = JSON.parse(content);
    const resources = Array.isArray(parsed.resources) ? parsed.resources : [];

    const validated = resources
      .filter((r) => r && r.title && RESOURCE_TYPES.includes(r.type))
      .map((r) => ({
        title: r.title,
        type: r.type,
        url: r.url || '#',
        description: r.description || '',
      }));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resources: validated })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'Failed to generate resources' })
    };
  }
};