import { CVData } from '../../types/cv';
import { LABELS } from './labels';

export const renderCreativeEdgeTemplate = (data: CVData, isRTL: boolean): string => {
  const lang = isRTL ? 'ar' : 'en';
  const lbl = LABELS[lang];
  const dir = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';
  const listPaddingSide = isRTL ? 'padding-right' : 'padding-left';
  const fontStack = "'Poppins', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const gold = '#FFB800';
  const dark = '#1A1A1A';
  const lightBg = '#F9F9F9';
  const c = {
    accent: gold,
    sidebarBg: dark,
    sidebarText: '#FFFFFF',
    sidebarMuted: 'rgba(255,255,255,0.6)',
    background: lightBg,
    body: '#2D2D2D',
    secondaryText: '#5A5A5A',
    border: '#E0E0E0',
  };

  const leftAlign = isRTL ? 'right' : 'left';

  const initials = data.fullName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const jobTitle = data.workExperience.length > 0 ? data.workExperience[0].jobTitle : '';

  const skillLevel = (_skill: string, idx: number): number => {
    const levels = [88, 92, 78, 85, 70, 95, 75, 82, 90, 68];
    return levels[idx % levels.length];
  };

  const svgPhone = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${gold}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
  const svgEmail = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${gold}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
  const svgLocation = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${gold}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
  const svgLinkedin = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${gold}"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`;
  const svgTwitter = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${gold}"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>`;
  const svgGithub = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${gold}"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;

  const contactBlock = `
    <div style="margin-bottom:28px;">
      <div style="font-family:${fontStack}; font-size:10.5px; color:${c.sidebarText}; line-height:2; text-align:${leftAlign};">
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:2px;"><span style="display:inline-flex; width:20px; justify-content:center;">${svgPhone}</span>${data.phone}</div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:2px;"><span style="display:inline-flex; width:20px; justify-content:center;">${svgEmail}</span>${data.email}</div>
        <div style="display:flex; align-items:center; gap:8px;"><span style="display:inline-flex; width:20px; justify-content:center;">${svgLocation}</span>${data.address}</div>
      </div>
    </div>`;

  const skillsBlock = data.skills.length > 0 ? `
    <div class="section-block" style="margin-bottom:28px;">
      <h2 style="font-family:${fontStack}; font-size:11px; font-weight:700; color:${gold}; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:14px; text-align:${leftAlign};">${lbl.skills}</h2>
      ${data.skills.map((skill, i) => `
        <div style="margin-bottom:10px;">
          <div style="font-family:${fontStack}; font-size:9.5px; color:${c.sidebarText}; margin-bottom:4px; text-align:${leftAlign};">${skill}</div>
          <div style="width:100%; height:6px; background:rgba(255,255,255,0.15); border-radius:3px; overflow:hidden;">
            <div style="width:${skillLevel(skill, i)}%; height:100%; background:${gold}; border-radius:3px;"></div>
          </div>
        </div>`).join('')}
    </div>` : '';

  const languagesBlock = data.languages.length > 0 ? `
    <div class="section-block" style="margin-bottom:28px;">
      <h2 style="font-family:${fontStack}; font-size:11px; font-weight:700; color:${gold}; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:12px; text-align:${leftAlign};">${lbl.languages}</h2>
      ${data.languages.map(l => `
        <div style="font-family:${fontStack}; font-size:10px; color:${c.sidebarText}; text-align:${leftAlign}; margin-bottom:6px;">
          <span style="font-weight:600;">${l.name}</span>
          <span style="color:${c.sidebarMuted}; font-size:9px;"> — ${l.level}</span>
        </div>`).join('')}
    </div>` : '';

  const socialBlock = `
    <div style="position:absolute; bottom:28px; ${leftAlign}: 20px; display:flex; gap:14px;">
      ${svgLinkedin}
      ${svgTwitter}
      ${svgGithub}
    </div>`;

  const sidebarContent = `
    <div style="background:${c.sidebarBg}; padding:30px 20px; height:100%; position:relative; min-height:700px;">
      ${contactBlock}
      ${skillsBlock}
      ${languagesBlock}
      ${socialBlock}
    </div>`;

  const renderExperience = (): string =>
    data.workExperience.map((exp, i) => `
      <div class="experience-item" style="page-break-inside:avoid; break-inside:avoid; position:relative; padding-${isRTL ? 'right' : 'left'}: 20px; margin-bottom:18px;">
        <div style="position:absolute; ${isRTL ? 'right' : 'left'}: 5px; top:4px; width:10px; height:10px; background:${gold}; border-radius:50%; border:2px solid ${c.background}; z-index:1;"></div>
        <div style="position:absolute; ${isRTL ? 'right' : 'left'}: 9px; top:14px; width:1px; bottom:-18px; background:${c.border};"></div>
        <div style="font-family:${fontStack}; font-size:9px; color:${gold}; font-weight:600; letter-spacing:0.5px; margin-bottom:2px;">${exp.dateRange}</div>
        <h3 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.body}; margin:0 0 1px 0;">${exp.jobTitle}</h3>
        <p style="font-family:${fontStack}; font-size:10px; color:${c.secondaryText}; margin:0 0 6px 0;">${exp.companyLocation}</p>
        <ul style="margin:0; ${listPaddingSide}:14px; list-style-type:disc;">
          ${exp.mainTasks.filter((t) => t.trim().length > 0).map((task) =>
            `<li style="margin-bottom:2px; font-family:${fontStack}; font-size:9.5px; color:${c.body}; text-align:${textAlign};">${task}</li>`
          ).join('')}
        </ul>
      </div>`
    ).join('');

  const renderEducation = (): string =>
    data.education.map((edu, i) => `
      <div class="education-item" style="page-break-inside:avoid; break-inside:avoid; position:relative; padding-${isRTL ? 'right' : 'left'}: 20px; margin-bottom:14px;">
        <div style="position:absolute; ${isRTL ? 'right' : 'left'}: 5px; top:4px; width:10px; height:10px; background:${gold}; border-radius:50%; border:2px solid ${c.background}; z-index:1;"></div>
        <div style="position:absolute; ${isRTL ? 'right' : 'left'}: 9px; top:14px; width:1px; bottom:-14px; background:${c.border};"></div>
        <div style="font-family:${fontStack}; font-size:9px; color:${gold}; font-weight:600; letter-spacing:0.5px; margin-bottom:2px;">${edu.year}</div>
        <h3 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.body}; margin:0 0 1px 0;">${edu.degree}</h3>
        <p style="font-family:${fontStack}; font-size:10px; color:${c.secondaryText}; margin:0;">${edu.institution}</p>
        ${edu.notes ? `<p style="font-family:${fontStack}; font-size:9px; font-style:italic; color:${c.secondaryText}; margin:3px 0 0 0;">${edu.notes}</p>` : ''}
      </div>`
    ).join('');

  const summarySection = data.summary ? `
    <div class="section-block" style="margin-bottom:20px;">
      <h2 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.body}; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px; text-align:${textAlign}; border-bottom:2px solid ${gold}; padding-bottom:4px; display:inline-block;">${lbl.summary}</h2>
      <p style="font-family:${fontStack}; font-size:10.5px; color:${c.body}; line-height:1.7; text-align:${textAlign}; margin:8px 0 0 0;">${data.summary}</p>
    </div>` : '';

  const sectionTitle = (title: string): string => `
    <h2 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.body}; text-transform:uppercase; letter-spacing:1px; margin:22px 0 14px 0; text-align:${textAlign}; border-bottom:2px solid ${gold}; padding-bottom:4px; display:inline-block;">${title}</h2>`;

  const rightContent = `
    <div style="padding:30px 24px;">
      ${summarySection}
      ${data.workExperience.length > 0 ? `<div>${sectionTitle(lbl.experience)}<div style="position:relative;">${renderExperience()}</div></div>` : ''}
      ${data.education.length > 0 ? `<div>${sectionTitle(lbl.education)}<div style="position:relative;">${renderEducation()}</div></div>` : ''}
    </div>`;

  const sidebarSide = isRTL ? 'right' : 'left';
  const mainSide = isRTL ? 'left' : 'right';

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:light;">
<head>
  <meta charset="utf-8"><meta name="color-scheme" content="light">
  <title>${data.fullName} - CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&family=Montserrat:wght@400;500;600;700;900&display=swap" rel="stylesheet">
  <style>
    @media print {
      .no-print{display:none!important;}
      body{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}
      .force-bg{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important;}
    }
    html{color-scheme:light;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    *{box-sizing:border-box;margin:0;padding:0;forced-color-adjust:none;}
    .experience-item:last-child div[style*="bottom"]{display:none!important;}
    .education-item:last-child div[style*="bottom"]{display:none!important;}
    .experience-item,.education-item,.section-block{page-break-inside:avoid;break-inside:avoid;}
    body{background-color:${c.background} !important;color:${c.body} !important;color-scheme:light;font-family:${fontStack};font-size:11px;line-height:1.5;width:210mm;min-height:297mm;margin:0 auto;direction:${dir};-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  </style>
</head>
<body>
  <div style="background:${gold}; padding:24px 30px; text-align:${isRTL ? 'right' : 'left'}; display:flex; align-items:center; gap:20px; flex-direction:${isRTL ? 'row-reverse' : 'row'};" class="force-bg">
    <div style="width:80px; height:80px; border-radius:50%; background:rgba(255,255,255,0.2); border:3px solid #FFFFFF; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
      <span style="font-family:${fontStack}; font-size:28px; font-weight:900; color:#FFFFFF;">${initials}</span>
    </div>
    <div>
      <h1 style="font-family:${fontStack}; font-size:26px; font-weight:900; color:#FFFFFF; text-transform:uppercase; letter-spacing:1px; margin:0; line-height:1.2;">${data.fullName}</h1>
      ${jobTitle ? `<p style="font-family:${fontStack}; font-size:13px; font-weight:500; color:rgba(255,255,255,0.85); margin:2px 0 0 0; letter-spacing:0.5px;">${jobTitle}</p>` : ''}
    </div>
  </div>

  <table style="width:100%; border-collapse:collapse;" cellpadding="0" cellspacing="0">
    <tr>
      <td style="width:35%; vertical-align:top; border:none; padding:0;">${sidebarContent}</td>
      <td style="width:65%; vertical-align:top; border:none; padding:0;">${rightContent}</td>
    </tr>
  </table>
</body>
</html>`;
};
