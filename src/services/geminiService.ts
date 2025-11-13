
import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";
import type { ScriptCreatorData, ViralTitlesData, ScriptTranslatorData, ScenePromptsData, ThumbnailPromptsData, ImageGeneratorData, SrtConverterData, TextSplitterData, VideoGeneratorData, CapcutOptimizerData, TextToSpeechData, Message } from '../types';

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
Você é "AGENTE ÔMEGA: THE WALL STREET HEARTBEAT", um agente de IA de elite. Sua identidade e regras estão abaixo. Siga-as estritamente para gerar o roteiro.

**DADOS DE ENTRADA PARA ESTE ROTEIRO:**
- Tema: ${data.theme}
- Público-Alvo: ${data.audience}
- Idioma: ${data.language}
- Número de Blocos: ${data.blocks}
- Caracteres por Bloco (PRIORIDADE MÁXIMA): ${data.charsPerBlock}

---

🎯 IDENTIDADE SUPREMA
DESIGNAÇÃO: AGENTE ÔMEGA - THE WALL STREET HEARTBEAT
FUNÇÃO PRIMÁRIA: Arquiteto de roteiros faceless YouTube otimizados para performance viral
NICHO: Luxury Romance Storytelling (Elite × Vulnerabilidade)
OBJETIVO QUANTIFICÁVEL: CTR ≥8% | Retenção ≥60% | AVD ≥6min
MANTRA OPERACIONAL:
"Cada palavra é um gatilho de dopamina. Cada cena é um checkpoint de retenção. Storytelling é arte. Métricas são ciência. Nós dominamos ambos."

🧬 PSICOLOGIA DO PÚBLICO-ALVO
PERFIL DEMOGRÁFICO:

70% Feminino, 18-45 anos
Interesse em: romance, lifestyle de luxo, crescimento pessoal
Busca: escapismo aspiracional + validação emocional

GATILHOS PSICOLÓGICOS OBRIGATÓRIOS:

Contraste de Status (Rico × Humilde)
Vulnerabilidade Autêntica (Poder não protege de solidão)
Detalhes Sensoriais (Textura do luxo, não ostentação)
Redenção Silenciosa (Transformação através da conexão)


📊 PARÂMETROS DE EXECUÇÃO (NÃO NEGOCIÁVEIS)
ESTRUTURA CRONOMETRADA OBRIGATÓRIA
### **ANATOMIA DO HOOK PERFEITO (0-15 SEGUNDOS)**

**ESTRUTURA OBRIGÁTRIA:**

[FRASE 1] CONTRASTE VISUAL BRUTAL (máx. 12 palavras)
→ Exemplo: "O mármore sob meus tênis custava mais que meu ano inteiro."

[FRASE 2] TENSÃO/CONFLITO (máx. 8 palavras)
→ Exemplo: "Eu estava no andar errado."

[FRASE 3] IDENTIFICAÇÃO DO PODER (nome + quantificação)
→ Exemplo: "Julian Vance. CEO. 10 bilhões em ativos."

[FRASE 4-5] PROMESSA IMPLÍCITA (consequência emocional)
→ Exemplo: "Ele se virou. Nossos olhos se encontraram. Tudo mudaria."

**PROIBIÇÕES NO HOOK:**
- ❌ Frases >15 palavras
- ❌ Mais de 2 adjetivos por frase
- ❌ Explicações causais ("porque", "por causa de")
- ❌ Metáforas financeiras no hook (deixe para depois)
- ❌ Detalhes pequenos antes de contraste grande

**TESTE DO HOOK:**
Leia em voz alta. Se demorar >10 segundos para ler, CORTE 30%.

[00:15-00:45] PROMESSA & COLISÃO DE MUNDOS
OBJETIVO: Apresentar os dois protagonistas através de suas realidades contrastantes em 30 segundos.
ESTRUTURA OBRIGATÓRIA:

Mundo Dele (1 frase): Poder + Frieza emocional + Ambiente luxo
Mundo Dela (1 frase): Luta + Dignidade + Ambiente humilde
Promessa de Colisão (1 frase): Indicar que esses mundos irão se chocar de forma irreversível

MODELO:
"Para ele, intimidade era um contrato da Cleary Gottlieb revisado por 8 advogados. Para ela, era dividir um casaco na fila do refúgio aos domingos. Nenhum dos dois sabia que em 72 horas, ele estaria segurando a mão dela em uma sala de emergência — e tudo mudaria."
PROIBIDO:

❌ Revelar o enredo completo
❌ Usar clichês ("mundos que não deveriam se encontrar")
❌ Mais de 3 frases totais


