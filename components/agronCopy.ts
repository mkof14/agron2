type Lang = 'en' | 'ru' | 'uk' | 'de' | 'fr' | 'es' | 'ja' | 'ar' | 'he';

export const getLang = (language: string): Lang => {
  const key = language.split('-')[0] as Lang;
  return ['en', 'ru', 'uk', 'de', 'fr', 'es', 'ja', 'ar', 'he'].includes(key) ? key : 'en';
};

const copy = {
  en: {
    common: { presentation: 'Company Presentation', openDeck: 'Open Deck', exploreSystem: 'Explore System' },
    home: {
      badge: 'Aerial-Ground Robotics Operations Network',
      title: 'AGRON Ecosystem',
      subtitle: 'From research to mission execution. Complete operational capability for unmanned systems.',
      bottleneck: 'Market bottleneck',
      bottleneckTitle: 'Hardware exists. Capability is the constraint.',
      gaps: ['Right decisions', 'Highly trained personnel', 'Unified operations management', 'Practical mission execution'],
      structure: 'Operational structure',
      structureTitle: 'Four layers. One mission path.',
      sectorsTitle: 'Unified security and operations for infrastructure.',
      sectorsText: 'AGRON connects research, trained operators, execution control, and field operations for sectors where reliability matters.',
      why: 'Why AGRON',
      whyTitle: 'Built in live operational conditions.',
      ctaTitle: 'Start with the AGRON company presentation.',
      ctaText: 'Use the presentation hub for the full deck and connected materials.'
    },
    about: {
      badge: 'About AGRON',
      title: 'Complete operational capability.',
      subtitle: 'AGRON organizes the path from knowledge to capabilities: research, trained personnel, execution control, and mission operations.',
      sectionTitle: 'What the ecosystem contains.',
      sectionText: 'The ecosystem is not a collection of disconnected companies. Each layer has a function in the operational chain.',
      thesis: 'Operational thesis',
      thesisTitle: 'The market lacks unified operations management.',
      thesisText: ['The world invests in drones, sensors, AI, and manufacturing.', 'The real bottleneck is the capability to decide, train, coordinate, and execute missions under real conditions.', 'AGRON is built around that operational bottleneck.'],
      chain: 'Core operating chain',
      ctaTitle: 'Review the full company presentation.',
      ctaText: 'The presentation hub remains the place for PDF decks, connected materials, and video.'
    },
    gda: {
      badge: 'GDA layer',
      title: 'Training is part of execution capability.',
      subtitle: 'AGRON uses the GDA operator base to turn training into deployable capacity for unmanned operations.',
      metric: '8,500+ trained specialists.',
      metricText: 'Operators and instructors become useful to customers only when they are connected to mission standards, coordination, and delivery control.'
    },
    agron: {
      badge: 'AGRON execution layer',
      title: 'From research to mission execution.',
      subtitle: 'AGRON controls the operational path between mission demand, operator capacity, field execution, and data delivery.',
      managementLabel: 'Primary company direction',
      managementTitle: 'Management of autonomous operations.',
      managementSubtitle: 'AGRON structures and controls the operating path for unmanned and distributed execution.',
      managementItems: ['Drones', 'Robotic systems', 'Autonomous devices', 'Remote operations', 'Distributed teams', 'Missions', 'Control centers'],
      technologyLabel: 'AGRON Technology',
      technologyTitle: 'Development of proprietary technologies.',
      technologySubtitle: 'AGRON builds the technical layer required to manage equipment, data, automation, and remote execution.',
      technologyItems: ['Software', 'Control systems', 'AI modules', 'Automation', 'Equipment integration', 'Data exchange', 'Analytics', 'Remote operations support'],
      flow: [
        ['Research', 'Mission conditions are analyzed before execution starts.'],
        ['Plan', 'Tasks, area, operators, equipment, and risks are defined.'],
        ['Execute', 'Work follows one controlled process instead of ad-hoc coordination.'],
        ['Deliver', 'Outputs are standardized for management and decision support.']
      ],
      architectureLabel: 'Execution Architecture',
      architectureTitle: 'How AGRON controls the mission path.',
      architectureText: 'AGRON separates mission demand from local execution and reconnects both through a controlled operating structure.',
      architecture: [
        ['Demand Intake', 'Mission request, site, timing, risk, required output, and capability need.'],
        ['Mission Definition', 'Area, task package, data requirements, equipment, compliance, and delivery standard.'],
        ['Capacity Assignment', 'Operator, coordinator, specialist, hardware, and support resources selected by requirement.'],
        ['Execution Control', 'Work follows a defined process with monitoring, communication, telemetry, and escalation.'],
        ['Data Delivery', 'Outputs are processed, reviewed, standardized, and delivered for operational decisions.'],
        ['Feedback Loop', 'Mission results update workflows, workforce readiness, reporting templates, and future assignment.']
      ],
      capabilities: [
        ['Defined process', 'Mission definition, assignment, execution, and delivery are structured before deployment.'],
        ['Operational control', 'Coordination is managed through one execution flow instead of separate local decisions.'],
        ['Standard output', 'Results are delivered in a usable format for management, reporting, and further analysis.']
      ]
    },
    isdri: {
      badge: 'ISDRI layer',
      title: 'Every solution begins with analysis.',
      subtitle: 'ISDRI provides the spatial data, modeling, technology evaluation, and field validation layer for AGRON operations.',
      finalTitle: 'Analysis is part of execution control.',
      finalText: 'AGRON does not separate data from operations. Mission planning, field execution, and reporting all depend on the quality of the analytical layer before deployment.'
    },
    guard: {
      badge: 'GUARD layer',
      title: 'Ground and air defense operations.',
      subtitle: 'From plan to results. Real mission execution for authorized security, infrastructure, and defense-related use cases.',
      section: 'Capabilities',
      sectionTitle: 'Controlled execution for high-consequence environments.',
      noteTitle: 'Compliance and authorization come first.',
      noteText: 'Defense and security use cases require proper authorization, jurisdictional compliance, and defined operating procedures.'
    },
    investors: {
      badge: 'Investor view',
      title: 'The capability gap is the opportunity.',
      subtitle: 'Drones, sensors, AI, and manufacturing are expanding. The bottleneck is practical mission execution.',
      thesis: 'Investment thesis',
      thesisTitle: 'AGRON scales operational capability, not hardware.',
      thesisText: 'The company sits between demand for unmanned operations and the capacity required to execute them reliably.',
      proof: 'Operational proof',
      proofTitle: 'Real environments shorten the development cycle.',
      modelTitle: 'Contracts first. System scale next.',
      modelText: 'Revenue starts with execution work, contracts, integrations, and custom deployments. Scale comes from repeatable operating structure and system access.'
    }
  },
  ru: {
    common: { presentation: 'Презентация компании', openDeck: 'Открыть презентацию', exploreSystem: 'Смотреть систему' },
    home: {
      badge: 'Сеть воздушно-наземных роботизированных операций',
      title: 'Экосистема AGRON',
      subtitle: 'От исследований к выполнению миссий. Полная операционная способность для беспилотных систем.',
      bottleneck: 'Ограничение рынка',
      bottleneckTitle: 'Оборудование есть. Ограничение — способность выполнять.',
      gaps: ['Правильные решения', 'Подготовленные специалисты', 'Единое управление операциями', 'Практическое выполнение миссий'],
      structure: 'Операционная структура',
      structureTitle: 'Четыре слоя. Один путь миссии.',
      sectorsTitle: 'Единая безопасность и операции для инфраструктуры.',
      sectorsText: 'AGRON соединяет исследования, операторов, контроль исполнения и полевые операции там, где важна надежность.',
      why: 'Почему AGRON',
      whyTitle: 'Создано в реальных операционных условиях.',
      ctaTitle: 'Начните с презентации компании AGRON.',
      ctaText: 'Используйте раздел презентаций для полной колоды и связанных материалов.'
    },
    about: {
      badge: 'О AGRON',
      title: 'Полная операционная способность.',
      subtitle: 'AGRON выстраивает путь от знаний к возможностям: исследования, подготовленные люди, контроль исполнения и миссии.',
      sectionTitle: 'Что содержит экосистема.',
      sectionText: 'Экосистема — не набор отдельных компаний. Каждый слой выполняет функцию в операционной цепочке.',
      thesis: 'Операционный тезис',
      thesisTitle: 'Рынку не хватает единого управления операциями.',
      thesisText: ['Мир инвестирует в дроны, сенсоры, AI и производство.', 'Главное ограничение — способность принимать решения, обучать, координировать и выполнять миссии в реальных условиях.', 'AGRON построен вокруг этого операционного ограничения.'],
      chain: 'Основная операционная цепочка',
      ctaTitle: 'Посмотрите полную презентацию компании.',
      ctaText: 'Раздел презентаций остается местом для PDF, связанных материалов и видео.'
    },
    gda: {
      badge: 'Слой GDA',
      title: 'Обучение является частью способности выполнять.',
      subtitle: 'AGRON использует базу операторов GDA, чтобы превращать обучение в развертываемую емкость.',
      metric: '8,500+ подготовленных специалистов.',
      metricText: 'Операторы и инструкторы полезны клиентам, когда связаны со стандартами миссий, координацией и контролем доставки.'
    },
    agron: {
      badge: 'Слой исполнения AGRON',
      title: 'От исследования к выполнению миссии.',
      subtitle: 'AGRON контролирует путь между спросом на миссию, емкостью операторов, полевым исполнением и доставкой данных.',
      managementLabel: 'Основное направление компании',
      managementTitle: 'Управление автономными операциями.',
      managementSubtitle: 'AGRON структурирует и контролирует операционный путь для беспилотного и распределенного исполнения.',
      managementItems: ['Дроны', 'Роботизированные системы', 'Автономные устройства', 'Удаленные операции', 'Распределенные команды', 'Миссии', 'Центры управления'],
      technologyLabel: 'AGRON Technology',
      technologyTitle: 'Разработка собственных технологий.',
      technologySubtitle: 'AGRON создает технический слой для управления оборудованием, данными, автоматизацией и удаленным исполнением.',
      technologyItems: ['Программное обеспечение', 'Системы управления', 'AI-модули', 'Автоматизация', 'Интеграция оборудования', 'Обмен данными', 'Аналитика', 'Поддержка удаленных операций'],
      flow: [
        ['Исследование', 'Условия миссии анализируются до начала выполнения.'],
        ['Планирование', 'Определяются задачи, зона, операторы, оборудование и риски.'],
        ['Выполнение', 'Работа идет по одному контролируемому процессу вместо ручной координации.'],
        ['Доставка', 'Результаты стандартизируются для управления и принятия решений.']
      ],
      architectureLabel: 'Архитектура исполнения',
      architectureTitle: 'Как AGRON контролирует путь миссии.',
      architectureText: 'AGRON отделяет спрос на миссию от локального исполнения и соединяет их через контролируемую операционную структуру.',
      architecture: [
        ['Прием запроса', 'Запрос миссии, объект, сроки, риск, нужный результат и требуемая способность.'],
        ['Определение миссии', 'Зона, пакет задач, требования к данным, оборудование, соответствие и стандарт доставки.'],
        ['Назначение ресурсов', 'Оператор, координатор, специалист, оборудование и поддержка выбираются по требованиям.'],
        ['Контроль исполнения', 'Работа идет по процессу с мониторингом, коммуникацией, телеметрией и эскалацией.'],
        ['Доставка данных', 'Результаты обрабатываются, проверяются, стандартизируются и передаются для решений.'],
        ['Обратная связь', 'Итоги миссии обновляют процессы, готовность команды, шаблоны отчетов и будущие назначения.']
      ],
      capabilities: [
        ['Определенный процесс', 'Определение миссии, назначение, выполнение и доставка структурируются до развертывания.'],
        ['Операционный контроль', 'Координация управляется через единый поток исполнения вместо отдельных локальных решений.'],
        ['Стандартный результат', 'Результаты передаются в формате, пригодном для управления, отчетности и анализа.']
      ]
    },
    isdri: {
      badge: 'Слой ISDRI',
      title: 'Каждое решение начинается с анализа.',
      subtitle: 'ISDRI дает слой пространственных данных, моделирования, оценки технологий и полевой проверки.',
      finalTitle: 'Анализ является частью контроля исполнения.',
      finalText: 'AGRON не отделяет данные от операций. Планирование, исполнение и отчетность зависят от качества аналитического слоя.'
    },
    guard: {
      badge: 'Слой GUARD',
      title: 'Наземные и воздушные оборонные операции.',
      subtitle: 'От плана к результатам. Реальное выполнение миссий для авторизованных задач безопасности и инфраструктуры.',
      section: 'Возможности',
      sectionTitle: 'Контролируемое исполнение для критически важных сред.',
      noteTitle: 'Сначала соответствие и разрешения.',
      noteText: 'Оборонные и security-сценарии требуют авторизации, соблюдения юрисдикции и определенных процедур.'
    },
    investors: {
      badge: 'Для инвесторов',
      title: 'Разрыв в способности выполнять — это возможность.',
      subtitle: 'Дроны, сенсоры, AI и производство растут. Узкое место — практическое выполнение миссий.',
      thesis: 'Инвестиционный тезис',
      thesisTitle: 'AGRON масштабирует операционную способность, а не оборудование.',
      thesisText: 'Компания находится между спросом на беспилотные операции и емкостью, нужной для надежного исполнения.',
      proof: 'Операционное подтверждение',
      proofTitle: 'Реальная среда ускоряет разработку.',
      modelTitle: 'Сначала контракты. Затем масштаб системы.',
      modelText: 'Выручка начинается с исполнения, контрактов, интеграций и custom deployments. Масштаб — из повторяемой структуры.'
    }
  }
};

