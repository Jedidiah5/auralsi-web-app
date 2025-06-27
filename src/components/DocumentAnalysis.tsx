import React, { useState } from 'react';
import { FileText, Lightbulb, MessageSquare, Send, Clock, Download, Volume2, Play, Pause, Square, ArrowLeft } from 'lucide-react';
import { AnalysisResult } from '../App';

interface DocumentAnalysisProps {
  result: AnalysisResult;
  onQuestionSubmit: (question: string) => void;
}

export const DocumentAnalysis: React.FC<DocumentAnalysisProps> = ({ result, onQuestionSubmit }) => {
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [audioText, setAudioText] = useState<string | null>(null);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (followUpQuestion.trim()) {
      onQuestionSubmit(followUpQuestion);
      setFollowUpQuestion('');
    }
  };

  const handleFAQClick = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const generateAudioText = async () => {
    setIsGeneratingAudio(true);
    
    // Simulate API call to convert content to audio-friendly text
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Transform the content into audio-friendly format
    const audioFriendlyText = convertToAudioText(result.content, result.outputType);
    setAudioText(audioFriendlyText);
    setIsGeneratingAudio(false);
  };

  const convertToAudioText = (content: string, outputType: string): string => {
    let audioText = `Here's your ${outputType.toLowerCase()} for this document. `;
    
    // Convert content to shorter, clearer sentences for audio
    const processedContent = content
      .replace(/\b(e\.g\.|i\.e\.)\b/gi, 'for example')
      .replace(/\b(etc\.)\b/gi, 'and so on')
      .replace(/\b(\d+)%/g, '$1 percent')
      .replace(/\b(\d+)-(\d+)\b/g, '$1 to $2')
      .replace(/•/g, '')
      .replace(/\n/g, ' ');

    audioText += processedContent + ' ';
    audioText += "That covers the main points from your analysis. Thanks for listening.";
    
    return audioText;
  };

  const handlePlayAudio = () => {
    if (!audioText) return;

    if (isPlaying && currentUtterance) {
      speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentUtterance(null);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(audioText);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentUtterance(null);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setCurrentUtterance(null);
    };

    setCurrentUtterance(utterance);
    speechSynthesis.speak(utterance);
  };

  const handleStopAudio = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setCurrentUtterance(null);
  };

  const downloadContent = () => {
    const content = audioText || result.content;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.fileName}_${result.outputType.replace(/\s+/g, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getOutputTypeIcon = (outputType: string) => {
    switch (outputType) {
      case 'Detailed Explanation':
        return FileText;
      case 'Summary':
        return FileText;
      case 'Highlights / Key Aspects':
        return Lightbulb;
      case 'Simplified Version':
        return FileText;
      case 'Bullet-Point Brief':
        return FileText;
      case 'Frequently Asked Questions (FAQs)':
        return MessageSquare;
      default:
        return FileText;
    }
  };

  const getOutputTypeColor = (outputType: string) => {
    switch (outputType) {
      case 'Detailed Explanation':
        return 'blue';
      case 'Summary':
        return 'green';
      case 'Highlights / Key Aspects':
        return 'yellow';
      case 'Simplified Version':
        return 'purple';
      case 'Bullet-Point Brief':
        return 'indigo';
      case 'Frequently Asked Questions (FAQs)':
        return 'pink';
      default:
        return 'blue';
    }
  };

  const OutputIcon = getOutputTypeIcon(result.outputType);
  const colorClass = getOutputTypeColor(result.outputType);

  return (
    <div className="space-y-6">
      {/* Document Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className={`p-3 bg-${colorClass}-50 rounded-lg`}>
              <OutputIcon className={`w-6 h-6 text-${colorClass}-600`} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{result.fileName}</h2>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <span className={`px-2 py-1 bg-${colorClass}-100 text-${colorClass}-700 rounded-full font-medium`}>
                  {result.outputType}
                </span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Generated {result.uploadedAt.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={downloadContent}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Analysis Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className={`p-2 bg-${colorClass}-50 rounded-lg`}>
              <OutputIcon className={`w-5 h-5 text-${colorClass}-600`} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{result.outputType}</h3>
          </div>
          
          <button
            onClick={generateAudioText}
            disabled={isGeneratingAudio}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Volume2 className="w-4 h-4" />
            <span>{isGeneratingAudio ? 'Generating...' : 'Convert to Audio'}</span>
          </button>
        </div>
        
        <div className="prose prose-gray max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{result.content}</div>
        </div>
      </div>

      {/* Audio Section */}
      {audioText && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Volume2 className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Audio-Optimized Text</h3>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-700 leading-relaxed">{audioText}</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePlayAudio}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause' : 'Play Audio'}</span>
            </button>
            
            {isPlaying && (
              <button
                onClick={handleStopAudio}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
              >
                <Square className="w-4 h-4" />
                <span>Stop</span>
              </button>
            )}
            
            <button
              onClick={() => {
                const blob = new Blob([audioText], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${result.fileName}_audio_script.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Script</span>
            </button>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Audio Features:</strong> The text has been optimized for clear speech with shorter sentences, 
              conversational tone, and natural pauses. You can play it directly or download the script for external TTS systems.
            </p>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      {result.faqExamples.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <MessageSquare className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Related Questions</h3>
          </div>
          <div className="space-y-3">
            {result.faqExamples.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => handleFAQClick(index)}
                  className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <div className={`w-5 h-5 transition-transform ${expandedFAQ === index ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>
                {expandedFAQ === index && (
                  <div className="px-4 pb-4 text-gray-700 border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Follow-up Question */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ask a Follow-up Question</h3>
        <form onSubmit={handleQuestionSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={followUpQuestion}
              onChange={(e) => setFollowUpQuestion(e.target.value)}
              placeholder="Ask anything about this document or analysis..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!followUpQuestion.trim()}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <Send className="w-4 h-4" />
              <span>Ask Question</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};