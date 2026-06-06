import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, FileText, Layers3, Link as LinkIcon, Maximize2, Minimize2, Network, Pencil, Play, Plus, RotateCcw, Save, Settings, Trash2, Video, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

type MaterialType = 'pdf' | 'video' | 'link' | 'brief';

interface PresentationMaterial {
  id: string;
  title: string;
  type: MaterialType;
  category: string;
  description: string;
  source?: string;
  depth: string[];
  related: string[];
  website?: string;
  shortLabel?: string;
  custom?: boolean;
}

interface MaterialFormState {
  id: string;
  title: string;
  type: MaterialType;
  category: string;
  description: string;
  source: string;
  website: string;
  shortLabel: string;
  depthText: string;
  related: string[];
}

interface HubCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  main: string;
  back: string;
  materials: string;
  items: string;
  context: string;
  depth: string;
  deeper: string;
  fullscreen: string;
  collapse: string;
  close: string;
  files: string;
  hint: string;
}

interface ManagerCopy {
  manage: string;
  addMaterial: string;
  reset: string;
  contentManager: string;
  editMaterial: string;
  addPresentationMaterial: string;
  managerDescription: string;
  new: string;
  save: string;
  title: string;
  id: string;
  type: string;
  category: string;
  source: string;
  website: string;
  shortLabel: string;
  description: string;
  depthPoints: string;
  relatedMaterials: string;
  filesNote: string;
  navigationMap: string;
  sourceReady: string;
  siteReady: string;
  relatedCount: string;
  openSite: string;
  openPresentation: string;
  deeperLevel: string;
  pdfType: string;
  videoType: string;
  linkType: string;
  briefType: string;
  previous: string;
  next: string;
  materialCounter: string;
  navigation: string;
  history: string;
  connected: string;
}

const presentationLibrary: PresentationMaterial[] = [
  {
    id: 'ecosystem-main',
    title: 'AGRON Ecosystem',
    type: 'pdf',
    category: 'Main',
    description: 'The primary AGRON Ecosystem presentation. Start here, then open the four connected areas from the final page.',
    source: '/presentations/agron-ecosystem-main.pdf',
    depth: ['Main ecosystem structure', 'Connected organizations', 'Operational model', 'Navigation hub'],
    related: ['gda', 'isdri', 'agron-platform', 'guard', 'workforce-infrastructure', 'agron-youtube']
  },
  {
    id: 'gda',
    title: 'GDA',
    shortLabel: 'Global Drone Academy',
    type: 'pdf',
    category: 'Training',
    description: 'Global Drone Academy presentation. Training, operator development, and workforce capacity layer connected to AGRON.',
    source: '/presentations/gda.pdf',
    website: 'https://www.gda.ua',
    depth: ['Operator training', 'Certification structure', 'Workforce capacity', 'Deployment readiness'],
    related: ['ecosystem-main', 'isdri', 'agron-platform', 'guard', 'agron-youtube']
  },
  {
    id: 'isdri',
    title: 'ISDRI',
    shortLabel: 'International Spatial Data Research Institute',
    type: 'pdf',
    category: 'Data',
    description: 'International Spatial Data Research Institute presentation. Spatial data, mapping, analysis, and research layer.',
    source: '/presentations/isdri.pdf',
    website: 'https://www.isdri.org',
    depth: ['Spatial data', 'Research structure', 'Mapping operations', 'Analytics and reporting'],
    related: ['ecosystem-main', 'gda', 'agron-platform', 'guard', 'agron-youtube']
  },
  {
    id: 'agron-platform',
    title: 'AGRON',
    shortLabel: 'Platform',
    type: 'pdf',
    category: 'Platform',
    description: 'AGRON platform presentation. Execution control, mission coordination, and operational delivery system.',
    source: '/presentations/agron-platform.pdf',
    website: 'https://www.agron1.com',
    depth: ['Execution control', 'Mission coordination', 'Operator layer', 'Operational delivery'],
    related: ['ecosystem-main', 'gda', 'isdri', 'guard', 'agron-youtube']
  },
  {
    id: 'guard',
    title: 'GUARD',
    shortLabel: 'Operations & Defense',
    type: 'pdf',
    category: 'Operations',
    description: 'GUARD presentation. Operations, security, and defense coordination layer connected to the AGRON ecosystem.',
    source: '/presentations/guard.pdf',
    website: 'https://www.guardua.com',
    depth: ['Operations', 'Security coordination', 'Defense use cases', 'Deployment structure'],
    related: ['ecosystem-main', 'gda', 'isdri', 'agron-platform', 'agron-youtube']
  },
  {
    id: 'agron-youtube',
    title: 'AGRON YouTube Channel',
    shortLabel: 'Video',
    type: 'link',
    category: 'Video',
    description: 'AGRON video material hosted on YouTube. Use this as a visual support item during company presentations.',
    source: 'https://www.youtube.com/embed/tansFOZdKRo',
    website: 'https://www.youtube.com/watch?v=tansFOZdKRo',
    depth: ['Video overview', 'Public channel material', 'Presentation support'],
    related: ['ecosystem-main', 'gda', 'isdri', 'agron-platform', 'guard', 'workforce-infrastructure']
  },
  {
    id: 'workforce-infrastructure',
    title: 'Autonomous Workforce Infrastructure',
    shortLabel: 'Workforce',
    type: 'pdf',
    category: 'Workforce',
    description: 'AGRON workforce infrastructure presentation. Education, certification, digital skill passports, employer command center, AI workforce engine, and distributed autonomous operations.',
    source: '/presentations/autonomous-workforce-infrastructure.pdf',
    website: 'https://www.agron1.com/#workforce',
    depth: ['Autonomous workforce infrastructure', 'Digital skill passport', 'Employer command center', 'AI workforce engine', 'Revenue streams'],
    related: ['ecosystem-main', 'gda', 'agron-platform', 'isdri', 'agron-youtube']
  },
  {
    id: 'investor-brief',
    title: 'Investor Brief',
    type: 'brief',
    category: 'Brief',
    description: 'Structured talking points for investor meetings.',
    depth: ['Fragmented operations', 'Execution control', 'Contracts first', 'Scale through system'],
    related: ['ecosystem-main', 'agron-platform']
  }
];