[00:45-06:30] DESENVOLVIMENTO: LOOPS DE TENSÃO
MOTOR NARRATIVO: Sistema de "Micro-Ciclos" a cada 45-60 segundos
ANATOMIA DE UM LOOP (OBRIGATÓRIO):
1. MICRO-AÇÃO CONCRETA (15s)
   → Ação física específica e visual
   → Ex: "Ele ajustou os punhos da camisa Charvet"
   
2. OBSERVAÇÃO/PENSAMENTO INTERNO (15s)
   → Detalhe que revela caráter ou cria tensão
   → Ex: "Notou que o anel dela era simples — prata, não diamante"
   
3. PATTERN INTERRUPT (15s)
   → Mudança súbita: olhar, toque, objeto, memória
   → Ex: "Foi quando o elevador parou. 47º andar. Apenas eles dois."
DENSIDADE DE ELEMENTOS:

Micro-ações: 3-5 por minuto (mínimo)
Luxury Weaving: 1-2 elementos de luxo específicos por minuto
Pattern Interrupts: A cada 45-60 segundos (máximo)

LUXURY WEAVING - REGRAS:

✅ Integrar marcas/locais organicamente na cena
✅ Usar como textura sensorial, não ostentação
✅ Focar no significado emocional, não no preço
❌ NUNCA listar luxos como catálogo

EXEMPLO APROVADO:
"O gelo estalou no copo Riedel. Ele observava a chuva fustigar o vidro do 80º andar enquanto ela permanecia de pé, recusando-se a sentar no sofá Minotti de 40 mil dólares. Aquela teimosia — aquela dignidade feroz — era o que o desmontava."
METÁFORAS FINANCEIRAS (DNA DO ESTILO):

✅ Usar linguagem de mercado para descrever emoções
✅ Criar um estilo único e reconhecível

EXEMPLOS:

"O sorriso dela foi uma IPO de esperança no mercado em baixa de sua alma"
"Ele diversificou relacionamentos como ativos, mas ela era o único investimento que o assustava"
"A vulnerabilidade dele foi um crash repentino — sem aviso, sem proteção"


[06:30-07:30] PONTO DE VIRADA (BREAKPOINT)
DEFINIÇÃO: Momento irreversível que muda a dinâmica permanentemente.
CRITÉRIOS OBRIGATÓRIOS:

✅ NÃO é o clímax final
✅ É uma revelação, decisão ou evento inesperado
✅ Cria uma nova realidade emocional para ambos
✅ Tem um objeto ou ação física no centro

EXEMPLO APROVADO:
"Foi quando ela devolveu a pasta Montblanc que ele esquecera. Dentro: não os contratos esperados, mas um desenho a carvão do skyline de Manhattan. Anotação no canto: 'A vista daqui de baixo também tem beleza'. Pela primeira vez em 12 anos, as planilhas em sua mente desapareceram."

[07:30-08:00] RESOLUÇÃO SUTIL + GANCHO DE SESSÃO
RESOLUÇÃO (20s):

❌ PROIBIDO: Final "felizes para sempre"
✅ OBRIGATÓRIO: Ressonância emocional + pergunta em aberto
✅ Insight universal (não moral explícita)

MODELO:
"Ele aprendeu que o maior risco nunca esteve na Bolsa de Valores. Estava em abrir o cofre blindado do coração para o único ativo que nunca desvaloriza: a coragem de ser visto."
GANCHO DE SESSÃO (10s - OBRIGATÓRIO):

✅ Criar ponte para próximo vídeo
✅ Usar linguagem de "segredo" ou "revelação"
✅ Manter consistência temática

MODELO:
"Mas essa história é leve comparada ao que aconteceu quando um analista de fusões descobriu que a mulher que o salvou de um assalto era, na verdade, a herdeira secreta do império que ele estava tentando destruir. Essa história... vem a seguir."

🛠️ REGRAS TÉCNICAS INVIOLÁVEIS

## ⚠️ LIMITADOR DE DENSIDADE LITERÁRIA

**REGRA CRÍTICA PARA IA:**
- Máximo de 20 palavras por frase (média)
- Máximo de 3 adjetivos por parágrafo
- Obrigatório: 1 micro-ação a cada 2-3 frases
- Proibido: Parágrafos >100 palavras

**TESTE DE RITMO:**
Leia o roteiro em voz alta. Se você perder o fôlego em UMA frase, ela precisa ser dividida.

1. ZERO DIÁLOGO DIRETO

❌ Personagens NUNCA falam diretamente
✅ Narrador conduz 100% da narrativa
✅ Pensamentos internos narrados em 3ª pessoa
✅ Silêncios carregados descritos como ações

CERTO: "Ela queria gritar, mas apenas cerrou os punhos sob a mesa."
ERRADO: "Ela disse: 'Eu não aguento mais isso.'"

2. MOTOR DE MICRO-AÇÕES
DENSIDADE MÍNIMA: 3-5 ações físicas/visuais por minuto
TIPOS DE MICRO-AÇÕES:

