import React, { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { DocumentAnalysis } from './components/DocumentAnalysis';
import { AnalysisOptions } from './components/AnalysisOptions';
import { Header } from './components/Header';
import { EmptyState } from './components/EmptyState';

export interface AnalysisResult {
  id: string;
  fileName: string;
  outputType: string;
  content: string;
  faqExamples: Array<{
    question: string;
    answer: string;
  }>;
  uploadedAt: Date;
}

export interface UploadedDocument {
  id: string;
  fileName: string;
  content: string;
  uploadedAt: Date;
}

function App() {
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [currentDocument, setCurrentDocument] = useState<UploadedDocument | null>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    
    // Simulate file processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock document content extraction
    const mockContent = generateMockDocumentContent(file.name);
    
    const uploadedDoc: UploadedDocument = {
      id: Math.random().toString(36).substr(2, 9),
      fileName: file.name,
      content: mockContent,
      uploadedAt: new Date()
    };

    setUploadedDocuments(prev => [uploadedDoc, ...prev]);
    setCurrentDocument(uploadedDoc);
    setCurrentAnalysis(null);
    setIsUploading(false);
  };

  const handleAnalysisRequest = async (document: UploadedDocument, analysisType: string, customRequest?: string) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const analysisResult = generateAnalysisResult(document, analysisType, customRequest);
    
    setAnalysisResults(prev => [analysisResult, ...prev]);
    setCurrentAnalysis(analysisResult);
    setIsAnalyzing(false);
  };

  const generateMockDocumentContent = (fileName: string): string => {
    const contents = [
      "Renewable energy has been growing rapidly over the past decade, driven by technological advances and policy support. Solar photovoltaic and wind energy costs have fallen dramatically, making them competitive with fossil fuels in many markets. Governments worldwide are implementing policies and incentives to accelerate the transition to clean energy. However, significant challenges remain in energy storage, grid integration, and maintaining reliability as renewable penetration increases. The intermittent nature of solar and wind power requires sophisticated grid management and backup systems. Investment in battery storage technology and smart grid infrastructure is essential for the continued growth of renewable energy. Despite these challenges, the renewable energy sector continues to attract substantial investment and shows strong growth potential.",
      "Digital transformation has become a critical priority for organizations across all industries. The COVID-19 pandemic accelerated digital adoption, forcing companies to rapidly implement remote work technologies and digital customer engagement platforms. Successful digital transformation requires more than just technology implementation; it demands cultural change, leadership commitment, and employee engagement. Organizations must focus on change management, training programs, and clear communication to ensure successful adoption. Key areas of focus include cloud migration, data analytics, artificial intelligence, and automation. Companies that successfully navigate digital transformation typically see improved operational efficiency, enhanced customer experience, and increased competitive advantage. However, the journey is complex and requires careful planning, adequate resources, and ongoing commitment from leadership.",
      "Supply chain optimization has become increasingly important in today's global economy. Companies are seeking to reduce costs, improve efficiency, and enhance resilience in their supply chain operations. Key strategies include supplier diversification, inventory optimization, demand forecasting, and technology integration. The use of artificial intelligence and machine learning in supply chain management is growing, enabling better demand prediction and automated decision-making. Sustainability considerations are also becoming more important, with companies focusing on reducing environmental impact and ensuring ethical sourcing practices. Risk management is another critical aspect, particularly in light of recent global disruptions. Companies are investing in supply chain visibility tools and developing contingency plans to mitigate potential disruptions."
    ];
    return contents[Math.floor(Math.random() * contents.length)];
  };

  const generateAnalysisResult = (document: UploadedDocument, analysisType: string, customRequest?: string): AnalysisResult => {
    let content = '';
    let outputType = analysisType;

    if (customRequest) {
      outputType = 'Custom Request';
      content = generateCustomAnalysis(document.content, customRequest);
    } else {
      switch (analysisType) {
        case 'Detailed Explanation':
          content = generateDetailedExplanation(document.content);
          break;
        case 'Summary':
          content = generateSummary(document.content);
          break;
        case 'Highlights / Key Aspects':
          content = generateHighlights(document.content);
          break;
        case 'Simplified Version':
          content = generateSimplifiedVersion(document.content);
          break;
        case 'Bullet-Point Brief':
          content = generateBulletPoints(document.content);
          break;
        case 'Frequently Asked Questions (FAQs)':
          content = generateFAQContent(document.content);
          break;
        default:
          content = generateSummary(document.content);
      }
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      fileName: document.fileName,
      outputType,
      content,
      faqExamples: generateFAQExamples(document.content),
      uploadedAt: new Date()
    };
  };

  const generateDetailedExplanation = (content: string): string => {
    return `This document provides a comprehensive examination of the subject matter. ${content} The analysis reveals multiple interconnected factors that contribute to the overall understanding of the topic. Each aspect builds upon previous points to create a complete picture of the current situation and future implications. The document presents evidence-based conclusions supported by relevant data and expert insights.`;
  };

  const generateSummary = (content: string): string => {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const keySentences = sentences.slice(0, Math.min(4, sentences.length));
    return keySentences.join('. ') + '.';
  };

  const generateHighlights = (content: string): string => {
    const highlights = [
      "• Primary focus area shows significant growth and development",
      "• Key challenges identified require strategic attention",
      "• Technology integration presents both opportunities and risks",
      "• Investment and resource allocation are critical success factors",
      "• Future outlook remains positive with proper implementation"
    ];
    return highlights.join('\n');
  };

  const generateSimplifiedVersion = (content: string): string => {
    return "This document talks about important changes happening in this field. The main idea is that things are getting better, but there are still some problems to solve. New technology is helping, but it costs money and takes time to set up. Companies and governments are working together to make improvements. The future looks good if everyone keeps working on these issues.";
  };

  const generateBulletPoints = (content: string): string => {
    const points = [
      "• Main topic shows rapid growth and development",
      "• Technology costs have decreased significantly",
      "• Government support through policies and incentives",
      "• Challenges remain in implementation and infrastructure",
      "• Investment continues to grow in this sector"
    ];
    return points.join('\n');
  };

  const generateFAQContent = (content: string): string => {
    return "Here are the most commonly asked questions about this topic:\n\nQ: What are the main benefits?\nA: The primary benefits include cost reduction, improved efficiency, and better outcomes.\n\nQ: What challenges exist?\nA: Main challenges include implementation costs, technical complexity, and change management.\n\nQ: What's the timeline for results?\nA: Most organizations see initial results within 6-12 months of implementation.\n\nQ: How much investment is required?\nA: Investment varies by organization size and scope, but ROI is typically achieved within 18-24 months.";
  };

  const generateCustomAnalysis = (content: string, request: string): string => {
    return `Based on your request: "${request}"\n\nHere's the analysis: ${content.substring(0, 200)}... The document addresses your specific question by providing relevant information and context. The key points that relate to your request include the main themes, supporting evidence, and practical implications discussed in the document.`;
  };

  const generateFAQExamples = (content: string): Array<{question: string; answer: string}> => {
    return [
      {
        question: "What are the main points covered in this document?",
        answer: "The document covers key developments, challenges, and future outlook in the subject area, with emphasis on practical implications and strategic considerations."
      },
      {
        question: "How can this information be applied practically?",
        answer: "The insights can be used for strategic planning, decision-making, and understanding current trends and future opportunities in the field."
      }
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <FileUpload 
                onFileUpload={handleFileUpload} 
                isAnalyzing={isUploading}
              />
              
              {/* Recent Documents */}
              {uploadedDocuments.length > 0 && (
                <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Documents</h3>
                  <div className="space-y-3">
                    {uploadedDocuments.slice(0, 5).map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => {
                          setCurrentDocument(doc);
                          setCurrentAnalysis(null);
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          currentDocument?.id === doc.id
                            ? 'bg-blue-50 border border-blue-200'
                            : 'hover:bg-gray-50 border border-transparent'
                        }`}
                      >
                        <div className="font-medium text-gray-900 truncate">
                          {doc.fileName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {doc.uploadedAt.toLocaleDateString()}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Analysis */}
              {analysisResults.length > 0 && (
                <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Analysis</h3>
                  <div className="space-y-3">
                    {analysisResults.slice(0, 3).map((result) => (
                      <button
                        key={result.id}
                        onClick={() => setCurrentAnalysis(result)}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          currentAnalysis?.id === result.id
                            ? 'bg-purple-50 border border-purple-200'
                            : 'hover:bg-gray-50 border border-transparent'
                        }`}
                      >
                        <div className="font-medium text-gray-900 truncate">
                          {result.fileName}
                        </div>
                        <div className="text-sm text-purple-600 font-medium">
                          {result.outputType}
                        </div>
                        <div className="text-sm text-gray-500">
                          {result.uploadedAt.toLocaleDateString()}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentAnalysis ? (
              <DocumentAnalysis 
                result={currentAnalysis}
                onQuestionSubmit={(question) => {
                  console.log('Follow-up question:', question);
                }}
              />
            ) : currentDocument ? (
              <AnalysisOptions
                document={currentDocument}
                onAnalysisRequest={handleAnalysisRequest}
                isAnalyzing={isAnalyzing}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;