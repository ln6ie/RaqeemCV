import { CVData } from '../../types/cv';
import { LABELS } from './labels';

export const renderEngineeringTemplate = (data: CVData, isRTL: boolean): string => {
  const lang = isRTL ? 'ar' : 'en';
  const lbl = LABELS[lang];
  const dir = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';
  const listPaddingSide = isRTL ? 'padding-right' : 'padding-left';
  const fontStack = "'Cairo', 'Times New Roman', Times, serif";
  const c = {
    sidebarBg: '#1A365D',
    sidebarText: '#FFFFFF',
    background: '#F8FAFC',
    body: '#1E293B',
    secondaryText: '#475569',
    accent: '#2563EB',
    border: '#CBD5E1',
    sectionBg: '#EFF6FF',
  };

  const leftAlign = isRTL ? 'right' : 'left';
  const sidebarContent = `
    <div style="background-color:${c.sidebarBg}; color:${c.sidebarText}; padding:30px 20px; height:100%;">
      <h1 style="font-family:${fontStack}; font-size:22px; font-weight:900; color:${c.sidebarText}; margin-bottom:4px; text-align:${leftAlign};">${data.fullName}</h1>
      <div style="font-family:${fontStack}; font-size:9px; color:${c.sidebarText}; opacity:0.75; margin-bottom:24px; text-align:${leftAlign};">
        ${data.address}<br/>${data.phone}<br/>${data.email}
      </div>
      <h2 style="font-family:${fontStack}; font-size:10px; font-weight:700; color:${c.sidebarText}; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:4px; margin-bottom:8px; letter-spacing:1.5px; text-align:${leftAlign};">${lbl.skills.toUpperCase()}</h2>
      <div style="font-family:${fontStack}; font-size:9px; color:${c.sidebarText}; text-align:${leftAlign}; margin-bottom:20px;">
        ${data.skills.map(s => `<div style="margin-bottom:4px; padding:3px 6px; background:rgba(255,255,255,0.1); border-radius:3px; display:inline-block; margin-right:4px;">${s}</div>`).join('')}
      </div>
      ${data.courses.length > 0 ? `
        <h2 style="font-family:${fontStack}; font-size:10px; font-weight:700; color:${c.sidebarText}; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:4px; margin-bottom:8px; letter-spacing:1.5px; text-align:${leftAlign};">${lbl.courses.toUpperCase()}</h2>
        <div style="font-family:${fontStack}; font-size:9px; color:${c.sidebarText}; text-align:${leftAlign}; margin-bottom:20px;">
          ${data.courses.map(c => `<div style="margin-bottom:3px;">• ${c}</div>`).join('')}
        </div>` : ''}
      ${data.languages.length > 0 ? `
        <h2 style="font-family:${fontStack}; font-size:10px; font-weight:700; color:${c.sidebarText}; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:4px; margin-bottom:8px; letter-spacing:1.5px; text-align:${leftAlign};">${lbl.languages.toUpperCase()}</h2>
        <div style="font-family:${fontStack}; font-size:9px; color:${c.sidebarText}; text-align:${leftAlign};">
          ${data.languages.map(l => `<div style="margin-bottom:4px;"><span style="font-weight:700;">${l.name}:</span> ${l.level}</div>`).join('')}
        </div>` : ''}
    </div>`;

  const renderExperience = (): string =>
    data.workExperience.map((exp) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px; background:${c.sectionBg}; border-radius:6px; padding:12px;">
        <h3 style="font-family:${fontStack}; font-size:11px; font-weight:bold; color:${c.accent}; margin:0 0 2px 0;">${exp.jobTitle}</h3>
        <p style="font-family:${fontStack}; font-size:9.5px; color:${c.secondaryText}; margin:0 0 1px 0;">${exp.companyLocation} — ${exp.dateRange}</p>
        <ul style="margin:6px 0 0 0; ${listPaddingSide}:14px; list-style-type:disc;">
          ${exp.mainTasks.filter((t) => t.trim().length > 0).map((task) =>
            `<li style="margin-bottom:2px; font-family:${fontStack}; font-size:9px; color:${c.body}; text-align:${textAlign};">${task}</li>`
          ).join('')}
        </ul>
      </div>`
    ).join('');

  const renderEducation = (): string =>
    data.education.map((edu) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:10px;">
        <h3 style="font-family:${fontStack}; font-size:11px; font-weight:bold; color:${c.accent}; margin:0 0 2px 0;">${edu.degree}</h3>
        <p style="font-family:${fontStack}; font-size:9.5px; color:${c.body}; margin:0;">${edu.institution} ${edu.year}</p>
        ${edu.notes ? `<p style="font-family:${fontStack}; font-size:8.5px; font-style:italic; color:${c.secondaryText}; margin:2px 0 0 0;">${edu.notes}</p>` : ''}
      </div>`
    ).join('');

  const rightContent = `
    <div style="padding:30px 20px;">
      ${data.summary ? `<div style="margin-bottom:16px;"><h2 style="font-family:${fontStack}; font-size:11px; font-weight:700; color:${c.accent}; border-bottom:2px solid ${c.accent}; padding-bottom:3px; margin-bottom:8px; letter-spacing:0.5px; text-align:${leftAlign};">${lbl.summary.toUpperCase()}</h2><p style="font-family:${fontStack}; font-size:9.5px; color:${c.body}; line-height:1.6; text-align:${leftAlign};">${data.summary}</p></div>` : ''}
      ${data.workExperience.length > 0 ? `<div style="margin-bottom:16px;"><h2 style="font-family:${fontStack}; font-size:11px; font-weight:700; color:${c.accent}; border-bottom:2px solid ${c.accent}; padding-bottom:3px; margin-bottom:8px; letter-spacing:0.5px; text-align:${leftAlign};">${lbl.experience.toUpperCase()}</h2>${renderExperience()}</div>` : ''}
      ${data.education.length > 0 ? `<div style="margin-bottom:16px;"><h2 style="font-family:${fontStack}; font-size:11px; font-weight:700; color:${c.accent}; border-bottom:2px solid ${c.accent}; padding-bottom:3px; margin-bottom:8px; letter-spacing:0.5px; text-align:${leftAlign};">${lbl.education.toUpperCase()}</h2>${renderEducation()}</div>` : ''}
    </div>`;

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
  <table style="width:100%; border-collapse:collapse; height:297mm;" cellpadding="0" cellspacing="0">
    <tr>
      <td style="width:30%; vertical-align:top; border:none;">${sidebarContent}</td>
      <td style="width:70%; vertical-align:top; border:none;">${rightContent}</td>
    </tr>
  </table>
</body>
</html>`;
};
