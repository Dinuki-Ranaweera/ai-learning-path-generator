# AI Learning Path Generator

An AI-powered full stack web app that generates personalized 
week-by-week learning roadmaps for any skill.

## Live Demo
https://relaxed-pothos-a9636e.netlify.app/

## Tech Stack
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- AI: Groq API (LLaMA 3.3 70B)
- Deployment: Netlify

## Features
- Personalized learning paths for any skill
- Beginner / Intermediate / Advanced levels
- 4, 8, or 12 week roadmaps
- Week-by-week breakdown with topics and project ideas
- AI-curated resources with type badges (article/video/course/book)
- Fallback Google search for any broken resource links
- Expandable week cards for clean navigation

## Prompt Engineering Highlights
- Structured JSON output enforcement via response_format
- Context-aware roadmap generation based on skill + level + duration
- Resource curation with type classification through prompt design
- Graceful handling of AI URL hallucination with Google search fallback

## Setup
1. Clone the repo
2. Get a free API key at console.groq.com
3. Create server/.env with GROQ_API_KEY=your_key
4. cd server && npm install && node index.js
5. cd client && npm install && npm start