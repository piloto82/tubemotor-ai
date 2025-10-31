
import React, { useEffect } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { generateVideo } from '../../services/geminiService';
import type { VideoGeneratorState } from '../../types';

interface VideoGeneratorProps {
  data: VideoGeneratorState;
  updateData: (updater: Partial<VideoGeneratorState> | ((prevState: VideoGeneratorState) => VideoGeneratorState)) => void;
}

const VideoGenerator: React.FC<VideoGeneratorProps> = ({ data, updateData }) => {
    const { formData, referenceImageName, isLoading, loadingMessage, result, error, apiKeySelected } = data;

    const checkApiKey = async () => {
        if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
            const hasKey = await window.aistudio.hasSelectedApiKey();
            updateData({ apiKeySelected: hasKey });
        } else {
            // This is a fallback for environments where aistudio might not be injected.
            // In a real scenario, this might show a permanent error.
            updateData({
              apiKeySelected: true, // Assume true to allow UI to render for local dev
            });
            console.warn("window.aistudio not found. Video generation may fail without API key selection.");
        }
    };
    
    useEffect(() => {
        if (apiKeySelected === null) {
            checkApiKey();
        }
    }, [apiKeySelected]);

    const handleSelectKey = async () => {
        if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
            await window.aistudio.openSelectKey();
            updateData({ apiKeySelected: true, error: '' });
        } else {
            alert("A funcionalidade de seleção de chave não está disponível neste ambiente.");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        updateData({ formData: { ...formData, [name]: value } });
    };

    const handleReferenceImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateData({ referenceImageName: file.name });
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = (reader.result as string).split(',')[1];
                updateData({
                  formData: {
                    ...formData,
                    referenceImage: {
                        mimeType: file.type,
                        data: base64String,
                    },
                  }
                });
            };
            reader.readAsDataURL(file);
        } else {
            const { referenceImage, ...rest } = formData;
            updateData({ referenceImageName: null, formData: rest });
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        updateData({ isLoading: true, result: '', error: '' });
        
        const messages = [
            "Aquecendo os motores de renderização...",
            "Compondo os pixels para a sua cena...",
            "A IA está trabalhando na sua obra-prima...",
            "Quase lá, adicionando os toques finais...",
            "Sua criação está quase pronta para a estreia!",
        ];

        let messageIndex = 0;
        updateData({ loadingMessage: messages[messageIndex] });
        const interval = setInterval(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            updateData({ loadingMessage: messages[messageIndex] });
        }, 8000);

        const response = await generateVideo(formData);

        clearInterval(interval);
        
        if (response.startsWith('blob:')) {
            updateData({ result: response });
        } else {
             if (response.startsWith('API_KEY_ERROR:')) {
                updateData({ 
                    error: response.replace('API_KEY_ERROR:', ''),
                    apiKeySelected: false 
                });
             } else {
                updateData({ error: response });
             }
        }
        updateData({ isLoading: false });
    };

    if (apiKeySelected === null) {
        return <div className="p-8 text-center">Verificando configuração...</div>;
    }
    
    if (!apiKeySelected) {
        return (
            <div className="max-w-4xl mx-auto p-8 text-center">
                 <h1 className="text-3xl font-bold text-gray-800 mb-4">Gerador de Vídeos</h1>
                 <div className="p-8 bg-white rounded-lg shadow-md space-y-4">
                    <p className="text-gray-600">Para usar o Gerador de Vídeos, você precisa selecionar uma chave de API do Google AI Studio. Isso é necessário para cobrir os custos de computação da geração de vídeo.</p>
                     <p className="text-sm text-gray-500">Para mais informações sobre cobranças, visite a <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">documentação de cobrança</a>.</p>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    <Button onClick={handleSelectKey}>Selecionar Chave de API</Button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Gerador de Vídeos</h1>
                    <p className="text-gray-500 mt-1">Transforme suas ideias em vídeos curtos com o poder da IA.</p>
                </header>

                <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md space-y-6">
                    <Input
                        label="Prompt"
                        name="prompt"
                        id="prompt"
                        placeholder="ex: Um astronauta surfando em uma onda cósmica"
                        value={formData.prompt}
                        onChange={handleInputChange}
                        required
                    />
                    
                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">Anexar Imagem de Referência (Opcional)</label>
                       <label htmlFor="referenceImage" className="w-full cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center h-[42px]">
                           <span className="truncate">{referenceImageName ?? 'Escolher imagem de referência'}</span>
                           <input id="referenceImage" name="referenceImage" type="file" className="sr-only" onChange={handleReferenceImageChange} accept="image/jpeg,image/png" />
                       </label>
                   </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select
                            label="Resolução"
                            name="resolution"
                            id="resolution"
                            options={[{value: '720p', label: '720p'}, {value: '1080p', label: '1080p'}]}
                            value={formData.resolution}
                            onChange={handleInputChange}
                        />
                         <Select
                            label="Proporção"
                            name="aspectRatio"
                            id="aspectRatio"
                            options={[{value: '16:9', label: 'Paisagem (16:9)'}, {value: '9:16', label: 'Retrato (9:16)'}]}
                            value={formData.aspectRatio}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="pt-2">
                        <Button type="submit" isLoading={isLoading}>{isLoading ? loadingMessage : 'Gerar Vídeo'}</Button>
                    </div>
                </form>
                
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

                {result && (
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Vídeo Gerado</h2>
                        <video src={result} controls autoPlay className="w-full rounded-lg shadow-md"></video>
                    </div>
                )}
            </div>
        </>
    );
};

export default VideoGenerator;