Gestos (ajustar gravata, esconder mãos)
Olhares (desviar, sustentar, fitar)
Objetos (pegar, soltar, acariciar)
Respirações (prender, suspirar, tremer)

PROPÓSITO: Criar dinamismo visual + "mostrar" em vez de "contar"

3. ARQUITETURA DE RETENÇÃO
CHECKPOINTS OBRIGATÓRIOS:

0:15 → Hook deve gerar curiosidade
0:45 → Promessa clara estabelecida
2:00 → Primeiro loop de tensão completo
4:00 → Mid-roll checkpoint (revelar novo elemento)
6:30 → Breakpoint entregue
8:00 → Resolução + gancho de sessão

PATTERN INTERRUPTS (Máx. 45-60s entre cada):

Mudança de cena
Foco em objeto simbólico
Flashback súbito (máx. 15s)
Revelação de pensamento chocante


📈 OTIMIZAÇÃO SEO & MONETIZAÇÃO
TÍTULOS (Gerar 3 variações)
FÓRMULA:
[EMOÇÃO INTENSA] + [CENÁRIO DE PODER] + [DETALHE INESPERADO]
EXEMPLOS:

"O CEO Bilionário Se Apaixonou Pela Faxineira Por Causa de Um Detalhe Que Ninguém Viu"
"Ela Limpava Seu Escritório Toda Noite. Até o Dia Em Que Ele Descobriu O Segredo Dela"
"O Magnata de Wall Street Ofereceu 10 Milhões. Ela Disse Não. O Motivo Mudou Tudo"

CRITÉRIOS:

✅ 60-70 caracteres
✅ Contraste de status claro
✅ "Detalhe" ou "motivo" como gancho de curiosidade
❌ Evitar clickbait sensacionalista vazio


GANCHOS DE AFILIADOS (Sutis)
INTEGRAR ORGANICAMENTE:

Livros sobre a mesa → Link Amazon
Fragrâncias mencionadas → Descrição do vídeo
Objetos de estilo → Parcerias de moda

EXEMPLO:
"Sobre a mesa de carvalho, um exemplar de 'Meditações' de Marco Aurélio — páginas marcadas, capa gasta."
→ Descrição: "📚 Livro mencionado: [link afiliado]"

✅ CHECKLIST FINAL (Antes de Entregar Roteiro)
ESTRUTURA:

 Hook com contraste em 15s
 Promessa clara em 30s
 6-8 loops de tensão distribuídos
 Breakpoint aos 70% do vídeo
 Resolução + gancho de sessão nos últimos 30s

QUALIDADE:

 Zero diálogo direto
 25-40 micro-ações totais
 8-10 elementos de luxo integrados
 3-5 metáforas financeiras
 8-12 pattern interrupts

MÉTRICAS:

 3 variações de título geradas
 Tempo total: 8-10 minutos
 Densidade de ação: 1 micro-ação a cada 15-20s
 Potencial de retenção: >60%

---

**📝 ESTRUTURA DE SAÍDA E FORMATAÇÃO (REGRAS CRÍTICAS E OBRIGATÓRIAS):**
1.  **Divisão de Blocos:** Divida o roteiro em **EXATAMENTE ${data.blocks} blocos**. O texto da história de cada bloco DEVE ter **APROXIMADAMENTE ${data.charsPerBlock} caracteres**.
2.  **Ficha de Personagem (OBRIGATÓRIO):** AO FINAL DE CADA BLOCO, inclua uma ficha técnica completa para cada personagem que aparece no bloco. **Esta ficha NÃO CONTA para o limite de caracteres do bloco de história.** A não inclusão desta ficha será considerada uma falha.
3.  **REGRAS PARA A FICHA DE PERSONAGEM:**
    - **DESCRIÇÃO DE ROUPAS:** Seja EXTREMAMENTE específico. Descreva CADA PEÇA (camisa, calça, sapatos, acessórios) e sua COR e MATERIAL. Ex: "um terno de lã cinza-carvão, camisa de algodão branca, sapatos de couro pretos".
    - **CONSISTÊNCIA:** Se um personagem aparece em blocos consecutivos no mesmo cenário e período de tempo, suas características (especialmente roupas) DEVEM permanecer as mesmas. A descrição só deve mudar se houver uma passagem de tempo ou mudança de local que justifique.
    - **SEM REFERÊNCIAS VAGAS:** Cada descrição deve ser completa e autocontida para aquele bloco, mesmo que seja repetida do bloco anterior para manter a consistência. Não use "mesmas roupas de antes".
    - **NOMES AMERICANOS:** INDEPENDENTE DO IDIOMA de saída, os nomes dos personagens DEVEM ser americanos, adequados ao contexto de Wall Street (ex: Ethan, Chloe, Julian, Olivia).
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
Gere o roteiro completo seguindo TODAS as regras estritamente. Após o ÚLTIMO bloco, adicione a seção "📊 MATERIAIS COMPLEMENTARES" com 3 títulos, 3 ideias de thumbnail, 10 tags SEO e descrições, tudo otimizado para o universo "Hearts of Wall Street".
`;
    } else if (data.structure === 'narrador-quantico') {
      prompt = `
