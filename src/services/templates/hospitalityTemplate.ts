import { CVData } from '../../types/cv';
import { LABELS } from './labels';

export const renderHospitalityTemplate = (data: CVData, isRTL: boolean): string => {
  const lang = isRTL ? 'ar' : 'en';
  const lbl = LABELS[lang];
  const dir = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';
  const listPaddingSide = isRTL ? 'padding-right' : 'padding-left';
  const fontStack = "'Cairo', 'Times New Roman', Times, serif";
  const c = {
    background: '#FEFCF9',
    headerBg: '#8B6F47',
    headerText: '#FFFFFF',
    body: '#3D3229',
    secondaryText: '#6B5E50',
    accent: '#C4956A',
    border: '#E8DFD3',
    cardBg: '#FFFFFF',
    sectionAccent: '#A67C52',
  };

  const sectionTitle = (title: string): string => `
    <h2 style="font-family:${fontStack}; font-size:13px; font-weight:700; color:${c.sectionAccent}; margin:18px 0 10px 0; text-align:${textAlign}; letter-spacing:0.3px;">
      <span style="background:${c.accent}; color:${c.headerText}; padding:3px 12px; border-radius:9999px; font-size:10px; display:inline-block;">${title}</span>
    </h2>`;

  const renderExperience = (): string =>
    data.workExperience.map((exp) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:12px; background:${c.cardBg}; border-radius:10px; padding:12px 14px; border:1px solid ${c.border}; text-align:${textAlign};">
        <h3 style="font-family:${fontStack}; font-size:12px; font-weight:bold; color:${c.body}; margin:0 0 2px 0;">${exp.jobTitle}</h3>
        <p style="font-family:${fontStack}; font-size:10px; color:${c.accent}; margin:0 0 1px 0; font-weight:600;">${exp.companyLocation}</p>
        <p style="font-family:${fontStack}; font-size:9.5px; font-style:italic; color:${c.secondaryText}; margin:0 0 6px 0;">${exp.dateRange}</p>
        <ul style="margin:0; ${listPaddingSide}:14px; list-style-type:circle;">
          ${exp.mainTasks.filter((t) => t.trim().length > 0).map((task) =>
            `<li style="margin-bottom:3px; font-family:${fontStack}; font-size:9.5px; color:${c.body}; text-align:${textAlign};">${task}</li>`
          ).join('')}
        </ul>
      </div>`
    ).join('');

  const renderEducation = (): string =>
    data.education.map((edu) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:10px; background:${c.cardBg}; border-radius:10px; padding:12px 14px; border:1px solid ${c.border}; text-align:${textAlign};">
        <h3 style="font-family:${fontStack}; font-size:12px; font-weight:bold; color:${c.body}; margin:0 0 2px 0;">${edu.degree}</h3>
        <p style="font-family:${fontStack}; font-size:10px; color:${c.accent}; margin:0;">${edu.institution} <span style="color:${c.secondaryText};">${edu.year}</span></p>
        ${edu.notes ? `<p style="font-family:${fontStack}; font-size:9px; font-style:italic; color:${c.secondaryText}; margin:4px 0 0 0;">${edu.notes}</p>` : ''}
      </div>`
    ).join('');

  const renderSkills = (): string => `
    <div style="page-break-inside:avoid; break-inside:avoid; text-align:${textAlign};">
      <div style="display:flex; flex-wrap:wrap; gap:6px; justify-content:${isRTL ? 'flex-end' : 'flex-start'};">
        ${data.skills.map(s => `<span style="background:${c.accent}; color:${c.headerText}; padding:4px 12px; border-radius:9999px; font-family:${fontStack}; font-size:9px; display:inline-block; margin:2px;">${s}</span>`).join('')}
      </div>
    </div>`;

  const renderCourses = (): string => `
    <div style="page-break-inside:avoid; break-inside:avoid; text-align:${textAlign};">
      <div style="display:flex; flex-wrap:wrap; gap:6px; justify-content:${isRTL ? 'flex-end' : 'flex-start'};">
        ${data.courses.map(course => `<span style="background:${c.border}; color:${c.body}; padding:4px 12px; border-radius:9999px; font-family:${fontStack}; font-size:9px; display:inline-block; margin:2px;">${course}</span>`).join('')}
      </div>
    </div>`;

  const renderLanguages = (): string =>
    data.languages.map((l) => `
      <div style="font-family:${fontStack}; font-size:10px; color:${c.body}; text-align:${textAlign}; margin-bottom:4px;">
        <span style="font-weight:600; color:${c.accent};">${l.name}:</span> ${l.level}
      </div>`
    ).join('');

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:light;">
<head>
  <meta charset="utf-8"><meta name="color-scheme" content="light">
  <title>${data.fullName} - CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    html{color-scheme:light;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    *{box-sizing:border-box;margin:0;padding:0;forced-color-adjust:none;}
    body{background-color:${c.background} !important;color:${c.body} !important;color-scheme:light;font-family:${fontStack};font-size:11px;line-height:1.5;width:210mm;min-height:297mm;margin:0 auto;padding:0 24px 24px;direction:${dir};-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  </style>
</head>
<body>
  <div style="background:${c.headerBg}; color:${c.headerText}; padding:28px 24px; border-radius:0 0 30px 30px; text-align:center; margin-bottom:8px;">
    <h1 style="font-family:${fontStack}; font-size:26px; font-weight:900; color:${c.headerText}; margin-bottom:6px; letter-spacing:0.3px;">${data.fullName}</h1>
    <div style="font-family:${fontStack}; font-size:10px; color:${c.headerText}; opacity:0.9; display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
      <span>${data.address}</span><span>${data.phone}</span><span>${data.email}</span>
    </div>
  </div>

  ${data.summary ? `<div style="page-break-inside:avoid; break-inside:avoid; text-align:${textAlign}; background:${c.cardBg}; border-radius:10px; padding:14px; border:1px solid ${c.border}; margin:10px 0;"><p style="font-family:${fontStack}; font-size:10px; color:${c.body}; line-height:1.7;">${data.summary}</p></div>` : ''}

  ${data.skills.length > 0 ? `<div style="page-break-inside:avoid;">${sectionTitle(lbl.skills)}${renderSkills()}</div>` : ''}

  ${data.workExperience.length > 0 ? `<div>${sectionTitle(lbl.experience)}${renderExperience()}</div>` : ''}

  ${data.education.length > 0 ? `<div>${sectionTitle(lbl.education)}${renderEducation()}</div>` : ''}

  ${data.courses.length > 0 ? `<div style="page-break-inside:avoid;">${sectionTitle(lbl.courses)}${renderCourses()}</div>` : ''}

  ${data.languages.length > 0 ? `<div style="page-break-inside:avoid;">${sectionTitle(lbl.languages)}<div style="margin:0 0 0 4px;">${renderLanguages()}</div></div>` : ''}
</body>
</html>`;
};
