import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to get Gemini client, checking for key first
function getGeminiAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    throw new Error("GEMINI_API_KEY is not configured. Please add it in Settings > Secrets.");
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// Ensure api routes return JSON errors gracefully
function handleRouteError(error: any, res: express.Response) {
  console.error("API Error:", error);
  res.status(500).json({
    error: error.message || "An unexpected error occurred on the server.",
    isConfigError: error.message?.includes("GEMINI_API_KEY")
  });
}

// 1. AI Career DNA Analysis
app.post("/api/dna-analysis", async (req, res) => {
  try {
    const { interests, personality, skills, learningStyle, values, aptitude } = req.body;
    const ai = getGeminiAI();

    const prompt = `Analyze the following Career DNA parameters of a user:
- Interests: ${interests || "Not specified"}
- Personality: ${personality || "Not specified"}
- Current Skills: ${skills || "Not specified"}
- Learning Style: ${learningStyle || "Not specified"}
- Work Values: ${values || "Not specified"}
- Aptitude/Strengths: ${aptitude || "Not specified"}

Provide a comprehensive Career DNA analysis. You must respond in a strict JSON format with the following structure:
{
  "recommendedCareers": [
    {
      "title": "Job Title",
      "matchPercentage": 95,
      "whyItMatches": "Detailed description explaining why this fits their Interests, Personality, and Values",
      "demandLevel": "High" | "Medium" | "Very High",
      "averageSalary": "e.g., $95,000 - $120,000",
      "keySkillsNeeded": ["Skill 1", "Skill 2"]
    }
  ],
  "emergingCareers": [
    {
      "title": "Futuristic Job Title (AI/automation aligned)",
      "marketGrowth": "e.g., +35% over 5 years",
      "description": "Brief description of the career and why it fits their learning style and interests"
    }
  ],
  "personalitySummary": "An overview of their career personality archetype (e.g., 'The Architect', 'The Campaigner') based on input, detailing their strengths and best working environments.",
  "learningStyleAdvice": "Actionable advice on how they can learn and acquire new skills fast, tailored to their learning style."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "{}";
    res.json(JSON.parse(text));
  } catch (error) {
    handleRouteError(error, res);
  }
});

// 2. Career Roadmap Generator
app.post("/api/roadmap", async (req, res) => {
  try {
    const { currentStage, targetCareer } = req.body;
    if (!targetCareer) {
      return res.status(400).json({ error: "Target career is required." });
    }
    const ai = getGeminiAI();

    const prompt = `Generate a personalized step-by-step career path roadmap starting from: "${currentStage || "School/College"}" to reach the target job: "${targetCareer}".
Keep the milestones structured and professional. You must respond in strict JSON format with this schema:
{
  "targetJob": "Target Job Title",
  "estimatedTimeframe": "e.g., 3-5 Years",
  "steps": [
    {
      "id": "step-1",
      "title": "Phase/Milestone Title (e.g., Core Skills Acquisition)",
      "subtitle": "Short action label (e.g., Learning Python & SQL)",
      "description": "Elaborate what skills, concepts, or academic paths to complete in this step.",
      "timeframe": "e.g., Month 1-6 or Year 1",
      "recommendedActions": ["Action 1", "Action 2"],
      "verifiedBadges": ["e.g., Python Basics", "Database Fundamentals"]
    }
  ],
  "successMetrics": ["Metric 1", "Metric 2"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error) {
    handleRouteError(error, res);
  }
});

// 3. Live Skill Gap Detection
app.post("/api/skill-gap", async (req, res) => {
  try {
    const { currentSkills, targetRole } = req.body;
    if (!targetRole) {
      return res.status(400).json({ error: "Target role is required." });
    }
    const ai = getGeminiAI();

    const prompt = `Compare the user's current skills: "${currentSkills || "Basic knowledge"}" with the industry standard requirements for the role of: "${targetRole}".
Detect skills gap, suggest direct learning path resources, and provide actionable projects or certifications. Return a strict JSON response:
{
  "targetRole": "Role name",
  "matchScore": 65, // A percentage representing current readiness (0 to 100)
  "matchingSkills": ["Skill A", "Skill B"],
  "missingSkills": [
    {
      "name": "Missing Skill Name",
      "importance": "High" | "Medium",
      "suggestedAction": "Specific recommendation (e.g., Build a project or take a course)"
    }
  ],
  "suggestedCourses": [
    {
      "title": "Course Title / Topic",
      "provider": "Coursera / Udemy / Free Resources",
      "duration": "e.g., 4 weeks"
    }
  ],
  "recommendedProjects": [
    {
      "title": "Project Idea Name",
      "description": "What to build and how it proves competence in missing skills.",
      "difficulty": "Beginner" | "Intermediate" | "Advanced"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error) {
    handleRouteError(error, res);
  }
});

// 4. AI Resume & Portfolio Builder
app.post("/api/resume-builder", async (req, res) => {
  try {
    const { name, education, experience, skills, targetRole } = req.body;
    const ai = getGeminiAI();

    const prompt = `Create an ATS-optimized professional resume, a matching cover letter, a LinkedIn summary, and realistic interview preparation based on this profile:
- Name: ${name || "User"}
- Education: ${education || "Not specified"}
- Experience/Projects: ${experience || "Not specified"}
- Skills: ${skills || "Not specified"}
- Target Role: ${targetRole || "Not specified"}

Format the response strictly as a JSON object:
{
  "atsResumeMarkdown": "Provide full ATS-friendly Resume content in elegant Markdown format, including Profile, Education, Experience, and Skills sections.",
  "coverLetter": "Full-text draft of a tailored, highly compelling cover letter.",
  "linkedinSummary": "A powerful LinkedIn 'About' section summary (approx. 200-300 words).",
  "interviewPrep": [
    {
      "question": "Realistic interview question for this target role.",
      "sampleAnswer": "A highly structured, STAR-method sample answer.",
      "tip": "Hiring manager insight for answering this question."
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error) {
    handleRouteError(error, res);
  }
});

// 8. AI Career Mentor Chat
app.post("/api/mentor-chat", async (req, res) => {
  try {
    const { messages, userProfile } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }
    const ai = getGeminiAI();

    // Reconstruct conversation
    // Max last 10 messages for safety & token budget
    const chatHistory = messages.slice(-10).map(msg => ({
      role: msg.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: msg.content }]
    }));

    const systemInstruction = `You are a highly experienced, empathetic, and strategic AI Career Mentor (part of Career DNA Web platform).
Your goal is to guide students, job seekers, and career switchers toward lifetime growth.
Address the user with insights on career paths, learning resources, interview readiness, and industry trends.
${userProfile ? `User Profile Context: Current Skills: ${userProfile.skills}, Interests: ${userProfile.interests}, Education: ${userProfile.education}, Target: ${userProfile.targetRole}.` : ""}
Be conversational, encouraging, and provide clear, bulleted steps. Keep your answers relatively concise, actionable, and structured.`;

    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
      history: chatHistory.slice(0, -1) // Pass prior history
    });

    const lastMessageText = messages[messages.length - 1]?.content || "Hello";
    const response = await chat.sendMessage({ message: lastMessageText });

    res.json({ reply: response.text });
  } catch (error) {
    handleRouteError(error, res);
  }
});

// Start server
async function startServer() {
  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Career DNA Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
