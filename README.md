# AI Learning Path Generator

A full stack AI-powered web app that generates personalized 
week-by-week learning roadmaps for any skill — built using 
advanced prompt engineering techniques.

## Live Demo
https://relaxed-pothos-a9636e.netlify.app

## Tech Stack
- **Frontend:** React, Tailwind CSS (dark gradient UI)
- **Backend:** Node.js, Express
- **AI:** Groq API (LLaMA 3.3 70B)
- **Deployment:** Netlify + GitHub

## About This Project
This was the second of three AI-powered applications built during 
an intensive 48-hour AI development sprint. After building the 
Interview Coach, I wanted to show a completely different AI use 
case — generative content rather than evaluation.

The app solves a real problem: when you want to learn something 
new, figuring out where to start and what order to learn things 
is overwhelming. This tool generates a structured, week-by-week 
roadmap tailored to your exact skill, level, and available time.

## What I Built With Prompt Engineering

### Technique 1 — Multi-Variable Context Injection
The learning path prompt dynamically injects three variables: 
skill name, proficiency level, and duration in weeks. The 
combination of these three inputs produces dramatically different 
outputs — a 4-week Beginner Python path looks nothing like a 
12-week Advanced Python path. This shows how prompt variables 
can act as powerful output controllers.

### Technique 2 — Nested JSON Schema Enforcement
The generate-path route returns a deeply nested JSON structure: 
title, description, and an array of week objects each containing 
topic, description, resources array, and project idea. Engineering 
a prompt that reliably returns this nested structure required 
careful schema definition and use of `response_format: json_object`.

### Technique 3 — Prompt Chaining
The app uses two separate prompts in sequence. The first generates 
the learning path. When the user clicks "Get Resources" on any 
week, a second prompt takes the original skill AND the specific 
week topic as context — generating resources that are relevant 
to both the overall skill and the specific week's focus. This is 
prompt chaining: output from one prompt informs the next.

### Technique 4 — Specialist Persona Per Route
Each route has a different system prompt persona. The 
generate-path route uses an "expert learning path designer" 
persona. The generate-resources route uses an "expert resource 
curator" persona. Different personas produce meaningfully 
different output styles — designers think in structure, 
curators think in quality.

### Technique 5 — AI Hallucination Handling
I identified that the AI sometimes generates resource URLs that 
don't exist — a known AI limitation called hallucination. Rather 
than ignoring this, I built a fallback: if a URL is invalid or 
returns a 404, the app automatically redirects to a Google search 
for that resource. This is a real-world prompt engineering 
principle: design your system to handle AI failures gracefully.

### Technique 6 — Output Validation Layer
After receiving AI output, the server validates the response 
shape before sending it to the frontend — checking that required 
fields exist and arrays are actually arrays. This validation 
layer catches malformed AI responses before they reach the user.

## What I Learned
- How to use multi-variable prompts to control output diversity
- How to engineer prompts for deeply nested JSON structures
- How prompt chaining creates more contextual AI responses
- How different personas produce meaningfully different outputs
- How to handle AI hallucination as a product feature, not a bug

## The Sprint
This app was one of three AI-powered projects built in 48 hours:
1. AI Interview Coach — https://soft-bavarois-ed7142.netlify.app
2. AI Learning Path Generator — https://relaxed-pothos-a9636e.netlify.app
3. AI Regex Generator — https://aesthetic-choux-38c965.netlify.app

## Setup
1. Clone the repo
2. Get a free API key at console.groq.com
3. Create server/.env with GROQ_API_KEY=your_key
4. cd server && npm install && node index.js
5. cd client && npm install && npm start
