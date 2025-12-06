import React, { useState } from 'react';
import { Sparkles, Send, Loader2 } from 'lucide-react';
import { Product } from '../types';
import { getProductInsights } from '../services/geminiService';

interface AIProductAssistantProps {
  product: Product;
}

const AIProductAssistant: React.FC<AIProductAssistantProps> = ({ product }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);
    try {
      const result = await getProductInsights(product, query);
      setResponse(result);
    } catch (error) {
        setResponse("Sorry, I couldn't fetch an answer right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 border border-blue-200 bg-blue-50/50 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-bold text-sm text-gray-800">JIOM Smart Assistant</h3>
        <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">Powered by Gemini</span>
      </div>

      <p className="text-xs text-gray-600 mb-3">Ask questions about features, compatibility, or comparisons.</p>

      {response && (
        <div className="mb-4 bg-white p-3 rounded-md border border-gray-200 text-sm text-gray-800 shadow-sm animate-fade-in">
          <p className="font-medium text-gray-900 mb-1">Answer:</p>
          {response}
        </div>
      )}

      <form onSubmit={handleAsk} className="flex gap-2">
        <input 
            type="text" 
            placeholder={`Ask about ${product.title.substring(0, 20)}...`}
            className="flex-1 text-sm border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
        <button 
            type="submit" 
            disabled={loading || !query}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full disabled:opacity-50 transition-colors"
        >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>
      
      <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
         {['Is this good for gaming?', 'Battery life?', 'Warranty details?'].map(q => (
             <button key={q} onClick={() => { setQuery(q); }} className="whitespace-nowrap text-xs bg-white border border-gray-300 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100">
                 {q}
             </button>
         ))}
      </div>
    </div>
  );
};

export default AIProductAssistant;
