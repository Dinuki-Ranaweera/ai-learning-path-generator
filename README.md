# AI Learning Path Generator

An AI-powered full stack web app that generates personalized 
week-by-week learning roadmaps for any skill, built using 
advanced prompt engineering techniques.

## Live Demo
https://relaxed-pothos-a9636e.netlify.app/

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **AI:** Groq API (LLaMA 3.3 70B)
- **Deployment:** Netlify + GitHub

## About This Project
This project was built as part of an intensive AI development 
sprint focused on prompt engineering and building production-ready 
applications with LLMs. Every AI interaction in this app is 
powered by carefully engineered prompts that enforce structured 
output, handle edge cases, and produce consistent results.

## Features
- Personalized learning paths for any skill
- Beginner / Intermediate / Advanced levels
- 4, 8, or 12 week roadmaps
- Week-by-week breakdown with topics and project ideas
- AI-curated resources with type badges (article/video/course/book)
- Expandable week cards for clean navigation
- Fallback Google search for AI-hallucinated URLs

## Prompt Engineering Highlights

### 1. Structured JSON output enforcement
Used `response_format: { type: 'json_object' }` combined with 
explicit schema definition in the prompt to guarantee valid, 
parseable JSON every time — eliminating unpredictable AI output.

### 2. Context-aware generation
Prompts are dynamically constructed with skill, level, and 
duration variables — making every generated roadmap unique 
and tailored to the exact user input rather than generic.

### 3. Multi-turn resource curation
A second prompt chain generates curated resources per week topic, 
using the original skill as context — demonstrating prompt 
chaining where the output of one prompt informs the next.

### 4. Hallucination handling
Identified that AI-generated URLs sometimes hallucinate. Built 
a fallback that detects invalid URLs and redirects to a Google 
search for that resource — solving a real AI reliability problem 
with a practical engineering solution.

### 5. Role-based system prompts
Used system prompts to define AI persona (expert learning path 
designer, expert resource curator) — improving output quality 
and consistency compared to user-only prompts.

## What I Learned
- How to enforce structured output from LLMs using JSON schemas
- How to chain prompts for multi-step AI workflows
- How to handle AI hallucination gracefully in production
- How to build full stack apps with AI as a core feature

## Setup
1. Clone the repo
2. Get a free API key at console.groq.com
3. Create server/.env with GROQ_API_KEY=your_key
4. cd server && npm install && node index.js
5. cd client && npm install && npm start
