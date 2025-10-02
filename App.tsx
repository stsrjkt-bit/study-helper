
import React, { useState, useRef, useCallback } from 'react';
import { SearchForm } from './components/SearchForm';
import { ResultsList } from './components/ResultsList';
import { findVideos } from './services/geminiService';
import type { VideoResult } from './types';

const App: React.FC = () => {
  const [results, setResults] = useState<VideoResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const searchSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToSearch = () => {
    searchSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = useCallback(async (topic: string) => {
    if (!topic.trim()) {
      setError("検索トピックを入力してください。");
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const videoResults = await findVideos(topic);
      setResults(videoResults);
    } catch (err) {
      console.error(err);
      setError('動画の検索中にエラーが発生しました。しばらくしてからもう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#e0e0e0] font-sans flex flex-col items-center p-4">
      <div className="w-full max-w-md mx-auto">

        <section className="h-screen flex flex-col justify-center items-center text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">AI授業動画ファインダー</h1>
            <p className="text-gray-400">学びたいトピックにぴったりの動画をAIが見つけます。</p>
          </div>
          <button
            onClick={handleScrollToSearch}
            className="mt-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg shadow-indigo-500/30 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            🎬 授業動画を探す
          </button>
        </section>

        <main ref={searchSectionRef} className="min-h-screen flex flex-col justify-center w-full pt-16">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
          
          <div className="mt-8 w-full">
            {isLoading && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-400"></div>
                <p className="text-gray-400">AIが最適な動画を探しています...</p>
              </div>
            )}
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
                <p>{error}</p>
              </div>
            )}
            {!isLoading && results.length > 0 && <ResultsList results={results} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
