import { CVData, CVTemplate } from '../types/cv';
import { renderClassicTemplate } from './templates/classicTemplate';
import { renderEngineeringTemplate } from './templates/engineeringTemplate';
import { renderHospitalityTemplate } from './templates/hospitalityTemplate';
import { renderExecutiveTemplate } from './templates/executiveTemplate';
import { renderZenithTemplate } from './templates/zenithTemplate';
import { renderCreativeEdgeTemplate } from './templates/creativeTemplate';
import { renderProfileEleganceTemplate } from './templates/profileTemplate';

/**
 * Generates a fully self-contained, print-safe A4 HTML document.
 * Routes to the correct template based on `data.template`.
 */
export const generateCVTemplate = (
  data: CVData,
  lang: 'en' | 'ar' = 'en'
): string => {
  const isRTL = lang === 'ar';
  const template: CVTemplate = data.template || 'classic';

  switch (template) {
    case 'engineering':
      return renderEngineeringTemplate(data, isRTL);
    case 'hospitality':
      return renderHospitalityTemplate(data, isRTL);
    case 'executive':
      return renderExecutiveTemplate(data, isRTL);
    case 'zenith':
      return renderZenithTemplate(data, isRTL);
    case 'creative-edge':
      return renderCreativeEdgeTemplate(data, isRTL);
    case 'profile-elegance':
      return renderProfileEleganceTemplate(data, isRTL);
    case 'classic':
    default:
      return renderClassicTemplate(data, isRTL);
  }
};
