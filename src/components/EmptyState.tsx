import React from 'react';
import { FileSearch, Upload, Brain, Zap } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <FileSearch className="w-10 h-10 text-blue-600" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Analyze Your Documents
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          Upload a document to get started with AI-powered analysis. Auralis will provide detailed summaries, 
          key insights, and answer your questions about the content.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-blue-50 rounded-lg">
            <Upload className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-blue-900">Upload</p>
            <p className="text-xs text-blue-700">PDF, DOCX, TXT</p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <Brain className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-purple-900">Analyze</p>
            <p className="text-xs text-purple-700">AI Processing</p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <Zap className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-green-900">Understand</p>
            <p className="text-xs text-green-700">Instant Insights</p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Supported formats:</strong> PDF documents, Word files (.docx), and plain text files (.txt)
          </p>
        </div>
      </div>
    </div>
  );
};