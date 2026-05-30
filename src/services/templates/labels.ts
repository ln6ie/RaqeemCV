export type Lang = 'en' | 'ar';

export const LABELS = {
  en: {
    summary: 'Summary',
    skills: 'Skills',
    experience: 'Work Experience',
    education: 'Education',
    courses: 'Courses',
    languages: 'Languages',
    address: 'Official Address',
    mainTasks: 'Main Tasks:',
  },
  ar: {
    summary: 'الخلاصة المهنية',
    skills: 'المهارات والقدرات',
    experience: 'الخبرات المهنية',
    education: 'التعليم والشهادات الاكاديمية',
    courses: 'الدورات التدريبية',
    languages: 'اللغات',
    address: 'العنوان الرسمي',
    mainTasks: 'المهام الرئيسية:',
  },
} as const;