type AgronCopyShape = typeof copy.en;

const fallbackLanguages: Record<Exclude<Lang, 'en' | 'ru'>, AgronCopyShape> = {
  uk: {
    ...copy.en,
    common: { presentation: 'Презентація компанії', openDeck: 'Відкрити презентацію', exploreSystem: 'Переглянути систему' },
    home: { ...copy.ru.home, title: 'Екосистема AGRON', subtitle: 'Від досліджень до виконання місій. Повна операційна спроможність для безпілотних систем.' },
    about: { ...copy.ru.about, badge: 'Про AGRON', title: 'Повна операційна спроможність.' },
    gda: { ...copy.ru.gda, badge: 'Шар GDA', title: 'Навчання є частиною спроможності виконання.' },
    agron: {
      ...copy.ru.agron,
      badge: 'Шар виконання AGRON',
      title: 'Від дослідження до виконання місії.',
      subtitle: 'AGRON контролює шлях між попитом на місію, місткістю операторів, польовим виконанням і доставкою даних.',
      managementLabel: 'Основний напрям компанії',
      managementTitle: 'Управління автономними операціями.',
      managementSubtitle: 'AGRON структурує і контролює операційний шлях для безпілотного та розподіленого виконання.',
      managementItems: ['Дрони', 'Роботизовані системи', 'Автономні пристрої', 'Віддалені операції', 'Розподілені команди', 'Місії', 'Центри управління'],
      technologyTitle: 'Розробка власних технологій.',
      technologySubtitle: 'AGRON створює технічний шар для управління обладнанням, даними, автоматизацією та віддаленим виконанням.',
      technologyItems: ['Програмне забезпечення', 'Системи управління', 'AI-модулі', 'Автоматизація', 'Інтеграція обладнання', 'Обмін даними', 'Аналітика', 'Підтримка віддалених операцій']
    },
    isdri: { ...copy.ru.isdri, badge: 'Шар ISDRI' },
    guard: { ...copy.ru.guard, badge: 'Шар GUARD' },
    investors: { ...copy.ru.investors, badge: 'Для інвесторів' }
  },
  de: {
    ...copy.en,
    common: { presentation: 'Unternehmensprasentation', openDeck: 'Deck offnen', exploreSystem: 'System ansehen' },
    home: { ...copy.en.home, title: 'AGRON Ecosystem', subtitle: 'Von Forschung bis Missionsausfuhrung. Vollstandige operative Fahigkeit fur unbemannte Systeme.' },
    about: { ...copy.en.about, badge: 'Uber AGRON' },
    gda: { ...copy.en.gda, title: 'Training ist Teil der Ausfuhrungsfahigkeit.' },
    agron: {
      ...copy.en.agron,
      title: 'Von Forschung bis Missionsausfuhrung.',
      subtitle: 'AGRON kontrolliert den operativen Pfad zwischen Missionsbedarf, Operator-Kapazitat, Feldausfuhrung und Datenlieferung.',
      managementLabel: 'Zentrale Ausrichtung des Unternehmens',
      managementTitle: 'Management autonomer Operationen.',
      managementSubtitle: 'AGRON strukturiert und kontrolliert den Betriebsablauf fur unbemannte und verteilte Ausfuhrung.',
      managementItems: ['Drohnen', 'Robotische Systeme', 'Autonome Gerate', 'Remote-Operationen', 'Verteilte Teams', 'Missionen', 'Kontrollzentren'],
      technologyTitle: 'Entwicklung eigener Technologien.',
      technologySubtitle: 'AGRON baut die technische Ebene fur Ausrustung, Daten, Automatisierung und Remote-Ausfuhrung.',
      technologyItems: ['Software', 'Steuerungssysteme', 'AI-Module', 'Automatisierung', 'Gerateintegration', 'Datenaustausch', 'Analytik', 'Unterstutzung von Remote-Operationen']
    },
    isdri: { ...copy.en.isdri, title: 'Jede Losung beginnt mit Analyse.' },
    guard: { ...copy.en.guard, title: 'Boden- und Luftverteidigungsoperationen.' },
    investors: { ...copy.en.investors, badge: 'Investoren' }
  },
  fr: {
    ...copy.en,
    common: { presentation: 'Presentation entreprise', openDeck: 'Ouvrir le deck', exploreSystem: 'Voir le systeme' },
    home: { ...copy.en.home, title: 'Ecosysteme AGRON', subtitle: 'De la recherche a l execution de mission. Capacite operationnelle complete pour systemes sans equipage.' },
    about: { ...copy.en.about, badge: 'A propos d AGRON' },
    gda: { ...copy.en.gda, title: 'La formation fait partie de la capacite d execution.' },
    agron: {
      ...copy.en.agron,
      title: 'De la recherche a l execution de mission.',
      subtitle: 'AGRON controle le parcours operationnel entre la demande de mission, la capacite des operateurs, l execution terrain et la livraison des donnees.',
      managementLabel: 'Direction principale de l entreprise',
      managementTitle: 'Gestion des operations autonomes.',
      managementSubtitle: 'AGRON structure et controle le chemin operationnel pour l execution sans equipage et distribuee.',
      managementItems: ['Drones', 'Systemes robotises', 'Appareils autonomes', 'Operations a distance', 'Equipes distribuees', 'Missions', 'Centres de controle'],
      technologyTitle: 'Developpement de technologies proprietaires.',
      technologySubtitle: 'AGRON construit la couche technique pour gerer les equipements, les donnees, l automatisation et l execution a distance.',
      technologyItems: ['Logiciels', 'Systemes de controle', 'Modules AI', 'Automatisation', 'Integration des equipements', 'Echange de donnees', 'Analytique', 'Support des operations a distance']
    },
    isdri: { ...copy.en.isdri, title: 'Chaque solution commence par l analyse.' },
    guard: { ...copy.en.guard, title: 'Operations de defense au sol et dans les airs.' },
    investors: { ...copy.en.investors, badge: 'Investisseurs' }
  },
  es: {
    ...copy.en,
    common: { presentation: 'Presentacion de la compania', openDeck: 'Abrir deck', exploreSystem: 'Ver sistema' },
    home: { ...copy.en.home, title: 'Ecosistema AGRON', subtitle: 'De investigacion a ejecucion de misiones. Capacidad operativa completa para sistemas no tripulados.' },
    about: { ...copy.en.about, badge: 'Acerca de AGRON' },
    gda: { ...copy.en.gda, title: 'La formacion es parte de la capacidad de ejecucion.' },
    agron: {
      ...copy.en.agron,
      title: 'De investigacion a ejecucion de misiones.',
      subtitle: 'AGRON controla el camino operativo entre la demanda de mision, la capacidad de operadores, la ejecucion en campo y la entrega de datos.',
      managementLabel: 'Direccion principal de la compania',
      managementTitle: 'Gestion de operaciones autonomas.',
      managementSubtitle: 'AGRON estructura y controla el flujo operativo para ejecucion no tripulada y distribuida.',
      managementItems: ['Drones', 'Sistemas roboticos', 'Dispositivos autonomos', 'Operaciones remotas', 'Equipos distribuidos', 'Misiones', 'Centros de control'],
      technologyTitle: 'Desarrollo de tecnologias propias.',
      technologySubtitle: 'AGRON construye la capa tecnica para gestionar equipos, datos, automatizacion y ejecucion remota.',
      technologyItems: ['Software', 'Sistemas de control', 'Modulos AI', 'Automatizacion', 'Integracion de equipos', 'Intercambio de datos', 'Analitica', 'Soporte de operaciones remotas']
    },
    isdri: { ...copy.en.isdri, title: 'Cada solucion comienza con analisis.' },
    guard: { ...copy.en.guard, title: 'Operaciones de defensa terrestre y aerea.' },
    investors: { ...copy.en.investors, badge: 'Inversionistas' }
  },
  ja: {
    ...copy.en,
    common: { presentation: '会社プレゼンテーション', openDeck: '資料を開く', exploreSystem: 'システムを見る' },
    home: { ...copy.en.home, title: 'AGRON エコシステム', subtitle: '研究からミッション実行へ。無人システムの完全な運用能力。' },
    about: { ...copy.en.about, badge: 'AGRONについて' },
    gda: { ...copy.en.gda, title: '訓練は実行能力の一部です。' },
    agron: {
      ...copy.en.agron,
      title: '研究からミッション実行へ。',
      subtitle: 'AGRONは、ミッション需要、オペレーター能力、現場実行、データ提供の間の運用経路を制御します。',
      managementLabel: '会社の主要領域',
      managementTitle: '自律運用の管理。',
      managementSubtitle: 'AGRONは、無人および分散型実行の運用経路を構造化し制御します。',
      managementItems: ['ドローン', 'ロボットシステム', '自律デバイス', '遠隔運用', '分散チーム', 'ミッション', '管制センター'],
      technologyTitle: '独自技術の開発。',
      technologySubtitle: 'AGRONは、機器、データ、自動化、遠隔実行を管理するための技術レイヤーを構築します。',
      technologyItems: ['ソフトウェア', '制御システム', 'AIモジュール', '自動化', '機器統合', 'データ交換', '分析', '遠隔運用サポート']
    },
    isdri: { ...copy.en.isdri, title: 'すべての解決策は分析から始まります。' },
    guard: { ...copy.en.guard, title: '地上および航空防衛運用。' },
    investors: { ...copy.en.investors, badge: '投資家向け' }
  },
  ar: {
    ...copy.en,
    common: { presentation: 'عرض الشركة', openDeck: 'فتح العرض', exploreSystem: 'عرض النظام' },
    home: { ...copy.en.home, title: 'منظومة AGRON', subtitle: 'من البحث إلى تنفيذ المهمة. قدرة تشغيلية كاملة للأنظمة غير المأهولة.' },
    about: { ...copy.en.about, badge: 'حول AGRON' },
    gda: { ...copy.en.gda, title: 'التدريب جزء من قدرة التنفيذ.' },
    agron: {
      ...copy.en.agron,
      title: 'من البحث إلى تنفيذ المهمة.',
      subtitle: 'تتحكم AGRON في المسار التشغيلي بين طلب المهمة وقدرة المشغلين والتنفيذ الميداني وتسليم البيانات.',
      managementLabel: 'الاتجاه الرئيسي للشركة',
      managementTitle: 'إدارة العمليات الذاتية.',
      managementSubtitle: 'تنظم AGRON وتتحكم في مسار التشغيل للتنفيذ غير المأهول والموزع.',
      managementItems: ['الطائرات بدون طيار', 'الأنظمة الروبوتية', 'الأجهزة الذاتية', 'العمليات عن بعد', 'الفرق الموزعة', 'المهام', 'مراكز التحكم'],
      technologyTitle: 'تطوير التقنيات الخاصة.',
      technologySubtitle: 'تبني AGRON الطبقة التقنية لإدارة المعدات والبيانات والأتمتة والتنفيذ عن بعد.',
      technologyItems: ['البرمجيات', 'أنظمة التحكم', 'وحدات AI', 'الأتمتة', 'تكامل المعدات', 'تبادل البيانات', 'التحليلات', 'دعم العمليات عن بعد']
    },
    isdri: { ...copy.en.isdri, title: 'كل حل يبدأ بالتحليل.' },
    guard: { ...copy.en.guard, title: 'عمليات دفاع أرضية وجوية.' },
    investors: { ...copy.en.investors, badge: 'المستثمرون' }
  },
  he: {
    ...copy.en,
    common: { presentation: 'מצגת החברה', openDeck: 'פתח מצגת', exploreSystem: 'צפה במערכת' },
    home: { ...copy.en.home, title: 'אקוסיסטם AGRON', subtitle: 'ממחקר לביצוע משימות. יכולת תפעולית מלאה למערכות בלתי מאוישות.' },
    about: { ...copy.en.about, badge: 'אודות AGRON' },
    gda: { ...copy.en.gda, title: 'הכשרה היא חלק מיכולת הביצוע.' },
    agron: {
      ...copy.en.agron,
      title: 'ממחקר לביצוע משימה.',
      subtitle: 'AGRON שולטת בנתיב התפעולי בין דרישת המשימה, קיבולת המפעילים, הביצוע בשטח ומסירת הנתונים.',
      managementLabel: 'הכיוון המרכזי של החברה',
      managementTitle: 'ניהול פעולות אוטונומיות.',
      managementSubtitle: 'AGRON בונה ושולטת במסלול התפעולי לביצוע בלתי מאויש ומבוזר.',
      managementItems: ['רחפנים', 'מערכות רובוטיות', 'מכשירים אוטונומיים', 'פעולות מרחוק', 'צוותים מבוזרים', 'משימות', 'מרכזי שליטה'],
      technologyTitle: 'פיתוח טכנולוגיות קנייניות.',
      technologySubtitle: 'AGRON בונה את השכבה הטכנית לניהול ציוד, נתונים, אוטומציה וביצוע מרחוק.',
      technologyItems: ['תוכנה', 'מערכות שליטה', 'מודולי AI', 'אוטומציה', 'שילוב ציוד', 'חילופי נתונים', 'אנליטיקה', 'תמיכה בפעולות מרחוק']
    },
    isdri: { ...copy.en.isdri, title: 'כל פתרון מתחיל בניתוח.' },
    guard: { ...copy.en.guard, title: 'פעולות הגנה קרקעיות ואוויריות.' },
    investors: { ...copy.en.investors, badge: 'משקיעים' }
  }
};

