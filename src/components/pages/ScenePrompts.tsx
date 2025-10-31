
import React, { useMemo } from 'react';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { generateScenePrompts } from '../../services/geminiService';
import type { ScenePromptsState } from '../../types';

interface ScenePromptsProps {
  data: ScenePromptsState;
  updateData: (updater: Partial<ScenePromptsState> | ((prevState: ScenePromptsState) => ScenePromptsState)) => void;
}

const ScenePrompts: React.FC<ScenePromptsProps> = ({ data, updateData }) => {
    const { formData, isLoading, result } = data;

    const wordCount = useMemo(() => {
        return formData.script.trim().split(/\s+/).filter(Boolean).length;
    }, [formData.script]);

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        updateData({ formData: { ...formData, [name]: value } });
    };

    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        updateData({ formData: { ...formData, [name]: value } });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        updateData({ isLoading: true, result: '' });
        const response = await generateScenePrompts(formData);
        updateData({ result: response, isLoading: false });
    };

    return (
        <>
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Prompts para Cenas</h1>
                    <p className="text-gray-500 mt-1">Gere prompts de imagem para o seu roteiro, de forma automática ou manual.</p>
                </header>

                <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md space-y-6">
                    <Select
                        label="Modo de Entrada"
                        name="entryMode"
                        id="entryMode"
                        options={[{ value: 'script', label: 'Roteiro Completo' }, { value: 'descriptions', label: 'Descrições em Lote' }]}
                        value={formData.entryMode}
                        onChange={handleInputChange}
                    />

                    <div className="relative">
                        <Textarea
                            label=""
                            name="script"
                            id="script"
                            placeholder="Cole o roteiro completo aqui (ou descrições, uma por linha)..."
                            value={formData.script}
                            onChange={handleTextareaChange}
                            required
                            rows={8}
                        />
                        <div className="absolute bottom-3 right-3 text-xs text-gray-400">{wordCount} palavras</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Select
                            label="Modelo IA"
                            name="aiModel"
                            id="aiModel"
                            options={[{ value: 'midjourney', label: 'Midjourney' }, { value: 'leonardo-ai', label: 'Leonardo.AI' }]}
                            value={formData.aiModel}
                            onChange={handleInputChange}
                        />
                        <Select
                            label="Estilo"
                            name="style"
                            id="style"
                            options={[{ value: 'no-style', label: 'Sem Estilo Específico' }, { value: 'cinematic', label: 'Cinemático' }]}
                            value={formData.style}
                            onChange={handleInputChange}
                        />
                        <Select
                            label="Modo Geração"
                            name="generationMode"
                            id="generationMode"
                            options={[{ value: 'auto', label: 'Geração Automática' }, { value: 'manual', label: 'Geração Manual' }]}
                            value={formData.generationMode}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="pt-2">
                        <Button type="submit" isLoading={isLoading}>Gerar Prompts de Cena</Button>
                    </div>
                </form>
                
                {result && (
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Prompts Gerados</h2>
                        <div className="prose max-w-none whitespace-pre-wrap text-gray-700">{result}</div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ScenePrompts;