const hubCopy = {
  en: {
    eyebrow: 'AGRON company presentation',
    title: 'AGRON Ecosystem',
    subtitle: 'Start with the main ecosystem deck. Open connected presentations, move deeper, and return back.',
    main: 'Main',
    back: 'Back',
    materials: 'Materials',
    items: 'items',
    context: 'Context',
    depth: 'Depth',
    deeper: 'Open connected presentations',
    fullscreen: 'Full screen',
    collapse: 'Collapse',
    close: 'Close presentation',
    files: 'Files are stored in public/presentations.',
    hint: 'Use the four ecosystem cards to open GDA, ISDRI, AGRON, and GUARD presentations.'
  },
  ru: {
    eyebrow: 'Презентация компании AGRON',
    title: 'Экосистема AGRON',
    subtitle: 'Начните с главной презентации. Открывайте связанные презентации, переходите глубже и возвращайтесь назад.',
    main: 'Главная',
    back: 'Назад',
    materials: 'Материалы',
    items: 'материалов',
    context: 'Контекст',
    depth: 'Глубина',
    deeper: 'Открыть связанные презентации',
    fullscreen: 'На весь экран',
    collapse: 'Свернуть',
    close: 'Закрыть презентацию',
    files: 'Файлы хранятся в public/presentations.',
    hint: 'Используйте четыре карточки экосистемы, чтобы открыть презентации GDA, ISDRI, AGRON и GUARD.'
  },
  uk: {
    eyebrow: 'Презентація компанії AGRON',
    title: 'Екосистема AGRON',
    subtitle: 'Почніть з головної презентації. Відкривайте пов’язані презентації, переходьте глибше і повертайтеся назад.',
    main: 'Головна',
    back: 'Назад',
    materials: 'Матеріали',
    items: 'матеріалів',
    context: 'Контекст',
    depth: 'Глибина',
    deeper: 'Відкрити пов’язані презентації',
    fullscreen: 'На весь екран',
    collapse: 'Згорнути',
    close: 'Закрити презентацію',
    files: 'Файли зберігаються в public/presentations.',
    hint: 'Використовуйте чотири картки екосистеми, щоб відкрити презентації GDA, ISDRI, AGRON і GUARD.'
  },
  de: {
    eyebrow: 'AGRON Unternehmenspräsentation',
    title: 'AGRON Ecosystem',
    subtitle: 'Beginnen Sie mit der Hauptpräsentation. Öffnen Sie verbundene Präsentationen, gehen Sie tiefer und kehren Sie zurück.',
    main: 'Hauptdeck',
    back: 'Zurück',
    materials: 'Materialien',
    items: 'Elemente',
    context: 'Kontext',
    depth: 'Tiefe',
    deeper: 'Verbundene Präsentationen öffnen',
    fullscreen: 'Vollbild',
    collapse: 'Einklappen',
    close: 'Präsentation schließen',
    files: 'Dateien liegen in public/presentations.',
    hint: 'Nutzen Sie die vier Ecosystem-Karten, um GDA, ISDRI, AGRON und GUARD zu öffnen.'
  },
  fr: {
    eyebrow: 'Présentation AGRON',
    title: 'Écosystème AGRON',
    subtitle: 'Commencez par la présentation principale. Ouvrez les présentations liées, approfondissez et revenez en arrière.',
    main: 'Principal',
    back: 'Retour',
    materials: 'Documents',
    items: 'éléments',
    context: 'Contexte',
    depth: 'Niveau',
    deeper: 'Ouvrir les présentations liées',
    fullscreen: 'Plein écran',
    collapse: 'Réduire',
    close: 'Fermer la présentation',
    files: 'Les fichiers sont stockés dans public/presentations.',
    hint: 'Utilisez les quatre cartes de l’écosystème pour ouvrir GDA, ISDRI, AGRON et GUARD.'
  },
  es: {
    eyebrow: 'Presentación de AGRON',
    title: 'Ecosistema AGRON',
    subtitle: 'Empiece con la presentación principal. Abra presentaciones conectadas, profundice y vuelva atrás.',
    main: 'Principal',
    back: 'Atrás',
    materials: 'Materiales',
    items: 'elementos',
    context: 'Contexto',
    depth: 'Profundidad',
    deeper: 'Abrir presentaciones conectadas',
    fullscreen: 'Pantalla completa',
    collapse: 'Contraer',
    close: 'Cerrar presentación',
    files: 'Los archivos se guardan en public/presentations.',
    hint: 'Use las cuatro tarjetas del ecosistema para abrir GDA, ISDRI, AGRON y GUARD.'
  },
  ja: {
    eyebrow: 'AGRON 企業プレゼンテーション',
    title: 'AGRON エコシステム',
    subtitle: 'メイン資料から開始し、関連資料へ移動して、いつでも戻れます。',
    main: 'メイン',
    back: '戻る',
    materials: '資料',
    items: '項目',
    context: 'コンテキスト',
    depth: '詳細',
    deeper: '関連プレゼンテーションを開く',
    fullscreen: '全画面',
    collapse: '縮小',
    close: 'プレゼンテーションを閉じる',
    files: 'ファイルは public/presentations に保存されています。',
    hint: '4つのエコシステムカードから GDA、ISDRI、AGRON、GUARD を開けます。'
  },
  ar: {
    eyebrow: 'عرض شركة AGRON',
    title: 'منظومة AGRON',
    subtitle: 'ابدأ بالعرض الرئيسي. افتح العروض المرتبطة، تعمق، ثم ارجع للخلف.',
    main: 'الرئيسي',
    back: 'رجوع',
    materials: 'المواد',
    items: 'عناصر',
    context: 'السياق',
    depth: 'العمق',
    deeper: 'فتح العروض المرتبطة',
    fullscreen: 'ملء الشاشة',
    collapse: 'تصغير',
    close: 'إغلاق العرض',
    files: 'يتم تخزين الملفات في public/presentations.',
    hint: 'استخدم بطاقات المنظومة الأربع لفتح عروض GDA و ISDRI و AGRON و GUARD.'
  },
  he: {
    eyebrow: 'מצגת חברת AGRON',
    title: 'אקוסיסטם AGRON',
    subtitle: 'התחילו מהמצגת הראשית. פתחו מצגות מקושרות, העמיקו וחזרו לאחור.',
    main: 'ראשי',
    back: 'חזרה',
    materials: 'חומרים',
    items: 'פריטים',
    context: 'הקשר',
    depth: 'עומק',
    deeper: 'פתיחת מצגות מקושרות',
    fullscreen: 'מסך מלא',
    collapse: 'צמצום',
    close: 'סגירת מצגת',
    files: 'הקבצים נשמרים ב-public/presentations.',
    hint: 'השתמשו בארבעת כרטיסי האקוסיסטם לפתיחת GDA, ISDRI, AGRON ו-GUARD.'
  }
} as const;

type HubLanguage = keyof typeof hubCopy;