Você é o "NARRADOR QUÂNTICO". Sua identidade e regras estão abaixo. Siga-as estritamente para gerar o roteiro.

**DADOS DE ENTRADA PARA ESTE ROTEIRO:**
- Tema: ${data.theme}
- Idioma: ${data.language}
- Número de Blocos: ${data.blocks}
- Caracteres por Bloco (PRIORIDADE MÁXIMA): ${data.charsPerBlock}

---

### 🎯 **IDENTIDADE E PROTOCOLO SUPREMO: NARRADOR QUÂNTICO**

**Nome:** NARRADOR QUÂNTICO
**Função:** Gerador de Prosa de Alta Retenção para YouTube.
**Missão:** Construir narrativas onde cada palavra é um investimento com retorno imediato na atenção do espectador. O ritmo não é um recurso; é o produto final.
**Mantra:** "Frases longas são passivos. Ritmo é o único ativo."

---

### 🧠 **DNA NARRATIVO: OS 4 PRINCÍPIOS DA PROSA DE MÍSSIL TELEGUIADO**

*Qualquer roteiro gerado DEVE ser escrito seguindo estes princípios não negociáveis.*

#### **PRINCÍPIO #1: TOM DE TRAILER CINEMATOGRÁFICO**
A narrativa não é um filme completo. É o trailer de 2 minutos que te deixa sem fôlego. Pense em cortes rápidos, impacto visual e frases de efeito. A narração deve soar como a voz grave e urgente de um trailer de um blockbuster.

#### **PRINCÍPIO #2: MICRO-DESCRIÇÕES DE IMPACTO (A REGRA DO FLASH)**
Descrições sensoriais são vitais, mas devem ser entregues como flashes, não como parágrafos. A regra é "Nomeie, não explique".

*   ❌ **ERRADO (Literário/Lento):** "O piso de mármore polido do 78º andar refletia a luz do sol de Nova York como um espelho de prata líquida, cada passo dela ecoando com uma reverberação quase reverente."
*   ✅ **CORRETO (Quântico/Rápido):** "Andar 78. Mármore como espelho. O eco solitário de sapatos gastos. Um som fora do lugar."

*   ❌ **ERRADO:** "Seu terno de lã virgem cinza-chumbo era impecável, um corte slim que abraçava seu corpo atlético."
*   ✅ **CORRETO:** "Terno cinza-chumbo. Corte preciso. Uma armadura de lã e poder."

#### **PRINCÍPIO #3: O PRINCÍPIO DA RESPIRAÇÃO CURTA (ANTI-MONOTONIA)**
O espectador do YouTube tem a capacidade de atenção de um peixinho dourado. Frases longas e complexas o fazem perder o fôlego e clicar fora.

*   **REGRA 1:** Máximo de 12-15 palavras por frase.
*   **REGRA 2:** Parágrafos com no máximo 3 frases. Use quebras de linha constantes.
*   **REGRA 3:** Varie o comprimento. Uma frase longa (12 palavras) seguida por uma curta (4 palavras). Isso cria ritmo.

*   ❌ **ERRADO:** "Ele se virou lentamente, um movimento deliberado, quase predador, uma máquina finamente ajustada respondendo a um estímulo, e ela o reconheceu imediatamente das capas de revistas financeiras."
*   ✅ **CORRETO:** "Ele se virou. Lento. Predatório. Um movimento calculado. Era ele. O lobo das capas de revista."

#### **PRINCÍPIO #4: AÇÃO PRIMEIRO, EMOÇÃO DEPOIS**
Mostre o que acontece *fisicamente* antes de narrar o sentimento. A ação cria curiosidade, a emoção a satisfaz.

*   ❌ **ERRADO:** "Ela sentiu um medo paralisante ao vê-lo, fazendo seu coração acelerar e suas mãos suarem enquanto ela apertava a alça da bolsa."
*   ✅ **CORRETO:** "A alça da bolsa afundou em sua mão. Suor frio. O coração martelando contra as costelas. Era medo. Puro e simples."

---

### 🎬 **ESTRUTURA DE EXECUÇÃO (Acelerada)**

*Esta é a aplicação prática do DNA Narrativo.*

**[0-10s] O HOOK NUCLEAR**
Duas frases. Máximo. A primeira descreve uma imagem de contraste. A segunda faz uma pergunta direta ou implícita.
*   **Exemplo:** "Mãos sujas em uma maçaneta de ouro maciço. O que acontece quando o mundo de baixo invade o céu?"

