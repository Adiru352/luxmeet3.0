import OpenAI from 'openai';
import type { Lead } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface LeadInteraction {
  type: 'view' | 'click' | 'download' | 'share';
  timestamp: Date;
  details?: string;
}

interface LeadContext {
  source: Lead['source'];
  interactions: LeadInteraction[];
  emailDomain: string;
  timeToRespond?: number;
  totalInteractions: number;
}

export async function calculateLeadScore(lead: Lead, context: LeadContext): Promise<number> {
  const prompt = `
    Analyze this lead's engagement data and provide a lead score from 0-100:
    
    Lead Source: ${context.source}
    Email Domain: ${context.emailDomain}
    Total Interactions: ${context.totalInteractions}
    Time to Respond: ${context.timeToRespond ? `${context.timeToRespond} minutes` : 'N/A'}
    
    Recent Interactions:
    ${context.interactions
      .map(
        (interaction) =>
          `- ${interaction.type} at ${interaction.timestamp.toISOString()}${
            interaction.details ? `: ${interaction.details}` : ''
          }`
      )
      .join('\n')}
    
    Consider:
    1. Quality of interactions (downloads > shares > clicks > views)
    2. Frequency and recency of interactions
    3. Response time
    4. Lead source quality (direct > nfc > qr)
    5. Email domain reputation (business vs personal email)
    
    Return only a number between 0 and 100.
  `;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4-turbo-preview',
      max_tokens: 5,
      temperature: 0.3,
    });

    const score = parseInt(completion.choices[0].message.content || '0', 10);
    return Math.min(Math.max(score, 0), 100); // Ensure score is between 0 and 100
  } catch (error) {
    console.error('Error calculating lead score:', error);
    return 50; // Default score if AI scoring fails
  }
}