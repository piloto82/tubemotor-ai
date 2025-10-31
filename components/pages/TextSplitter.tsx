import React, { useMemo } from 'react';
import Textarea from '../ui/Textarea';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { splitText } from '../../services/geminiService';
import type { TextSplitterState } from '../../types';

interface TextSplitterProps {
  data: TextSplitterState;
  updateData: (updater: Partial<TextSplitterState> | ((prevState: TextSplitterState) => TextSplitterState)) => void;
}

const TextSplitter: React.FC<TextSplitterProps> = ({ data, updateData }) => {
    const { formData, isLoading, result } = data;

    const stats = useMemo(() => {
        const text = formData.text || '';
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        const chars = text.length;
        // Average reading speed: 150 words per minute
        const minutes = words / 150;
        const totalSeconds = Math.floor(minutes * 60);
        const displayMinutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const displaySeconds = (totalSeconds % 60).toString().padStart(2, '0');
        
        return {
            words,
            chars,
            time: `${displayMinutes}:${displaySeconds}`
        };
    }, [formData.text]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const finalValue = type === 'number' ? Number(value) : value;
        updateData({ formData: { ...formData, [name]: finalValue } });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        updateData({ isLoading: true, result: '' });
        const response = await splitText(formData);
        updateData({ result: response, isLoading: false });
    };

    return (
        <>
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Divisor de Texto</h1>
                    <p className="text-gray-500 mt-1">Analise seu roteiro e divida-o em partes menores para facilitar a narração.</p>
                </header>

                <div className="p-8 bg-white rounded-lg shadow-md space-y-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <div className="text-2xl font-bold text-gray-800">{stats.words}</div>
                            <div className="text-sm text-gray-500">Palavras</div>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <div className="text-2xl font-bold text-gray-800">{stats.chars}</div>
                            <div className="text-sm text-gray-500">Caracteres</div>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <div className="text-2xl font-bold text-gray-800">{stats.time}</div>
                            <div className="text-sm text-gray-500">Tempo de Narração</div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Textarea
                            label="Texto"
                            name="text"
                            id="text"
                            placeholder="Cole o roteiro completo aqui..."
                            value={formData.text}
                            onChange={handleInputChange}
                            required
                            rows={8}
                        />

                        <div className="flex items-center justify-center space-x-4">
                           <span className="text-sm font-medium text-gray-700">Dividir a cada</span>
                           <Input label="" id="splitValue" name="splitValue" type="number" value={formData.splitValue} onChange={handleInputChange} className="w-24"/>
                           <Select label="" id="splitBy" name="splitBy" options={[{value: 'words', label: 'palavras'}, {value: 'chars', label: 'caracteres'}]} value={formData.splitBy} onChange={handleInputChange} />
                           <Button type="submit" isLoading={isLoading} className="w-auto px-6">Dividir</Button>
                        </div>
                    </form>
                </div>
                
                {result && (
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Texto Dividido</h2>
                        <div className="prose max-w-none whitespace-pre-wrap text-gray-700">{result}</div>
                    </div>
                )}
            </div>
        </>
    );
};

export default TextSplitter;