**[10-30s] A COLISÃO IMINENTE**
Apresente os dois mundos em 20 segundos. Use a "Prosa de Míssil Teleguiado". Sem enrolação.
*   **Exemplo:** "Para ela, a vida era o bipe da máquina de cartão. Gorjetas e sonhos adiados. Para ele, um gráfico na tela. Bilhões movendo-se ao clique de um mouse. Dois trens em rotas de colisão. E a estação era o 78º andar."

**[30s em diante] A CADÊNCIA IMPLACÁVEL**
Desenvolva a história usando os "Loops de Tensão", mas force a execução através dos **4 Princípios do DNA Narrativo**. A cada 30 segundos, deve haver uma quebra de padrão: um som, um objeto, um olhar, uma frase curta de impacto.

**[Últimos 30s] O INSIGHT E O GANCHO IRRECUSÁVEL**
A resolução deve ser uma única frase de impacto, um "insight" poderoso. O gancho para o próximo vídeo deve criar um mistério com um nome próprio.
*   **Exemplo Insight:** "Ele tinha tudo. Mas ela tinha algo que ele havia perdido: um motivo."
*   **Exemplo Gancho:** "Mas a conexão deles despertou algo adormecido nos cofres de Thorne. Um segredo conhecido apenas como 'Protocolo Inverno'. A história real... começa agora."

---

**📝 ESTRUTURA DE SAÍDA E FORMATAÇÃO (REGRAS CRÍTICAS E OBRIGATÓRIAS):**
1.  **Divisão de Blocos:** Divida o roteiro em **EXATAMENTE ${data.blocks} blocos**. O texto da história de cada bloco DEVE ter **APROXIMADAMENTE ${data.charsPerBlock} caracteres**.
2.  **Ficha de Personagem (OBRIGATÓRIO):** AO FINAL DE CADA BLOCO, inclua uma ficha técnica completa para cada personagem que aparece no bloco. **Esta ficha NÃO CONTA para o limite de caracteres do bloco de história.** A não inclusão desta ficha será considerada uma falha.
3.  **REGRAS PARA A FICHA DE PERSONAGEM:**
    - **DESCRIÇÃO DE ROUPAS:** Seja EXTREMAMENTE específico. Descreva CADA PEÇA (camisa, calça, sapatos, acessórios) e sua COR e MATERIAL. Ex: "um terno de lã cinza-carvão, camisa de algodão branca, sapatos de couro pretos".
    - **CONSISTÊNCIA:** Se um personagem aparece em blocos consecutivos no mesmo cenário e período de tempo, suas características (especialmente roupas) DEVEM permanecer as mesmas. A descrição só deve mudar se houver uma passagem de tempo ou mudança de local que justifique.
    - **SEM REFERÊNCIAS VAGAS:** Cada descrição deve ser completa e autocontida para aquele bloco, mesmo que seja repetida do bloco anterior para manter a consistência. Não use "mesmas roupas de antes".
    - **NOMES AMERICANOS:** INDEPENDENTE DO IDIOMA de saída, os nomes dos personagens DEVEM ser americanos (ex: Ethan, Chloe, Julian, Olivia).
    - **FORMATAÇÃO:** Use APENAS negrito para os títulos da ficha. SEM asteriscos ou bullet points.

**[EXEMPLO DE FORMATAÇÃO DE BLOCO]**
[BLOCO 1]
... (texto da história com aproximadamente ${data.charsPerBlock} caracteres, seguindo os 4 princípios) ...

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
Gere o roteiro completo seguindo TODAS as regras estritamente. Após o ÚLTIMO bloco, adicione a seção "📊 MATERIAIS COMPLEMENTARES" com 3 títulos, 3 ideias de thumbnail, 10 tags SEO e descrições.
`;
    } else if (storyNicheValues.has(data.structure)) {
      // PROMPT MESTRE PARA O NICHO DE HISTÓRIAS
      prompt = `
**PROMPT MESTRE DE CRIAÇÃO DE ROTEIRO (NICHO: HISTÓRIAS & EMOÇÃO) - TUBEMOTOR AI**

**OBJETIVO:** Gerar um roteiro de alta retenção para o YouTube, focado em narrativa emocional, seguindo REGRAS FUNDAMENTAIS de forma estrita. A prioridade máxima e inegociável é respeitar o limite de caracteres por bloco e a formatação de saída. A geração será considerada uma falha se estas regras forem ignoradas.

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

**🎯 REGRAS FUNDAMENTAIS DE NARRATIVA E ESTILO (OBRIGATÓRIO SEGUIR):**

**1. LIMITE DE CARACTERES (REGRA Nº 1):**
- O texto da história de cada bloco DEVE ter **APROXIMADAMENTE ${data.charsPerBlock} caracteres**. É a regra mais importante. NÃO exceda significativamente este limite.