const managerCopy: Record<HubLanguage, ManagerCopy> = {
  en: {
    manage: 'Manage',
    addMaterial: 'Add material',
    reset: 'Reset',
    contentManager: 'Content manager',
    editMaterial: 'Edit presentation material',
    addPresentationMaterial: 'Add presentation material',
    managerDescription: 'Add PDF files, videos, external pages, or brief notes. Connect materials through related links so a presenter can move between decks and return back.',
    new: 'New',
    save: 'Save',
    title: 'Title',
    id: 'ID',
    type: 'Type',
    category: 'Category',
    source: 'Source path or URL',
    website: 'Website link',
    shortLabel: 'Short label',
    description: 'Description',
    depthPoints: 'Depth points',
    relatedMaterials: 'Related materials',
    filesNote: 'Files must be placed in /public/presentations. Use paths like /presentations/deck.pdf. Changes are saved in this browser.',
    navigationMap: 'Navigation map',
    sourceReady: 'Source ready',
    siteReady: 'Site link',
    relatedCount: 'Related',
    openSite: 'Open site',
    openPresentation: 'Open presentation',
    deeperLevel: 'Deeper level',
    pdfType: 'PDF presentation',
    videoType: 'Video',
    linkType: 'Website / external link',
    briefType: 'Brief / notes',
    previous: 'Previous',
    next: 'Next',
    materialCounter: 'Material',
    navigation: 'Navigation',
    history: 'History',
    connected: 'Connected'
  },
  ru: {
    manage: 'Управление',
    addMaterial: 'Добавить материал',
    reset: 'Сброс',
    contentManager: 'Менеджер контента',
    editMaterial: 'Редактировать материал презентации',
    addPresentationMaterial: 'Добавить материал презентации',
    managerDescription: 'Добавляйте PDF, видео, внешние страницы или краткие заметки. Связывайте материалы, чтобы во время показа переходить между уровнями и возвращаться назад.',
    new: 'Новый',
    save: 'Сохранить',
    title: 'Название',
    id: 'ID',
    type: 'Тип',
    category: 'Категория',
    source: 'Путь к файлу или URL',
    website: 'Ссылка на сайт',
    shortLabel: 'Короткая подпись',
    description: 'Описание',
    depthPoints: 'Глубокие уровни',
    relatedMaterials: 'Связанные материалы',
    filesNote: 'Файлы должны лежать в /public/presentations. Используйте пути вида /presentations/deck.pdf. Изменения сохраняются в этом браузере.',
    navigationMap: 'Карта переходов',
    sourceReady: 'Источник готов',
    siteReady: 'Сайт',
    relatedCount: 'Связей',
    openSite: 'Открыть сайт',
    openPresentation: 'Открыть презентацию',
    deeperLevel: 'Глубже',
    pdfType: 'PDF презентация',
    videoType: 'Видео',
    linkType: 'Сайт / внешняя ссылка',
    briefType: 'Brief / заметки',
    previous: 'Назад',
    next: 'Далее',
    materialCounter: 'Материал',
    navigation: 'Навигация',
    history: 'История',
    connected: 'Связанные'
  },
  uk: {
    manage: 'Керування',
    addMaterial: 'Додати матеріал',
    reset: 'Скинути',
    contentManager: 'Менеджер контенту',
    editMaterial: 'Редагувати матеріал презентації',
    addPresentationMaterial: 'Додати матеріал презентації',
    managerDescription: 'Додавайте PDF, відео, зовнішні сторінки або короткі нотатки. Пов’язуйте матеріали, щоб під час показу переходити між рівнями і повертатися назад.',
    new: 'Новий',
    save: 'Зберегти',
    title: 'Назва',
    id: 'ID',
    type: 'Тип',
    category: 'Категорія',
    source: 'Шлях до файлу або URL',
    website: 'Посилання на сайт',
    shortLabel: 'Короткий підпис',
    description: 'Опис',
    depthPoints: 'Глибокі рівні',
    relatedMaterials: 'Пов’язані матеріали',
    filesNote: 'Файли мають бути в /public/presentations. Використовуйте шляхи на кшталт /presentations/deck.pdf. Зміни зберігаються в цьому браузері.',
    navigationMap: 'Карта переходів',
    sourceReady: 'Джерело готове',
    siteReady: 'Сайт',
    relatedCount: 'Зв’язків',
    openSite: 'Відкрити сайт',
    openPresentation: 'Відкрити презентацію',
    deeperLevel: 'Глибше',
    pdfType: 'PDF презентація',
    videoType: 'Відео',
    linkType: 'Сайт / зовнішнє посилання',
    briefType: 'Brief / нотатки',
    previous: 'Назад',
    next: 'Далі',
    materialCounter: 'Матеріал',
    navigation: 'Навігація',
    history: 'Історія',
    connected: 'Пов’язані'
  },
  de: {
    manage: 'Verwalten',
    addMaterial: 'Material hinzufügen',
    reset: 'Zurücksetzen',
    contentManager: 'Content-Manager',
    editMaterial: 'Präsentationsmaterial bearbeiten',
    addPresentationMaterial: 'Präsentationsmaterial hinzufügen',
    managerDescription: 'Fügen Sie PDF-Dateien, Videos, externe Seiten oder Kurznotizen hinzu. Verbinden Sie Materialien, damit Presenter zwischen Decks wechseln und zurückkehren können.',
    new: 'Neu',
    save: 'Speichern',
    title: 'Titel',
    id: 'ID',
    type: 'Typ',
    category: 'Kategorie',
    source: 'Dateipfad oder URL',
    website: 'Website-Link',
    shortLabel: 'Kurzlabel',
    description: 'Beschreibung',
    depthPoints: 'Vertiefungspunkte',
    relatedMaterials: 'Verbundene Materialien',
    filesNote: 'Dateien müssen in /public/presentations liegen. Nutzen Sie Pfade wie /presentations/deck.pdf. Änderungen werden in diesem Browser gespeichert.',
    navigationMap: 'Navigationskarte',
    sourceReady: 'Quelle bereit',
    siteReady: 'Website',
    relatedCount: 'Verbunden',
    openSite: 'Website öffnen',
    openPresentation: 'Präsentation öffnen',
    deeperLevel: 'Tiefere Ebene',
    pdfType: 'PDF-Präsentation',
    videoType: 'Video',
    linkType: 'Website / externer Link',
    briefType: 'Brief / Notizen',
    previous: 'Zurück',
    next: 'Weiter',
    materialCounter: 'Material',
    navigation: 'Navigation',
    history: 'Verlauf',
    connected: 'Verbunden'
  },
  fr: {
    manage: 'Gérer',
    addMaterial: 'Ajouter un document',
    reset: 'Réinitialiser',
    contentManager: 'Gestionnaire de contenu',
    editMaterial: 'Modifier le document de présentation',
    addPresentationMaterial: 'Ajouter un document de présentation',
    managerDescription: 'Ajoutez des PDF, vidéos, pages externes ou notes courtes. Reliez les documents pour passer entre les présentations et revenir en arrière.',
    new: 'Nouveau',
    save: 'Enregistrer',
    title: 'Titre',
    id: 'ID',
    type: 'Type',
    category: 'Catégorie',
    source: 'Chemin du fichier ou URL',
    website: 'Lien du site',
    shortLabel: 'Libellé court',
    description: 'Description',
    depthPoints: 'Points approfondis',
    relatedMaterials: 'Documents liés',
    filesNote: 'Les fichiers doivent être placés dans /public/presentations. Utilisez des chemins comme /presentations/deck.pdf. Les changements sont enregistrés dans ce navigateur.',
    navigationMap: 'Carte de navigation',
    sourceReady: 'Source prête',
    siteReady: 'Site',
    relatedCount: 'Liés',
    openSite: 'Ouvrir le site',
    openPresentation: 'Ouvrir la présentation',
    deeperLevel: 'Niveau profond',
    pdfType: 'Présentation PDF',
    videoType: 'Vidéo',
    linkType: 'Site / lien externe',
    briefType: 'Brief / notes',
    previous: 'Précédent',
    next: 'Suivant',
    materialCounter: 'Document',
    navigation: 'Navigation',
    history: 'Historique',
    connected: 'Liés'
  },
  es: {
    manage: 'Gestionar',
    addMaterial: 'Agregar material',
    reset: 'Restablecer',
    contentManager: 'Gestor de contenido',
    editMaterial: 'Editar material de presentación',
    addPresentationMaterial: 'Agregar material de presentación',
    managerDescription: 'Agregue PDF, videos, páginas externas o notas breves. Conecte materiales para moverse entre presentaciones y volver atrás.',
    new: 'Nuevo',
    save: 'Guardar',
    title: 'Título',
    id: 'ID',
    type: 'Tipo',
    category: 'Categoría',
    source: 'Ruta del archivo o URL',
    website: 'Enlace del sitio',
    shortLabel: 'Etiqueta corta',
    description: 'Descripción',
    depthPoints: 'Puntos profundos',
    relatedMaterials: 'Materiales relacionados',
    filesNote: 'Los archivos deben estar en /public/presentations. Use rutas como /presentations/deck.pdf. Los cambios se guardan en este navegador.',
    navigationMap: 'Mapa de navegación',
    sourceReady: 'Fuente lista',
    siteReady: 'Sitio',
    relatedCount: 'Relacionados',
    openSite: 'Abrir sitio',
    openPresentation: 'Abrir presentación',
    deeperLevel: 'Nivel profundo',
    pdfType: 'Presentación PDF',
    videoType: 'Video',
    linkType: 'Sitio / enlace externo',
    briefType: 'Brief / notas',
    previous: 'Anterior',
    next: 'Siguiente',
    materialCounter: 'Material',
    navigation: 'Navegación',
    history: 'Historial',
    connected: 'Conectados'
  },
  ja: {
    manage: '管理',
    addMaterial: '資料を追加',
    reset: 'リセット',
    contentManager: 'コンテンツ管理',
    editMaterial: 'プレゼン資料を編集',
    addPresentationMaterial: 'プレゼン資料を追加',
    managerDescription: 'PDF、動画、外部ページ、短いメモを追加できます。資料同士を関連付けて、発表中に階層移動して戻れます。',
    new: '新規',
    save: '保存',
    title: 'タイトル',
    id: 'ID',
    type: 'タイプ',
    category: 'カテゴリ',
    source: 'ファイルパスまたはURL',
    website: 'サイトリンク',
    shortLabel: '短いラベル',
    description: '説明',
    depthPoints: '詳細ポイント',
    relatedMaterials: '関連資料',
    filesNote: 'ファイルは /public/presentations に配置します。/presentations/deck.pdf のようなパスを使います。変更はこのブラウザに保存されます。',
    navigationMap: 'ナビゲーションマップ',
    sourceReady: 'ソース準備済み',
    siteReady: 'サイト',
    relatedCount: '関連',
    openSite: 'サイトを開く',
    openPresentation: 'プレゼンを開く',
    deeperLevel: '深い階層',
    pdfType: 'PDFプレゼン',
    videoType: '動画',
    linkType: 'サイト / 外部リンク',
    briefType: 'Brief / メモ',
    previous: '前へ',
    next: '次へ',
    materialCounter: '資料',
    navigation: 'ナビゲーション',
    history: '履歴',
    connected: '関連'
  },
  ar: {
    manage: 'إدارة',
    addMaterial: 'إضافة مادة',
    reset: 'إعادة ضبط',
    contentManager: 'مدير المحتوى',
    editMaterial: 'تحرير مادة العرض',
    addPresentationMaterial: 'إضافة مادة عرض',
    managerDescription: 'أضف ملفات PDF أو فيديوهات أو صفحات خارجية أو ملاحظات مختصرة. اربط المواد للتنقل بين العروض والعودة.',
    new: 'جديد',
    save: 'حفظ',
    title: 'العنوان',
    id: 'ID',
    type: 'النوع',
    category: 'الفئة',
    source: 'مسار الملف أو URL',
    website: 'رابط الموقع',
    shortLabel: 'تسمية قصيرة',
    description: 'الوصف',
    depthPoints: 'نقاط العمق',
    relatedMaterials: 'مواد مرتبطة',
    filesNote: 'يجب وضع الملفات في /public/presentations. استخدم مسارات مثل /presentations/deck.pdf. يتم حفظ التغييرات في هذا المتصفح.',
    navigationMap: 'خريطة التنقل',
    sourceReady: 'المصدر جاهز',
    siteReady: 'الموقع',
    relatedCount: 'مرتبطة',
    openSite: 'فتح الموقع',
    openPresentation: 'فتح العرض',
    deeperLevel: 'مستوى أعمق',
    pdfType: 'عرض PDF',
    videoType: 'فيديو',
    linkType: 'موقع / رابط خارجي',
    briefType: 'Brief / ملاحظات',
    previous: 'السابق',
    next: 'التالي',
    materialCounter: 'المادة',
    navigation: 'التنقل',
    history: 'السجل',
    connected: 'مرتبطة'
  },
  he: {
    manage: 'ניהול',
    addMaterial: 'הוספת חומר',
    reset: 'איפוס',
    contentManager: 'מנהל תוכן',
    editMaterial: 'עריכת חומר מצגת',
    addPresentationMaterial: 'הוספת חומר מצגת',
    managerDescription: 'הוסיפו קבצי PDF, וידאו, עמודים חיצוניים או הערות קצרות. קשרו חומרים כדי לעבור בין מצגות ולחזור.',
    new: 'חדש',
    save: 'שמירה',
    title: 'כותרת',
    id: 'ID',
    type: 'סוג',
    category: 'קטגוריה',
    source: 'נתיב קובץ או URL',
    website: 'קישור לאתר',
    shortLabel: 'תווית קצרה',
    description: 'תיאור',
    depthPoints: 'נקודות עומק',
    relatedMaterials: 'חומרים קשורים',
    filesNote: 'קבצים צריכים להיות ב-/public/presentations. השתמשו בנתיבים כמו /presentations/deck.pdf. השינויים נשמרים בדפדפן זה.',
    navigationMap: 'מפת ניווט',
    sourceReady: 'מקור מוכן',
    siteReady: 'אתר',
    relatedCount: 'קשורים',
    openSite: 'פתיחת אתר',
    openPresentation: 'פתיחת מצגת',
    deeperLevel: 'רמה עמוקה',
    pdfType: 'מצגת PDF',
    videoType: 'וידאו',
    linkType: 'אתר / קישור חיצוני',
    briefType: 'Brief / הערות',
    previous: 'הקודם',
    next: 'הבא',
    materialCounter: 'חומר',
    navigation: 'ניווט',
    history: 'היסטוריה',
    connected: 'קשורים'
  }
};

