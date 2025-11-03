






import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";
import type { ScriptCreatorData, ViralTitlesData, ScriptTranslatorData, ScenePromptsData, ThumbnailPromptsData, ImageGeneratorData, SrtConverterData, TextSplitterData, VideoGeneratorData, CapcutOptimizerData, TextToSpeechData } from '../types';

let ai: GoogleGenAI | null = null;

function getAI() {
  if (!ai) {
    // FIX: Use process.env.API_KEY as per guidelines.
    if (!process.env.API_KEY) {
      throw new Error("The API_KEY environment variable has not been set.");
    }
    // FIX: Use process.env.API_KEY as per guidelines.
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
}

const storyNicheValues = new Set([
  'hist-plot-twist',
  'hist-finais-inteligentes',
  'hist-terror-suspense',
  'hist-emocionantes',
  'hist-superacao',
  'hist-animais',
  'hist-idosos',
  'hist-epoca',
  'hist-entrevistas-inspiradoras',
  'hist-testemunhos-transformacao',
  'hist-romance-interracial',
  'hist-relacionamentos-idades-diferentes',
  'hist-romance-milionarios',
  'hist-romance-milionarios-luxo',
  'hows-coracoes-de-wall-street'
]);

const childrenNicheValues = new Set([
  'infantil-animacao-0-3',
  'infantil-musica-0-3',
  'infantil-animacao-4-6',
  'infantil-musica-4-6',
]);

export const generateScript = async (data: ScriptCreatorData): Promise<string> => {
  try {
    const gemini = getAI();
    
    let prompt = '';

    if (data.structure === 'hows-coracoes-de-wall-street') {
      prompt = `
Você é "The Wall Street Romanticist", um agente de IA de elite. Sua identidade e regras estão abaixo. Siga-as estritamente para gerar o roteiro.

**DADOS DE ENTRADA PARA ESTE ROTEIRO:**
- Tema: ${data.theme}
- Público-Alvo: ${data.audience}
- Idioma: ${data.language}
- Número de Blocos: ${data.blocks}
- Caracteres por Bloco (PRIORIDADE MÁXIMA): ${data.charsPerBlock}

---

**🧠 IDENTIDADE DO AGENTE: THE WALL STREET ROMANTICIST**
**Função:** Criador de histórias sofisticadas de amor, poder, ambição e redenção ambientadas no universo financeiro e emocional da elite de Nova York.
**Tom narrativo:** Cinematográfico, elegante, intensamente emocional, sedutor, tenso e urbano.
**Objetivo:** Produzir narrativas que provoquem empatia, seduzam e instiguem o ouvinte. As histórias devem ser densas e visualmente imersivas, onde o amor é a força transformadora em um mundo de cifras, status e segredos.

**💎 DESCRIÇÃO DE PERSONALIDADE:**
Este agente escreve como um roteirista de elite. É uma fusão emocional de:
- Nicholas Sparks (sensibilidade romântica e criação de empatia),
- Shonda Rhimes (intensidade, ritmo e tensão dramática),
- Aaron Sorkin (diálogos internos afiados, tensão e cinismo sofisticado).
Sabe explorar com maestria:
- O contraste entre riqueza e vulnerabilidade
- A tensão entre carreira e emoção
- O magnetismo inevitável entre poder e paixão
- A sedução sutil e a intriga romântica.
O agente também prioriza representatividade, inclusão e diversidade de perfis, sem recorrer a estereótipos ou clichês.

**🌆 UNIVERSO “Hearts of Wall Street”**
- **Cenário:** Nova York como palco dourado e sombrio — onde ambição, finanças e sentimentos colidem.
- **Ambientes Icônicos:** Escritórios envidraçados com vista para o Hudson, coberturas e jantares privados em Manhattan, corredores silenciosos da Bolsa de Valores, cafés discretos em SoHo, lobbies de hotéis como The Plaza, Bryant Park à noite, limusines, trens noturnos, pontes sob a chuva.
- **Objetos Simbólicos:** Relógios caros, pastas de couro, laptops com gráficos, bilhetes rasgados, taças de vinho, contratos, anéis esquecidos, cartas não enviadas, guarda-chuvas sob a chuva.

**💬 ESTILO & LINGUAGEM (REGRAS CRÍTICAS)**
1.  **SEM DIÁLOGO DIRETO (REGRA INEGOCIÁVEL):** A história é para um único narrador (voice-over). Portanto, **É PROIBIDO usar diálogo direto com aspas ou travessões**. Todas as falas de outros personagens devem ser integradas à narrativa de forma indireta.
    - **EXEMPLO CORRETO:** "Ele se aproximou e perguntou, com a voz baixa, se eu acreditava em segundas chances."
    - **EXEMPLO INCORRETO:** "Ele se aproximou e disse: - Você acredita em segundas chances?"
2.  **Narrador:** A história pode ser em primeira ou terceira pessoa, mas sempre focada nas percepções, pensamentos e sentimentos do protagonista para gerar máxima empatia.
3.  **Nomes Americanos:** INDEPENDENTE DO IDIOMA de saída, os nomes dos personagens DEVEM ser americanos, adequados ao contexto de Wall Street (ex: Ethan, Chloe, Julian, Olivia).
4.  **Estilo:** Poético, sensorial, sofisticado e sedutor.
5.  **Ritmo:** Alterna intensidade dramática com pausas íntimas e silenciosas.
6.  **Metáforas Financeiras:** Utilize como linguagem emocional. Ex: "Her heart was the most volatile stock he ever invested in.", "Love was the only currency that never lost value."


**❤️ CRITÉRIOS DE PERFORMANCE (REGRAS DE OURO):**
1.  **Limite de Caracteres:** O texto da história de cada bloco DEVE ter **APROXIMADAMENTE ${data.charsPerBlock} caracteres**. É a regra mais importante.
2.  **Hook Emocional:** A história deve cativar nos primeiros 10 segundos.
3.  **Retenção:** Mantenha com progressão emocional ou reviravoltas sutis.
4.  **Personagens:** Crie personagens humanos, falhos e autênticos.
5.  **Conclusão:** Termine com uma lição emocional sutil, jamais óbvia.

**🚫 O QUE EVITAR**
- **DIÁLOGO DIRETO.**
- Finais clichês ou previsíveis.
- Moralismos explícitos.
- Estereótipos de gênero, classe ou etnia.
- Linguagem genérica ou adornos vazios.

---

**📝 ESTRUTURA DE SAÍDA E FORMATAÇÃO (REGRAS CRÍTICAS E OBRIGATÓRIAS):**
1.  **Divisão de Blocos:** Divida o roteiro em **EXATAMENTE ${data.blocks} blocos**.
2.  **Ficha de Personagem (OBRIGATÓRIO):** AO FINAL DE CADA BLOCO, inclua uma ficha técnica completa para cada personagem que aparece no bloco. **Esta ficha NÃO CONTA para o limite de caracteres do bloco de história.** A não inclusão desta ficha será considerada uma falha.
3.  **REGRAS PARA A FICHA DE PERSONAGEM:**
    - **DESCRIÇÃO DE ROUPAS:** Seja EXTREMAMENTE específico. Descreva CADA PEÇA (camisa, calça, sapatos, acessórios) e sua COR e MATERIAL. Ex: "um terno de lã cinza-carvão, camisa de algodão branca, sapatos de couro pretos".
    - **CONSISTÊNCIA:** Se um personagem aparece em blocos consecutivos no mesmo cenário e período de tempo, suas características (especialmente roupas) DEVEM permanecer as mesmas. A descrição só deve mudar se houver uma passagem de tempo ou mudança de local que justifique.
    - **SEM REFERÊNCIAS VAGAS:** Cada descrição deve ser completa e autocontida para aquele bloco, mesmo que seja repetida do bloco anterior para manter a consistência. Não use "mesmas roupas de antes".
    - **FORMATAÇÃO:** Use APENAS negrito para os títulos da ficha. SEM asteriscos ou bullet points.

**[EXEMPLO DE FORMATAÇÃO DE BLOCO]**
[BLOCO 1]
... (texto da história com aproximadamente ${data.charsPerBlock} caracteres, sem diálogo direto) ...

📍 PERSONAGENS DO BLOCO 1:
**Nome do Personagem:** [Nome Americano]
**Idade:** [Aproximada]
**Altura:** [Aproximada]
**Corpo:** [Descrição detalhada]
**Cabelos:** [Cor e estilo]
**Olhos:** [Cor]
**Roupas:** [Descrição específica de cada peça, cor e material]
**Postura/Maneirismos:** [Descrição]
[FIM DO BLOCO 1]
---

**🏁 INSTRUÇÃO FINAL:**
Gere o roteiro completo seguindo TODAS as regras estritamente, especialmente a formatação de saída com a ficha de personagens ao final de cada bloco. Após o ÚLTIMO bloco, adicione a seção "📊 MATERIAIS COMPLEMENTARES" com 3 títulos, 3 ideias de thumbnail, 10 tags SEO e descrições, tudo otimizado para o universo "Hearts of Wall Street".
`;
    } else if (storyNicheValues.has(data.structure)) {
      // PROMPT MESTRE PARA O NICHO DE HISTÓRIAS
      prompt = `
**PROMPT MESTRE DE CRIAÇÃO DE ROTEIRO (NICHO: HISTÓRIAS & EMOÇÃO) - TUBEMOTOR AI**

**OBJETIVO:** Gerar um roteiro de alta retenção para o YouTube, seguindo REGRAS FUNDAMENTAIS de forma estrita. A prioridade máxima e inegociável é respeitar o limite de caracteres por bloco. A geração será considerada uma falha se o limite for ignorado.

**DADOS DE ENTRADA:**
- Nicho: ${data.niche}
- Público-Alvo: ${data.audience}
- Tema: ${data.theme}
- Tom Narrativo: ${data.tone}
- Idioma: ${data.language}
- Fórmula de Estrutura (Conceito): ${data.structure}
- Número de Blocos: ${data.blocks}
- Caracteres por Bloco (PRIORIDADE MÁXIMA): ${data.charsPerBlock}

---

**🎯 REGRAS FUNDAMENTAIS (OBRIGATÓRIO SEGUIR):**

**1. LIMITE DE CARACTERES (REGRA Nº 1):**
- O texto da história de cada bloco DEVE ter **APROXIMADAMENTE ${data.charsPerBlock} caracteres**. É a regra mais importante. NÃO exceda significativamente este limite.

**2. FORMATO DO TEXTO:**
- **PRIMEIRA PESSOA:** Narrativa em primeira pessoa, contínua, como se a protagonista estivesse contando a história.
- **SEM MARCAÇÕES TÉCNICAS:** Texto limpo, pronto para narração, sem "(pausa)", "CENA 1", etc.
- **FOCO EM PERCEPÇÕES:** Focar nos pensamentos, percepções e sensações da protagonista.

**3. DIÁLOGOS EM PRIMEIRA PESSOA (REGRA CRÍTICA):**
- **NUNCA USE DIÁLOGO DIRETO:** Falas de outros DEVEM ser integradas à narrativa.
- **EXEMPLO CORRETO:** "Quando ele me perguntou se eu estava bem, o tom dele era carregado de uma preocupação que me desarmou."

**4. LOCALIZAÇÃO E CULTURA (OBRIGATÓRIO PARA ESTE NICHO):**
- **CENÁRIO AMERICANO:** A história DEVE se passar nos Estados Unidos.
- **NOMES:** Use nomes comuns americanos (Emily, Michael, Sarah).
- **LUGARES:** Cidades ou estados dos EUA (Beverly Hills, New York).
- **MOEDA:** DÓLARES ($).

**5. TÉCNICAS NARRATIVAS:**
- **RETENÇÃO:** A cada 25-30 linhas, introduza um gancho (micro-revelação, detalhe sensorial, etc.).
- **DESCRIções SENSORIAIS:** Enriqueça com detalhes do que a protagonista vê, sente, ouve e cheira.

**6. ESTRUTURA DE SAÍDA:**
- Divida o roteiro em EXATAMENTE ${data.blocks} blocos.
- **AO FINAL DE CADA BLOCO**, inclua uma ficha técnica dos personagens. **Esta ficha NÃO CONTA para o limite de caracteres do bloco.**
- **REGRAS PARA A FICHA DE PERSONAGEM:**
    - **DESCRIÇÃO DE ROUPAS (REGRA CRÍTICA):** Seja EXTREMAMENTE específico. Descreva CADA PEÇA (camisa, calça, etc.) e sua COR. Ex: "uma camisa de flanela xadrez vermelha e preta, jeans azul escuro".
    - **SEM REFERÊNCIAS VAGAS:** Cada descrição deve ser completa, sem referenciar blocos anteriores.
    - **FORMATAÇÃO (REGRA CRÍTICA):** Use APENAS negrito para os títulos. SEM asteriscos ou bullet points.

[EXEMPLO DE FORMATAÇÃO DE BLOCO]
[BLOCO 1]
... (texto da história em primeira pessoa com aproximadamente ${data.charsPerBlock} caracteres) ...

📍 PERSONAGENS DO BLOCO 1:
**Nome do Personagem:** [Nome]
**Idade:** [Aproximada]
**Altura:** [Aproximada]
**Corpo:** [Descrição detalhada]
**Cabelos:** [Cor e estilo]
**Olhos:** [Cor]
**Roupas:** [Descrição específica de cada peça e cor]
**Postura/Maneirismos:** [Descrição]
[FIM DO BLOCO 1]

---

**INSTRUÇÃO FINAL:**
Gere o roteiro completo. Após o ÚLTIMO bloco, adicione a seção "📊 MATERIAIS COMPLEMENTARES".

`;
    } else if (childrenNicheValues.has(data.structure)) {
      // PROMPT MESTRE PARA O NICHO INFANTIL
      prompt = `
**PROMPT MESTRE DE CRIAÇÃO DE ROTEIRO (NICHO: INFANTIL) - TUBEMOTOR AI**

**OBJETIVO:** Gerar um roteiro para vídeo infantil (animação ou música) inspirado nos princípios de sucesso de canais como Cocomelon, Little Baby Bum, e Super Simple Songs. O foco é máximo engajamento e retenção para o público de 0 a 6 anos.

**DADOS DE ENTRADA:**
- Tema do Vídeo: ${data.theme}
- Fórmula de Estrutura: ${data.structure}
- Público-Alvo: ${data.audience}
- Idioma: ${data.language}
- Número de Blocos: ${data.blocks}
- Caracteres por Bloco: ${data.charsPerBlock}

---

**🎯 HACKS DE RETENÇÃO INFANTIL (OBRIGATÓRIO SEGUIR):**

**1. REPETIÇÃO EXTREMA (REGRA Nº 1):**
- **REFRÃOS E PALAVRAS-CHAVE:** Crie um refrão simples ou uma frase-chave e repita-o várias vezes ao longo do roteiro. A previsibilidade gera conforto e aprendizado.
- **ESTRUTURA REPETITIVA:** Use padrões. Se o vídeo é sobre 5 patinhos, cada estrofe deve seguir uma estrutura muito similar.

**2. LINGUAGEM E RITMO:**
- **VOCABULÁRIO SIMPLES:** Use palavras extremamente simples e adequadas à faixa etária.
- **FRASES CURTAS E RÍTMICAS:** O texto deve ter uma cadência quase musical, mesmo que não seja uma canção. Fácil de cantar junto ou memorizar.

**3. FOCO EDUCACIONAL CLARO:**
- Todo roteiro deve ter um objetivo de aprendizado explícito (aprender cores, números, nomes de animais, rotinas como escovar os dentes, etc.).

**4. AÇÕES E SONS (MUITO IMPORTANTE):**
- **VERBOS DE AÇÃO:** Use muitos verbos que incentivem o movimento ("pular", "dançar", "bater palmas").
- **ONOMATOPEIAS:** Seja rico em sons ("vrum vrum", "miau", "pocotó"). Isso é fundamental para prender a atenção.

**5. ESTRUTURA DE SAÍDA (COM DIRETRIZES DE ANIMAÇÃO):**
- Divida o roteiro em ${data.blocks} blocos de aproximadamente ${data.charsPerBlock} caracteres.
- **INCLUA DIRETRIZES VISUAIS:** Entre colchetes [], adicione sugestões simples de animação ou efeitos sonoros. Isso é crucial para guiar a produção.

**EXEMPLO DE FORMATAÇÃO:**

[BLOCO 1]
O sol amarelo diz "bom dia"! [Animação: Sol sorridente aparece no céu]
Bom dia, bom dia, que lindo dia! (Repetir 2x)
Vamos todos juntos pular e brincar! [Animação: Personagens pulando de alegria]
Pula, pula, sem parar! Hop, hop, hop!

---

**INSTRUÇÃO FINAL:**
Gere o roteiro seguindo TODAS as regras. O resultado deve ser um texto pronto para narração ou para se tornar a letra de uma canção, já com as diretrizes visuais e sonoras.
`;
    } else {
        // PROMPT GERAL PARA OS DEMAIS NICHOS
        prompt = `
**PROMPT MESTRE DE CRIAÇÃO DE ROTEIRO (NICHOS GERAIS) - TUBEMOTOR AI**

**OBJETIVO:** Gerar um roteiro de alta qualidade e retenção para o YouTube, agindo como um especialista no nicho e estrutura selecionados.

**DADOS DE ENTRADA:**
- Nicho do Canal: ${data.niche}
- Público-Alvo: ${data.audience}
- Tema do Vídeo: ${data.theme}
- Tom Narrativo: ${data.tone}
- Idioma: ${data.language}
- Fórmula de Estrutura (Conceito): ${data.structure}
- Número de Blocos: ${data.blocks}
- Caracteres por Bloco: ${data.charsPerBlock}

---

**🎯 REGRAS FUNDAMENTAIS (OBRIGATÓRIO SEGUIR):**

**1. ESPECIALISTA NO NICHO (REGRA Nº 1):**
- Aja como um especialista absoluto no nicho e na "Fórmula de Estrutura" selecionada. O conteúdo deve ser preciso, aprofundado e relevante.
- **CONTEXTO É REI:** Adapte o contexto (época, local, personalidades, jargões) ao TEMA. **Exemplo: Se o tema é sobre Sigmund Freud, o roteiro DEVE se passar na Viena do século XIX/XX, com referências e linguagem da época. Se o tema é sobre Bitcoin, deve usar o contexto e jargões do mercado de criptoativos atual.**

**2. ESTRUTURA E RETENÇÃO:**
- O roteiro deve ser dividido em EXATAMENTE ${data.blocks} blocos.
- Cada bloco deve ter **APROXIMADAMENTE ${data.charsPerBlock} caracteres**.
- O texto deve ser otimizado para narração (voice-over), sendo claro, direto e envolvente.
- Utilize técnicas de storytelling para manter o espectador engajado (perguntas, curiosidade, etc.).

**3. FORMATO DO TEXTO:**
- O texto deve ser limpo, sem marcações técnicas como "(pausa)" ou "CENA 1".
- A saída deve ser um texto corrido, pronto para ser lido.

**4. ESTRUTURA DE SAÍDA:**
- Apresente cada bloco de forma clara, por exemplo: "[BLOCO 1]", seguido do texto, depois "[BLOCO 2]", e assim por diante.

---

**INSTRUÇÃO FINAL:**
Gere o roteiro completo seguindo TODAS as regras acima. Após o ÚLTIMO bloco do roteiro, adicione a seção "📊 MATERIAIS COMPLEMENTARES" com títulos, ideias de thumbnail, tags e descrições, todos otimizados para o tema e nicho específicos do roteiro que você criou.

**ESTRUTURA COMPLETA DA RESPOSTA:**

[BLOCO 1]
...texto do bloco 1...

[BLOCO 2]
...texto do bloco 2...

... (continuar para todos os ${data.blocks} blocos) ...

📊 MATERIAIS COMPLEMENTARES
**3 Títulos SEO (Máximo 60 caracteres):**
1. 
2. 
3. 

**3 Ideias de Thumbnail:**
1.  **Visual principal:** 
    **Texto em destaque (2-3 palavras):** 
    **Cores dominantes:** 
    **Elementos adicionais:** 
2.  (Repetir estrutura)
3.  (Repetir estrutura)

**10 Tags SEO (separadas por |):**
Tag 1 | Tag 2 | ...

**Descrição Curta (150 caracteres):**


**Descrição Longa (350 caracteres):**

`;
    }

    const request: { model: string, contents: any, config?: any } = {
        model: 'gemini-2.5-flash',
        contents: [],
    };
    
    const parts: ({ text: string } | { inlineData: { mimeType: string; data: string; } })[] = [{ text: prompt }];

    if (data.referenceFile) {
        parts.unshift({text: `Um arquivo foi anexado como referência. Use-o APENAS para inspiração de estilo de escrita, tom e conceito. NÃO copie nomes de personagens, histórias ou qualquer conteúdo direto do arquivo.`})
        parts.push({
            inlineData: {
                mimeType: data.referenceFile.mimeType,
                data: data.referenceFile.data,
            },
        });
        request.contents = { parts };
    } else {
        request.contents = prompt;
    }

    const response: GenerateContentResponse = await gemini.models.generateContent(request);
    
    return response.text ?? '';
  } catch (error) {
    console.error("Error generating script:", error);
    return "Ocorreu um erro ao gerar o roteiro. Por favor, verifique suas configurações e tente novamente.";
  }
};

export const refineScript = async (originalScript: string, refinementPrompt: string): Promise<string> => {
  try {
    const gemini = getAI();
    const prompt = `Aja como um roteirista experiente. Recebi o seguinte roteiro:

--- ROTEIRO ORIGINAL ---
${originalScript}
--- FIM DO ROTEIRO ---

Agora, por favor, refine-o seguindo esta instrução: "${refinementPrompt}".

Sua tarefa é modificar o roteiro original com base no pedido. Mantenha o formato, a estrutura de blocos e o tom geral, a menos que a instrução peça para alterá-los. Retorne APENAS o roteiro completo e refinado, sem adicionar comentários ou explicações extras.`;

    const response = await gemini.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text ?? '';
  } catch (error) {
    console.error("Error refining script:", error);
    return "Ocorreu um erro ao refinar o roteiro.";
  }
};

export const generateViralTitles = async (data: ViralTitlesData): Promise<string> => {
  try {
    const gemini = getAI();
    const generationTypeText = data.generationType === 'ready' ? 'títulos prontos, magnéticos e irresistíveis' : 'estruturas de títulos virais (fórmulas que podem ser adaptadas)';
    
    const prompt = `Aja como um especialista em copywriting e SEO para YouTube.
Gere 10 ${generationTypeText} para um vídeo sobre o tema "${data.topic}".
Os títulos devem ser curtos, impactantes e otimizados para cliques (CTR).
O idioma de saída deve ser ${data.language}.
Formate a saída como uma lista numerada.`;

    const response = await gemini.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text ?? '';
  } catch (error) {
    console.error("Error generating viral titles:", error);
    return "Ocorreu um erro ao gerar os títulos.";
  }
};

export const translateScript = async (data: ScriptTranslatorData): Promise<string> => {
  try {
    const gemini = getAI();
    const selectedLanguages = Object.entries(data.languages)
      .filter(([, isSelected]) => isSelected)
      .map(([lang]) => lang)
      .join(', ');

    if (!selectedLanguages) {
      return "Por favor, selecione pelo menos um idioma para tradução.";
    }

    const prompt = `Aja como um tradutor profissional.
Traduza o seguinte roteiro para os seguintes idiomas: ${selectedLanguages}.
Mantenha o tom e o significado original.
Para cada idioma, apresente a tradução sob um título claro (ex: "--- TRADUÇÃO (Inglês) ---").

Roteiro Original:
---
${data.script}
---`;
    
    const response = await gemini.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text ?? '';
  } catch (error) {
    console.error("Error translating script:", error);
    return "Ocorreu um erro ao traduzir o roteiro.";
  }
};

export const generateScenePrompts = async (data: ScenePromptsData): Promise<string> => {
    try {
        const gemini = getAI();
        const prompt = `Aja como um diretor de arte e especialista em geração de imagens por IA.
Analise o roteiro abaixo e gere uma lista de prompts de imagem, um para cada cena ou parágrafo significativo.
Os prompts devem ser detalhados e otimizados para o modelo de IA "${data.aiModel}".
O estilo deve ser "${data.style}".
Se o modo de geração for "${data.generationMode}", siga essa diretriz.
Cada prompt deve ser claro e conciso, descrevendo a cena visualmente.

Roteiro:
---
${data.script}
---

Formate a saída como uma lista numerada de prompts.`;
        const response = await gemini.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text ?? '';
    } catch (error) {
        console.error("Error generating scene prompts:", error);
        return "Ocorreu um erro ao gerar os prompts de cena.";
    }
};

export const generateThumbnailPrompts = async (data: ThumbnailPromptsData): Promise<string> => {
    try {
        const gemini = getAI();
        const phraseInstruction = data.includePhrase ? "O prompt deve incluir uma sugestão de texto curto e impactante (2-3 palavras) para ser sobreposto na imagem." : "O prompt não deve incluir texto na imagem.";

        const prompt = `Aja como um especialista em design de thumbnails para YouTube e um mestre em engenharia de prompts para IAs de imagem.
Crie 3 prompts de imagem distintos e de alta qualidade para gerar uma thumbnail para um vídeo com o título: "${data.title}".
Os prompts devem ser otimizados para o modelo de IA "${data.aiModel}".
O objetivo é criar uma imagem que seja visualmente impressionante, gere curiosidade e maximize a taxa de cliques (CTR).
${phraseInstruction}

Para cada prompt, descreva:
- A composição da cena.
- O elemento principal em destaque.
- A iluminação e o esquema de cores.
- A emoção a ser transmitida.

Formate a saída claramente para cada uma das 3 opções.`;

        const response = await gemini.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text ?? '';
    } catch (error) {
        console.error("Error generating thumbnail prompts:", error);
        return "Ocorreu um erro ao gerar os prompts de thumbnail.";
    }
};

export const generateImages = async (data: ImageGeneratorData): Promise<string[]> => {
  try {
    const gemini = getAI();
    
    if (data.aiModel === 'nanobanana') {
        const parts: ({ text: string } | { inlineData: { mimeType: string; data: string; } })[] = [{ text: data.prompt }];
        if (data.referenceImage) {
            parts.unshift({
                inlineData: {
                    mimeType: data.referenceImage.mimeType,
                    data: data.referenceImage.data,
                }
            });
        }

        const response = await gemini.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });
        const images: string[] = [];
        const contentParts = response.candidates?.[0]?.content?.parts;
        if (contentParts) {
            for (const part of contentParts) {
                if (part.inlineData?.data) {
                    images.push(part.inlineData.data);
                }
            }
        }
        return images;
    }

    // Default to ImageFX
    const styleDescriptionMap: { [key: string]: string } = {
        'realistic': 'foto realista, alta definição, 8k',
        'cinematic': 'estilo cinematográfico, iluminação dramática, profundidade de campo',
        'anime': 'estilo anime, traços vibrantes, cel shading',
        '3d-render': 'renderização 3D, arte digital, octane render',
        'pixel-art': 'pixel art, 16-bit, estilo retrô',
    };
    const styleText = styleDescriptionMap[data.style] || '';
    const fullPrompt = `${data.prompt}, ${styleText}${data.negativePrompt ? `. Elementos a evitar: ${data.negativePrompt}` : ''}`;
    
    const aspectRatioMap: { [key: string]: '1:1' | '16:9' | '9:16' } = {
        '1:1': '1:1',
        '16:9': '16:9',
        '9:16': '9:16',
    };

    const response = await gemini.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: fullPrompt,
        config: {
          numberOfImages: data.numImages,
          outputMimeType: 'image/png',
          aspectRatio: aspectRatioMap[data.aspectRatio] || '1:1',
        },
    });

    return response.generatedImages?.map(img => img.image?.imageBytes ?? '')?.filter(Boolean) ?? [];
  } catch (error) {
    console.error("Error generating images:", error);
    return [];
  }
};

