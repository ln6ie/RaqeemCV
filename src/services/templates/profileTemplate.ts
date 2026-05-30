import { CVData } from '../../types/cv';
import { LABELS } from './labels';

export const renderProfileEleganceTemplate = (data: CVData, isRTL: boolean): string => {
  const lang = isRTL ? 'ar' : 'en';
  const lbl = LABELS[lang];
  const dir = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';
  const listPaddingSide = isRTL ? 'padding-right' : 'padding-left';
  const fontStack = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

  const c = {
    sidebarBg: '#F4F4F6',
    sidebarText: '#3A3A3C',
    background: '#FFFFFF',
    body: '#1C1C1E',
    secondaryText: '#636366',
    accent: '#007AFF',
    border: '#E5E5EA',
    tagBg: '#E8E8ED',
    tagText: '#3A3A3C',
  };

  const leftAlign = isRTL ? 'right' : 'left';
  const jobTitle = data.workExperience.length > 0 ? data.workExperience[0].jobTitle : '';

  const sectionTitle = (title: string): string => `
    <h2 style="font-family:${fontStack}; font-size:13px; font-weight:600; color:${c.body}; text-transform:uppercase; letter-spacing:1px; margin:22px 0 10px 0; padding-bottom:5px; border-bottom:1.5px solid ${c.accent}; text-align:${textAlign};">${title}</h2>`;

  const profileImageHtml = data.profileImage
    ? `<img src="${data.profileImage}" alt="" style="width:100px;height:100px;border-radius:50%;object-fit:cover;border:3px solid #FFFFFF;box-shadow:0 2px 8px rgba(0,0,0,0.08);display:block;" />`
    : '';

  const headerBlock = `
    <div style="background:${c.accent}; padding:28px 24px; display:flex; align-items:center; gap:20px; flex-direction:${isRTL ? 'row-reverse' : 'row'};">
      ${isRTL ? '' : profileImageHtml}
      <div style="flex:1; text-align:${isRTL ? 'right' : 'left'};">
        <h1 style="font-family:${fontStack}; font-size:24px; font-weight:700; color:#FFFFFF; margin:0; letter-spacing:-0.3px;">${data.fullName}</h1>
        ${jobTitle ? `<p style="font-family:${fontStack}; font-size:13px; font-weight:400; color:rgba(255,255,255,0.8); margin:4px 0 0 0;">${jobTitle}</p>` : ''}
        <div style="font-family:${fontStack}; font-size:9.5px; color:rgba(255,255,255,0.7); margin-top:8px; display:flex; gap:12px; flex-wrap:wrap; flex-direction:${isRTL ? 'row-reverse' : 'row'};">
          <span>${data.phone}</span>
          <span>${data.email}</span>
          <span>${data.address}</span>
        </div>
      </div>
      ${isRTL ? profileImageHtml : ''}
    </div>`;

  const contactBlock = `
    <div style="font-family:${fontStack}; font-size:10.5px; color:${c.sidebarText}; line-height:1.9; text-align:${leftAlign};">
      <div style="margin-bottom:3px;"><span style="font-weight:600;">${lbl.address}:</span> ${data.address}</div>
      <div style="margin-bottom:3px;">${data.phone}</div>
      <div>${data.email}</div>
    </div>`;

  const skillsBlock = data.skills.length > 0 ? `
    <div class="section-block" style="margin-top:4px;">
      ${sectionTitle(lbl.skills)}
      <div style="font-size:0; line-height:0;">
        ${data.skills.map(s => `<span style="display:inline-block; font-family:${fontStack}; font-size:10px; font-weight:500; color:${c.tagText}; background:${c.tagBg}; border-radius:6px; padding:4px 10px; margin:0 4px 6px 0; line-height:1.4;">${s}</span>`).join('')}
      </div>
    </div>` : '';

  const languagesBlock = data.languages.length > 0 ? `
    <div class="section-block" style="margin-top:4px;">
      ${sectionTitle(lbl.languages)}
      <div style="font-family:${fontStack}; font-size:10.5px; color:${c.sidebarText}; line-height:1.9; text-align:${leftAlign};">
        ${data.languages.map(l => `<div style="margin-bottom:2px;"><span style="font-weight:600;">${l.name}:</span> ${l.level}</div>`).join('')}
      </div>
    </div>` : '';

  const coursesBlock = data.courses.length > 0 ? `
    <div class="section-block" style="margin-top:4px;">
      ${sectionTitle(lbl.courses)}
      <div style="font-family:${fontStack}; font-size:10px; color:${c.sidebarText}; text-align:${leftAlign};">
        ${data.courses.map(c => `<div style="margin-bottom:3px;">• ${c}</div>`).join('')}
      </div>
    </div>` : '';

  const sidebarContent = `
    <div style="background:${c.sidebarBg}; padding:24px 18px; height:100%;">
      ${contactBlock}
      ${skillsBlock}
      ${languagesBlock}
      ${coursesBlock}
    </div>`;

  const renderExperience = (): string =>
    data.workExperience.map((exp) => `
      <div class="experience-item" style="page-break-inside:avoid; break-inside:avoid; margin-bottom:16px; padding-${isRTL ? 'right' : 'left'}: 14px; border-${isRTL ? 'right' : 'left'}: 2px solid ${c.accent};">
        <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; flex-direction:${isRTL ? 'row-reverse' : 'row'};">
          <h3 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.body}; margin:0 0 1px 0;">${exp.jobTitle}</h3>
          <span style="font-family:${fontStack}; font-size:9px; color:${c.secondaryText};">${exp.dateRange}</span>
        </div>
        <p style="font-family:${fontStack}; font-size:10px; font-weight:500; color:${c.accent}; margin:0 0 6px 0;">${exp.companyLocation}</p>
        <ul style="margin:0; ${listPaddingSide}:16px; list-style-type:disc;">
          ${exp.mainTasks.filter((t) => t.trim().length > 0).map((task) =>
            `<li style="margin-bottom:3px; font-family:${fontStack}; font-size:9.5px; color:${c.body}; text-align:${textAlign}; line-height:1.5;">${task}</li>`
          ).join('')}
        </ul>
      </div>`
    ).join('');

  const renderEducation = (): string =>
    data.education.map((edu) => `
      <div class="education-item" style="page-break-inside:avoid; break-inside:avoid; margin-bottom:12px;">
        <h3 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.body}; margin:0 0 1px 0;">${edu.degree}</h3>
        <p style="font-family:${fontStack}; font-size:10px; color:${c.body}; margin:0 0 2px 0;">${edu.institution} <span style="color:${c.secondaryText};">${edu.year}</span></p>
        ${edu.notes ? `<p style="font-family:${fontStack}; font-size:9px; font-style:italic; color:${c.secondaryText}; margin:0;">${edu.notes}</p>` : ''}
      </div>`
    ).join('');

  const rightContent = `
    <div style="padding:24px 22px;">
      ${data.summary ? `<div class="section-block"><h2 style="font-family:${fontStack}; font-size:13px; font-weight:600; color:${c.body}; text-transform:uppercase; letter-spacing:1px; margin:0 0 8px 0; padding-bottom:5px; border-bottom:1.5px solid ${c.accent}; text-align:${textAlign};">${lbl.summary}</h2><p style="font-family:${fontStack}; font-size:10.5px; color:${c.body}; line-height:1.7; text-align:${textAlign}; margin:0;">${data.summary}</p></div>` : ''}

      ${data.workExperience.length > 0 ? `<div style="margin-top:${data.summary ? 0 : 0}px;">${sectionTitle(lbl.experience)}${renderExperience()}</div>` : ''}

      ${data.education.length > 0 ? `<div>${sectionTitle(lbl.education)}${renderEducation()}</div>` : ''}
    </div>`;

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:light;">
<head>
  <meta charset="utf-8"><meta name="color-scheme" content="light">
  <title>${data.fullName} - CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @media print{body{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}}
    html{color-scheme:light;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    *{box-sizing:border-box;margin:0;padding:0;forced-color-adjust:none;}
    .experience-item,.education-item,.section-block{page-break-inside:avoid;break-inside:avoid;}
    body{background-color:${c.background} !important;color:${c.body} !important;color-scheme:light;font-family:${fontStack};font-size:11px;line-height:1.5;width:210mm;min-height:297mm;margin:0 auto;direction:${dir};-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  </style>
</head>
<body>
  ${headerBlock}

  <table style="width:100%; border-collapse:collapse;" cellpadding="0" cellspacing="0">
    <tr>
      <td style="width:30%; vertical-align:top; border:none; padding:0;">${sidebarContent}</td>
      <td style="width:70%; vertical-align:top; border:none; padding:0;">${rightContent}</td>
    </tr>
  </table>
</body>
</html>`;
};
