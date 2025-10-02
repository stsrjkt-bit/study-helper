
import React from 'react';
import type { VideoResult } from '../types';

interface ResultCardProps {
  result: VideoResult;
}

const ExternalLinkIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);


export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className="bg-[#2d2d2d] border border-gray-700 rounded-lg p-5 shadow-md transition-all duration-300 hover:border-indigo-500 hover:shadow-indigo-500/20">
      <h4 className="text-lg font-bold text-indigo-300 mb-2">{result.title}</h4>
      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
        <span className="font-semibold text-gray-400">おすすめ理由:</span> {result.reason}
      </p>
      <a
        href={result.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-indigo-400 hover:text-indigo-300 hover:underline transition-colors duration-200 text-sm font-medium"
      >
        動画を視聴する <ExternalLinkIcon />
      </a>
    </div>
  );
};