const agronLocalizedOverrides: Partial<Record<Exclude<Lang, 'en' | 'ru'>, Partial<AgronCopyShape['agron']>>> = {
  uk: {
    technologyLabel: 'AGRON Technology',
    flow: [
      ['Дослідження', 'Умови місії аналізуються до початку виконання.'],
      ['Планування', 'Визначаються задачі, зона, оператори, обладнання та ризики.'],
      ['Виконання', 'Робота проходить за одним контрольованим процесом замість ручної координації.'],
      ['Доставка', 'Результати стандартизуються для управління та прийняття рішень.']
    ],
    architectureLabel: 'Архітектура виконання',
    architectureTitle: 'Як AGRON контролює шлях місії.',
    architectureText: 'AGRON відокремлює попит на місію від локального виконання і зʼєднує їх через контрольовану операційну структуру.',
    architecture: [
      ['Прийом запиту', 'Запит місії, обʼєкт, строки, ризик, потрібний результат і необхідна спроможність.'],
      ['Визначення місії', 'Зона, пакет задач, вимоги до даних, обладнання, відповідність і стандарт доставки.'],
      ['Призначення ресурсів', 'Оператор, координатор, спеціаліст, обладнання та підтримка обираються за вимогами.'],
      ['Контроль виконання', 'Робота проходить за процесом з моніторингом, комунікацією, телеметрією та ескалацією.'],
      ['Доставка даних', 'Результати обробляються, перевіряються, стандартизуються і передаються для рішень.'],
      ['Зворотний звʼязок', 'Підсумки місії оновлюють процеси, готовність команди, шаблони звітів і майбутні призначення.']
    ],
    capabilities: [
      ['Визначений процес', 'Визначення місії, призначення, виконання і доставка структуруються до розгортання.'],
      ['Операційний контроль', 'Координація керується через єдиний потік виконання замість окремих локальних рішень.'],
      ['Стандартний результат', 'Результати передаються у форматі, придатному для управління, звітності та аналізу.']
    ]
  },
  de: {
    technologyLabel: 'AGRON Technology',
    flow: [
      ['Forschung', 'Missionsbedingungen werden vor Beginn der Ausfuhrung analysiert.'],
      ['Planung', 'Aufgaben, Gebiet, Operatoren, Ausrustung und Risiken werden definiert.'],
      ['Ausfuhrung', 'Die Arbeit folgt einem kontrollierten Prozess statt Ad-hoc-Koordination.'],
      ['Lieferung', 'Ergebnisse werden fur Management und Entscheidungsunterstutzung standardisiert.']
    ],
    architectureLabel: 'Ausfuhrungsarchitektur',
    architectureTitle: 'Wie AGRON den Missionspfad kontrolliert.',
    architectureText: 'AGRON trennt Missionsbedarf von lokaler Ausfuhrung und verbindet beide uber eine kontrollierte Betriebsstruktur.',
    architecture: [
      ['Bedarfsaufnahme', 'Missionsanfrage, Standort, Zeit, Risiko, gewunschter Output und Fahigkeitsbedarf.'],
      ['Missionsdefinition', 'Gebiet, Aufgabenpaket, Datenanforderungen, Ausrustung, Compliance und Lieferstandard.'],
      ['Kapazitatszuweisung', 'Operator, Koordinator, Spezialist, Hardware und Support werden nach Bedarf ausgewahlt.'],
      ['Ausfuhrungskontrolle', 'Die Arbeit folgt einem Prozess mit Monitoring, Kommunikation, Telemetrie und Eskalation.'],
      ['Datenlieferung', 'Outputs werden verarbeitet, gepruft, standardisiert und fur operative Entscheidungen geliefert.'],
      ['Feedback Loop', 'Missionsergebnisse aktualisieren Workflows, Bereitschaft, Berichtsvorlagen und zukunftige Zuweisung.']
    ],
    capabilities: [
      ['Definierter Prozess', 'Missionsdefinition, Zuweisung, Ausfuhrung und Lieferung werden vor dem Einsatz strukturiert.'],
      ['Operative Kontrolle', 'Koordination lauft uber einen Ausfuhrungsfluss statt einzelner lokaler Entscheidungen.'],
      ['Standardisierter Output', 'Ergebnisse werden in nutzbarem Format fur Management, Reporting und Analyse geliefert.']
    ]
  },
  fr: {
    technologyLabel: 'AGRON Technology',
    flow: [
      ['Recherche', 'Les conditions de mission sont analysees avant le debut de l execution.'],
      ['Planification', 'Les taches, la zone, les operateurs, l equipement et les risques sont definis.'],
      ['Execution', 'Le travail suit un processus controle au lieu d une coordination ad hoc.'],
      ['Livraison', 'Les resultats sont standardises pour la gestion et l aide a la decision.']
    ],
    architectureLabel: 'Architecture d execution',
    architectureTitle: 'Comment AGRON controle le parcours de mission.',
    architectureText: 'AGRON separe la demande de mission de l execution locale et les reconnecte par une structure operationnelle controlee.',
    architecture: [
      ['Reception de la demande', 'Demande de mission, site, calendrier, risque, resultat requis et capacite necessaire.'],
      ['Definition de mission', 'Zone, paquet de taches, exigences de donnees, equipement, conformite et standard de livraison.'],
      ['Affectation de capacite', 'Operateur, coordinateur, specialiste, materiel et support selectionnes selon les exigences.'],
      ['Controle d execution', 'Le travail suit un processus avec supervision, communication, telemetrie et escalade.'],
      ['Livraison des donnees', 'Les sorties sont traitees, verifiees, standardisees et livrees pour les decisions operationnelles.'],
      ['Boucle de retour', 'Les resultats de mission mettent a jour les flux, la preparation, les modeles de rapport et les affectations futures.']
    ],
    capabilities: [
      ['Processus defini', 'Definition, affectation, execution et livraison sont structurees avant le deploiement.'],
      ['Controle operationnel', 'La coordination passe par un flux d execution unique plutot que par des decisions locales separees.'],
      ['Sortie standard', 'Les resultats sont livres dans un format utile pour la gestion, le reporting et l analyse.']
    ]
  },
  es: {
    technologyLabel: 'AGRON Technology',
    flow: [
      ['Investigacion', 'Las condiciones de la mision se analizan antes de iniciar la ejecucion.'],
      ['Plan', 'Se definen tareas, area, operadores, equipos y riesgos.'],
      ['Ejecucion', 'El trabajo sigue un proceso controlado en lugar de coordinacion improvisada.'],
      ['Entrega', 'Los resultados se estandarizan para gestion y soporte de decisiones.']
    ],
    architectureLabel: 'Arquitectura de ejecucion',
    architectureTitle: 'Como AGRON controla el camino de la mision.',
    architectureText: 'AGRON separa la demanda de mision de la ejecucion local y las reconecta mediante una estructura operativa controlada.',
    architecture: [
      ['Recepcion de demanda', 'Solicitud de mision, sitio, tiempo, riesgo, resultado requerido y capacidad necesaria.'],
      ['Definicion de mision', 'Area, paquete de tareas, requisitos de datos, equipos, cumplimiento y estandar de entrega.'],
      ['Asignacion de capacidad', 'Operador, coordinador, especialista, hardware y soporte seleccionados por requisito.'],
      ['Control de ejecucion', 'El trabajo sigue un proceso con monitoreo, comunicacion, telemetria y escalamiento.'],
      ['Entrega de datos', 'Los resultados se procesan, revisan, estandarizan y entregan para decisiones operativas.'],
      ['Retroalimentacion', 'Los resultados actualizan flujos, preparacion, reportes y futuras asignaciones.']
    ],
    capabilities: [
      ['Proceso definido', 'Definicion, asignacion, ejecucion y entrega se estructuran antes del despliegue.'],
      ['Control operativo', 'La coordinacion se gestiona mediante un flujo unico en lugar de decisiones locales separadas.'],
      ['Resultado estandar', 'Los resultados se entregan en un formato util para gestion, informes y analisis.']
    ]
  },
  ja: {
    technologyLabel: 'AGRON Technology',
    flow: [
      ['研究', '実行開始前にミッション条件を分析します。'],
      ['計画', 'タスク、エリア、オペレーター、機器、リスクを定義します。'],
      ['実行', '作業は即興の調整ではなく、管理された一つのプロセスに従います。'],
      ['納品', '成果物は管理と意思決定支援のために標準化されます。']
    ],
    architectureLabel: '実行アーキテクチャ',
    architectureTitle: 'AGRONがミッション経路を制御する方法。',
    architectureText: 'AGRONはミッション需要と現地実行を分離し、管理された運用構造で再接続します。',
    architecture: [
      ['需要受付', 'ミッション依頼、場所、時期、リスク、必要成果物、必要能力。'],
      ['ミッション定義', 'エリア、タスクパッケージ、データ要件、機器、コンプライアンス、納品標準。'],
      ['能力割当', '要件に基づき、オペレーター、調整担当、専門家、ハードウェア、支援を選定します。'],
      ['実行制御', '監視、通信、テレメトリ、エスカレーションを含む定義済みプロセスで作業します。'],
      ['データ納品', '成果物を処理、確認、標準化し、運用判断のために納品します。'],
      ['フィードバック', 'ミッション結果がワークフロー、人員準備、報告テンプレート、将来の割当に反映されます。']
    ],
    capabilities: [
      ['定義済みプロセス', 'ミッション定義、割当、実行、納品は展開前に構造化されます。'],
      ['運用制御', '調整は個別の現地判断ではなく、一つの実行フローで管理されます。'],
      ['標準成果物', '結果は管理、報告、分析に使える形式で納品されます。']
    ]
  },
  ar: {
    technologyLabel: 'AGRON Technology',
    flow: [
      ['البحث', 'يتم تحليل ظروف المهمة قبل بدء التنفيذ.'],
      ['التخطيط', 'تحدد المهام والمنطقة والمشغلون والمعدات والمخاطر.'],
      ['التنفيذ', 'يتبع العمل عملية واحدة مضبوطة بدلاً من التنسيق العشوائي.'],
      ['التسليم', 'يتم توحيد النتائج لدعم الإدارة واتخاذ القرار.']
    ],
    architectureLabel: 'هندسة التنفيذ',
    architectureTitle: 'كيف تتحكم AGRON في مسار المهمة.',
    architectureText: 'تفصل AGRON طلب المهمة عن التنفيذ المحلي وتعيد ربطهما عبر بنية تشغيلية مضبوطة.',
    architecture: [
      ['استقبال الطلب', 'طلب المهمة والموقع والتوقيت والمخاطر والمخرجات المطلوبة والقدرة اللازمة.'],
      ['تعريف المهمة', 'المنطقة وحزمة المهام ومتطلبات البيانات والمعدات والامتثال ومعيار التسليم.'],
      ['تخصيص القدرة', 'اختيار المشغل والمنسق والمتخصص والمعدات والدعم حسب المتطلبات.'],
      ['التحكم في التنفيذ', 'يتبع العمل عملية تشمل المراقبة والاتصال والقياس عن بعد والتصعيد.'],
      ['تسليم البيانات', 'تتم معالجة المخرجات ومراجعتها وتوحيدها وتسليمها للقرارات التشغيلية.'],
      ['حلقة التغذية الراجعة', 'تحدث نتائج المهمة سير العمل وجاهزية الفريق ونماذج التقارير والتخصيص المستقبلي.']
    ],
    capabilities: [
      ['عملية محددة', 'يتم تنظيم تعريف المهمة والتخصيص والتنفيذ والتسليم قبل النشر.'],
      ['تحكم تشغيلي', 'تدار عملية التنسيق عبر تدفق تنفيذ واحد بدلاً من قرارات محلية منفصلة.'],
      ['مخرجات موحدة', 'تسلم النتائج بصيغة قابلة للاستخدام للإدارة والتقارير والتحليل.']
    ]
  },
  he: {
    technologyLabel: 'AGRON Technology',
    flow: [
      ['מחקר', 'תנאי המשימה מנותחים לפני תחילת הביצוע.'],
      ['תכנון', 'המשימות, האזור, המפעילים, הציוד והסיכונים מוגדרים.'],
      ['ביצוע', 'העבודה מתנהלת בתהליך מבוקר אחד במקום תיאום מאולתר.'],
      ['מסירה', 'התוצרים עוברים סטנדרטיזציה לניהול ולתמיכה בהחלטות.']
    ],
    architectureLabel: 'ארכיטקטורת ביצוע',
    architectureTitle: 'כיצד AGRON שולטת במסלול המשימה.',
    architectureText: 'AGRON מפרידה בין דרישת המשימה לבין ביצוע מקומי ומחברת אותם מחדש דרך מבנה תפעולי מבוקר.',
    architecture: [
      ['קליטת דרישה', 'בקשת משימה, אתר, תזמון, סיכון, תוצר נדרש ויכולת נדרשת.'],
      ['הגדרת משימה', 'אזור, חבילת משימות, דרישות נתונים, ציוד, תאימות ותקן מסירה.'],
      ['הקצאת יכולת', 'מפעיל, מתאם, מומחה, חומרה ותמיכה נבחרים לפי הדרישה.'],
      ['בקרת ביצוע', 'העבודה מתנהלת בתהליך הכולל ניטור, תקשורת, טלמטריה והסלמה.'],
      ['מסירת נתונים', 'התוצרים מעובדים, נבדקים, עוברים סטנדרטיזציה ונמסרים להחלטות תפעוליות.'],
      ['לולאת משוב', 'תוצאות המשימה מעדכנות תהליכים, מוכנות צוות, תבניות דיווח והקצאות עתידיות.']
    ],
    capabilities: [
      ['תהליך מוגדר', 'הגדרת המשימה, ההקצאה, הביצוע והמסירה מובנים לפני הפריסה.'],
      ['בקרה תפעולית', 'התיאום מנוהל דרך זרם ביצוע אחד במקום החלטות מקומיות נפרדות.'],
      ['תוצר סטנדרטי', 'התוצאות נמסרות בפורמט שימושי לניהול, דיווח וניתוח.']
    ]
  }
};

const baseCopy = { ...copy, ...fallbackLanguages };

export const agronCopy = Object.fromEntries(
  Object.entries(baseCopy).map(([language, value]) => [
    language,
    {
      ...value,
      agron: {
        ...value.agron,
        ...(agronLocalizedOverrides[language as Exclude<Lang, 'en' | 'ru'>] ?? {})
      }
    }
  ])
) as Record<Lang, AgronCopyShape>;
