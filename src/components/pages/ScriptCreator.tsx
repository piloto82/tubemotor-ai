
import React from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Checkbox from '../ui/Checkbox';
import Button from '../ui/Button';
import { LANGUAGE_OPTIONS, TONE_OPTIONS, STRUCTURE_FORMULA_OPTIONS } from '../../utils/constants';
import { generateScript, refineScript } from '../../services/geminiService';
import type { Page, ScriptCreatorState, PagesState, TextToSpeechState } from '../../types';

interface ScriptCreatorProps {
  data: ScriptCreatorState;
  updateData: (updater: Partial<ScriptCreatorState> | ((prevState: ScriptCreatorState) => ScriptCreatorState)) => void;
  setActivePage: (page: Page) => void;
  updateOtherPageData: (page: Page, updater: Partial<PagesState[Page]> | ((prevState: PagesState[Page]) => PagesState[Page])) => void;
}

const ScriptCreator: React.FC<ScriptCreatorProps> = ({ data, updateData, setActivePage, updateOtherPageData }) => {
  const { formData, referenceFileName, isLoading, isRefining, result, refinementPrompt } = data;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const finalValue = type === 'number' ? Number(value) : value;
    updateData({ formData: { ...formData, [name]: finalValue } });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateData({ formData: { ...formData, [name]: checked } });
  };
  
  const handleCtaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    updateData({
      formData: {
        ...formData,
        cta: { ...formData.cta, [name]: checked }
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateData({ referenceFileName: file.name });
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        updateData({
          formData: {
            ...formData,
            referenceFile: {
              mimeType: file.type,
              data: base64String,
            },
          }
        });
      };
      reader.readAsDataURL(file);
    } else {
      updateData({ referenceFileName: null });
      const { referenceFile, ...rest } = formData;
      updateData({ formData: rest });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateData({ isLoading: true, result: '' });
    const response = await generateScript(formData);
    updateData({ result: response, isLoading: false });
  };

  const handleRefineSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refinementPrompt.trim()) return;
    updateData({ isRefining: true });
    const response = await refineScript(result, refinementPrompt);
    updateData({ result: response, refinementPrompt: '', isRefining: false });
  };
  
  const handleSendToTTS = () => {
    const cleanText = result.replace(/📊 MATERIAIS COMPLEMENTARES[\s\S]*/, '').trim();
    updateOtherPageData('text-to-speech', (prevState) => {
      const ttsState = prevState as TextToSpeechState;
      return {
        ...ttsState,
        formData: {
          ...ttsState.formData,
          text: cleanText,
        },
      };
    });
    setActivePage('text-to-speech');
  };

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Criador de Roteiro</h1>
          <p className="text-gray-500 mt-1">Gere roteiros envolventes e otimizados para o seu canal.</p>
        </header>

        <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Nicho do Canal" name="niche" id="niche" placeholder="ex: Crimes Reais, Mistérios" value={formData.niche} onChange={handleInputChange} required />
            <Input label="Público-Alvo" name="audience" id="audience" placeholder="ex: Jovens adultos, fãs de suspense" value={formData.audience} onChange={handleInputChange} required />
          </div>
          
          <Input label="Tema do Vídeo" name="theme" id="theme" placeholder="ex: O Mistério do Triângulo das Bermudas" value={formData.theme} onChange={handleInputChange} required />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Termo de Pesquisa (Opcional)" name="searchTerm" id="searchTerm" placeholder="ex: Inteligência artificial, true crime brasil" value={formData.searchTerm ?? ''} onChange={handleInputChange} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Anexar Referências</label>
              <label htmlFor="referenceFile" className="w-full cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center h-[42px]">
                <span className="truncate">{referenceFileName ?? 'Escolher arquivo (imagem ou PDF)'}</span>
                <input id="referenceFile" name="referenceFile" type="file" className="sr-only" onChange={handleFileChange} accept="image/jpeg,image/png,application/pdf" />
              </label>
              <p className="mt-1 text-xs text-gray-500">Apenas para referência de escrita, estilo e conceito.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Input label="Número de Blocos" name="blocks" id="blocks" type="number" placeholder="ex: 5" value={formData.blocks} onChange={handleInputChange} required />
             <Input label="Caracteres por Bloco" name="charsPerBlock" id="charsPerBlock" type="number" placeholder="ex: 500" value={formData.charsPerBlock} onChange={handleInputChange} required />
             <Select label="Idioma" name="language" id="language" options={LANGUAGE_OPTIONS} value={formData.language} onChange={handleInputChange} />
          </div>

          <Select label="Tom Narrativo" name="tone" id="tone" options={TONE_OPTIONS} value={formData.tone} onChange={handleInputChange} />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fórmula de Estrutura</label>
            <p className="text-xs text-gray-500 mb-2">Selecione a fórmula que definirá a estrutura e as técnicas de alta retenção do seu roteiro.</p>
            <Select label="" name="structure" id="structure" options={STRUCTURE_FORMULA_OPTIONS} value={formData.structure} onChange={handleInputChange} />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Posição do CTA (Chamada para Ação)</label>
            <div className="flex items-center space-x-6">
                <Checkbox label="Início" name="start" id="cta-start" checked={formData.cta.start} onChange={handleCtaChange} />
                <Checkbox label="Meio" name="middle" id="cta-middle" checked={formData.cta.middle} onChange={handleCtaChange} />
                <Checkbox label="Final" name="end" id="cta-end" checked={formData.cta.end} onChange={handleCtaChange} />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
              <Checkbox label="Apenas Narração (para Voice Over)" name="narrationOnly" id="narrationOnly" checked={formData.narrationOnly} onChange={handleCheckboxChange} />
              <Checkbox label="Incluir produto de afiliação" name="includeAffiliate" id="includeAffiliate" checked={formData.includeAffiliate} onChange={handleCheckboxChange} />
          </div>
          
          <div className="pt-4">
            <Button type="submit" isLoading={isLoading}>Gerar Roteiro</Button>
          </div>
        </form>
        
        {result && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Roteiro Gerado</h2>
            <div className="prose max-w-none whitespace-pre-wrap text-gray-700 bg-gray-50 p-4 rounded-md">{result}</div>
            
            {!isLoading && (
              <div className="mt-6 pt-6 border-t divide-y divide-gray-200">
                  <div className="py-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Ajuste Fino</h3>
                      <p className="text-sm text-gray-500 mb-4">Não gostou de algo? Dê uma instrução para a IA refinar o texto acima.</p>
                      <form onSubmit={handleRefineSubmit} className="space-y-4">
                          <Textarea
                              label=""
                              id="refinementPrompt"
                              name="refinementPrompt"
                              placeholder="ex: Deixe o final mais surpreendente..."
                              value={refinementPrompt}
                              onChange={(e) => updateData({ refinementPrompt: e.target.value })}
                              rows={4}
                              required
                          />
                          <Button type="submit" isLoading={isRefining} className="w-full sm:w-auto sm:self-end px-6">Refinar Roteiro</Button>
                      </form>
                  </div>
                  <div className="py-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">Próximo Passo</h3>
                      <p className="text-sm text-gray-500 mb-4">Gostou do roteiro? Envie-o para o Gerador de Voz para criar a narração.</p>
                      <Button onClick={handleSendToTTS} type="button" className="w-full sm:w-auto px-6 bg-green-600 hover:bg-green-700 focus:ring-green-500 disabled:bg-green-300">
                          Gerar Áudio com IA
                      </Button>
                  </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ScriptCreator;