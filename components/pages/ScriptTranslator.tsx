import React from 'react';
import Textarea from '../ui/Textarea';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';
import { translateScript } from '../../services/geminiService';
import type { ScriptTranslatorState } from '../../types';

const languages = [
    { id: 'pt', label: 'Português' },
    { id: 'en', label: 'Inglês' },
    { id: 'es', label: 'Espanhol' },
    { id: 'fr', label: 'Francês' },
    { id: 'de', label: 'Alemão' },
    { id: 'it', label: 'Italiano' },
    { id: 'jp', label: 'Japonês' },
    { id: 'ko', label: 'Coreano' },
];

interface ScriptTranslatorProps {
  data: ScriptTranslatorState;
  updateData: (updater: Partial<ScriptTranslatorState> | ((prevState: ScriptTranslatorState) => ScriptTranslatorState)) => void;
}

const ScriptTranslator: React.FC<ScriptTranslatorProps> = ({ data, updateData }) => {
    const { formData, isLoading, result } = data;

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateData({ formData: { ...formData, script: e.target.value } });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        updateData({
            formData: {
                ...formData,
                languages: { ...formData.languages, [name]: checked }
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        updateData({ isLoading: true, result: '' });
        const response = await translateScript(formData);
        updateData({ result: response, isLoading: false });
    };

    return (
        <>
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Tradutor de Roteiros</h1>
                    <p className="text-gray-500 mt-1">Traduza seu roteiro para múltiplos idiomas com um clique.</p>
                </header>

                <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md space-y-6">
                    <Textarea
                        label="Roteiro"
                        name="script"
                        id="script"
                        placeholder="Cole o roteiro completo aqui..."
                        value={formData.script}
                        onChange={handleInputChange}
                        required
                        rows={8}
                    />

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Selecione os idiomas para tradução:</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {languages.map(lang => (
                                <Checkbox
                                    key={lang.id}
                                    label={lang.label}
                                    name={lang.id}
                                    id={`lang-${lang.id}`}
                                    checked={formData.languages[lang.id as keyof typeof formData.languages]}
                                    onChange={handleCheckboxChange}
                                />
                            ))}
                        </div>
                    </div>
                    
                    <div className="pt-2">
                        <Button type="submit" isLoading={isLoading}>Traduzir Roteiro</Button>
                    </div>
                </form>
                
                {result && (
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Resultado da Tradução</h2>
                        <div className="prose max-w-none whitespace-pre-wrap text-gray-700">{result}</div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ScriptTranslator;
