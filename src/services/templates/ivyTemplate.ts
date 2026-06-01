import { CVData } from '../../types/cv';
import { LABELS } from './labels';

export const renderIvyTemplate = (data: CVData, isRTL: boolean): string => {
  const lang = isRTL ? 'ar' : 'en';
  const lbl = LABELS[lang];
  const dir = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';
  const listPaddingSide = isRTL ? 'padding-right' : 'padding-left';
  const fontStack = "'Inter', 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  // Ultra-Clean, Modern, Light & Professional Slate Palette
  const c = {
    white: '#FFFFFF',
    black: '#0F172A',      // deep slate black
    body: '#1E293B',       // charcoal slate text
    gray: '#475569',       // refined slate gray
    lightGray: '#F8FAFC',  // softest blue-gray background
    border: '#E2E8F0',     // modern clean border
  };

  const initials = data.fullName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const parseSkill = (skillStr: string, defaultVal: number = 85): { name: string; percentage: number } => {
    const percentRegex = /(?::|\||-|\()?[:\s]*(\d+)\s*%?\)?\s*$/;
    const match = skillStr.match(percentRegex);
    if (match) {
      const val = parseInt(match[1], 10);
      if (!isNaN(val) && val >= 0 && val <= 100) {
        const cleanName = skillStr.replace(percentRegex, '').trim();
        return { name: cleanName, percentage: val };
      }
    }
    return { name: skillStr.trim(), percentage: defaultVal };
  };

  const contactParts: string[] = [];
  if (data.email) contactParts.push(data.email);
  if (data.phone) contactParts.push(data.phone);
  if (data.address) contactParts.push(data.address);
  const contactLine = contactParts.join(' &bull; ');

  const sectionTitle = (title: string): string => `
    <h2 class="section-block" style="font-family:${fontStack}; font-size:11.5px; font-weight:700; color:${c.black}; text-align:${textAlign}; text-transform:uppercase; letter-spacing:1px; margin:22px 0 10px 0; padding-bottom:5px; border-bottom:1.5px solid ${c.black}; page-break-after:avoid;">${title}</h2>`;

  const summaryHtml = data.summary ? `
    <div style="text-align:${textAlign}; margin-bottom:2px;">
      <p style="font-family:${fontStack}; font-size:10.5px; color:${c.body}; line-height:1.6; margin:0;">${data.summary}</p>
    </div>` : '';

  const experienceHtml = data.workExperience.filter(e => e.jobTitle).map(exp => `
    <div class="resume-item" style="margin-bottom:14px; page-break-inside:avoid; break-inside:avoid;">
      <table style="width:100%; border-collapse:collapse; border:none;" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:top; border:none; text-align:${textAlign};">
            <div style="font-family:${fontStack}; font-size:11.5px; font-weight:700; color:${c.black};">${exp.companyLocation}</div>
            <div style="font-family:${fontStack}; font-size:10px; font-style:italic; color:${c.gray}; margin:2px 0 6px 0;">${exp.jobTitle}</div>
          </td>
          <td style="vertical-align:top; border:none; text-align:${isRTL ? 'left' : 'right'}; width:150px; font-family:${fontStack}; font-size:10px; font-weight:600; color:${c.black};">
            ${exp.dateRange || ''}
          </td>
        </tr>
      </table>
      ${exp.mainTasks.filter(t => t).length > 0 ? `
        <ul style="margin:0; ${listPaddingSide}:16px; list-style-type:square; color:${c.black}; text-align:${textAlign};">
          ${exp.mainTasks.filter(t => t).map(t => `<li style="font-family:${fontStack}; font-size:10px; color:${c.gray}; line-height:1.6; margin-bottom:2px;"><span style="color:${c.body};">${t}</span></li>`).join('')}
        </ul>` : ''}
    </div>
  `).join('') || '';

  const educationHtml = data.education.filter(e => e.degree || e.institution).map(edu => `
    <div class="resume-item" style="margin-bottom:12px; page-break-inside:avoid; break-inside:avoid;">
      <table style="width:100%; border-collapse:collapse; border:none;" cellpadding="0" cellspacing="0">
        <tr>
          <td style="vertical-align:top; border:none; text-align:${textAlign};">
            <div style="font-family:${fontStack}; font-size:11.5px; font-weight:700; color:${c.black};">${edu.institution}</div>
            <div style="font-family:${fontStack}; font-size:10px; font-style:italic; color:${c.gray}; margin:2px 0 0 0;">${edu.degree}</div>
          </td>
          <td style="vertical-align:top; border:none; text-align:${isRTL ? 'left' : 'right'}; width:150px; font-family:${fontStack}; font-size:10px; font-weight:600; color:${c.black};">
            ${edu.year || ''}
          </td>
        </tr>
      </table>
      ${edu.notes ? `<div style="font-family:${fontStack}; font-size:9.5px; color:${c.gray}; margin-top:4px; text-align:${textAlign};">${edu.notes}</div>` : ''}
    </div>
  `).join('') || '';

  const skillsHtml = data.skills.length > 0 ? `
    <div class="resume-item" style="page-break-inside:avoid; break-inside:avoid; font-size:0; line-height:0; text-align:${textAlign}; margin-top:4px;">
      ${data.skills.map(s => {
        const info = parseSkill(s);
        return `<span style="display:inline-block; font-family:${fontStack}; font-size:9.5px; font-weight:500; color:${c.black}; background:${c.lightGray}; border:1px solid ${c.border}; border-radius:4px; padding:3px 8px; margin:0 4px 6px 0; line-height:1.4;">${info.name}${info.percentage ? ` &bull; ${info.percentage}%` : ''}</span>`;
      }).join('')}
    </div>` : '';

  const coursesHtml = data.courses.length > 0 ? `
    <div class="resume-item" style="page-break-inside:avoid; break-inside:avoid; font-size:0; line-height:0; text-align:${textAlign}; margin-top:4px;">
      ${data.courses.map(course => `<span style="display:inline-block; font-family:${fontStack}; font-size:9.5px; font-weight:500; color:${c.gray}; background:${c.lightGray}; border:1px solid ${c.border}; border-radius:4px; padding:3px 8px; margin:0 4px 6px 0; line-height:1.4;">${course}</span>`).join('')}
    </div>` : '';

  const languagesHtml = data.languages.length > 0 ? `
    <div class="resume-item" style="page-break-inside:avoid; break-inside:avoid; text-align:${textAlign}; margin-top:4px;">
      ${data.languages.map(l => `
        <span style="display:inline-block; font-family:${fontStack}; font-size:9.5px; font-weight:500; color:${c.black}; background:${c.lightGray}; border:1px solid ${c.border}; border-radius:4px; padding:3px 8px; margin:0 4px 6px 0; line-height:1.4;">${l.name} — <span style="color:${c.gray};">${l.level}</span></span>
      `).join('')}
    </div>` : '';

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:light;">
<head>
  <meta charset="utf-8"><meta name="color-scheme" content="light">
  <title>${data.fullName} - Resume</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Cairo:wght@400;500;600;700;900&display=swap" rel="stylesheet">
  <style>
    html{color-scheme:light;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    *{box-sizing:border-box;margin:0;padding:0;forced-color-adjust:none;}
    body{
      background:${c.white} !important;color:${c.body} !important;
      color-scheme:light;font-family:${fontStack};font-size:11px;line-height:1.5;
      width:210mm;min-height:297mm;margin:0 auto;direction:${dir};padding:20mm 20mm;
      -webkit-print-color-adjust:exact;print-color-adjust:exact;
    }
    .resume-item, .section-container, ul, li{
      page-break-inside:avoid;
      break-inside:avoid;
    }
    h2, .section-title{
      page-break-after:avoid;
    }
    @media print{
      body{-webkit-print-color-adjust:exact;print-color-adjust:exact;background:${c.white} !important;color:${c.black} !important;}
    }
  </style>
</head>
<body>

  <!-- Premium Header -->
  <div style="margin-bottom:24px; border-bottom:2px solid ${c.black}; padding-bottom:18px; page-break-after:avoid;">
    <table style="width:100%; border-collapse:collapse; border:none;" cellpadding="0" cellspacing="0">
      <tr>
        <!-- Name and Title Cell -->
        <td style="vertical-align:middle; border:none; text-align:${textAlign};">
          <h1 style="font-family:${fontStack}; font-size:26px; font-weight:800; color:${c.black}; text-transform:uppercase; letter-spacing:0.5px; margin:0 0 4px 0; line-height:1.2;">${data.fullName}</h1>
          ${data.workExperience.length > 0 ? `
            <p style="font-family:${fontStack}; font-size:11px; font-weight:600; color:${c.gray}; text-transform:uppercase; letter-spacing:1px; margin:0 0 10px 0;">${data.workExperience[0].jobTitle}</p>
          ` : ''}
          <div style="font-family:${fontStack}; font-size:10px; color:${c.gray}; line-height:1.6;">
            ${contactLine}
          </div>
        </td>
        <!-- Profile Image Cell -->
        <td style="width:90px; vertical-align:middle; border:none; padding-${isRTL ? 'right' : 'left'}:20px; text-align:${isRTL ? 'left' : 'right'};">
          <div style="width:75px; height:75px; border-radius:50%; background:${c.lightGray}; border:1px solid ${c.border}; display:inline-flex; align-items:center; justify-content:center; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.06);">
            ${data.profileImage ? `
              <img src="${data.profileImage}" alt="Profile" style="width:100%; height:100%; object-fit:cover; display:block;" />
            ` : `
              <span style="font-family:${fontStack}; font-size:22px; font-weight:700; color:${c.black};">${initials}</span>
            `}
          </div>
        </td>
      </tr>
    </table>
  </div>

  <!-- Summary Section -->
  ${summaryHtml ? sectionTitle(lbl.summary) + summaryHtml : ''}

  <!-- Work Experience Section -->
  ${experienceHtml ? sectionTitle(lbl.experience) + experienceHtml : ''}

  <!-- Education Section -->
  ${educationHtml ? sectionTitle(lbl.education) + educationHtml : ''}

  <!-- Skills Section -->
  ${skillsHtml ? sectionTitle(lbl.skills) + skillsHtml : ''}

  <!-- Courses Section -->
  ${coursesHtml ? sectionTitle(lbl.courses) + coursesHtml : ''}

  <!-- Languages Section -->
  ${languagesHtml ? sectionTitle(lbl.languages) + languagesHtml : ''}

</body>
</html>`;
};