const typeIcon: Record<MaterialType, React.ReactNode> = {
  pdf: <FileText size={18} />,
  video: <Video size={18} />,
  link: <LinkIcon size={18} />,
  brief: <BookOpen size={18} />
};

const typeTone: Record<MaterialType, string> = {
  pdf: 'border-agron-blue/35 bg-gradient-to-r from-agron-blue/15 to-cyan-400/10 text-agron-blue dark:from-agron-blue/25 dark:to-cyan-400/15 dark:text-cyan-200',
  video: 'border-red-400/35 bg-gradient-to-r from-red-500/15 to-fuchsia-400/10 text-red-600 dark:from-red-500/25 dark:to-fuchsia-400/15 dark:text-red-200',
  link: 'border-emerald-400/40 bg-gradient-to-r from-emerald-500/15 to-teal-400/10 text-emerald-700 dark:from-emerald-500/25 dark:to-teal-400/15 dark:text-emerald-200',
  brief: 'border-amber-400/40 bg-gradient-to-r from-amber-400/18 to-orange-400/10 text-amber-700 dark:from-amber-400/25 dark:to-orange-500/15 dark:text-amber-200'
};

const iconTone: Record<MaterialType, string> = {
  pdf: 'bg-agron-blue/15 text-agron-blue ring-agron-blue/25 dark:bg-cyan-400/15 dark:text-cyan-200 dark:ring-cyan-300/25',
  video: 'bg-red-500/15 text-red-600 ring-red-400/25 dark:bg-red-400/15 dark:text-red-200 dark:ring-red-300/25',
  link: 'bg-emerald-500/15 text-emerald-700 ring-emerald-400/25 dark:bg-emerald-400/15 dark:text-emerald-200 dark:ring-emerald-300/25',
  brief: 'bg-amber-400/15 text-amber-700 ring-amber-400/25 dark:bg-amber-300/15 dark:text-amber-200 dark:ring-amber-300/25'
};

const materialTone = (item: PresentationMaterial) => {
  if (item.id === 'gda') return 'from-emerald-500/15 via-white to-emerald-50 border-emerald-400/30 dark:from-emerald-500/20 dark:via-agron-950 dark:to-black';
  if (item.id === 'isdri') return 'from-cyan-500/15 via-white to-cyan-50 border-cyan-400/30 dark:from-cyan-500/20 dark:via-agron-950 dark:to-black';
  if (item.id === 'agron-platform' || item.title.includes('AGRON')) return 'from-agron-blue/20 via-white to-slate-50 border-agron-blue/35 dark:from-agron-blue/25 dark:via-agron-950 dark:to-black';
  if (item.id === 'guard') return 'from-amber-500/15 via-white to-amber-50 border-amber-400/35 dark:from-amber-500/20 dark:via-agron-950 dark:to-black';
  return 'from-slate-100 via-white to-slate-50 border-agron-200 dark:from-white/5 dark:via-agron-950 dark:to-black dark:border-white/10';
};

const AgronLogoText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  if (!text.includes('AGRON')) return <>{text}</>;
  const parts = text.split('AGRON');

  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={`${part}-${index}`}>
          {index > 0 && (
            <BrandLogo variant="inline" className={`mx-1 align-middle bg-white/90 ring-1 ring-slate-200 dark:bg-white/10 dark:ring-white/10 ${className}`} />
          )}
          {part}
        </React.Fragment>
      ))}
    </>
  );
};

const STORAGE_KEY = 'agron.presentation.library.v2';

const emptyForm: MaterialFormState = {
  id: '',
  title: '',
  type: 'pdf',
  category: 'Presentation',
  description: '',
  source: '/presentations/',
  website: '',
  shortLabel: '',
  depthText: '',
  related: ['ecosystem-main']
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || `material-${Date.now()}`;

const formToMaterial = (form: MaterialFormState, existing?: PresentationMaterial): PresentationMaterial => ({
  id: form.id || slugify(form.title),
  title: form.title.trim() || 'Untitled Material',
  type: form.type,
  category: form.category.trim() || 'Presentation',
  description: form.description.trim(),
  source: form.source.trim() || undefined,
  website: form.website.trim() || undefined,
  shortLabel: form.shortLabel.trim() || undefined,
  depth: form.depthText.split('\n').map((item) => item.trim()).filter(Boolean),
  related: form.related,
  custom: existing?.custom ?? true
});

const normalizeMaterial = (value: unknown): PresentationMaterial | null => {
  if (!value || typeof value !== 'object') return null;
  const item = value as Partial<PresentationMaterial>;
  if (!item.id || !item.title || !item.type) return null;
  if (!['pdf', 'video', 'link', 'brief'].includes(item.type)) return null;

  return {
    id: String(item.id),
    title: String(item.title),
    type: item.type,
    category: item.category ? String(item.category) : 'Presentation',
    description: item.description ? String(item.description) : '',
    source: item.source ? String(item.source) : undefined,
    website: item.website ? String(item.website) : undefined,
    shortLabel: item.shortLabel ? String(item.shortLabel) : undefined,
    depth: Array.isArray(item.depth) ? item.depth.map(String).filter(Boolean) : [],
    related: Array.isArray(item.related) ? item.related.map(String).filter(Boolean) : [],
    custom: Boolean(item.custom)
  };
};

const mergeWithDefaultLibrary = (stored: PresentationMaterial[]) => {
  const storedMap = new Map(stored.map((item) => [item.id, item]));
  const merged = presentationLibrary.map((item) => ({
    ...item,
    ...storedMap.get(item.id),
    custom: false
  }));

  const customItems = stored.filter((item) => item.custom && !presentationLibrary.some((base) => base.id === item.id));
  const all = [...merged, ...customItems];
  const ids = new Set(all.map((item) => item.id));

  return all.map((item) => ({
    ...item,
    depth: Array.isArray(item.depth) ? item.depth : [],
    related: Array.isArray(item.related) ? item.related.filter((id) => ids.has(id)) : []
  }));
};

const materialToForm = (material: PresentationMaterial): MaterialFormState => ({
  id: material.id,
  title: material.title,
  type: material.type,
  category: material.category,
  description: material.description,
  source: material.source || '',
  website: material.website || '',
  shortLabel: material.shortLabel || '',
  depthText: material.depth.join('\n'),
  related: material.related
});

const readStoredCustomMaterials = (): PresentationMaterial[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const normalized = parsed.map(normalizeMaterial).filter(Boolean) as PresentationMaterial[];
    return normalized.filter((item) => item.custom && !presentationLibrary.some((base) => base.id === item.id));
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return [];
  }
};

