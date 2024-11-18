import { LeadScoreDetails } from './LeadScoreDetails';

interface LeadScoreProps {
  score: number;
  previousScore?: number;
  isCalculating?: boolean;
}

export function LeadScore({ score, previousScore, isCalculating }: LeadScoreProps) {
  return <LeadScoreDetails score={score} previousScore={previousScore} isCalculating={isCalculating} />;
}