
import React from 'react';
import type { VideoResult } from '../types';
import { ResultCard } from './ResultCard';

interface ResultsListProps {
  results: VideoResult[];
}

export const ResultsList: React.FC<ResultsListProps> = ({ results }) => {
  return (
    <div className="space-y-4">
       <h3 className="text-xl font-semibold text-center mb-4">おすすめ動画リスト</h3>
      {results.map((result, index) => (
        <ResultCard key={index} result={result} />
      ))}
    </div>
  );
};