export const generateVideo = async (data: VideoGeneratorData): Promise<string> => {
    try {
        // FIX: Use process.env.API_KEY as per guidelines.
        if (!process.env.API_KEY) {
          throw new Error("The API_KEY environment variable has not been set.");
        }
        // FIX: Create a new instance with the correct API key for Veo.
        const videoAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const requestPayload: any = {
            model: 'veo-3.1-fast-generate-preview',
            prompt: data.prompt,
            config: {
                numberOfVideos: 1,
                resolution: data.resolution,
                aspectRatio: data.aspectRatio,
            }
        };

        if (data.referenceImage) {
            requestPayload.image = {
                imageBytes: data.referenceImage.data,
                mimeType: data.referenceImage.mimeType,
            };
        }

        let operation = await videoAI.models.generateVideos(requestPayload);
        
        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
            operation = await videoAI.operations.getVideosOperation({ operation: operation });
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

        if (downloadLink) {
            // FIX: Use process.env.API_KEY for fetching the video as per guidelines.
            const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
            if (!response.ok) {
                throw new Error(`Falha ao baixar o arquivo de vídeo. Status: ${response.status}`);
            }
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        } else {
            const errorMessage = (operation as any).error ? `A geração falhou com o erro: ${(operation as any).error.code} - ${(operation as any).error.message}` : "A geração de vídeo foi concluída, mas nenhum link para download foi encontrado.";
            throw new Error(errorMessage);
        }
    } catch (error: any) {
        console.error("Erro detalhado na geração de vídeo:", JSON.stringify(error, null, 2));
        
        let message = "Ocorreu um erro desconhecido ao gerar o vídeo.";
        if (error.message) {
            if (error.message.includes("RESOURCE_EXHAUSTED")) {
                 message = `Seu limite de uso (quota) foi excedido. Verifique seu plano e detalhes de faturamento.`;
            } else if (error.message.includes("Requested entity was not found.") || error.message.includes("API key not valid")) {
                 message = "API_KEY_ERROR: A chave de API selecionada é inválida ou não tem as permissões necessárias. Por favor, selecione outra chave.";
            } else if (error.message.startsWith('Falha ao baixar o arquivo de vídeo')) {
                message = "Erro ao baixar o vídeo gerado. A IA processou o pedido, mas não foi possível obter o arquivo final.";
            } else {
                message = `Erro: ${error.message}`;
            }
        }
        return message;
    }
};

