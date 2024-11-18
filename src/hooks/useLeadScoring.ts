import { useState } from 'react';
import { calculateLeadScore } from '../services/leadScoring';
import type { Lead } from '../types';

export function useLeadScoring() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scoreLead = async (lead: Lead, interactions: any[]) => {
    setIsCalculating(true);
    setError(null);

    try {
      const emailDomain = lead.email.split('@')[1];
      const context = {
        source: lead.source,
        interactions,
        emailDomain,
        totalInteractions: interactions.length,
        timeToRespond: calculateResponseTime(interactions),
      };

      const score = await calculateLeadScore(lead, context);
      return score;
    } catch (err) {
      setError('Failed to calculate lead score');
      throw err;
    } finally {
      setIsCalculating(false);
    }
  };

  return { scoreLead, isCalculating, error };
}

function calculateResponseTime(interactions: any[]): number | undefined {
  if (interactions.length < 2) return undefined;
  
  const firstInteraction = interactions[0].timestamp;
  const responseInteraction = interactions.find(i => i.type === 'click' || i.type === 'share');
  
  if (!responseInteraction) return undefined;
  
  return Math.floor((responseInteraction.timestamp - firstInteraction) / (1000 * 60)); // Minutes
}