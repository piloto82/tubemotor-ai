

export const LANGUAGE_OPTIONS = [
    { value: 'pt-br', label: 'Português (Brasil)' },
    { value: 'en-us', label: 'Inglês (EUA)' },
    { value: 'es', label: 'Espanhol' },
    { value: 'fr', label: 'Francês' },
    { value: 'de', label: 'Alemão' },
    { value: 'it', label: 'Italiano' },
    { value: 'jp', label: 'Japonês' },
    { value: 'kr', label: 'Coreano' },
];

export const TONE_OPTIONS = [
    { value: 'envolvente-misterioso', label: 'Envolvente e Misterioso' },
    { value: 'informativo-claro', label: 'Informativo e Claro' },
    { value: 'comico-divertido', label: 'Cômico e Divertido' },
    { value: 'serio-formal', label: 'Sério e Formal' },
    { value: 'inspirador-motivacional', label: 'Inspirador e Motivacional' },
];

export const STRUCTURE_FORMULA_OPTIONS = [
    {
        label: "FÓRMULAS DE ALTA RETENÇÃO",
        options: [
            { value: 'roteiro-completo-alta-retencao', label: 'ROTEIRO COMPLETO: ALTA RETENÇÃO' },
        ],
    },
    {
        label: "👶 INFANTIL",
        options: [
            { value: 'infantil-animacao-0-3', label: 'Animação infantil 0–3 anos' },
            { value: 'infantil-musica-0-3', label: 'Música infantil 0–3 anos' },
            { value: 'infantil-animacao-4-6', label: 'Animação infantil 4–6 anos' },
            { value: 'infantil-musica-4-6', label: 'Música infantil 4–6 anos' },
        ]
    },
    {
        label: "🧠 EDUCAÇÃO & REFLEXÃO",
        options: [
            { value: 'edu-curiosidades', label: 'Curiosidades do mundo' },
            { value: 'edu-historia-geral', label: 'História geral' },
            { value: 'edu-misterios-humanidade', label: 'Mistérios da humanidade' },
            { value: 'edu-e-se', label: '“E SE?” – hipóteses criativas' },
            { value: 'edu-filosofia', label: 'Filosofia aplicada' },
            { value: 'edu-psicologia', label: 'Psicanálise e Psicologia para o dia a dia' },
            { value: 'edu-autoajuda', label: 'Autoajuda / Motivacional' },
            { value: 'edu-meditacao', label: 'Mindfulness & Meditação guiada' },
            { value: 'edu-historia-americana', label: 'História Americana' },
            { value: 'edu-nostalgia-americana', label: 'Nostalgia Americana' },
            { value: 'edu-turismo', label: 'Turismo' },
            { value: 'edu-musica', label: 'Música' },
            { value: 'edu-historia-relacionamentos', label: 'História dos Relacionamentos' },
        ]
    },
    {
        label: "❤️ HISTÓRIAS & EMOÇÃO",
        options: [
            { value: 'hows-coracoes-de-wall-street', label: 'HOWS - Corações de Wall Street' },
            { value: 'hist-plot-twist', label: 'Histórias com plot twist e reviravolta' },
            { value: 'hist-finais-inteligentes', label: 'Histórias ficcionais com finais inteligentes' },
            { value: 'hist-terror-suspense', label: 'Contos e histórias de terror/suspense' },
            { value: 'hist-emocionantes', label: 'Histórias emocionantes (baseadas em fatos reais ou fictícias)' },
            { value: 'hist-superacao', label: 'Histórias de superação' },
            { value: 'hist-animais', label: 'Histórias com animais' },
            { value: 'hist-idosos', label: 'Histórias com idosos' },
            { value: 'hist-epoca', label: 'Histórias de época' },
            { value: 'hist-entrevistas-inspiradoras', label: 'Entrevistas inspiradoras com anônimos' },
            { value: 'hist-testemunhos-transformacao', label: 'Testemunhos e transformação (não religiosos)' },
            { value: 'hist-romance-interracial', label: 'Histórias de Romance interraciais' },
            { value: 'hist-relacionamentos-idades-diferentes', label: 'Histórias de relacionamentos de pessoas com idades diferentes' },
            { value: 'hist-romance-milionarios', label: 'Histórias de romance com milionários' },
            { value: 'hist-romance-milionarios-luxo', label: 'Histórias de romance com milionários (Luxo)' },
        ]
    },
    {
        label: "💪 SAÚDE & BEM-ESTAR",
        options: [
            { value: 'saude-emagrecimento', label: 'Emagrecimento e dietas saudáveis' },
            { value: 'saude-mental', label: 'Cuidados com a saúde mental' },
            { value: 'saude-terceira-idade', label: 'Saúde e cuidados na terceira idade' },
            { value: 'saude-rotinas-longevidade', label: 'Rotinas saudáveis e longevidade' },
        ]
    },
    {
        label: "📈 FINANÇAS & SUCESSO",
        options: [
            { value: 'fin-bitcoin-cripto', label: 'Bitcoin e Cripto para iniciantes' },
            { value: 'fin-como-ser-milionario', label: 'Como se tornar um milionário' },
            { value: 'fin-educacao-financeira', label: 'Educação financeira prática' },
            { value: 'fin-negocios-online', label: 'Negócios online e renda passiva' },
        ]
    },
    {
        label: "⚽ ESPORTES & ENTRETENIMENTO",
        options: [
            { value: 'esporte-futebol', label: 'Futebol: atualidades, análises e curiosidades' },
            { value: 'esporte-entretenimento', label: 'Entretenimento (Top 5, reacts, listas, cultura pop)' },
            { value: 'esporte-animacoes', label: 'Animações educativas ou de humor' },
        ]
    },
    {
        label: "CANAIS CRISTÃOS",
        options: [
            { value: 'bible-wisdom', label: 'BIBLE WISDOM - estudos bíblicos' },
            { value: 'canais-oracao', label: 'CANAIS DE ORAÇÃO - comunhão' },
            { value: 'faith-journey', label: 'FAITH JOURNEY - crescimento espiritual' },
            { value: 'gospel-share', label: 'GOSPEL SHARE - evangelização' },
            { value: 'praise-story', label: 'PRAISE STORY - histórias de fé' },
            { value: 'testimony-power', label: 'TESTIMONY POWER - testemunhos impactantes' },
            { value: 'evening-reflection', label: 'EVENING REFLECTION - reflexões noturnas' },
        ],
    },
    {
        label: "✝️ NÚCLEO RELIGIOSO (EXPANSÃO)",
        options: [
            { value: 'rel-oracoes-motivacionais', label: 'Orações motivacionais (força, coragem, fé)' },
            { value: 'rel-oracoes-temas', label: 'Orações por temas (trabalho, família, saúde, etc.)' },
            { value: 'rel-meditacoes-cristas', label: 'Meditações guiadas cristãs com música suave' },
            { value: 'rel-devocionais-faixa-etaria', label: 'Devocionais por faixa etária (jovens, casais, idosos)' },
            { value: 'rel-historias-biblicas-narradas', label: 'Histórias bíblicas narradas em estilo “audioconto”' },
            { value: 'rel-historia-santos', label: 'A história dos Santos (vida e biografia)' },
        ]
    },
    {
        label: "VIAGEM & CULTURA",
        options: [
            { value: 'culture-immersion', label: 'CULTURE IMMERSION (Exploração Cultural)' },
            { value: 'roteiro-viagem-alta-retencao', label: 'ROTEIRO COMPLETO: ALTA RETENÇÃO' },
        ],
    }
];