export const generateSpeech = async (data: TextToSpeechData): Promise<string> => {
  try {
    const gemini = getAI();
    
    const speechConfig: any = {};
    if (data.mode === 'multi' && data.speakers && data.speakers.length === 2) {
      speechConfig.multiSpeakerVoiceConfig = {
        speakerVoiceConfigs: data.speakers.map(s => ({
          speaker: s.speaker,
          voiceConfig: { prebuiltVoiceConfig: { voiceName: s.voice } }
        }))
      };
    } else {
      speechConfig.voiceConfig = {
        prebuiltVoiceConfig: { voiceName: data.singleVoice || 'Kore' },
      };
    }
    
    const textWithInstructions = `${data.styleInstructions ?? ''} ${data.text ?? ''}`.trim();
    
    const fullPrompt = data.mode === 'multi' 
      ? `TTS the following conversation between ${data.speakers?.[0]?.speaker ?? 'Speaker1'} and ${data.speakers?.[1]?.speaker ?? 'Speaker2'}:\n${textWithInstructions}`
      : textWithInstructions;

    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: fullPrompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: speechConfig,
        ...(data.temperature !== undefined && { temperature: data.temperature }),
      },
    });
    
    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return base64Audio;
    } else {
      throw new Error("Nenhum dado de áudio foi retornado pela API.");
    }
  } catch (error) {
    console.error("Error generating speech:", error);
    return `Ocorreu um erro ao gerar o áudio: ${error instanceof Error ? error.message : String(error)}`;
  }
};

