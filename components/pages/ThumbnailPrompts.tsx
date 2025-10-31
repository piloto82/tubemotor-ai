import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';
import { THUMBNAIL_PROMPTS_AI_OPTIONS } from '../../utils/constants';
import { generateThumbnailPrompts } from '../../services/geminiService';
import type { ThumbnailPromptsState } from '../../types';

interface ThumbnailPromptsProps {
  data: ThumbnailPromptsState;
  updateData: (updater: Partial<ThumbnailPromptsState> | ((prevState: ThumbnailPromptsState) => ThumbnailPromptsState)) => void;
}

const ThumbnailPrompts: React.FC<ThumbnailPromptsProps> = ({ data, updateData }) => {
    const { formData, isLoading, result } = data;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        updateData({ formData: { ...formData, [name]: value } });
    };
    
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        updateData({ formData: { ...formData, [name]: checked } });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        updateData({ isLoading: true, result: '' });
        const response = await generateThumbnailPrompts(formData);
        updateData({ result: response, isLoading: false });
    };

    return (
        <>
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Prompts de Thumbnail</h1>
                    <p className="text-gray-500 mt-1">Gere prompts otimizados para IAs de imagem.</p>
                </header>

                <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md space-y-6">
                    <Input
                        label="Título do Vídeo"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />

                    <Select
                        label="Modelo de IA"
                        name="aiModel"
                        id="aiModel"
                        options={THUMBNAIL_PROMPTS_AI_OPTIONS}
                        value={formData.aiModel}
                        onChange={handleInputChange}
                    />

                    <Checkbox
                        label="Incluir frase na imagem"
                        name="includePhrase"
                        id="includePhrase"
                        checked={formData.includePhrase}
                        onChange={handleCheckboxChange}
                    />
                    
                    <div className="pt-2">
                        <Button type="submit" isLoading={isLoading}>Gerar Prompts</Button>
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

export default ThumbnailPrompts;
