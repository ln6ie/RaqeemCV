import { CVData } from '../../types/cv';
import { LABELS } from './labels';

export const renderHospitalityTemplate = (data: CVData, isRTL: boolean): string => {
  const lang = isRTL ? 'ar' : 'en';
  const lbl = LABELS[lang];
  const dir = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';
  const listPaddingSide = isRTL ? 'padding-right' : 'padding-left';
  const fontStack = "'Inter', 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  // Premium Modern Coffee & Chic Hospitality Palette
  const c = {
    background: '#FAF6F0', // warm latte light background
    mainBg: '#FFFFFF',     // clean premium white for main content
    headerBg: '#2E1F16',   // deep espresso dark brown
    headerText: '#FFFFFF',
    body: '#2D1E16',       // rich deep espresso text
    secondaryText: '#7A685C', // warm coffee grey
    accent: '#C4956A',     // warm latte gold accent
    accentLight: '#F3EAE1',
    border: '#EBE2D5',     // soft cream beige border
    cardBg: '#FFFFFF',
  };

  const initials = data.fullName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const parseSkill = (skillStr: string, defaultVal: number = 80): { name: string; percentage: number } => {
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

  // Modern minimal luxury icons
  const svgPhone = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;
  const svgEmail = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`;
  const svgLocation = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${c.accent}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

  const sectionTitle = (title: string): string => `
    <h2 class="section-block" style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.body}; text-transform:uppercase; letter-spacing:1px; margin:22px 0 12px 0; border-bottom:2px solid ${c.accent}; padding-bottom:6px; text-align:${textAlign};">${title}</h2>`;

  const contactBlock = `
    <div class="section-block" style="margin-bottom:24px;">
      <h2 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.body}; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px; border-bottom:2px solid ${c.accent}; padding-bottom:6px; text-align:${textAlign};">${lbl.address}</h2>
      <div style="font-family:${fontStack}; font-size:10px; color:${c.secondaryText}; line-height:1.8; text-align:${textAlign};">
        ${data.address ? `<div style="display:flex; align-items:center; gap:8px; margin-bottom:6px; flex-direction:${isRTL ? 'row-reverse' : 'row'};"><span style="display:inline-flex; width:20px; justify-content:center;">${svgLocation}</span><span style="flex:1;">${data.address}</span></div>` : ''}
        ${data.phone ? `<div style="display:flex; align-items:center; gap:8px; margin-bottom:6px; flex-direction:${isRTL ? 'row-reverse' : 'row'};"><span style="display:inline-flex; width:20px; justify-content:center;">${svgPhone}</span><span style="flex:1; direction:ltr; text-align:${textAlign};">${data.phone}</span></div>` : ''}
        ${data.email ? `<div style="display:flex; align-items:center; gap:8px; flex-direction:${isRTL ? 'row-reverse' : 'row'};"><span style="display:inline-flex; width:20px; justify-content:center;">${svgEmail}</span><span style="flex:1; word-break:break-all;">${data.email}</span></div>` : ''}
      </div>
    </div>`;

  const skillsBlock = data.skills.length > 0 ? `
    <div class="section-block" style="margin-bottom:24px;">
      <h2 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.body}; text-transform:uppercase; letter-spacing:1px; margin-bottom:14px; border-bottom:2px solid ${c.accent}; padding-bottom:6px; text-align:${textAlign};">${lbl.skills}</h2>
      ${data.skills.map((skill) => {
        const info = parseSkill(skill);
        return `
          <div style="margin-bottom:10px; page-break-inside:avoid; break-inside:avoid;">
            <div style="display:flex; justify-content:space-between; font-family:${fontStack}; font-size:10px; color:${c.body}; margin-bottom:4px; flex-direction:${isRTL ? 'row-reverse' : 'row'};">
              <span style="font-weight:600;">${info.name}</span>
              <span style="color:${c.accent}; font-weight:700;">${info.percentage}%</span>
            </div>
            <div style="width:100%; height:5px; background:${c.border}; border-radius:3px; overflow:hidden;">
              <div style="width:${info.percentage}%; height:100%; background:${c.accent}; border-radius:3px;"></div>
            </div>
          </div>`;
      }).join('')}
    </div>` : '';

  const languagesBlock = data.languages.length > 0 ? `
    <div class="section-block" style="margin-bottom:24px;">
      <h2 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.body}; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px; border-bottom:2px solid ${c.accent}; padding-bottom:6px; text-align:${textAlign};">${lbl.languages}</h2>
      ${data.languages.map(l => `
        <div style="font-family:${fontStack}; font-size:10px; color:${c.body}; text-align:${textAlign}; margin-bottom:6px;">
          <span style="font-weight:600; color:${c.body};">${l.name}</span>
          <span style="color:${c.secondaryText}; font-size:9.5px;"> — ${l.level}</span>
        </div>`).join('')}
    </div>` : '';

  const coursesBlock = data.courses.length > 0 ? `
    <div class="section-block" style="margin-bottom:24px;">
      <h2 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.body}; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px; border-bottom:2px solid ${c.accent}; padding-bottom:6px; text-align:${textAlign};">${lbl.courses}</h2>
      <div style="display:flex; flex-wrap:wrap; gap:5px; justify-content:${isRTL ? 'flex-end' : 'flex-start'};">
        ${data.courses.map(course => `<span style="background:${c.border}; color:${c.body}; padding:4px 10px; border-radius:4px; font-family:${fontStack}; font-size:9px; display:inline-block; font-weight:500;">${course}</span>`).join('')}
      </div>
    </div>` : '';

  const renderExperience = (): string =>
    data.workExperience.map((exp) => `
      <div class="experience-item" style="page-break-inside:avoid; break-inside:avoid; margin-bottom:18px; text-align:${textAlign};">
        <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; flex-direction:${isRTL ? 'row-reverse' : 'row'}; margin-bottom:4px;">
          <h3 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.body}; margin:0;">${exp.jobTitle}</h3>
          <span style="font-family:${fontStack}; font-size:9.5px; font-weight:600; color:${c.accent}; white-space:nowrap;">${exp.dateRange}</span>
        </div>
        <p style="font-family:${fontStack}; font-size:10px; font-weight:600; color:${c.secondaryText}; margin:0 0 8px 0;">${exp.companyLocation}</p>
        <ul style="margin:0; ${listPaddingSide}:16px; list-style-type:square; color:${c.accent};">
          ${exp.mainTasks.filter((t) => t.trim().length > 0).map((task) =>
            `<li style="margin-bottom:4px; font-family:${fontStack}; font-size:10px; color:${c.body}; text-align:${textAlign}; line-height:1.5;"><span style="color:${c.body};">${task}</span></li>`
          ).join('')}
        </ul>
      </div>`
    ).join('');

  const renderEducation = (): string =>
    data.education.map((edu) => `
      <div class="education-item" style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px; text-align:${textAlign};">
        <div style="display:flex; justify-content:space-between; align-items:baseline; flex-wrap:wrap; flex-direction:${isRTL ? 'row-reverse' : 'row'}; margin-bottom:3px;">
          <h3 style="font-family:${fontStack}; font-size:12px; font-weight:700; color:${c.body}; margin:0;">${edu.degree}</h3>
          <span style="font-family:${fontStack}; font-size:9.5px; font-weight:600; color:${c.accent}; white-space:nowrap;">${edu.year}</span>
        </div>
        <p style="font-family:${fontStack}; font-size:10px; color:${c.secondaryText}; margin:0 0 4px 0; font-weight:600;">${edu.institution}</p>
        ${edu.notes ? `<p style="font-family:${fontStack}; font-size:9.5px; font-style:italic; color:${c.secondaryText}; margin:0;">${edu.notes}</p>` : ''}
      </div>`
    ).join('');

  const summarySection = data.summary ? `
    <div class="section-block" style="margin-bottom:22px; background:${c.accentLight}; border-${isRTL ? 'right' : 'left'}:4px solid ${c.accent}; padding:14px 16px; border-radius:4px;">
      <p style="font-family:${fontStack}; font-size:11px; color:${c.body}; line-height:1.6; text-align:${textAlign}; margin:0; font-style:italic;">${data.summary}</p>
    </div>` : '';

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:light;">
<head>
  <meta charset="utf-8"><meta name="color-scheme" content="light">
  <title>${data.fullName} - CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Cairo:wght@400;500;600;700;900&display=swap" rel="stylesheet">
  <style>
    @media print {
      body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .force-bg { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    }
    html { color-scheme: light; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    * { box-sizing: border-box; margin: 0; padding: 0; forced-color-adjust: none; }
    .experience-item, .education-item, .section-block { page-break-inside: avoid; break-inside: avoid; }
    body { background-color: ${c.background} !important; color: ${c.body} !important; color-scheme: light; font-family: ${fontStack}; font-size: 11px; line-height: 1.5; width: 210mm; min-height: 297mm; margin: 0 auto; direction: ${dir}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  </style>
</head>
<body>
  <div style="width:210mm; background:${c.mainBg}; min-height:297mm; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
    <!-- Premium Header Banner -->
    <div style="background:${c.headerBg}; color:${c.headerText}; padding:35px 30px; border-bottom:4px solid ${c.accent};" class="force-bg">
      <table style="width:100%; border-collapse:collapse; border:none;" cellpadding="0" cellspacing="0">
        <tr>
          <!-- Profile Image Cell -->
          <td style="width:100px; vertical-align:middle; border:none; padding-${isRTL ? 'left' : 'right'}:20px;">
            <div style="width:85px; height:85px; border-radius:50%; background:rgba(255,255,255,0.08); border:3px solid ${c.accent}; display:flex; align-items:center; justify-content:center; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.15);">
              ${data.profileImage ? `
                <img src="${data.profileImage}" alt="Profile" style="width:100%; height:100%; object-fit:cover; display:block;" />
              ` : `
                <span style="font-family:${fontStack}; font-size:24px; font-weight:700; color:#FFFFFF; letter-spacing:0.5px;">${initials}</span>
              `}
            </div>
          </td>
          <!-- Candidate Name and Title -->
          <td style="vertical-align:middle; border:none; text-align:${textAlign};">
            <h1 style="font-family:${fontStack}; font-size:26px; font-weight:800; color:${c.headerText}; margin:0; line-height:1.2; letter-spacing:-0.5px;">${data.fullName}</h1>
            ${data.workExperience.length > 0 ? `
              <p style="font-family:${fontStack}; font-size:12px; font-weight:600; color:${c.accent}; margin:6px 0 0 0; text-transform:uppercase; letter-spacing:1px;">${data.workExperience[0].jobTitle}</p>
            ` : ''}
          </td>
        </tr>
      </table>
    </div>

    <!-- Main Two-Column Structure -->
    <table style="width:100%; border-collapse:collapse; border:none;" cellpadding="0" cellspacing="0">
      <tr>
        <!-- Sidebar Column (34% Width) -->
        <td style="width:34%; vertical-align:top; border:none; background:${c.background}; padding:25px 20px; border-${isRTL ? 'left' : 'right'}:1px solid ${c.border};" class="force-bg">
          ${contactBlock}
          ${skillsBlock}
          ${languagesBlock}
          ${coursesBlock}
        </td>

        <!-- Main Content Column (66% Width) -->
        <td style="width:66%; vertical-align:top; border:none; background:${c.mainBg}; padding:25px 25px;">
          ${summarySection}
          
          ${data.workExperience.length > 0 ? `
            <div style="margin-bottom:20px;">
              ${sectionTitle(lbl.experience)}
              ${renderExperience()}
            </div>
          ` : ''}

          ${data.education.length > 0 ? `
            <div style="margin-bottom:20px;">
              ${sectionTitle(lbl.education)}
              ${renderEducation()}
            </div>
          ` : ''}
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
};

