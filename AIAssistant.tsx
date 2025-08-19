import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createAIChat, analyzeJobFitStream } from '../services/geminiService';
import type { Message } from '../types';
import { SparklesIcon, DocumentPlusIcon } from '../constants';
import type { Chat } from '@google/genai';
import * as pdfjsLib from 'pdfjs-dist';

const suggestionPrompts = [
  "What are his top skills?",
  "Summarize his DevOps experience.",
  "Does he have experience with C++?",
];

const AIAssistant: React.FC = () => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://esm.sh/pdfjs-dist@4.5.136/build/pdf.worker.mjs`;

    try {
      setChat(createAIChat());
      setMessages([
        { role: 'model', text: "Hello! I'm an AI assistant. Ask me about Sajjad's resume, or upload a job description PDF to analyze his qualifications." }
      ]);
    } catch (error) {
       console.error("Failed to initialize AI Chat:", error);
       setMessages([
        { role: 'model', text: "Sorry, the AI assistant could not be initialized. Please check your API key." }
      ]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  const sendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || isLoading || isAnalyzing || !chat) return;

    const userMessage: Message = { role: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setInput('');

    try {
      const stream = await chat.sendMessageStream({ message: messageText });
      let modelResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        modelResponse += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = modelResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error("Error sending message to AI:", error);
      const errorMessage : Message = { role: 'model', text: "Sorry, I encountered an error. Please try again."};
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isAnalyzing, chat]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };
  
  const extractTextFromPdf = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          if (!event.target?.result) {
            return reject(new Error("Failed to read file."));
          }
          const typedarray = new Uint8Array(event.target.result as ArrayBuffer);
          const pdf = await pdfjsLib.getDocument(typedarray).promise;
          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => 'str' in item ? item.str : '').join(' ');
            fullText += pageText + '\n\n';
          }
          resolve(fullText);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });
  };

  const handleAnalyzeJob = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    const userMessage: Message = { role: 'user', text: `Analyzing qualifications for job: "${selectedFile.name}"`};
    setMessages(prev => [...prev, userMessage, { role: 'model', text: '' }]);
    
    try {
        const jobText = await extractTextFromPdf(selectedFile);
        
        await analyzeJobFitStream({
          jobText,
          onChunk: (chunkText) => {
            setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1].text += chunkText;
              return newMessages;
            });
          }
        });

    } catch (error) {
        console.error("Error analyzing job description:", error);
        const errorText = error instanceof Error ? error.message : "An unknown error occurred during analysis.";
        const errorMessage : Message = { role: 'model', text: `Sorry, I couldn't analyze the PDF. ${errorText}`};
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length-1] = errorMessage;
            return newMessages;
        });
    } finally {
        setIsAnalyzing(false);
        setSelectedFile(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }
  };

  const handleSend = () => sendMessage(input);
  const handleSuggestionClick = (prompt: string) => sendMessage(prompt);

  const isBusy = isLoading || isAnalyzing;

  return (
    <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-4xl mx-auto my-8">
      <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-violet-500 text-transparent bg-clip-text mb-4 flex items-center">
        <SparklesIcon className="w-6 h-6 mr-2 text-violet-400" />
        Ask AI About This Resume
      </h2>
      <div className="max-h-96 overflow-y-auto bg-gray-900/70 rounded-md p-4 mb-4 border border-gray-700 transition-all duration-500 ease-in-out">
        {messages.map((msg, index) => (
          <div key={index} className={`flex mb-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg px-4 py-2 max-w-[85%] md:max-w-md ${msg.role === 'user' ? 'bg-gradient-to-br from-blue-600 to-violet-600 text-white' : 'bg-gray-700 text-slate-200'}`}>
              <div className="text-sm whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
              { (isLoading && msg.role === 'model' && index === messages.length -1) && (
                <span className="inline-block w-2 h-4 bg-slate-300 ml-1 animate-cursor-blink" />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
       <div className="flex flex-wrap gap-2 mb-4">
          {suggestionPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSuggestionClick(prompt)}
              disabled={isBusy}
              className="px-3 py-1 bg-slate-700/80 text-slate-300 text-xs rounded-full hover:bg-slate-600/90 disabled:opacity-50 transition-all duration-200 ease-out border border-transparent hover:border-slate-500 hover:scale-105 hover:-translate-y-px"
            >
              {prompt}
            </button>
          ))}
      </div>
      
      <div className="my-4 p-4 rounded-md bg-slate-900/50 border border-slate-700/50 space-y-3">
        <p className="text-sm font-semibold text-slate-300">Or, analyze qualifications for a job</p>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <label htmlFor="job-upload" className="flex-shrink-0 w-full sm:w-auto cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-slate-600 text-sm font-medium rounded-md text-slate-300 bg-slate-700/80 hover:bg-slate-600 transition-colors">
            <DocumentPlusIcon className="w-5 h-5 mr-2" />
            <span>{selectedFile ? 'Change PDF' : 'Upload PDF'}</span>
          </label>
          <input ref={fileInputRef} id="job-upload" type="file" accept=".pdf" className="hidden" onChange={handleFileChange} disabled={isBusy} />
          <span className="text-xs text-slate-400 truncate flex-grow min-w-0">{selectedFile ? selectedFile.name : 'No file selected.'}</span>
           <button 
            onClick={handleAnalyzeJob} 
            disabled={!selectedFile || isBusy} 
            className="w-full sm:w-auto flex-shrink-0 bg-gradient-to-r from-violet-600 to-blue-500 text-white px-4 py-2 rounded-md hover:from-violet-500 hover:to-blue-500 disabled:opacity-50 disabled:from-gray-600 disabled:to-gray-600 transition-all text-sm font-medium"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Fit'}
          </button>
        </div>
      </div>

      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="e.g., What are his main programming languages?"
          className="flex-grow bg-slate-800 border border-slate-700 rounded-l-md p-2 focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-100 placeholder-slate-400"
          disabled={isBusy}
        />
        <button
          onClick={handleSend}
          disabled={isBusy || !input.trim()}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-4 py-2 rounded-r-md hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 disabled:from-gray-600 disabled:to-gray-600 transition-all"
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;