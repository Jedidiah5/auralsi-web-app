import React, { useState } from 'react';
import { FileText, Brain, List, Lightbulb, MessageSquare, Edit3, Loader2 } from 'lucide-react';
import { UploadedDocument } from '../App';

interface AnalysisOptionsProps {
  document: UploadedDocument;
  onAnalysisRequest: (document: UploadedDocument, analysisType: string, customRequest?: string) => void;
  isAnalyzing: boolean;
}

export const AnalysisOptions: React.FC<AnalysisOptionsProps> = ({ 
  document, 
  onAnalysisRequest, 
  isAnalyzing 
}) => {
  const [customRequest, setCustomRequest] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const analysisOptions = [
    {
      type: 'Detailed Explanation',
      icon: FileText,
      color: 'blue',
      description: 'Comprehensive analysis covering all main points and details'
    },
    {
      type: 'Summary',
      icon: Brain,
      color: 'green',
      description: 'Well-structured summary with key points and conclusions'
    },
    {
      type: 'Highlights / Key Aspects',
      icon: Lightbulb,
      color: 'yellow',
      description: 'Extract only the most important insights and highlights'
    },
    {
      type: 'Simplified Version',
      icon: Edit3,
      color: 'purple',
      description: 'Plain language version suitable for all audiences'
    },
    {
      type: 'Bullet-Point Brief',
      icon: List,
      color: 'indigo',
      description: 'Concise bullet points capturing key ideas'
    },
    {
      type: 'Frequently Asked Questions (FAQs)',
      icon: MessageSquare,
      color: 'pink',
      description: 'Common questions and answers about the document'
    }
  ];

  const handleOptionClick = (analysisType: string) => {
    onAnalysisRequest(document, analysisType);
  };

  const handleCustomRequest = () => {
    if (customRequest.trim()) {
      onAnalysisRequest(document, 'Custom Request', customRequest);
      setCustomRequest('');
      setShowCustomInput(false);
    }
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-900/50 border-blue-800 hover:bg-blue-800 text-blue-400',
      green: 'bg-green-900/50 border-green-800 hover:bg-green-800 text-green-400',
      yellow: 'bg-yellow-900/50 border-yellow-800 hover:bg-yellow-800 text-yellow-400',
      purple: 'bg-purple-900/50 border-purple-800 hover:bg-purple-800 text-purple-400',
      indigo: 'bg-indigo-900/50 border-indigo-800 hover:bg-indigo-800 text-indigo-400',
      pink: 'bg-pink-900/50 border-pink-800 hover:bg-pink-800 text-pink-400'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getIconColorClasses = (color: string) => {
    const colorMap = {
      blue: 'text-blue-500',
      green: 'text-green-500',
      yellow: 'text-yellow-500',
      purple: 'text-purple-500',
      indigo: 'text-indigo-500',
      pink: 'text-pink-500'
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  if (isAnalyzing) {
    return (
      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-blue-400 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Brain className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">Analyzing Document</h3>
            <p className="text-gray-400">Auralis is processing your request...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Document Header */}
      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-900/50 rounded-lg">
            <FileText className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{document.fileName}</h2>
            <p className="text-gray-400 mt-1">Uploaded {document.uploadedAt.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Analysis Options */}
      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">
            What would you like to do with this document?
          </h3>
          <p className="text-gray-400">
            Choose one of the following analysis options, or type your own custom request:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {analysisOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.type}
                onClick={() => handleOptionClick(option.type)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${getColorClasses(option.color)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Icon className={`w-6 h-6 ${getIconColorClasses(option.color)}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 text-white">{option.type}</h4>
                    <p className="text-sm opacity-80 text-gray-300">{option.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom Request Section */}
        <div className="border-t border-gray-600 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Custom Request</h4>
            <button
              onClick={() => setShowCustomInput(!showCustomInput)}
              className="text-blue-400 hover:text-blue-300 font-medium"
            >
              {showCustomInput ? 'Cancel' : 'Type your own request'}
            </button>
          </div>

          {showCustomInput && (
            <div className="space-y-4">
              <textarea
                value={customRequest}
                onChange={(e) => setCustomRequest(e.target.value)}
                placeholder="Describe what you'd like to know about this document..."
                className="w-full p-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-700 text-white placeholder-gray-400"
                rows={3}
              />
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowCustomInput(false);
                    setCustomRequest('');
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCustomRequest}
                  disabled={!customRequest.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Analyze
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-gray-700">
        <h4 className="font-semibold text-white mb-2">How it works</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-900/50 rounded-full flex items-center justify-center text-blue-400 font-semibold text-xs">1</div>
            <span>Choose your preferred analysis type</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-purple-900/50 rounded-full flex items-center justify-center text-purple-400 font-semibold text-xs">2</div>
            <span>Auralis processes your document</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-900/50 rounded-full flex items-center justify-center text-green-400 font-semibold text-xs">3</div>
            <span>Get tailored insights and analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
};