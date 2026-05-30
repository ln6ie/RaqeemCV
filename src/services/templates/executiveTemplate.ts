import { CVData } from '../../types/cv';
import { LABELS } from './labels';

export const renderExecutiveTemplate = (data: CVData, isRTL: boolean): string => {
  const lang = isRTL ? 'ar' : 'en';
  const lbl = LABELS[lang];
  const dir = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';
  const listPaddingSide = isRTL ? 'padding-right' : 'padding-left';
  const fontStack = "'Cairo', 'Times New Roman', Times, serif";
  const c = {
    background: '#FFFFFF',
    headerBg: '#1A1A2E',
    headerText: '#FFFFFF',
    gold: '#C9A84C',
    body: '#2D2D3D',
    secondaryText: '#5A5A6E',
    accent: '#1A1A2E',
    border: '#E2E2EC',
    accentLight: '#16213E',
  };

  const sectionTitle = (title: string): string => `
    <h2 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.accent}; margin:18px 0 10px 0; text-align:${textAlign}; border-bottom:1px solid ${c.gold}; padding-bottom:4px; letter-spacing:1px;">
      ${title}
    </h2>`;

  const renderExperience = (): string =>
    data.workExperience.map((exp) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px; text-align:${textAlign};">
        <div style="display:flex; justify-content:space-between; align-items:baseline; flex-direction:${isRTL ? 'row-reverse' : 'row'};">
          <h3 style="font-family:${fontStack}; font-size:11px; font-weight:bold; color:${c.accent}; margin:0;">${exp.jobTitle}</h3>
          <span style="font-family:${fontStack}; font-size:9px; color:${c.gold}; font-weight:600;">${exp.dateRange}</span>
        </div>
        <p style="font-family:${fontStack}; font-size:10px; font-weight:600; color:${c.secondaryText}; margin:2px 0 6px 0;">${exp.companyLocation}</p>
        <ul style="margin:0; ${listPaddingSide}:14px; list-style-type:none;">
          ${exp.mainTasks.filter((t) => t.trim().length > 0).map((task) =>
            `<li style="margin-bottom:4px; font-family:${fontStack}; font-size:9.5px; color:${c.body}; text-align:${textAlign}; position:relative; ${listPaddingSide === 'padding-left' ? 'padding-left:12px;' : 'padding-right:12px;'}">${lang === 'ar' ? '▸' : '▸'} ${task}</li>`
          ).join('')}
        </ul>
      </div>`
    ).join('');

  const renderEducation = (): string =>
    data.education.map((edu) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:10px; text-align:${textAlign}; border-left:${isRTL ? 'none' : '2px solid ' + c.gold}; border-right:${isRTL ? '2px solid ' + c.gold : 'none'}; padding-${isRTL ? 'right' : 'left'}: 10px;">
        <h3 style="font-family:${fontStack}; font-size:11px; font-weight:bold; color:${c.accent}; margin:0 0 2px 0;">${edu.degree}</h3>
        <p style="font-family:${fontStack}; font-size:10px; color:${c.body}; margin:0;">${edu.institution} <span style="color:${c.gold};">${edu.year}</span></p>
        ${edu.notes ? `<p style="font-family:${fontStack}; font-size:9px; font-style:italic; color:${c.secondaryText}; margin:3px 0 0 0;">${edu.notes}</p>` : ''}
      </div>`
    ).join('');

  const renderSkills = (): string =>
    data.skills.length > 0 ? `
      <div style="display:flex; flex-wrap:wrap; gap:4px; justify-content:${isRTL ? 'flex-end' : 'flex-start'};">
        ${data.skills.map(s => `<span style="background:${c.accentLight}; color:${c.gold}; padding:3px 10px; border-radius:2px; font-family:${fontStack}; font-size:9px; font-weight:600;">${s}</span>`).join('')}
      </div>` : '';

  const renderLanguages = (): string =>
    data.languages.map((l) => `
      <div style="font-family:${fontStack}; font-size:10px; color:${c.body}; text-align:${textAlign}; margin-bottom:3px;">
        <span style="font-weight:600; color:${c.accent};">${l.name}</span> — ${l.level}
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
    body{background-color:${c.background} !important;color:${c.body} !important;color-scheme:light;font-family:${fontStack};font-size:11px;line-height:1.5;width:210mm;min-height:297mm;margin:0 auto;direction:${dir};-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  </style>
</head>
<body>
  <div style="background:${c.headerBg}; color:${c.headerText}; padding:32px 30px 28px; text-align:center; border-bottom:3px solid ${c.gold};">
    <h1 style="font-family:${fontStack}; font-size:28px; font-weight:900; color:${c.headerText}; margin-bottom:4px; letter-spacing:1px;">${data.fullName}</h1>
    <div style="width:40px; height:2px; background:${c.gold}; margin:8px auto;"></div>
    <div style="font-family:${fontStack}; font-size:9.5px; color:${c.headerText}; opacity:0.85; margin-top:8px; letter-spacing:0.3px;">${data.address} &nbsp;|&nbsp; ${data.phone} &nbsp;|&nbsp; ${data.email}</div>
  </div>

  <div style="padding:20px 30px;">
    ${data.summary ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:16px; text-align:${textAlign};"><p style="font-family:${fontStack}; font-size:10px; color:${c.body}; line-height:1.7; font-style:italic;">${data.summary}</p></div>` : ''}

    ${data.skills.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid;">${sectionTitle(lbl.skills)}${renderSkills()}</div>` : ''}

    ${data.workExperience.length > 0 ? `<div>${sectionTitle(lbl.experience)}${renderExperience()}</div>` : ''}

    ${data.education.length > 0 ? `<div>${sectionTitle(lbl.education)}${renderEducation()}</div>` : ''}

    ${data.courses.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid;"><h2 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.accent}; margin:18px 0 10px 0; text-align:${textAlign}; border-bottom:1px solid ${c.gold}; padding-bottom:4px; letter-spacing:1px;">${lbl.courses}</h2><div style="font-family:${fontStack}; font-size:9.5px; color:${c.body}; text-align:${textAlign};">${data.courses.join(' • ')}</div></div>` : ''}

    ${data.languages.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid;"><h2 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.accent}; margin:18px 0 10px 0; text-align:${textAlign}; border-bottom:1px solid ${c.gold}; padding-bottom:4px; letter-spacing:1px;">${lbl.languages}</h2>${renderLanguages()}</div>` : ''}
  </div>
</body>
</html>`;
};