const createInitialLibrary = () => mergeWithDefaultLibrary(readStoredCustomMaterials());

const PresentationHub: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language.split('-')[0] as HubLanguage) in hubCopy ? (i18n.language.split('-')[0] as HubLanguage) : 'en';
  const copy = hubCopy[lang];
  const manager = managerCopy[lang];
  const [library, setLibrary] = useState<PresentationMaterial[]>(createInitialLibrary);
  const [activeId, setActiveId] = useState('ecosystem-main');
  const [history, setHistory] = useState<string[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isManaging, setIsManaging] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<MaterialFormState>(emptyForm);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
      } catch {
        // Keep the live UI working if browser storage is unavailable.
      }
    }
  }, [library]);

  const active = useMemo(
    () => library.find((item) => item.id === activeId) || library[0] || presentationLibrary[0],
    [activeId, library]
  );

  const activeIndex = Math.max(0, library.findIndex((item) => item.id === active.id));
  const previousMaterial = library[(activeIndex - 1 + library.length) % library.length];
  const nextMaterial = library[(activeIndex + 1) % library.length];
  const progress = library.length > 1 ? ((activeIndex + 1) / library.length) * 100 : 100;

  const relatedMaterials = active.related
    .map((id) => library.find((item) => item.id === id))
    .filter(Boolean) as PresentationMaterial[];

  const ecosystemCards = library.filter((item) => ['gda', 'isdri', 'agron-platform', 'guard'].includes(item.id));

  const openMaterial = (id: string) => {
    if (id === activeId) return;
    setHistory((items) => [...items, activeId]);
    setActiveId(id);
  };

  const openPreviousMaterial = () => {
    if (previousMaterial) openMaterial(previousMaterial.id);
  };

  const openNextMaterial = () => {
    if (nextMaterial) openMaterial(nextMaterial.id);
  };

  const goBack = () => {
    setHistory((items) => {
      const next = [...items];
      const previous = next.pop();
      if (previous) setActiveId(previous);
      return next;
    });
  };

  const goMain = () => {
    if (activeId !== 'ecosystem-main') setHistory((items) => [...items, activeId]);
    setActiveId('ecosystem-main');
  };

  const startNewMaterial = () => {
    setEditingId(null);
    setForm({ ...emptyForm, id: '', related: active ? [active.id] : ['ecosystem-main'] });
    setIsManaging(true);
  };

  const startEditMaterial = (item: PresentationMaterial) => {
    setEditingId(item.id);
    setForm(materialToForm(item));
    setIsManaging(true);
  };

  const saveMaterial = () => {
    const existing = editingId ? library.find((item) => item.id === editingId) : undefined;
    const material = formToMaterial(form, existing);
    setLibrary((items) => {
      const withoutCurrent = items.filter((item) => item.id !== (editingId || material.id));
      return [...withoutCurrent, material];
    });
    setActiveId(material.id);
    setEditingId(material.id);
  };

  const deleteMaterial = (id: string) => {
    const item = library.find((material) => material.id === id);
    if (!item?.custom) return;
    setLibrary((items) =>
      items
        .filter((material) => material.id !== id)
        .map((material) => ({ ...material, related: material.related.filter((relatedId) => relatedId !== id) }))
    );
    if (activeId === id) setActiveId('ecosystem-main');
    if (editingId === id) {
      setEditingId(null);
      setForm(emptyForm);
    }
  };

  const resetLibrary = () => {
    setLibrary(presentationLibrary);
    setActiveId('ecosystem-main');
    setEditingId(null);
    setForm(emptyForm);
  };

  const toggleRelated = (id: string) => {
    setForm((current) => ({
      ...current,
      related: current.related.includes(id)
        ? current.related.filter((item) => item !== id)
        : [...current.related, id]
    }));
  };

  return (
    <section className="min-h-screen bg-agron-50 dark:bg-black pt-28 pb-14 text-agron-900 dark:text-white">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-3 mb-4 px-5 py-3 rounded-full bg-white dark:bg-agron-900 border border-agron-200 dark:border-white/10 shadow-soft-xl">
                <Layers3 size={16} className="text-agron-blue" />
                <span className="text-[10px] font-black uppercase tracking-[0.35em] text-agron-500 dark:text-agron-400">{copy.eyebrow}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
                <AgronLogoText text={copy.title} />
              </h1>
              <p className="text-lg md:text-xl font-light leading-relaxed text-agron-600 dark:text-agron-400 max-w-4xl">{copy.subtitle}</p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setIsManaging((value) => !value)} className="h-12 px-5 rounded-2xl border border-agron-blue/30 bg-agron-blue/10 text-agron-blue dark:border-agron-blue/40 dark:bg-agron-blue/15 text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2">
                <Settings size={15} />
                {manager.manage}
              </button>
              <button onClick={goMain} className="h-12 px-6 rounded-2xl border border-slate-500/30 bg-slate-800 text-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600/60 text-[10px] font-black uppercase tracking-widest hover:border-agron-blue hover:text-agron-blue">
                {copy.main}
              </button>
              <button onClick={goBack} disabled={history.length === 0} className="h-12 px-6 rounded-2xl border border-slate-600/40 bg-slate-900/40 text-slate-400 dark:border-slate-700/60 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest disabled:opacity-30 hover:border-agron-blue hover:text-slate-300">
                {copy.back}
              </button>
            </div>
          </motion.div>
        </div>

        <NavigationControls
          active={active}
          activeIndex={activeIndex}
          total={library.length}
          progress={progress}
          previous={previousMaterial}
          next={nextMaterial}
          history={history}
          library={library}
          copy={manager}
          onPrevious={openPreviousMaterial}
          onNext={openNextMaterial}
          onOpenMaterial={openMaterial}
        />

        <div className="grid grid-cols-1 xl:grid-cols-[20rem_1fr] gap-5">
          <aside className="space-y-4 rounded-[2rem] border border-agron-200/80 bg-white/75 p-4 shadow-soft-xl backdrop-blur-xl dark:border-white/10 dark:bg-agron-950/80">
            <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-agron-blue/10 to-emerald-400/10 px-4 py-3 dark:from-agron-blue/15 dark:to-emerald-400/10">
              <h2 className="text-sm font-black uppercase tracking-[0.28em] text-agron-500 dark:text-agron-300">{copy.materials}</h2>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-agron-blue shadow-soft-xl dark:bg-black">{library.length} {copy.items}</span>
            </div>

            <div className="space-y-2">
              {library.map((item) => (
                <div key={item.id} className="group relative">
                  <button
                    onClick={() => openMaterial(item.id)}
                    className={`w-full text-left rounded-[1.35rem] border bg-gradient-to-br p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-glow ${
                      active.id === item.id
                        ? 'from-slate-900 via-slate-800 to-blue-950 text-slate-300 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 dark:text-slate-300 border-agron-blue shadow-blue-glow'
                        : materialTone(item)
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] ${typeTone[item.type]} ${active.id === item.id ? 'border-slate-600 bg-slate-800/80 text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400' : ''}`}>
                        <span className={`flex h-7 w-7 items-center justify-center rounded-xl ring-1 ${iconTone[item.type]} ${
                          active.id === item.id
                            ? 'bg-slate-200 text-slate-500 ring-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700'
                            : ''
                        }`}>
                          {typeIcon[item.type]}
                        </span>
                        {item.category}
                      </span>
                      <span className={`flex h-9 w-9 items-center justify-center rounded-2xl shadow-soft-xl transition-transform group-hover:translate-x-1 ${
                        active.id === item.id
                          ? 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                          : 'bg-white/70 text-agron-blue dark:bg-black/40'
                      }`}>
                        <ArrowRight size={16} />
                      </span>
                    </div>
                    <div className="text-lg font-black leading-tight tracking-tight">
                      <AgronLogoText text={item.title} />
                    </div>
                    {item.shortLabel && <div className="mt-2 text-sm font-semibold opacity-70">{item.shortLabel}</div>}
                  </button>
                  {isManaging && (
                    <div className="absolute right-2 top-2 flex gap-1">
                      <button onClick={() => startEditMaterial(item)} className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/70 text-white backdrop-blur hover:bg-agron-blue" aria-label={`Edit ${item.title}`}>
                        <Pencil size={13} />
                      </button>
                      {item.custom && (
                        <button onClick={() => deleteMaterial(item.id)} className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/70 text-white backdrop-blur hover:bg-red-600" aria-label={`Delete ${item.title}`}>
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {isManaging && (
              <div className="space-y-2">
                <button onClick={startNewMaterial} className="flex w-full items-center justify-center gap-2 rounded-[1.25rem] border border-dashed border-agron-blue p-4 text-[10px] font-black uppercase tracking-widest text-agron-blue">
                  <Plus size={15} />
                  {manager.addMaterial}
                </button>
                <button onClick={resetLibrary} className="flex w-full items-center justify-center gap-2 rounded-[1.25rem] border border-amber-300/60 bg-amber-50 p-4 text-[10px] font-black uppercase tracking-widest text-amber-700 dark:border-amber-400/25 dark:bg-amber-400/10 dark:text-amber-300">
                  <RotateCcw size={15} />
                  {manager.reset}
                </button>
              </div>
            )}
          </aside>

          <main className="min-w-0">
            {isManaging && (
              <ContentManager
                form={form}
                library={library}
                editingId={editingId}
                copy={manager}
                onChange={setForm}
                onToggleRelated={toggleRelated}
                onSave={saveMaterial}
                onNew={startNewMaterial}
              />
            )}

            <div className={`overflow-hidden rounded-[2rem] border bg-gradient-to-br shadow-soft-2xl ${materialTone(active)}`}>
              <div className="flex flex-col gap-5 border-b border-agron-200/70 bg-white/55 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-black/20 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className={`mb-3 inline-flex items-center gap-3 rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] ${typeTone[active.type]}`}>
                    <span className={`flex h-8 w-8 items-center justify-center rounded-xl ring-1 ${iconTone[active.type]}`}>
                      {typeIcon[active.type]}
                    </span>
                    {active.category}
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
                    <AgronLogoText text={active.title} />
                  </h2>
                  {active.website && (
                    <a href={active.website} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-agron-blue/30 bg-agron-blue/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-agron-blue hover:bg-agron-blue hover:text-white">
                      <ExternalLink size={14} />
                      {manager.openSite}
                    </a>
                  )}
                </div>
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="inline-flex h-12 items-center justify-center gap-3 rounded-2xl border border-slate-600/50 bg-slate-800 px-5 text-[10px] font-black uppercase tracking-widest text-slate-300 transition-colors hover:border-agron-blue hover:text-agron-blue dark:bg-slate-800 dark:text-slate-300"
                >
                  <Maximize2 size={16} />
                  {copy.fullscreen}
                </button>
              </div>

              <div className="grid grid-cols-1 2xl:grid-cols-[1fr_16rem]">
                <div className="bg-agron-100 dark:bg-black p-3 md:p-4">
                  <Viewer material={active} />
                </div>

                <div className="border-t border-agron-200/70 bg-white/65 p-5 backdrop-blur-xl dark:border-white/10 dark:bg-agron-950/75 2xl:border-l 2xl:border-t-0">
                  <div className="mb-6 rounded-2xl border border-agron-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-black/25">
                    <h3 className="text-xs font-black uppercase tracking-[0.28em] text-agron-400 mb-3">{copy.context}</h3>
                    <p className="text-sm font-semibold leading-relaxed text-agron-600 dark:text-agron-300">{active.description}</p>
                  </div>

                  <div className="mb-6 rounded-2xl border border-agron-200/70 bg-white/70 p-4 dark:border-white/10 dark:bg-black/25">
                    <h3 className="text-xs font-black uppercase tracking-[0.28em] text-agron-400 mb-3">{copy.depth}</h3>
                    <ul className="space-y-2">
                      {active.depth.map((point) => (
                        <li key={point} className="flex gap-3 rounded-xl bg-agron-50 px-3 py-2 text-sm font-bold text-agron-700 dark:bg-white/5 dark:text-agron-200">
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-agron-blue flex-none shadow-blue-glow" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.28em] text-agron-400 mb-3">{copy.deeper}</h3>
                    <div className="space-y-2">
                      {relatedMaterials.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => openMaterial(item.id)}
                          className={`w-full rounded-2xl border bg-gradient-to-br p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-blue-glow ${materialTone(item)}`}
                        >
                          <span className="block text-base font-black leading-tight">
                            <AgronLogoText text={item.title} />
                          </span>
                          <span className={`mt-2 inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-widest ${typeTone[item.type]}`}>
                            <span className={`flex h-6 w-6 items-center justify-center rounded-lg ring-1 ${iconTone[item.type]}`}>
                              {typeIcon[item.type]}
                            </span>
                            {item.category}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {active.website && (
                    <a href={active.website} target="_blank" rel="noreferrer" className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-600/50 bg-slate-800 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:border-agron-blue hover:text-agron-blue dark:bg-slate-800 dark:text-slate-300">
                      <ExternalLink size={14} />
                      {manager.openSite}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {active.id === 'ecosystem-main' && (
              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-4">
                {ecosystemCards.map((item) => (
                  <div
                    key={item.id}
                    className="group overflow-hidden rounded-[1.5rem] border border-[#b68b5f] bg-gradient-to-br from-agron-950 via-slate-900 to-black text-center text-white shadow-soft-xl transition-all hover:-translate-y-1 hover:border-agron-blue hover:shadow-blue-glow"
                  >
                    <button onClick={() => openMaterial(item.id)} className="block w-full p-5">
                      <div className="mb-2 text-3xl font-black tracking-tighter">
                        <AgronLogoText text={item.title} />
                      </div>
                      <div className="min-h-10 text-sm font-medium text-slate-300">{item.shortLabel}</div>
                    </button>
                    <div className="grid grid-cols-2 border-t border-[#b68b5f]/70">
                      <button onClick={() => openMaterial(item.id)} className="px-3 py-3 text-[10px] font-black uppercase tracking-widest text-[#c99a66] hover:bg-white/10">
                        {manager.openPresentation}
                      </button>
                      {item.website && (
                        <a href={item.website} target="_blank" rel="noreferrer" className="px-3 py-3 text-[10px] font-black uppercase tracking-widest text-[#c99a66] hover:bg-white/10">
                          {manager.openSite}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="mt-4 text-xs font-medium text-agron-500 dark:text-agron-500">{copy.files} {copy.hint}</p>
          </main>
        </div>
      </div>

      {isFullscreen && (
        <FullscreenViewer
          copy={copy}
          material={active}
          relatedMaterials={relatedMaterials}
          manager={manager}
          activeIndex={activeIndex}
          total={library.length}
          progress={progress}
          previous={previousMaterial}
          next={nextMaterial}
          onClose={() => setIsFullscreen(false)}
          onOpenMaterial={openMaterial}
          onPrevious={openPreviousMaterial}
          onNext={openNextMaterial}
        />
      )}
    </section>
  );
};

const NavigationControls: React.FC<{
  active: PresentationMaterial;
  activeIndex: number;
  total: number;
  progress: number;
  previous?: PresentationMaterial;
  next?: PresentationMaterial;
  history: string[];
  library: PresentationMaterial[];
  copy: ManagerCopy;
  onPrevious: () => void;
  onNext: () => void;
  onOpenMaterial: (id: string) => void;
}> = ({ active, activeIndex, total, progress, previous, next, history, library, copy, onPrevious, onNext, onOpenMaterial }) => {
  const historyItems = history
    .slice(-4)
    .map((id) => library.find((item) => item.id === id))
    .filter(Boolean) as PresentationMaterial[];

  return (
    <div className="mb-5 overflow-hidden rounded-[2rem] border border-agron-blue/25 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 p-4 text-slate-200 shadow-blue-glow">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-agron-blue/35 bg-agron-blue/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-agron-blue">
              {copy.materialCounter} {activeIndex + 1} / {total}
            </span>
            <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] ${typeTone[active.type]}`}>
              <span className={`flex h-7 w-7 items-center justify-center rounded-xl ring-1 ${iconTone[active.type]}`}>
                {typeIcon[active.type]}
              </span>
              {active.category}
            </span>
          </div>
          <div className="mb-3 h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-gradient-to-r from-agron-blue via-cyan-400 to-emerald-400" style={{ width: `${progress}%` }} />
          </div>
          <div className="truncate text-xl font-black tracking-tight">
            <AgronLogoText text={active.title} />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button onClick={onPrevious} className="inline-flex h-12 items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-5 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:border-agron-blue hover:text-agron-blue">
            <ArrowLeft size={16} />
            {copy.previous}
            {previous && <span className="hidden max-w-[9rem] truncate text-slate-500 lg:inline">{previous.title}</span>}
          </button>
          <button onClick={onNext} className="inline-flex h-12 items-center justify-center gap-3 rounded-2xl border border-agron-blue/40 bg-agron-blue/15 px-5 text-[10px] font-black uppercase tracking-widest text-agron-blue hover:bg-agron-blue hover:text-slate-950">
            {copy.next}
            {next && <span className="hidden max-w-[9rem] truncate text-cyan-200 lg:inline">{next.title}</span>}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">{copy.history}</div>
          <div className="flex flex-wrap gap-2">
            {historyItems.length ? historyItems.map((item) => (
              <button key={item.id} onClick={() => onOpenMaterial(item.id)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-300 hover:border-agron-blue hover:text-agron-blue">
                {item.title}
              </button>
            )) : (
              <span className="text-xs font-semibold text-slate-600">-</span>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-slate-500">{copy.connected}</div>
          <div className="flex flex-wrap gap-2">
            {active.related.slice(0, 5).map((id) => {
              const item = library.find((material) => material.id === id);
              if (!item) return null;
              return (
                <button key={item.id} onClick={() => onOpenMaterial(item.id)} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-bold text-slate-300 hover:border-agron-blue hover:text-agron-blue">
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentManager: React.FC<{
  form: MaterialFormState;
  library: PresentationMaterial[];
  editingId: string | null;
  copy: ManagerCopy;
  onChange: React.Dispatch<React.SetStateAction<MaterialFormState>>;
  onToggleRelated: (id: string) => void;
  onSave: () => void;
  onNew: () => void;
}> = ({ form, library, editingId, copy, onChange, onToggleRelated, onSave, onNew }) => (
  <div className="mb-5 overflow-hidden rounded-[2rem] border border-agron-blue/30 bg-gradient-to-br from-white via-sky-50 to-emerald-50 p-5 shadow-soft-xl dark:from-agron-950 dark:via-slate-950 dark:to-emerald-950/30">
    <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-agron-blue/25 bg-agron-blue/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.35em] text-agron-blue">
          <Network size={14} />
          {copy.contentManager}
        </div>
        <h2 className="text-2xl font-black tracking-tight">{editingId ? copy.editMaterial : copy.addPresentationMaterial}</h2>
        <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-agron-500 dark:text-agron-400">
          {copy.managerDescription}
        </p>
      </div>
      <div className="flex gap-2">
        <button onClick={onNew} className="inline-flex h-11 items-center gap-2 rounded-2xl border border-agron-200 px-4 text-[10px] font-black uppercase tracking-widest dark:border-white/10">
          <Plus size={14} />
          {copy.new}
        </button>
        <button onClick={onSave} className="inline-flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-agron-blue to-emerald-500 px-5 text-[10px] font-black uppercase tracking-widest text-white shadow-blue-glow">
          <Save size={14} />
          {copy.save}
        </button>
      </div>
    </div>

    <div className="mb-5 grid gap-3 md:grid-cols-3">
      <StatusPill label={copy.sourceReady} value={form.source || '-'} tone="blue" />
      <StatusPill label={copy.siteReady} value={form.website || '-'} tone="emerald" />
      <StatusPill label={copy.relatedCount} value={String(form.related.length)} tone="amber" />
    </div>

    <div className="grid gap-4 lg:grid-cols-2">
      <Field label={copy.title}>
        <input value={form.title} onChange={(event) => onChange((current) => ({ ...current, title: event.target.value, id: current.id || slugify(event.target.value) }))} className="presentation-input" placeholder="AGRON Operations Deck" />
      </Field>
      <Field label={copy.id}>
        <input value={form.id} onChange={(event) => onChange((current) => ({ ...current, id: slugify(event.target.value) }))} className="presentation-input" placeholder="agron-operations-deck" />
      </Field>
      <Field label={copy.type}>
        <select value={form.type} onChange={(event) => onChange((current) => ({ ...current, type: event.target.value as MaterialType }))} className="presentation-input">
          <option value="pdf">{copy.pdfType}</option>
          <option value="video">{copy.videoType}</option>
          <option value="link">{copy.linkType}</option>
          <option value="brief">{copy.briefType}</option>
        </select>
      </Field>
      <Field label={copy.category}>
        <input value={form.category} onChange={(event) => onChange((current) => ({ ...current, category: event.target.value }))} className="presentation-input" placeholder="Investor / Operations / Training" />
      </Field>
      <Field label={copy.source}>
        <input value={form.source} onChange={(event) => onChange((current) => ({ ...current, source: event.target.value }))} className="presentation-input" placeholder="/presentations/file.pdf or https://example.com" />
      </Field>
      <Field label={copy.website}>
        <input value={form.website} onChange={(event) => onChange((current) => ({ ...current, website: event.target.value }))} className="presentation-input" placeholder="https://www.agron1.com" />
      </Field>
      <Field label={copy.shortLabel}>
        <input value={form.shortLabel} onChange={(event) => onChange((current) => ({ ...current, shortLabel: event.target.value }))} className="presentation-input" placeholder="Platform / Operations / Data" />
      </Field>
      <Field label={copy.description}>
        <textarea value={form.description} onChange={(event) => onChange((current) => ({ ...current, description: event.target.value }))} className="presentation-input min-h-24 resize-y" placeholder="Short operational context for this material." />
      </Field>
      <Field label={copy.depthPoints}>
        <textarea value={form.depthText} onChange={(event) => onChange((current) => ({ ...current, depthText: event.target.value }))} className="presentation-input min-h-28 resize-y" placeholder={'One point per line\nExecution structure\nInvestor model\nDeployment logic'} />
      </Field>
      <div className="rounded-2xl border border-agron-blue/20 bg-white/70 p-4 dark:border-white/10 dark:bg-black/25">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-agron-400">
          <Network size={14} />
          {copy.relatedMaterials}
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {library.filter((item) => item.id !== form.id).map((item) => (
            <label key={item.id} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-xs font-bold transition-colors ${
              form.related.includes(item.id)
                ? 'border-agron-blue bg-agron-blue/10 text-agron-blue'
                : 'border-agron-200 bg-white/70 dark:border-white/10 dark:bg-black/20'
            }`}>
              <input type="checkbox" checked={form.related.includes(item.id)} onChange={() => onToggleRelated(item.id)} />
              <span>{item.title}</span>
            </label>
          ))}
        </div>
      </div>
    </div>

    <p className="mt-4 text-xs font-medium leading-relaxed text-agron-500 dark:text-agron-400">
      {copy.filesNote}
    </p>
  </div>
);

const StatusPill: React.FC<{ label: string; value: string; tone: 'blue' | 'emerald' | 'amber' }> = ({ label, value, tone }) => {
  const toneClass = {
    blue: 'border-agron-blue/25 bg-agron-blue/10 text-agron-blue',
    emerald: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-600 dark:text-emerald-300',
    amber: 'border-amber-400/40 bg-amber-400/10 text-amber-700 dark:text-amber-300'
  }[tone];

  return (
    <div className={`rounded-2xl border p-4 ${toneClass}`}>
      <div className="mb-2 text-[9px] font-black uppercase tracking-[0.28em] opacity-75">{label}</div>
      <div className="truncate text-sm font-black">{value}</div>
    </div>
  );
};

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label className="block">
    <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.28em] text-agron-400">{label}</span>
    {children}
  </label>
);

const FullscreenViewer: React.FC<{
  copy: HubCopy;
  manager: ManagerCopy;
  material: PresentationMaterial;
  relatedMaterials: PresentationMaterial[];
  activeIndex: number;
  total: number;
  progress: number;
  previous?: PresentationMaterial;
  next?: PresentationMaterial;
  onClose: () => void;
  onOpenMaterial: (id: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}> = ({ copy, manager, material, relatedMaterials, activeIndex, total, progress, previous, next, onClose, onOpenMaterial, onPrevious, onNext }) => (
  <div className="fixed inset-0 z-[120] bg-black text-white">
    <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 bg-black/80 px-5 py-3 backdrop-blur-xl">
      <div className="min-w-0">
        <div className={`mb-1 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.28em] ${typeTone[material.type]}`}>
          <span className={`flex h-6 w-6 items-center justify-center rounded-lg ring-1 ${iconTone[material.type]}`}>
            {typeIcon[material.type]}
          </span>
          {material.category}
        </div>
        <h2 className="truncate text-lg font-black tracking-tight md:text-2xl">
          <AgronLogoText text={material.title} />
        </h2>
      </div>
      <FullscreenQuickControls
        material={material}
        activeIndex={activeIndex}
        total={total}
        progress={progress}
        previous={previous}
        next={next}
        copy={manager}
        onPrevious={onPrevious}
        onNext={onNext}
      />
      <div className="flex items-center gap-3">
        {material.website && (
          <a href={material.website} target="_blank" rel="noreferrer" className="hidden h-11 items-center justify-center gap-2 rounded-2xl border border-agron-blue/50 bg-agron-blue/15 px-4 text-[10px] font-black uppercase tracking-widest text-agron-blue hover:bg-agron-blue hover:text-white md:inline-flex">
            <ExternalLink size={15} />
            {manager.openSite}
          </a>
        )}
        <button onClick={onClose} className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-agron-blue hover:text-agron-blue">
          <Minimize2 size={15} />
          {copy.collapse}
        </button>
        <button onClick={onClose} className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-slate-400 hover:border-agron-blue hover:text-agron-blue" aria-label={copy.close}>
          <X size={18} />
        </button>
      </div>
    </div>

    <div className="absolute inset-x-0 bottom-0 top-[5.25rem] grid grid-cols-1 xl:grid-cols-[1fr_15rem]">
      <div className="relative h-full min-h-0 bg-black">
        <Viewer material={material} fullscreen />
      </div>
      <aside className="hidden overflow-y-auto border-l border-white/10 bg-gradient-to-b from-agron-950 via-slate-950 to-black p-4 xl:block">
        <h3 className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-[0.24em] text-agron-300">
          <Network size={14} />
          {copy.deeper}
        </h3>
        <div className="space-y-2">
          {relatedMaterials.map((item) => (
            <button key={item.id} onClick={() => onOpenMaterial(item.id)} className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-agron-blue hover:bg-agron-blue/10">
              <span className={`mb-3 inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-widest ${typeTone[item.type]}`}>
                <span className={`flex h-6 w-6 items-center justify-center rounded-lg ring-1 ${iconTone[item.type]}`}>
                  {typeIcon[item.type]}
                </span>
                {item.category}
              </span>
              <span className="block text-base font-black leading-tight">
                <AgronLogoText text={item.title} />
              </span>
              <span className="mt-2 block text-[9px] font-black uppercase tracking-widest text-agron-500">{manager.deeperLevel}</span>
            </button>
          ))}
        </div>
        {material.website && (
          <a href={material.website} target="_blank" rel="noreferrer" className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:border-agron-blue hover:text-agron-blue">
            <ExternalLink size={14} />
            {manager.openSite}
          </a>
        )}
      </aside>
    </div>
  </div>
);

const FullscreenQuickControls: React.FC<{
  material: PresentationMaterial;
  activeIndex: number;
  total: number;
  progress: number;
  previous?: PresentationMaterial;
  next?: PresentationMaterial;
  copy: ManagerCopy;
  onPrevious: () => void;
  onNext: () => void;
}> = ({ material, activeIndex, total, progress, previous, next, copy, onPrevious, onNext }) => (
  <div className="hidden min-w-0 flex-1 items-center justify-center gap-3 px-3 xl:flex">
    <div className="min-w-0 rounded-2xl border border-slate-700/80 bg-slate-950/85 px-3 py-2 shadow-2xl backdrop-blur-xl">
      <div className="mb-1.5 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-agron-blue/40 bg-agron-blue/15 px-3 py-1 text-[9px] font-black uppercase tracking-[0.22em] text-agron-blue">
          {copy.materialCounter} {activeIndex + 1} / {total}
        </span>
        <span className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] ${typeTone[material.type]}`}>
          <span className={`flex h-5 w-5 items-center justify-center rounded-lg ring-1 ${iconTone[material.type]}`}>
            {typeIcon[material.type]}
          </span>
          {material.category}
        </span>
      </div>
      <div className="h-1.5 w-44 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full rounded-full bg-gradient-to-r from-agron-blue via-cyan-400 to-emerald-400" style={{ width: `${progress}%` }} />
      </div>
    </div>

    <div className="flex gap-2">
      <button onClick={onPrevious} className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-950/85 px-3 text-[9px] font-black uppercase tracking-widest text-slate-300 shadow-2xl backdrop-blur-xl hover:border-agron-blue hover:text-agron-blue">
        <ArrowLeft size={15} />
        {copy.previous}
        {previous && <span className="hidden max-w-[7rem] truncate text-slate-500 2xl:inline">{previous.title}</span>}
      </button>
      <button onClick={onNext} className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl border border-agron-blue/45 bg-agron-blue/15 px-3 text-[9px] font-black uppercase tracking-widest text-agron-blue shadow-2xl backdrop-blur-xl hover:bg-agron-blue hover:text-slate-950">
        {copy.next}
        {next && <span className="hidden max-w-[7rem] truncate text-cyan-200 2xl:inline">{next.title}</span>}
        <ArrowRight size={15} />
      </button>
    </div>
  </div>
);

const Viewer: React.FC<{ material: PresentationMaterial; fullscreen?: boolean }> = ({ material, fullscreen = false }) => {
  const pdfSource = material.source ? `${material.source}#toolbar=1&navpanes=0&scrollbar=1&view=FitH` : undefined;

  if (material.type === 'video') {
    return (
      <div className={`${fullscreen ? 'h-full rounded-none border-0' : 'aspect-video rounded-[1rem] border border-white/10'} overflow-hidden bg-black`}>
        {material.source ? (
          <video className="h-full w-full" controls src={material.source} />
        ) : (
          <EmptyViewer icon={<Play size={28} />} title="Video slot" text="Add an MP4 file to public/presentations and set the source path." />
        )}
      </div>
    );
  }

  if (material.type === 'link') {
    return (
      <div className={`${fullscreen ? 'h-full rounded-none border-0 bg-black' : 'h-[42rem] md:h-[54rem] rounded-[1rem] border border-agron-200 bg-white dark:bg-agron-950 dark:border-white/10'} overflow-hidden`}>
        {material.source ? (
          <div className="relative h-full">
            <iframe title={material.title} src={material.source} className="block h-full w-full bg-white" />
            <a
              href={material.source}
              target="_blank"
              rel="noreferrer"
              className="absolute right-4 top-4 rounded-2xl bg-black/75 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur transition-colors hover:bg-agron-blue"
            >
              Open link
            </a>
          </div>
        ) : (
          <EmptyViewer icon={<LinkIcon size={28} />} title="Website slot" text="Add a website URL or hosted content link." />
        )}
      </div>
    );
  }

  if (material.type === 'pdf') {
    return (
      <div className={`${fullscreen ? 'h-full rounded-none border-0 bg-black' : 'h-[42rem] md:h-[54rem] rounded-[1rem] border border-agron-200 bg-white dark:bg-agron-950 dark:border-white/10'} overflow-hidden`}>
        {pdfSource ? (
          <iframe title={material.title} src={pdfSource} className="block h-full w-full bg-black" />
        ) : (
          <EmptyViewer icon={<FileText size={28} />} title="PDF slot" text="Add a PDF file to public/presentations and set the source path." />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-[34rem] rounded-[1rem] bg-white dark:bg-agron-950 border border-agron-200 dark:border-white/10 p-8">
      <EmptyViewer icon={<BookOpen size={28} />} title={material.title} text={material.description} />
    </div>
  );
};

const EmptyViewer: React.FC<{ icon: React.ReactNode; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="h-full min-h-[20rem] flex flex-col items-center justify-center text-center p-8">
    <div className="w-16 h-16 rounded-3xl bg-agron-blue/10 text-agron-blue flex items-center justify-center mb-6">{icon}</div>
    <h3 className="text-2xl font-black tracking-tight mb-3">{title}</h3>
    <p className="max-w-md text-sm font-medium leading-relaxed text-agron-500 dark:text-agron-400">{text}</p>
  </div>
);

export default PresentationHub;