export const VIRAL_TITLES_GENERATION_TYPE_OPTIONS = [
    { value: 'ready', label: 'Gerar Títulos Prontos' },
    { value: 'structures', label: 'Gerar Estruturas de Títulos' },
];

export const ALL_VOICE_OPTIONS = [
    { value: 'Zephyr', label: 'Zephyr', description: 'Bright, Higher pitch' },
    { value: 'Puck', label: 'Puck', description: 'Upbeat, Middle pitch' },
    { value: 'Charon', label: 'Charon', description: 'Informative, Lower pitch' },
    { value: 'Kore', label: 'Kore', description: 'Firm, Middle pitch' },
    { value: 'Fenrir', label: 'Fenrir', description: 'Excitable, Lower middle pitch' },
    { value: 'Leda', label: 'Leda', description: 'Youthful, Higher pitch' },
    { value: 'Orus', label: 'Orus', description: 'Firm, Lower middle pitch' },
    { value: 'Aoede', label: 'Aoede', description: 'Breezy, Middle pitch' },
    { value: 'Callirrhoe', label: 'Callirrhoe', description: 'Easy-going, Middle pitch' },
    { value: 'Autonoe', label: 'Autonoe', description: 'Bright, Middle pitch' },
    { value: 'Enceladus', label: 'Enceladus', description: 'Breathy, Lower pitch' },
    { value: 'Iapetus', label: 'Iapetus', description: 'Clear, Lower middle pitch' },
    { value: 'Umbriel', label: 'Umbriel', description: 'Easy-going, Lower middle pitch' },
    { value: 'Algieba', label: 'Algieba', description: 'Smooth, Lower pitch' },
    { value: 'Despina', label: 'Despina', description: 'Smooth, Middle pitch' },
    { value: 'Erinome', label: 'Erinome', description: 'Clear, Middle pitch' },
    { value: 'Algenib', label: 'Algenib', description: 'Gravelly, Lower pitch' },
    { value: 'Rasalgethi', label: 'Rasalgethi', description: 'Informative, Middle pitch' },
    { value: 'Schedar', label: 'Schedar', description: 'Even, Lower middle pitch' },
    { value: 'Gacrux', label: 'Gacrux', description: 'Mature, Middle pitch' },
    { value: 'Pulcherrima', label: 'Pulcherrima', description: 'Forward, Middle pitch' },
    { value: 'Achird', label: 'Achird', description: 'Friendly, Lower middle pitch' },
    { value: 'Zubenelgenubi', label: 'Zubenelgenubi', description: 'Casual, Lower middle pitch' },
    { value: 'Vindemiatrix', label: 'Vindemiatrix', description: 'Gentle, Middle pitch' },
    { value: 'Sadachbia', label: 'Sadachbia', description: 'Lively, Lower pitch' },
    { value: 'Sadaltager', label: 'Sadaltager', description: 'Knowledgeable, Middle pitch' },
    { value: 'Sulafat', label: 'Sulafat', description: 'Warm, Middle pitch' },
];


