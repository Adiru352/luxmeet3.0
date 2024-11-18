import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface LeadScoreDetailsProps {
  score: number;
  previousScore?: number;
  isCalculating?: boolean;
}

export function LeadScoreDetails({ score, previousScore, isCalculating }: LeadScoreDetailsProps) {
  const scoreChange = previousScore ? score - previousScore : 0;
  const scoreColor = score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'red';

  return (
    <div className="space-y-2">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium
          ${
            scoreColor === 'green'
              ? 'bg-green-100 text-green-800'
              : scoreColor === 'yellow'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }
        `}
      >
        <span className="mr-1 font-bold">{score}</span>
        {scoreChange !== 0 && (
          <span className="ml-2 flex items-center text-xs">
            {scoreChange > 0 ? (
              <TrendingUp className="mr-1 h-3 w-3" />
            ) : scoreChange < 0 ? (
              <TrendingDown className="mr-1 h-3 w-3" />
            ) : (
              <Minus className="mr-1 h-3 w-3" />
            )}
            {Math.abs(scoreChange)}
          </span>
        )}
      </motion.div>
      {isCalculating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-gray-500"
        >
          Analyzing interactions...
        </motion.div>
      )}
    </div>
  );
}