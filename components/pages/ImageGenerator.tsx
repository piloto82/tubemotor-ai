import React, { useEffect } from 'react';
import Textarea from '../ui/Textarea';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { generateImages } from '../../services/geminiService';
import type { ImageGeneratorState } from '../../types';
import { IMAGE_GENERATOR_ASPECT_RATIO_OPTIONS, IMAGE_GENERATOR_STYLE_OPTIONS, IMAGE_GENERATOR_MODEL_OPTIONS } from '../../utils/constants';

interface ImageGeneratorProps {
  data: ImageGeneratorState;
  updateData: (updater: Partial<ImageGeneratorState> | ((prevState: ImageGeneratorState) => ImageGeneratorState)) => void;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ data, updateData }) => {
    const { formData, batchFileName, referenceImageName, isLoading, result } = data;

    const isAspectRatioDisabled = false; // Never disabled now

    useEffect(() => {
        let newNumImages = formData.numImages;
        if (formData.aiModel === 'nanobanana') {
            newNumImages = 1;
        }
        
        let newReferenceImage = formData.referenceImage;
        let newReferenceImageName = referenceImageName;
        if (formData.aiModel !== 'nanobanana' && formData.referenceImage) {
            newReferenceImage = undefined;
            newReferenceImageName = null;
        }

        updateData({
          formData: { ...formData, numImages: newNumImages, referenceImage: newReferenceImage },
          referenceImageName: newReferenceImageName
        });

    }, [formData.aiModel]);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const finalValue = type === 'number' ? Number(value) : value;
        updateData({ formData: { ...formData, [name]: finalValue } });
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            updateData({ batchFileName: file.name, formData: { ...formData, batchFile: file } });
        } else {
            const { batchFile, ...rest } = formData;
            updateData({ batchFileName: null, formData: rest });
        }
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

    const cropImage = (imageBase64: string, aspectRatio: string): Promise<string> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = `data:image/png;base64,${imageBase64}`;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return resolve(imageBase64);

                let targetWidth, targetHeight;
                const [widthRatio, heightRatio] = aspectRatio.split(':').map(Number);
                
                if (img.width / img.height > widthRatio / heightRatio) {
                    targetHeight = img.height;
                    targetWidth = targetHeight * (widthRatio / heightRatio);
                } else {
                    targetWidth = img.width;
                    targetHeight = targetWidth * (heightRatio / widthRatio);
                }
                
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                
                const sx = (img.width - targetWidth) / 2;
                const sy = (img.height - targetHeight) / 2;

                ctx.drawImage(img, sx, sy, targetWidth, targetHeight, 0, 0, targetWidth, targetHeight);
                
                resolve(canvas.toDataURL('image/png').split(',')[1]);
            };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.prompt && !formData.batchFile) {
            return;
        }
        updateData({ isLoading: true, result: [] });

        let generatedImages: string[] = [];

        if (formData.batchFile) {
            try {
                const text = await formData.batchFile.text();
                const prompts = text.split('\n').filter((p: string) => p.trim() !== '');
                const imagePromises = prompts.map((p: string) => generateImages({ 
                    ...formData, 
                    prompt: p, 
                    numImages: 1 
                }));
                const imageArrays = await Promise.all(imagePromises);
                generatedImages = imageArrays.flat();
            } catch (error) {
                console.error("Error processing batch file:", error);
            }
        } else {
            generatedImages = await generateImages(formData);
        }

        let finalImages = generatedImages;
        if (formData.aiModel === 'nanobanana' && formData.aspectRatio !== '1:1') {
            finalImages = await Promise.all(
                generatedImages.map(imgBase64 => cropImage(imgBase64, formData.aspectRatio))
            );
        }
        
        updateData({ result: finalImages, isLoading: false });
    };

    return (
        <>
            <div className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Gerador de Imagens</h1>
                    <p className="text-gray-500 mt-1">Crie imagens incríveis usando o poder do ImageFX, controlando cada detalhe.</p>
                </header>

                <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-md space-y-6">
                    <Textarea
                        label="Prompt Principal"
                        name="prompt"
                        id="prompt"
                        placeholder="Descreva a imagem que você quer gerar..."
                        value={formData.prompt}
                        onChange={handleInputChange}
                        rows={4}
                    />
                    
                     <Select 
                        label="Modelo de IA" 
                        name="aiModel" 
                        id="aiModel" 
                        options={IMAGE_GENERATOR_MODEL_OPTIONS} 
                        value={formData.aiModel} 
                        onChange={handleInputChange} 
                     />
                     
                     {formData.aiModel === 'nanobanana' && (
                        <div>
                           <label className="block text-sm font-medium text-gray-700 mb-1">Anexar Imagem de Referência (Opcional)</label>
                           <label htmlFor="referenceImage" className="w-full cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center h-[42px]">
                               <span className="truncate">{referenceImageName ?? 'Escolher imagem de referência'}</span>
                               <input id="referenceImage" name="referenceImage" type="file" className="sr-only" onChange={handleReferenceImageChange} accept="image/jpeg,image/png" />
                           </label>
                           <p className="mt-1 text-xs text-gray-500">Use o prompt para descrever as alterações na imagem.</p>
                       </div>
                     )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ou carregar prompts em lote (.txt)</label>
                        <label htmlFor="batchFile" className="w-full cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center h-[42px]">
                            <span className="truncate">{batchFileName ?? 'Escolher ficheiro'}</span>
                            <input id="batchFile" name="batchFile" type="file" className="sr-only" onChange={handleFileChange} accept=".txt" />
                        </label>
                        <p className="mt-1 text-xs text-gray-500">Cada linha do arquivo TXT será um prompt diferente.</p>
                    </div>

                    <Input
                        label="Opções Avançadas"
                        name="negativePrompt"
                        id="negativePrompt"
                        placeholder="Elementos que você NÃO quer na imagem (ex: texto, desfocado, feio)..."
                        value={formData.negativePrompt}
                        onChange={handleInputChange}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <Select 
                            label="Proporção" 
                            name="aspectRatio" 
                            id="aspectRatio" 
                            options={IMAGE_GENERATOR_ASPECT_RATIO_OPTIONS} 
                            value={formData.aspectRatio} 
                            onChange={handleInputChange}
                            disabled={isAspectRatioDisabled}
                         />
                         <Select 
                            label="Estilo do Prompt" 
                            name="style" 
                            id="style" 
                            options={IMAGE_GENERATOR_STYLE_OPTIONS} 
                            value={formData.style} 
                            onChange={handleInputChange} 
                         />
                         <Input 
                            label="Nº de Imagens" 
                            name="numImages" 
                            id="numImages" 
                            type="number" 
                            min="1" 
                            max="4" 
                            value={formData.numImages} 
                            onChange={handleInputChange}
                            disabled={formData.aiModel === 'nanobanana'} 
                         />
                    </div>
                    
                    <div className="pt-2">
                        <Button type="submit" isLoading={isLoading}>Gerar Imagem(ns)</Button>
                    </div>
                </form>
                
                {result.length > 0 && (
                    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Resultado</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {result.map((base64Image, index) => (
                                <img 
                                    key={index}
                                    src={`data:image/png;base64,${base64Image}`}
                                    alt={`Generated image ${index + 1}`}
                                    className="rounded-lg shadow-md"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ImageGenerator;