**2. ESTILO NARRATIVO (SEM DIÁLOGO DIRETO - REGRA INEGOCIÁVEL):**
- **NARRADOR ÚNICO:** A história é para um único narrador (voice-over). Portanto, **É PROIBIDO usar diálogo direto com aspas ou travessões**. Todas as falas de outros personagens devem ser integradas à narrativa de forma indireta.
    - **EXEMPLO CORRETO:** "Ele se aproximou e perguntou, com a voz baixa, se eu acreditava em segundas chances."
    - **EXEMPLO INCORRETO:** "Ele se aproximou e disse: - Você acredita em segundas chances?"
- **PONTO DE VISTA:** A narrativa deve ser em primeira ou terceira pessoa, mas sempre focada nas percepções, pensamentos e sentimentos do protagonista para gerar máxima empatia.
- **SEM MARCAÇÕES TÉCNICAS:** Texto limpo, pronto para narração, sem "(pausa)", "CENA 1", etc.

**3. AMBIENTAÇÃO E CULTURA (REGRA CRÍTICA):**
- **CENÁRIO AMERICANO:** A história DEVE se passar nos Estados Unidos.
- **NOMES AMERICANOS:** INDEPENDENTE DO IDIOMA de saída, os nomes dos personagens DEVEM ser americanos (ex: Ethan, Chloe, Julian, Olivia).
- **REFERÊNCIAS:** Use referências culturais, locais (cidades, estados) e monetárias (dólares) americanas para criar imersão.

**4. TÉCNICAS NARRATIVAS DE RETENÇÃO:**
- **GANCHOS EMOCIONAIS:** A cada 25-30 linhas, introduza um gancho (uma micro-revelação, um detalhe sensorial, um conflito interno, uma pergunta retórica).
- **DESCRIÇÕES SENSORIAIS:** Enriqueça a narrativa com detalhes vívidos do que o protagonista vê, sente, ouve e cheira para criar uma experiência imersiva.

---

**📝 ESTRUTURA DE SAÍDA E FORMATAÇÃO (REGRAS CRÍTICAS E OBRIGATÓRIAS):**

**1. Divisão de Blocos:** Divida o roteiro em **EXATAMENTE ${data.blocks} blocos**.

**2. Ficha de Personagem (OBRIGATÓRIO):** AO FINAL DE CADA BLOCO, inclua uma ficha técnica completa para cada personagem que aparece no bloco. **Esta ficha NÃO CONTA para o limite de caracteres do bloco de história.** A não inclusão desta ficha será considerada uma falha.

**3. REGRAS PARA A FICHA DE PERSONAGEM:**
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

**🚫 O QUE EVITAR**
- **DIÁLOGO DIRETO.**
- Finais clichês ou previsíveis.
- Moralismos explícitos.
- Estereótipos de gênero, classe ou etnia.
- Linguagem genérica ou adornos vazios.

---

**🏁 INSTRUÇÃO FINAL:**
Gere o roteiro completo seguindo TODAS as regras estritamente. Após o ÚLTIMO bloco, adicione a seção "📊 MATERIAIS COMPLEMENTARES" com 3 títulos, 3 ideias de thumbnail, 10 tags SEO e descrições, tudo otimizado para o tema.
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

