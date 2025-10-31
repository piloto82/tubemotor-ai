
import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";
import type { ScriptCreatorData, ViralTitlesData, ScriptTranslatorData, ScenePromptsData, ThumbnailPromptsData, ImageGeneratorData, SrtConverterData, TextSplitterData, VideoGeneratorData, CapcutOptimizerData, TextToSpeechData } from '../types';

let ai: GoogleGenAI | null = null;
// FIX: Removed VITE_API_KEY in favor of process.env.API_KEY as per guidelines.

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
  'hist-relacionamentos-idades-diferentes'
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

    if (storyNicheValues.has(data.structure)) {
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
- **ESTRUTURA REPETITIVA:** Use padrões. Se o vídeo é sobre 5 patinhos, cada estrofe deve seguir uma estrutura