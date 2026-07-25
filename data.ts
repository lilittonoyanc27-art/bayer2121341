import { SoundRule, StressWord, TongueTwister, QuizQuestion } from './types';

export const PHONETIC_RULES: SoundRule[] = [
  {
    id: 'vowels_purity',
    letter: 'A, E, I, O, U',
    ipa: '[a], [e], [i], [o], [u]',
    ruTranscription: '[А], [Э], [И], [О], [У]',
    title: 'Чёткость гласных (Без редукции!)',
    category: 'vowels',
    description: 'В испанском языке гласные НИКОГДА не меняют своего звучания в безударном положении.',
    ruComparison: 'В русском мы говорим «молоко» как [малако́]. В испанском «como» ВСЕГДА произносится как [ко́мо], а не [ка́ма]!',
    commonMistake: 'Главная ошибка русскоязычных — превращать безударную «О» в «А» (аканье) и «Е» в «И» (иканье).',
    mouthPosition: 'Рот открывается чётко. На букву O губы округлены, на E уголки губ слегка растянуты.',
    examples: [
      { spanish: 'Como', translationRu: 'Я ем', ruPhonetic: 'ко́-мо', stressIndex: 1 },
      { spanish: 'Маñana', translationRu: 'Завтра / утро', ruPhonetic: 'ма-нья́-на', stressIndex: 3 },
      { spanish: 'Elegante', translationRu: 'Элегантный', ruPhonetic: 'э-лэ-га́н-тэ', stressIndex: 5 },
      { spanish: 'Оrgullo', translationRu: 'Гордость', ruPhonetic: 'ор-гу́-йьо', stressIndex: 3 }
    ]
  },
  {
    id: 'hard_consonants',
    letter: 'T, D, N, L',
    ipa: '[t], [d], [n], [l]',
    ruTranscription: '[Т], [Д], [Н], [Л]',
    title: 'Твёрдость перед E и I (Без смягчения!)',
    category: 'consonants',
    description: 'Перед гласными E и I согласные в испанском остаются ТВЁРДЫМИ и НЕ смягчаются.',
    ruComparison: 'В русском слова «тема» или «дима» звучат с мягкими «ть» и «дь». В испанском «tema» произносится как [тэ́ма], а «día» как [ды́а / дэ́а] без смягчения!',
    commonMistake: 'Смягчение согласных (произносить «ть», «дь» вместо «т», «д»).',
    mouthPosition: 'Кончик языка упирается в заднюю поверхность верхних зубов (а альвеолы), звук твёрдый и сухой.',
    examples: [
      { spanish: 'Tema', translationRu: 'Тема', ruPhonetic: 'тэ́-ма', stressIndex: 1 },
      { spanish: 'Día', translationRu: 'День', ruPhonetic: 'ды́-а', stressIndex: 1 },
      { spanish: 'Tienda', translationRu: 'Магазин', ruPhonetic: 'тйэ́н-да', stressIndex: 2 },
      { spanish: 'Nieve', translationRu: 'Снег', ruPhonetic: 'ньйэ́-вэ', stressIndex: 2 }
    ]
  },
  {
    id: 'b_v_sound',
    letter: 'B / V',
    ipa: '[b] / [β]',
    ruTranscription: '[Б] / [Губно-губное Б/В]',
    title: 'Буквы B и V звучат ОДИНАКОВО!',
    category: 'special_letters',
    description: 'В испанском нет разницы между B и V! Различается лишь то, стоят ли они в начале слова/после N,M или между гласными.',
    ruComparison: 'В русском «В» произносится с прикосновением зубов к нижней губе. В испанском V — это губно-губной звук, ближе к «Б»!',
    commonMistake: 'Произносить V как русскую жесткую «В» с зубами.',
    mouthPosition: 'Между гласными губы НЕ смыкаются полностью, воздух проходит щелью [β]. В начале слова — твёрдое [Б].',
    examples: [
      { spanish: 'Vino', translationRu: 'Вино', ruPhonetic: 'бы́-но (бино)', stressIndex: 1 },
      { spanish: 'Bueno', translationRu: 'Хороший', ruPhonetic: 'бвэ́-но', stressIndex: 1 },
      { spanish: 'Vivir', translationRu: 'Жить', ruPhonetic: 'би-бы́рь', stressIndex: 3 },
      { spanish: 'Cerveza', translationRu: 'Пиво', ruPhonetic: 'сэр-бэ́-са', stressIndex: 4 }
    ]
  },
  {
    id: 'r_rr_sound',
    letter: 'R / RR',
    ipa: '[ɾ] / [r]',
    ruTranscription: '[Р мягкий одиночный] / [РРР раскатистый]',
    title: 'Одинарный R и Раскатистый RR',
    category: 'consonants',
    description: 'Одиночная R внутри слова слегка касательная [ɾ]. Двойная RR (и R в начале слова) — мощная вибрация кончика языка!',
    ruComparison: 'Разница смыслоразличительная: pero = «но», а perro = «собака»!',
    commonMistake: 'Произносить одинарную R слишком раскатисто или картавить (горловой звук).',
    mouthPosition: 'Кончик языка совершает один быстрый удар по альвеолам для R, и серию быстрых ударов для RR.',
    examples: [
      { spanish: 'Pero', translationRu: 'Но', ruPhonetic: 'пэ́-ро', stressIndex: 1 },
      { spanish: 'Perro', translationRu: 'Собака', ruPhonetic: 'пэ́-РР-о', stressIndex: 1 },
      { spanish: 'Rojo', translationRu: 'Красный', ruPhonetic: 'РР-о́-хо', stressIndex: 1 },
      { spanish: 'Carro', translationRu: 'Машина', ruPhonetic: 'ка́-РР-о', stressIndex: 1 }
    ]
  },
  {
    id: 'c_z_s_sound',
    letter: 'C, Z, S',
    ipa: '[θ] (Spain) / [s] (LatAm)',
    ruTranscription: '[С-межзубный θ] или [С обычный]',
    title: 'Буквы C, Z, S и Испанский Межзубный Звук',
    category: 'special_letters',
    description: 'В Испании C (перед e, i) и Z произносятся с языком между зубами [θ] (как в англ. think). В Латинской Америке всё как [С].',
    ruComparison: 'В русском такого звука нет. Похоже на шепелявую «С», когда кончик языка слегка высунут между зубами.',
    commonMistake: 'Смешивать или превращать в «Ц» (в испанском НЕТ звука Ц!).',
    mouthPosition: 'Для Испании: кончик языка помещается между верхними и нижними резцами, подается воздух.',
    examples: [
      { spanish: 'Zapato', translationRu: 'Туфля', ruPhonetic: 'θа-па́-то / са-па́-то', stressIndex: 3 },
      { spanish: 'Cero', translationRu: 'Ноль', ruPhonetic: 'θэ́-ро / сэ́-ро', stressIndex: 1 },
      { spanish: 'Gracias', translationRu: 'Спасибо', ruPhonetic: 'гра́-θйас / гра́-сйас', stressIndex: 2 },
      { spanish: 'Sol', translationRu: 'Солнце', ruPhonetic: 'со́ль', stressIndex: 1 }
    ]
  },
  {
    id: 'j_g_sound',
    letter: 'J / G (перед E, I)',
    ipa: '[x]',
    ruTranscription: '[Х горловой / Хотa]',
    title: 'Звук Jota (J) и G перед E, I',
    category: 'special_letters',
    description: 'Буква J (всегда) и G (перед E, I) произносятся как более глубокий, напряжённый русский звук [Х].',
    ruComparison: 'Похоже на хриплый русский звук [Х] в слове «хлеб», но рождающийся глубже в гортани.',
    commonMistake: 'Читать J как «ДЖ» или «Й» (как в английском «Jack»). В испанском J = [Х]!',
    mouthPosition: 'Задняя часть языка поднимается к мягкому нёбу, сужая щель для воздуха.',
    examples: [
      { spanish: 'Hola', translationRu: 'Привет (H не читается!)', ruPhonetic: 'о́-ла', stressIndex: 1 },
      { spanish: 'Jardín', translationRu: 'Сад', ruPhonetic: 'хар-ды́н', stressIndex: 4 },
      { spanish: 'Gente', translationRu: 'Люди', ruPhonetic: 'хэ́н-тэ', stressIndex: 1 },
      { spanish: 'Trabajo', translationRu: 'Работа', ruPhonetic: 'тра-ба́-хо', stressIndex: 3 }
    ]
  },
  {
    id: 'eñe_sound',
    letter: 'Ñ',
    ipa: '[ɲ]',
    ruTranscription: '[НЬ]',
    title: 'Испанская буква Ñ (Энье)',
    category: 'special_letters',
    description: 'Символ испанского языка. Произносится как мягкое слитое [НЬ] с полным прижатием спинки языка.',
    ruComparison: 'Похоже на русский мягкий [НЬ] в словах «конь», «день», но ещё более сочный.',
    commonMistake: 'Путать с Н+Й (произносить «нь-йа» раздельно вместо слитно «нья»).',
    mouthPosition: 'Спинка языка плотно прижимается к твердому нёбу.',
    examples: [
      { spanish: 'Español', translationRu: 'Испанский', ruPhonetic: 'эс-па-ньо́ль', stressIndex: 5 },
      { spanish: 'Niño', translationRu: 'Мальчик', ruPhonetic: 'ни́-ньо', stressIndex: 1 },
      { spanish: 'Señorita', translationRu: 'Девушка', ruPhonetic: 'се-ньо-ры́-та', stressIndex: 5 }
    ]
  },
  {
    id: 'll_y_sound',
    letter: 'LL / Y',
    ipa: '[ʝ] / [ɟʝ] / [ʃ]',
    ruTranscription: '[Й] / [ЙЬ мягкое] / [ЖЬ в Аргентине]',
    title: 'Звук Yeísmo (LL и Y)',
    category: 'special_letters',
    description: 'Буквосочетание LL и буква Y в большинстве стран произносятся как мягкое [Й] или легонькое [ЙЬ/ДЖЬ].',
    ruComparison: 'В Испании и Мексике: pollo = [по́йьо]. В Аргентине (Rioplatense): pollo = [по́шо] (как мягкое ш/ж)!',
    commonMistake: 'Читать LL как русское «ЛЛ» (произносить «полло» вместо «пойо»).',
    mouthPosition: 'Средняя часть языка поднимается к нёбу.',
    examples: [
      { spanish: 'Llama', translationRu: 'Пламя / Яма', ruPhonetic: 'йя́-ма (или ша́-ма в AR)', stressIndex: 1 },
      { spanish: 'Calle', translationRu: 'Улица', ruPhonetic: 'ка́-ййэ', stressIndex: 1 },
      { spanish: 'Yo', translationRu: 'Я', ruPhonetic: 'йо (или шо)', stressIndex: 1 }
    ]
  },
  {
    id: 'sinalefa_concept',
    letter: 'Sinalefa (Синалефа)',
    ipa: '[Синалефа]',
    ruTranscription: '[Слитие слов]',
    title: 'Сцепка слов в потоке речи',
    category: 'sinalefa',
    description: 'Если слово заканчивается на гласную, а следующее начинается на гласную (или немую H), они сливаются в один слог!',
    ruComparison: 'Испанцы не делают пауз между такими словами: «mi auto» произносится как «мьяуто»!',
    commonMistake: 'Делать рваные паузы между гласными в предложении.',
    mouthPosition: 'Плавный переход дыхания от одной гласной к другой без смыкания связок.',
    examples: [
      { spanish: 'De acuerdo', translationRu: 'Согласен', ruPhonetic: 'дэа-квэ́р-до', stressIndex: 2 },
      { spanish: 'Mi amigo', translationRu: 'Мой друг', ruPhonetic: 'мйа-мы́-го', stressIndex: 2 },
      { spanish: '¿Сómo estás?', translationRu: 'Как дела?', ruPhonetic: 'ко-мос-та́с', stressIndex: 6 }
    ]
  }
];

