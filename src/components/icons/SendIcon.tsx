
import React, { useEffect, useRef } from 'react';
import Textarea from '../ui/Textarea';
import { askMentor } from '../../services/geminiService';
import type { MentorState, Message } from '../../types';
import MentorIcon from '../icons/MentorIcon';
import SendIcon from '../icons/SendIcon';

interface MentorProps {
  data: MentorState;
  updateData: (updater: (prevState: MentorState) => MentorState) => void;
}

const Mentor: React.FC<MentorProps> = ({ data, updateData }) => {
    const { formData, isLoading, history } = data;
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history, isLoading]);
    
    useEffect(() => {
        if (!isLoading) {
            inputRef.current?.focus();
        }
    }, [isLoading, history]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = e.target;
        updateData(prev => ({...prev, formData: { prompt: textarea.value } }));
        // Auto-resize textarea
        textarea.style.height = 'auto';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`; // Max height of 160px
    };
    
    const handleFormSubmit = async (promptText: string) => {
        const trimmedPrompt = promptText.trim();
        if (!trimmedPrompt || isLoading) return;
        
        const newUserMessage: Message = { role: 'user', text: trimmedPrompt };
        const updatedHistoryWithUser = [...history, newUserMessage];

        updateData(prev => ({
            ...prev,
            history: updatedHistoryWithUser,
            isLoading: true,
            formData: { prompt: '' }
        }));
        
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
        }

        const responseText = await askMentor(updatedHistoryWithUser);
        const newModelMessage: Message = { role: 'model', text: responseText };

        updateData(prev => ({
            ...prev,
            history: [...prev.history, newModelMessage],
            isLoading: false
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        handleFormSubmit(formData.prompt);
    };

    return (
        <div className="max-w-4xl mx-auto flex flex-col h-full">
            <header className="mb-4 flex-shrink-0">
                 <h1 className="text-3xl font-bold text-gray-800">Mentor AI</h1>
                 <p className="text-gray-500 mt-1">Converse com seu mentor especialista em canais faceless no YouTube.</p>
            </header>
            
            <div className="flex flex-col flex-1 bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {history.length === 0 && !isLoading ? (
                        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                            <MentorIcon className="w-16 h-16 text-gray-300" />
                            <h2 className="text-xl font-semibold mt-4 text-gray-700">MENTOR SUPREMO DE YOUTUBE</h2>
                            <p className="mt-1">Como posso te ajudar a dominar o YouTube hoje?</p>
                        </div>
                    ) : (
                        history.map((message, index) => (
                           <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {message.role === 'model' && <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"><MentorIcon className="w-5 h-5 text-gray-600" /></div>}
                                <div className={`max-w-xl p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                                    <div className="prose prose-sm max-w-none break-words" dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br />') }} />
                                </div>
                            </div>
                        ))
                    )}
                    {isLoading && (
                        <div className="flex items-start gap-3 justify-start">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0"><MentorIcon className="w-5 h-5 text-gray-600" /></div>
                            <div className="max-w-lg p-3 rounded-lg bg-gray-100 text-gray-800">
                                <div className="flex items-center space-x-2">
                                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
                    <form onSubmit={handleSubmit} className="relative">
                        <Textarea
                            label=""
                            name="prompt"
                            id="prompt"
                            placeholder="Faça uma pergunta ao mentor..."
                            value={formData.prompt}
                            onChange={handleInputChange}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e as any);
                                }
                            }}
                            ref={inputRef}
                            required
                            rows={1}
                            className="resize-none max-h-40 overflow-y-auto pr-12 py-3"
                        />
                        <button type="submit" disabled={isLoading || !formData.prompt.trim()} className="absolute right-3 bottom-2.5 p-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
                            <SendIcon className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Mentor;

