import { GoogleGenerativeAI } from "@google/genai";
import { resumeData } from '../constants';

console.log('Environment check:', process.env.GEMINI_API_KEY ? 'Key found' : 'Key missing');

// IMPORTANT: Do not expose this key publicly.
// It is assumed that process.env.API_KEY is securely handled by the deployment environment.
// We add a check for `typeof process` to prevent a crash in browser environments.
const apiKey = typeof process !== 'undefined' && process.env ? process.env.GEMINI_API_KEY : undefined;


// Initialize the AI service only if an API key is provided.
// If not, the rest of the app will still function, and the AI component will show an error.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Function to generate a flat text representation of the resume data
const getResumeAsText = () => {
    let text = `Name: ${resumeData.name}\n\n`;
    text += `Contact:\nEmail: ${resumeData.contact.email}\nPhone: ${resumeData.contact.phone}\nLocation: ${resumeData.contact.location}\n\n`;
    
    text += "--- TECHNICAL SKILLS ---\n";
    resumeData.technicalSkills.forEach(cat => {
        text += `${cat.title}: ${cat.skills.join(', ')}\n`;
    });

    text += "\n--- EDUCATION ---\n";
    resumeData.education.forEach(edu => {
        text += `${edu.institution} - ${edu.degree} (${edu.duration})\n`;
    });

    text += "\n--- TECHNICAL EXPERIENCE ---\n";
    resumeData.technicalExperience.forEach(exp => {
        text += `${exp.role} at ${exp.company} (${exp.duration})\n`;
        exp.description.forEach(desc => text += `- ${desc}\n`);
        text += "\n";
    });

    text += "\n--- OTHER EXPERIENCE ---\n";
    resumeData.otherExperience.forEach(exp => {
        text += `${exp.role} at ${exp.institution} (${exp.duration})\n`;
        exp.description.forEach(desc => text += `- ${desc}\n`);
        text += "\n";
    });

    text += "\n--- PUBLICATIONS ---\n";
    resumeData.publications.forEach(pub => {
        text += `- ${pub.details}\n`;
    });

    text += "\n--- CERTIFICATES ---\n";
    resumeData.certificates.forEach(cert => {
        text += `${cert.title} - ${cert.institution}\n`;
        cert.description.forEach(desc => text += `- ${desc}\n`);
    });

    return text;
};

const resumeContext = getResumeAsText();

export const createAIChat = (): Chat => {
    if (!ai) {
        throw new Error("AI Service is not configured. Please ensure the API_KEY is set correctly in the deployment environment.");
    }
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: `You are a helpful and professional hiring assistant. Your task is to answer questions about Sajjad Kashani's resume. 
            Base your answers *only* on the information provided in the following resume text. 
            Do not make up any information. If the answer is not in the resume, state that the information is not available in the provided document.
            Keep your answers concise and to the point.
            
            Here is the resume:
            ---
            ${resumeContext}
            ---
            `,
        },
    });
};

export const analyzeJobFitStream = async ({ jobText, onChunk }: { jobText: string; onChunk: (chunk: string) => void; }) => {
    if (!ai) {
        throw new Error("AI Service is not configured. Please ensure the API_KEY is set correctly in the deployment environment.");
    }
    const prompt = `
      **Analyze Candidate-Job Fit**

      **Candidate Resume:**
      ---
      ${resumeContext}
      ---

      **Job Description:**
      ---
      ${jobText}
      ---

      **Your Task:**
      You are an expert HR analyst. Based *only* on the provided resume and job description, provide a detailed analysis of Sajjad Kashani's suitability for the role. Structure your response in markdown format as follows:

      1.  **Overall Summary:** A brief, one-paragraph summary of his fit for the role.
      2.  **Key Strengths:** A bulleted list of the candidate's skills and experiences that directly align with the job requirements. Quote or reference specific parts of the resume and job description.
      3.  **Potential Gaps:** A bulleted list of required skills or experiences mentioned in the job description that are not clearly present in the resume. Be objective and avoid making assumptions.
      4.  **Recommendation:** A concluding statement on his potential as a candidate (e.g., Strong contender, good fit, potential fit with some upskilling).
    `;
    
    const stream = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    for await (const chunk of stream) {
      onChunk(chunk.text);
    }
};
