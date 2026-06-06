export enum UserRole {
  TRAINEE = 'TRAINEE',
  INSTRUCTOR = 'INSTRUCTOR',
  ADMIN = 'ADMIN'
}

export enum Language {
  EN = 'en',
  ES = 'es',
  JA = 'ja',
  FR = 'fr',
  AR = 'ar',
  HE = 'he',
  RU = 'ru',
  UK = 'uk',
  DE = 'de'
}

export const languages = [
  { code: Language.EN, name: 'English', flag: '🇺🇸', dir: 'ltr' },
  { code: Language.ES, name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: Language.JA, name: '日本語', flag: '🇯🇵', dir: 'ltr' },
  { code: Language.FR, name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: Language.AR, name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: Language.HE, name: 'עברית', flag: '🇮🇱', dir: 'rtl' },
  { code: Language.RU, name: 'Русский', flag: '🇷🇺', dir: 'ltr' },
  { code: Language.UK, name: 'Українська', flag: '🇺🇦', dir: 'ltr' },
  { code: Language.DE, name: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
];

export interface TrainingModule {
  id: string;
  title: string;
  level: 'Foundational' | 'Advanced' | 'Instructor';
  duration: string;
  category: 'Flight' | 'Hardware' | 'AgOps' | 'Systems' | 'Operations';
  status: 'Not Started' | 'In Progress' | 'Certified';
}

export interface SimulationScenario {
  id: string;
  title: string;
  platformType: string;
  environment: string;
  riskLevel: 'Low' | 'Moderate' | 'Critical';
  objectives: string[];
  safetyProtocols: string[];
}

export interface OperatorProfile {
  id: string;
  fullName: string;
  callsign: string;
  clearanceLevel: string;
  certifications: string[];
  flightHours: number;
  lastAssessmentDate: string;
}

export interface SystemBackup {
  version: string;
  timestamp: string;
  profile: OperatorProfile;
  missions: SimulationScenario[];
}

export interface GeminiResponse {
  text: string;
}