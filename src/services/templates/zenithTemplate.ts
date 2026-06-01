import { CVData } from '../../types/cv';
import { LABELS } from './labels';

export const renderZenithTemplate = (data: CVData, isRTL: boolean): string => {
  const lang = isRTL ? 'ar' : 'en';
  const lbl = LABELS[lang];
  const dir = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';
  const listPaddingSide = isRTL ? 'padding-right' : 'padding-left';
  const fontStack = "'Inter', 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const c = {
    sidebarBg: '#F8FAFC',
    sidebarText: '#475569',
    background: '#FFFFFF',
    body: '#334155',
    primaryText: '#0F172A',
    secondaryText: '#64748B',
    accent: '#2563EB',
    accentLight: '#EFF6FF',
    border: '#E2E8F0',
    tagBg: '#EFF6FF',
    tagText: '#1E40AF',
  };

  const leftAlign = isRTL ? 'right' : 'left';

  const sectionTitle = (title: string): string => `
    <h2 class="section-block" style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.primaryText}; text-transform:uppercase; letter-spacing:1.2px; margin:22px 0 12px 0; padding-bottom:6px; border-bottom:1.5px solid ${c.accent}; text-align:${textAlign};">${title}</h2>`;

  const contactBlock = `
    <div style="font-family:${fontStack}; font-size:10.5px; color:${c.sidebarText}; line-height:1.8; text-align:${leftAlign};">
      ${data.address ? `<div style="margin-bottom:4px;"><strong>${lbl.address}:</strong><br/>${data.address}</div>` : ''}
      ${data.phone ? `<div style="margin-bottom:4px;">${data.phone}</div>` : ''}
      ${data.email ? `<div style="word-break:break-all;">${data.email}</div>` : ''}
    </div>`;

  const languagesBlock = data.languages.length > 0 ? `
    <div class="section-block" style="margin-top:6px;">
      ${sectionTitle(lbl.languages)}
      <div style="font-family:${fontStack}; font-size:10.5px; color:${c.sidebarText}; line-height:1.9; text-align:${leftAlign};">
        ${data.languages.map(l => `<div style="margin-bottom:2px;"><strong style="color:${c.primaryText};">${l.name}</strong> — ${l.level}</div>`).join('')}
      </div>
    </div>` : '';

  const skillsBlock = data.skills.length > 0 ? `
    <div class="section-block skills-container" style="margin-top:6px;">
      ${sectionTitle(lbl.skills)}
      <div style="font-size:0; line-height:0;">
        ${data.skills.map(s => `<span style="display:inline-block; font-family:${fontStack}; font-size:9.5px; font-weight:500; color:${c.tagText}; background:${c.tagBg}; border-radius:4px; padding:3px 8px; margin:0 4px 6px 0; line-height:1.4;">${s}</span>`).join('')}
      </div>
    </div>` : '';

  const coursesBlock = data.courses.length > 0 ? `
    <div class="section-block" style="margin-top:6px;">
      ${sectionTitle(lbl.courses)}
      <div style="font-size:0; line-height:0;">
        ${data.courses.map(course => `<span style="display:inline-block; font-family:${fontStack}; font-size:9.5px; font-weight:500; color:${c.secondaryText}; background:${c.border}; border-radius:4px; padding:3px 8px; margin:0 4px 6px 0; line-height:1.4;">${course}</span>`).join('')}
      </div>
    </div>` : '';

  const renderExperience = (): string =>
    data.workExperience.map((exp) => `
      <div class="experience-item" style="page-break-inside:avoid; break-inside:avoid; margin-bottom:16px; padding-${isRTL ? 'right' : 'left'}: 14px; border-${isRTL ? 'right' : 'left'}: 2px solid ${c.accent};">
        <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; flex-direction:${isRTL ? 'row-reverse' : 'row'};">
          <h3 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.primaryText}; margin:0 0 1px 0;">${exp.jobTitle}</h3>
          <span style="font-family:${fontStack}; font-size:9.5px; color:${c.secondaryText}; white-space:nowrap; margin-${isRTL ? 'left' : 'right'}: 0;">${exp.dateRange}</span>
        </div>
        <p style="font-family:${fontStack}; font-size:10.5px; font-weight:500; color:${c.accent}; margin:0 0 6px 0;">${exp.companyLocation}</p>
        <ul style="margin:0; ${listPaddingSide}:16px; list-style-type:disc;">
          ${exp.mainTasks.filter((t) => t.trim().length > 0).map((task) =>
            `<li style="margin-bottom:3px; font-family:${fontStack}; font-size:10px; color:${c.body}; text-align:${textAlign}; line-height:1.5;">${task}</li>`
          ).join('')}
        </ul>
      </div>`
    ).join('');

  const renderEducation = (): string =>
    data.education.map((edu) => `
      <div class="education-item" style="page-break-inside:avoid; break-inside:avoid; margin-bottom:12px;">
        <h3 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.primaryText}; margin:0 0 1px 0;">${edu.degree}</h3>
        <p style="font-family:${fontStack}; font-size:10.5px; color:${c.body}; margin:0 0 2px 0;">${edu.institution} <span style="color:${c.secondaryText};">${edu.year}</span></p>
        ${edu.notes ? `<p style="font-family:${fontStack}; font-size:9.5px; font-style:italic; color:${c.secondaryText}; margin:0;">${edu.notes}</p>` : ''}
      </div>`
    ).join('');

  const rightContent = `
    <div style="padding:30px 28px;">
      <h1 style="font-family:${fontStack}; font-size:26px; font-weight:700; color:${c.primaryText}; margin:0 0 4px 0; letter-spacing:-0.3px; text-align:${textAlign};">${data.fullName}</h1>

      ${data.summary ? `<div class="section-block" style="margin-top:18px;"><p style="font-family:${fontStack}; font-size:11.5px; color:${c.body}; line-height:1.6; text-align:${textAlign}; margin:0;">${data.summary}</p></div>` : ''}

      ${data.workExperience.length > 0 ? `<div>${sectionTitle(lbl.experience)}${renderExperience()}</div>` : ''}

      ${data.education.length > 0 ? `<div>${sectionTitle(lbl.education)}${renderEducation()}</div>` : ''}
    </div>`;

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:light;">
<head>
  <meta charset="utf-8"><meta name="color-scheme" content="light">
  <title>${data.fullName} - CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @media print{body{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}}
    html{color-scheme:light;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    *{box-sizing:border-box;margin:0;padding:0;forced-color-adjust:none;}
    .experience-item,.education-item,.skills-container,.section-block{page-break-inside:avoid;break-inside:avoid;}
    body{background-color:${c.background} !important;color:${c.body} !important;color-scheme:light;font-family:${fontStack};font-size:11.5px;line-height:1.6;width:210mm;min-height:297mm;margin:0 auto;direction:${dir};-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  </style>
</head>
<body>
  <div style="width:210mm;">
    <table style="width:100%; border-collapse:collapse;" cellpadding="0" cellspacing="0">
      <tr>
        <!-- Sidebar Column -->
        <td style="width:32%; vertical-align:top; border:none; background:${c.sidebarBg}; padding:30px 20px;">
          ${data.profileImage ? `
            <div style="text-align:center; margin-bottom:24px; page-break-inside:avoid; break-inside:avoid;">
              <img src="${data.profileImage}" alt="Profile Image" style="width:90px; height:90px; borderRadius:45px; border-radius:50%; object-fit:cover; border:2px solid ${c.accent}; display:inline-block;" />
            </div>
          ` : ''}
          <div style="margin-bottom:24px;">${contactBlock}</div>
          ${languagesBlock}
          ${skillsBlock}
          ${coursesBlock}
        </td>

        <!-- Main Content Column -->
        <td style="width:68%; vertical-align:top; border:none; background:${c.background}; padding:0;">
          ${rightContent}
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
};