export const STRESS_RULES_WORDS: StressWord[] = [
  {
    id: 'sw1',
    word: 'hablar',
    cleanWord: 'hablar',
    translation: 'говорить',
    ruPhonetic: 'аб-ла́рь',
    stressType: 'aguda',
    stressedSyllableIndex: 0, // last syllable
    syllables: ['hab', 'lar'],
    stressedSyllableNum: 1,
    ruleExplanation: 'Заканчивается на R (согласную кроме N, S). Ударение на последнем слоге! (Aguda). Графическое ударение (tilde) НЕ нужно.',
    hasTilde: false
  },
  {
    id: 'sw2',
    word: 'canción',
    cleanWord: 'cancion',
    translation: 'песня',
    ruPhonetic: 'кан-сйа́н',
    stressType: 'aguda',
    stressedSyllableIndex: 0,
    syllables: ['can', 'ción'],
    stressedSyllableNum: 1,
    ruleExplanation: 'Заканчивается на N и ударение падает на последний слог. Нужна тильда над О! (Aguda со штрихом).',
    hasTilde: true
  },
  {
    id: 'sw3',
    word: 'casa',
    cleanWord: 'casa',
    translation: 'дом',
    ruPhonetic: 'ка́-са',
    stressType: 'llana',
    stressedSyllableIndex: 1,
    syllables: ['ca', 'sa'],
    stressedSyllableNum: 2,
    ruleExplanation: 'Заканчивается на гласную A. По правилу ударение на предпоследнем слоге (Llana). Тильда НЕ нужна.',
    hasTilde: false
  },
  {
    id: 'sw4',
    word: 'fácil',
    cleanWord: 'facil',
    translation: 'лёгкий / простой',
    ruPhonetic: 'фа́-силь',
    stressType: 'llana',
    stressedSyllableIndex: 1,
    syllables: ['fá', 'cil'],
    stressedSyllableNum: 2,
    ruleExplanation: 'Заканчивается на L (согласная не N,S), но ударение на предпоследнем слоге. Исключение — ставится тильда!',
    hasTilde: true
  },
  {
    id: 'sw5',
    word: 'música',
    cleanWord: 'musica',
    translation: 'музыка',
    ruPhonetic: 'му́-си-ка',
    stressType: 'esdrujula',
    stressedSyllableIndex: 2,
    syllables: ['mú', 'si', 'ca'],
    stressedSyllableNum: 3,
    ruleExplanation: 'Ударение на третьем слоге с конца (Esdrújula). Все слова типа Esdrújula ВСЕГДА пишутся с тильдой!',
    hasTilde: true
  },
  {
    id: 'sw6',
    word: 'rápido',
    cleanWord: 'rapido',
    translation: 'быстрый',
    ruPhonetic: 'ра́-пи-до',
    stressType: 'esdrujula',
    stressedSyllableIndex: 2,
    syllables: ['rá', 'pi', 'do'],
    stressedSyllableNum: 3,
    ruleExplanation: 'Слово Esdrújula (ударение на 3-й слог от конца) — обязательный графический знак ударения.',
    hasTilde: true
  },
  {
    id: 'sw7',
    word: 'teléfono',
    cleanWord: 'telefono',
    translation: 'телефон',
    ruPhonetic: 'те-ле́-фо-но',
    stressType: 'esdrujula',
    stressedSyllableIndex: 2,
    syllables: ['te', 'lé', 'fo', 'no'],
    stressedSyllableNum: 3,
    ruleExplanation: 'Ударение на 3-й слог от конца (té-lé-fo-no). Обязательно пишем с тильдой над É.',
    hasTilde: true
  },
  {
    id: 'sw8',
    word: 'español',
    cleanWord: 'espanol',
    translation: 'испанский',
    ruPhonetic: 'эс-па-ньо́ль',
    stressType: 'aguda',
    stressedSyllableIndex: 0,
    syllables: ['es', 'pa', 'ñol'],
    stressedSyllableNum: 1,
    ruleExplanation: 'Оканчивается на L. По правилу ударение на последний слог. Тильда не ставится.',
    hasTilde: false
  }
];

