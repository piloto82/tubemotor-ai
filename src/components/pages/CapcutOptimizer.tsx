
import React, { useMemo } from 'react';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import { optimizeForCapcut } from '../../services/geminiService';
import type { CapcutOptimizerState } from '../../types';

interface CapcutOptimizerProps {
  data: CapcutOptimizerState;
  updateData: (updater: Partial<CapcutOptimizerState> | ((prevState: CapcutOptimizerState) => CapcutOptimizerState)) => void;
}

const CapcutOptimizer: React.FC<CapcutOptimizerProps> = ({ data, updateData }) => {
    const { formData, isLoading, result } = data;

    const stats = useMemo(() => {
        if (!result) return null;

        const scenes = result.split(/\n+/).filter(p => p.trim() !== '').length;
        const chars = result.length;
        const words = result.trim().split(/\s+/).filter(Boolean).length;
        const minutes = words / 150; // Average narration speed
        const totalSeconds = Math.floor(minutes * 60);
        const displayMinutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const displaySeconds = (totalSeconds % 60).toString().padStart(2, '0');
        
        return {
            scenes,
            chars,
            time: `${displayMinutes}:${displaySeconds}`
        };
    }, [result]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateData({ formData: { script: e.target.value } });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        updateData({ isLoading: true, result: '' });
        const response = await optimizeForCapcut(formData);
        updateData({ result: response, isLoading: false });
    };

    return (
        <>
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Otimizador CapCut</h1>
                    <p className="text-gray-500 mt-1">Otimize a segmentação do seu roteiro para a geração de cenas no CapCut.</p>
                </header>

                <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md space-y-6">
                    <Textarea
                        label="Cole seu roteiro original aqui"
                        name="script"
                        id="script"
                        placeholder="Cole o roteiro completo para otimizar..."
                        value={formData.script}
                        onChange={handleInputChange}
                        required
                        rows={15}
                    />
                    
                    <div className="pt-2">
                        <Button type="submit" isLoading={isLoading}>Otimizar Roteiro</Button>
                    </div>
                </form>
                
                {result && (
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                        {stats && (
                             <div className="grid grid-cols-3 gap-4 text-center mb-6">
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <div className="text-2xl font-bold text-gray-800">{stats.scenes}</div>
                                    <div className="text-sm text-gray-500">Cenas Otimizadas</div>
                                </div>
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <div className="text-2xl font-bold text-gray-800">{stats.chars}</div>
                                    <div className="text-sm text-gray-500">Caracteres</div>
                                </div>
                                <div className="p-4 bg-gray-100 rounded-lg">
                                    <div className="text-2xl font-bold text-gray-800">{stats.time}</div>
                                    <div className="text-sm text-gray-500">Tempo Estimado</div>
                                </div>
                            </div>
                        )}
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Roteiro Otimizado</h2>
                        <div className="prose max-w-none whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded-md">
                            {result}
                        </div>
                         <p className="text-sm text-gray-500 mt-4">Copie este roteiro e cole no gerador de vídeo do CapCut.</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default CapcutOptimizer;