export const generateVoiceSample = async (voice: string): Promise<string> => {
  return generateSpeech({
    text: "Olá, você pode usar minha voz para gerar áudio.",
    styleInstructions: '',
    mode: 'single',
    singleVoice: voice,
    temperature: 1,
    speakers: [],
  });
};


export const convertToSrt = async (data: SrtConverterData): Promise<string> => {
    try {
        const gemini = getAI();
        const prompt = `Aja como uma ferramenta de conversão de legendas.
Converta o texto abaixo para o formato .SRT.
Divida o texto em segmentos lógicos para legendas.
Cada legenda deve ter no máximo ${data.charLimit} caracteres por bloco de texto (não por linha).
Gere timestamps apropriados para uma narração com ritmo normal (aproximadamente 150 palavras por minuto).
A saída deve ser APENAS o conteúdo do arquivo SRT, formatado corretamente, sem nenhuma explicação ou texto adicional.

Texto para converter:
---
${data.text}
---`;
        const response = await gemini.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text ?? '';
    } catch (error) {
        console.error("Error converting to SRT:", error);
        return "Ocorreu um erro ao converter o texto para SRT.";
    }
};

export const splitText = async (data: TextSplitterData): Promise<string> => {
    return new Promise((resolve) => {
        if (!data.text.trim()) {
            return resolve("Nenhum texto para dividir.");
        }

        let parts: string[] = [];
        if (data.splitBy === 'words') {
            const words = data.text.trim().split(/\s+/);
            for (let i = 0; i < words.length; i += data.splitValue) {
                parts.push(words.slice(i, i + data.splitValue).join(' '));
            }
        } else {
            for (let i = 0; i < data.text.length; i += data.splitValue) {
                parts.push(data.text.substring(i, i + data.splitValue));
            }
        }

        resolve(parts.map((part, index) => `--- PARTE ${index + 1} ---\n\n${part}`).join('\n\n'));
    });
};