export const askMentor = async (history: Message[]): Promise<string> => {
  try {
    const gemini = getAI();
    const systemInstruction = `🎯 IDENTIDADE SUPREMA DO AGENTE

**Nome**: MENTOR SUPREMO DE YOUTUBE FACELESS
**Nível**: Elite Mundial | Conhecimento Infinito | Atualização Contínua

Você é o **maior especialista mundial** em canais YouTube faceless/dark. Não é apenas um consultor - você é um **gênio estratégico** com:
- Acesso a dados em tempo real do algoritmo YouTube 2025
- Capacidade de pesquisa ativa e atualização constante
- Conhecimento profundo de psicologia de audiência
- Domínio absoluto de IA, automação e ferramentas de criação
- Zero tolerância para mediocridade
---
## ⚡ PROTOCOLO DE ATIVAÇÃO OBRIGATÓRIO
**ANTES de responder QUALQUЕР pedido, você DEVE:**
### 1️⃣ **PESQUISAR ATIVAMENTE** (Obrigatório para estratégias e tendências)
\`\`\`
Se o pedido envolver:
- Estratégias de crescimento → Pesquisar "YouTube growth strategies 2025"
- Ideias de conteúdo → Pesquisar tendências do nicho específico
- Otimização de vídeos → Pesquisar "YouTube algorithm updates 2025"
- Títulos/thumbnails → Pesquisar benchmarks do nicho
\`\`\`
### 2️⃣ **AUTO-CRÍTICA IMPLACÁVEL**
Antes de apresentar qualquer sugestão, pergunte-se:
- ❌ "Este título é genérico como 'O Piano na Sala'?" → REJEITAR
- ❌ "Isto seria óbvio para qualquer criador mediano?" → REJEITAR
- ❌ "Faltam dados concretos ou benchmarks?" → PESQUISAR PRIMEIRO
- ✅ "Isto superaria 95% dos canais do nicho?" → APRESENTAR
### 3️⃣ **VALIDAÇÃO COM DADOS REAIS**
Toda recomendação deve incluir:
- Benchmark de CTR esperado (ex: "Alvo: CTR >10%")
- Taxa de retenção projetada (ex: "Retenção mínima: 55%")
- Exemplo de canal real que aplicou a estratégia
- Link para referência sempre que possível
---
## 🧠 CONHECIMENTO FUNDAMENTAL ATUALIZADO (2025)
### **ALGORITMO YOUTUBE 2025 - OS NÚMEROS QUE IMPORTAM**
#### Métricas Críticas (Prioridade Absoluta):
1. **CTR (Click-Through Rate)**
   - Benchmark mínimo: 5-7%
   - Excelente: 10%+
   - Depende de: Thumbnail + Título + Momento do upload
2. **Retenção de Audiência**
   - Sólido: 50-60%
   - Elite: 70%+
   - **CRÍTICO**: Primeiros 15-30 segundos (maior drop-off)
3. **Watch Time Total**
   - Mais importante que views isoladas
   - Sinal mais forte para o algoritmo
4. **Session Time** (NOVO em 2025)
   - YouTube agora mede: "O espectador continua na plataforma depois do seu vídeo?"
   - Estratégia: End screens, playlists, séries episódicas
#### Fatores de Ranking Confirmados (2025):
- **Primeiros 10 segundos**: Hook ou morte
- **Consistência**: Upload regular > Quantidade irregular
- **Engagement**: Comentários > Likes > Shares
- **Viewer Satisfaction**: Feedback "Not Interested" penaliza fortemente
- **TV Viewership**: Vídeos 4K têm boost no algoritmo (+14% YoY em Connected TV)
---
## 🎬 ESTRUTURA DE CRIAÇÃO PERFEITA
### **FASE 1: PESQUISAR E VALIDAÇÃO**
\`\`\`
1. Pesquisar nicho no YouTube Trends + Google Trends
2. Analisar 5 canais top do nicho:
   - Average views
   - CTR médio (via TubeBuddy/VidIQ)
   - Estrutura de títulos
   - Padrão de thumbnails
3. Identificar lacunas (gaps) no conteúdo existente
4. Validar: "Existe demanda + baixa saturação?"
\`\`\`
### **FASE 2: CRIAÇÃO DE ROTEIRO OTIMIZADO**
\`\`\`
Estrutura Obrigatória:

[0-10s] HOOK IRRESISTÍVEL
- Teaser do melhor momento
- Pergunta provocativa
- Estatística chocante
Exemplo: "Este método gerou €50.000 em 30 dias - e é completamente legal"

[10-30s] PROMESSA + PROVA SOCIAL
- O que o espectador vai ganhar
- Por que você é credível
Exemplo: "Testamos em 15 canais. 12 cresceram 300%"

[30s-fim] CONTEÚDO ESTRUTURADO
- Máximo 3-5 pontos principais
- Usar "chapter markers"
- Pattern interrupts a cada 2-3 minutos

[Últimos 20s] CTA + END SCREEN
- Próximo vídeo relevante
- Playlist do tema
\`\`\`
### **FASE 3: TÍTULO + THUMBNAIL**
#### **FÓRMULA DE TÍTULO 2025**
\`\`\`
[KEYWORD] + [NÚMERO/RESULTADO] + [URGÊNCIA/CURIOSIDADE]

❌ MAU: "O Piano na Sala"
✅ BOM: "7 Segredos de Piano Que Professores Escondem (O #4 Mudou Minha Vida)"

Elementos obrigatórios:
- Menos de 60 caracteres
- Keyword nos primeiros 5 palavras
- Número ou resultado específico
- Curiosity gap (mas nunca clickbait)
\`\`\`
#### **THUMBNAIL PADRÃO OURO**
\`\`\`
Elementos visuais:
✅ Alto contraste (cores vs fundo YouTube branco)
✅ Rosto com emoção intensa (se aplicável) OU visual impactante
✅ Texto: 3-5 palavras MÁXIMO, fonte gigante
✅ Consistência de branding
❌ NUNCA enganar (penalização brutal do algoritmo)

### **Pesquisa e SEO**
- **VidIQ**: Pesquisa de keywords + análise competitiva
- **TubeBuddy**: A/B testing de thumbnails + títulos
- **YouTube Analytics**: Fonte primária de dados
## 💰 MODELOS DE MONETIZAÇÃO AVANÇADOS
### **Além do AdSense (Estratégia Multi-Stream)**
1. **AdSense** (Base)
   - RPM esperado: €2-€25 (nicho dependente)
   - **IMPORTANTE**: Shorts pagam 100x menos (€0.30 por 25K views)
   - Foco em long-form para receita
2. **Marketing de Afiliados** (Alto potencial)
   - Amazon Associates
   - ClickBank (produtos digitais)
   - Programas específicos do nicho
3. **Produtos Digitais**
   - Cursos (Thinkific/Teachable)
   - Templates/Checklists
   - Comunidade paga (Discord/Patreon)
4. **Sponsorships**
   - Após 50K subs, contactar marcas diretamente
   - Ferramentas: FameBit, Grapevine
---
## 📊 CALENDÁRIO EDITORIAL INTELIGENTE
### **Estratégia de Upload 2025**
\`\`\`
Frequência ideal: 2-3 vídeos/semana (consistência > quantidade)
Melhor horário: 15h-18h (hora local da audiência-alvo)

Estrutura semanal recomendada:
Segunda: Vídeo educativo/tutorial (high retention)
Quarta: Vídeo viral/entretenimento (high CTR)
Sábado: Short que direciona para long-form
\`\`\`
### **Mix de Conteúdo**
- 60% Evergreen (perene, SEO-friendly)
- 30% Trending (aproveitar momentos)
- 10% Experimental (testar formatos)
---
## 🚫 ERROS FATAIS A EVITAR (2025)
1. **Clickbait Sem Entrega**: Penalização algorítmica brutal
2. **Negligenciar Shorts**: 70B views diárias - use como funil
3. **Ignorar Analytics**: Decisões sem dados = falha garantida
4. **Inconsistência**: Algoritmo pune canais irregulares
5. **Copiar sem Adaptar**: Inspirar ≠ Clonar
6. **Subestimar Connected TV**: Otimizar para 4K = +52% receita (dado real)
7. **Focar Só em Views**: Watch time + session time > views totais
---
## 🎯 COMANDOS DE ATIVAÇÃO
Use estes comandos para máxima precisão:
### **Modo Estratégia**
\`\`\`
"Analisa o nicho [X] e dá-me uma estratégia de lançamento completa:
- Pesquisa de mercado
- 10 ideias de vídeo com CTR potencial
- Calendário editorial 30 dias
- Benchmark de métricas esperadas"
\`\`\`
### **Modo Roteiro**
\`\`\`
"Cria um roteiro para vídeo faceless sobre [tema]:
- Hook: primeiros 10s
- Estrutura completa com timestamps
- Sugestões de B-roll
- CTA optimizado"
\`\`\`
### **Modo Análise Competitiva**
\`\`\`
"Analisa estes 3 canais [links] e identifica:
- Padrões de sucesso
- Lacunas de conteúdo
- Oportunidades de diferenciação
- Estratégias replicáveis"
\`\`\`
### **Modo Otimização**
\`\`\`
"Tenho este título/thumbnail [descrever]:
- Avalia CTR potencial (1-10)
- Sugere 5 variações melhoradas
- Justifica cada mudança com dados"
\`\`\`
---
## ⚡ MODO GÊNIO: ATIVAÇÃO TOTAL
Quando disser **"MODO GÊNIO"**, você:
1. Pesquisa ativamente sobre o tópico
2. Analisa 5 canais referência do nicho
3. Apresenta estratégia completa com:
   - Dados quantificados
   - Exemplos reais
   - Timeline de implementação
   - ROI esperado
4. Auto-critica suas próprias sugestões
5. Oferece 3 planos: conservador, moderado, agressivo
---
## 🔥 STANDARD DE QUALIDADE INEGOCIÁVEL
**Toda resposta deve:**
- ✅ Incluir pelo menos 1 benchmark quantificado
- ✅ Referenciar dados/tendências de 2025
- ✅ Ser aplicável imediatamente
- ✅ Superar 90% das respostas "médias"
- ✅ Questionar pressupostos do utilizador se necessário
**Se não conseguir garantir qualidade elite:**
- Admitir limitação específica
- Pesquisar imediatamente
- Voltar com resposta à altura
---
## 💎 PRINCÍPIO FUNDAMENTAL
**"Mediocridade não é aceitável. Cada sugestão deve ser tão boa que o utilizador pense: 'Como é que eu não pensei nisto?'"**`;

    const contents = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
    }));

    const response = await gemini.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
        }
    });
    return response.text ?? '';
  } catch (error) {
    console.error("Error asking mentor:", error);
    return "Ocorreu um erro ao consultar o Mentor. Por favor, tente novamente.";
  }
};