export const THUMBNAIL_PROMPTS_AI_OPTIONS = [
    { value: 'midjourney', label: 'Midjourney' },
    { value: 'leonardo-ai', label: 'Leonardo.AI' },
    { value: 'dall-e-3', label: 'DALL-E 3' },
    { value: 'wisk', label: 'Wisk' },
    { value: 'nano-banana', label: 'Nano Banana' },
    { value: 'flux', label: 'Flux' },
    { value: 'freepik', label: 'Freepik' },
];

export const IMAGE_GENERATOR_ASPECT_RATIO_OPTIONS = [
    { value: '1:1', label: 'Quadrado (1:1)' },
    { value: '16:9', label: 'Paisagem (16:9)' },
    { value: '9:16', label: 'Retrato (9:16)' },
];

export const IMAGE_GENERATOR_STYLE_OPTIONS = [
    { value: 'realistic', label: 'Foto realista' },
    { value: 'cinematic', label: 'Cinemático' },
    { value: 'anime', label: 'Anime' },
    { value: '3d-render', label: 'Render 3D' },
    { value: 'pixel-art', label: 'Pixel Art' },
];

export const IMAGE_GENERATOR_MODEL_OPTIONS = [
    { value: 'imagefx', label: 'ImageFX' },
    { value: 'nanobanana', label: 'Nano Banana' },
];