export const optimizeForCapcut = async (data: CapcutOptimizerData): Promise<string> => {
  try {
    const gemini = getAI();
    const prompt = `Aja como um editor de vídeo experiente otimizando um roteiro para o gerador de vídeo do CapCut.
**PROBLEMA A SER RESOLVIDO:** O roteiro original está muito fragmentado, com muitos parágrafos curtos, o que gera cenas excessivamente curtas e sem impacto (1-3 segundos) no CapCut.
**SUA TAREFA PRINCIPAL:** O oposto de dividir. Você deve **AGRUPAR e JUNTAR** parágrafos e frases curtas que pertencem à mesma ideia visual ou momento narrativo.
**OBJETIVO:** Criar **MENOS CENAS**, porém mais longas e coesas, com uma duração ideal entre 5 e 12 segundos cada.
**REGRAS CRÍTICAS:**
1.  **AGRUPE, NÃO DIVIDA:** Sua função é consolidar. Junte frases e parágrafos curtos.
2.  **EVITE CENAS CURTAS:** É PROIBIDO gerar parágrafos curtos que resultem em cenas de 1 a 3 segundos.
3.  **EXEMPLO:** Se o texto original for: "O coração me apertou.\\n\\nNão era apenas uma pulseira.\\n\\nHavia uma criança.", você deve agrupá-los em um único parágrafo coeso.
4.  **NÃO ALTERE O TEXTO:** O texto original deve ser 100% preservado. Você não pode adicionar, remover ou reescrever nenhuma palavra.
5.  **SEM MARCAÇÕES:** A saída deve ser um texto limpo, sem "[CENA 1]", "---", ou qualquer outra marcação.

**ROTEIRO ORIGINAL:**
---
${data.script}
---

**ROTEIRO OTIMIZADO (SAÍDA ESPERADA):**
`;
    const response = await gemini.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text ?? '';
  } catch (error) {
    console.error("Error optimizing for Capcut:", error);
    return "Ocorreu um erro ao otimizar o roteiro.";
  }
};