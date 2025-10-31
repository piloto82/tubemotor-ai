import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { LANGUAGE_OPTIONS, VIRAL_TITLES_GENERATION_TYPE_OPTIONS } from '../../utils/constants';
import { generateViralTitles } from '../../services/geminiService';
import type { ViralTitlesState } from '../../types';

interface ViralTitlesProps {
  data: ViralTitlesState;
  updateData: (updater: Partial<ViralTitlesState> | ((prevState: ViralTitlesState) => ViralTitlesState)) => void;
}

const ViralTitles: React.FC<ViralTitlesProps> = ({ data, updateData }) => {
    const { formData, isLoading, result } = data;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        updateData({ formData: { ...formData, [name]: value } });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        updateData({ isLoading: true, result: '' });
        const response = await generateViralTitles(formData);
        updateData({ result: response, isLoading: false });
    };

    return (
        <>
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Títulos Virais</h1>
                    <p className="text-gray-500 mt-1">Crie títulos e estruturas magnéticas para multiplicar suas visualizações.</p>
                </header>

                <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md space-y-6">
                    <Input
                        label="Tema Central"
                        name="topic"
                        id="topic"
                        placeholder="ex: como investir em ações"
                        value={formData.topic}
                        onChange={handleInputChange}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Select
                            label="Tipo de Geração"
                            name="generationType"
                            id="generationType"
                            options={VIRAL_TITLES_GENERATION_TYPE_OPTIONS}
                            value={formData.generationType}
                            onChange={handleInputChange}
                        />
                        <Select
                            label="Idioma"
                            name="language"
                            id="language"
                            options={LANGUAGE_OPTIONS}
                            value={formData.language}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="pt-2">
                        <Button type="submit" isLoading={isLoading}>Gerar Conteúdo</Button>
                    </div>
                </form>
                
                {result && (
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Resultado Gerado</h2>
                        <div className="prose max-w-none whitespace-pre-wrap text-gray-700">{result}</div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ViralTitles;