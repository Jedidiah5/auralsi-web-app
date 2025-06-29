import React from 'react';
import { FileSearch, Upload, Brain, Zap } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-full flex items-center justify-center">
              <FileSearch className="w-10 h-10 text-blue-400" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-3">
          Ready to Analyze Your Documents
        </h3>
        
        <p className="text-gray-300 mb-8 leading-relaxed">
          Upload a document to get started with AI-powered analysis. Auralis will provide detailed summaries, 
          key insights, and answer your questions about the content.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-gray-300">Upload Document</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-gray-300">AI Analysis</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-gray-300">Get Insights</span>
          </div>
        </div>
      </div>
    </div>
  );
};