export const TONGUE_TWISTERS: TongueTwister[] = [
  {
    id: 'tt1',
    titleRu: 'Про собаку и колесо (R / RR)',
    spanishText: 'Ere con ere cigarro, ere con ere barril. Rápido ruedan los carros cargados de azúcar del ferrocarril.',
    translationRu: 'Эре с эре сигара, эре с эре бочка. Быстро катятся вагоны железной дороги, груженные сахаром.',
    ruPhonetic: 'Э-рэ кон э-рэ си-га́-рр-о, э-рэ кон э-рэ ба-рр-и́ль. Ра́-пи-до рвэ́-дан лос ка́-рр-ос кар-га́-дос дэ а-су́-кар дэль фэ-рро-ка-рр-и́ль.',
    difficulty: 'Легко',
    focusSound: 'Раскатистый [РР]',
    tips: 'Главное — сильная вибрация кончика языка на словах "barril", "carros", "ferrocarril".'
  },
  {
    id: 'tt2',
    titleRu: 'Про Теклу и трёх птиц (T / C / R)',
    spanishText: 'Tres tristes tigres tragaban trigo en un trigal en un trigal tragaban trigo tres tristes tigres.',
    translationRu: 'Три грустных тигра ели пшеницу на пшеничном поле.',
    ruPhonetic: 'Трэс три́с-тэс ты́-грэс тра-га́-бан три́-го эн ун три-га́ль...',
    difficulty: 'Средне',
    focusSound: 'Твёрдость [ТР]',
    tips: 'Не смягчайте "ТР"! Произносите "Т" твёрдо без ухода в "ТЬ".'
  },
  {
    id: 'tt3',
    titleRu: 'Про Педро и корону (P / R / C)',
    spanishText: 'Pedro Pablo Pérez Pereira, pobre pintor portugués, pinta preciosos paisajes por poca plata para poder pasar por París.',
    translationRu: 'Педро Пабло Перес Перейра, бедный португальский художник, пишет прекрасные пейзажи за небольшие деньги.',
    ruPhonetic: 'Пе́-дро Па́б-ло Пе́-рэс Пе-рэ́й-ра, по́-брэ пин-то́р пор-ту-гэ́с...',
    difficulty: 'Хардкор',
    focusSound: 'Чёткая взрывная [P]',
    tips: 'В испанском P не имеет придыхания, как в английском! Чёткие губы.'
  },
  {
    id: 'tt4',
    titleRu: 'Про чёртенка и стакан (CH / C)',
    spanishText: 'Pancha plancha con cuatro planchas. ¿Con cuántas planchas plancha Pancha?',
    translationRu: 'Панча гладит четырьмя утюгами. Сколькими утюгами гладит Панча?',
    ruPhonetic: 'Па́н-ча пла́н-ча кон ква́-тро пла́н-час. Кон ква́н-тас пла́н-час пла́н-ча Па́н-ча?',
    difficulty: 'Легко',
    focusSound: 'Звук [Ч]',
    tips: 'Звук CH в испанском более мягкий и четкий, чем в русском.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'ru_mistake_check',
    question: 'Какая главная ошибка русскоязычных при произношении слова "como" (я ем)?',
    options: [
      'Превращать безударную "O" в "A" и произносить "кама"',
      'Произносить C как "Ц"',
      'Смягчать M и произносить "комё"',
      'Забывать букву O'
    ],
    correctIndex: 0,
    explanation: 'В испанском языке гласная O ВСЕГДА четкая! "Аканье" (превращение безударной O в A) — самая частая ошибка русскоговорящих.',
    hintRu: 'Вспомните правило отсутствия редукции гласных!'
  },
  {
    id: 'q2',
    type: 'sound_identification',
    question: 'Как звучат буквы B и V в испанском языке?',
    options: [
      'Совершенно одинаково (губно-губной звук без зубов)',
      'V произносится строго как русская В, а B как Б',
      'V не читается вообще',
      'B произносится как английская W'
    ],
    correctIndex: 0,
    explanation: 'В испанском нет фонологического различия между B и V. Произношение зависит только от позиции в слове (смыкание губ [b] или щелевой [β]).',
    hintRu: 'Подумайте о словах vino и bueno.'
  },
  {
    id: 'q3',
    type: 'stress_identify',
    question: 'Куда падает естественное ударение в слове "hablar" (заканчивается на R)?',
    options: [
      'На последний слог (hab-LAR) — Aguda',
      'На первый слог (HAB-lar) — Llana',
      'На третий слог',
      'Ударения нет'
    ],
    correctIndex: 0,
    explanation: 'Если слово оканчивается на любую согласную, КРОМЕ N и S (в данном случае R), естественное ударение падает на ПОСЛЕДНИЙ слог (Palabras Agudas).',
    hintRu: 'Правило Agudas для согласных кроме N, S.'
  },
  {
    id: 'q4',
    type: 'sound_identification',
    question: 'Как читается H в испанском слове "Hola"?',
    options: [
      'Нe читается вообще ("ола")',
      'Как русская "Х"',
      'Как английская "H"',
      'Как "Г"'
    ],
    correctIndex: 0,
    explanation: 'Буква H (hache) в испанском языке является «немой» и никогда не произносится (за исключением буквосочетания CH).',
    hintRu: 'Hache es muda!'
  },
  {
    id: 'q5',
    type: 'stress_identify',
    question: 'Почему в слове "música" обязательно пишется графическое ударение (tilde)?',
    options: [
      'Потому что ударение падает на 3-й слог от конца (Esdrújula) — они ВСЕГДА с тильдой',
      'Просто для красоты',
      'Потому что слово оканчивается на гласную',
      'Из-за иностранного происхождения'
    ],
    correctIndex: 0,
    explanation: 'Слова категории Esdrújulas (ударение на третьем слоге с конца) ВСЕГДА пишутся со знаком tilde над ударной гласной.',
    hintRu: 'Правило Esdrújulas.'
  }
];
