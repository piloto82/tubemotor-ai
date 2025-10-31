import React from 'react';
import Textarea from '../ui/Textarea';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { convertToSrt } from '../../services/geminiService';
import type { SrtConverterState } from '../../types';

interface SrtConverterProps {
  data: SrtConverterState;
  updateData: (updater: Partial<SrtConverterState> | ((prevState: SrtConverterState) => SrtConverterState)) => void;
}

const SrtConverter: React.FC<SrtConverterProps> = ({ data, updateData }) => {
    const { formData, isLoading, result } = data;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const finalValue = type === 'number' ? Number(value) : value;
        updateData({ formData: { ...formData, [name]: finalValue } });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        updateData({ isLoading: true, result: '' });
        const response = await convertToSrt(formData);
        updateData({ result: response, isLoading: false });
    };

    return (
        <>
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Conversor de SRT</h1>
                    <p className="text-gray-500 mt-1">Converta texto para o formato de legenda .SRT.</p>
                </header>

                <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md space-y-6 flex flex-col items-center">
                    <Textarea
                        label="Texto"
                        name="text"
                        id="text"
                        placeholder="Cole o texto completo aqui..."
                        value={formData.text}
                        onChange={handleInputChange}
                        required
                        rows={8}
                        className="w-full"
                    />

                    <div className="flex items-center space-x-2">
                        <label htmlFor="charLimit" className="text-sm font-medium text-gray-700 whitespace-nowrap">Limite de Caracteres (Automático:</label>
                        <Input
                            label=""
                            name="charLimit"
                            id="charLimit"
                            type="number"
                            value={formData.charLimit}
                            onChange={handleInputChange}
                            className="w-24"
                        />
                        <span className="text-sm font-medium text-gray-700">)</span>
                    </div>

                    <div className="pt-2 w-full max-w-xs">
                        <Button type="submit" isLoading={isLoading}>Converter para SRT</Button>
                    </div>
                </form>
                
                {result && (
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Resultado SRT</h2>
                        <div className="prose max-w-none whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded-md">{result}</div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SrtConverter;