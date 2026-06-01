import { CVData } from '../../types/cv';
import { LABELS } from './labels';

const renderSkillDots = (level: number, isRTL: boolean): string => {
  const dots = Array.from({ length: 5 }, (_, i) =>
    `<span style="width:10px;height:10px;border-radius:50%;display:inline-block;background-color:${i < level ? '#FFFFFF' : 'rgba(255,255,255,0.3)'};margin-${isRTL ? 'left' : 'right'}:4px;"></span>`
  ).join('');
  return `<div style="display:flex;flex-wrap:nowrap;gap:2px;margin-top:4px;flex-direction:${isRTL ? 'row-reverse' : 'row'};">${dots}</div>`;
};

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

export const renderMochaTemplate = (data: CVData, isRTL: boolean): string => {
  const lang = isRTL ? 'ar' : 'en';
  const lbl = LABELS[lang];
  const dir = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';
  const fontStack = "'Inter', 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  const gradientDir = isRTL ? 'to left' : 'to right';

  const c = {
    mocha: '#432818',
    mochaLight: '#6F3E1B',
    cream: '#FFF8F0',
    white: '#FFFFFF',
    body: '#1F2937',
    secondary: '#6B7280',
    border: '#E5E7EB',
    accent: '#432818',
    sidebarText: '#FFFFFF',
    dotEmpty: 'rgba(255,255,255,0.3)',
    dotFilled: '#FFFFFF',
  };

  const sidebarIcon = (d: string): string =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${c.sidebarText}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-${isRTL ? 'left' : 'right'}:6px;">${d}</svg>`;

  const sectionTitle = (title: string, iconPath: string): string => `
    <h2 style="font-family:${fontStack};font-size:11px;font-weight:700;color:${c.sidebarText};text-transform:uppercase;letter-spacing:1.5px;margin:22px 0 8px 0;padding-bottom:5px;border-bottom:1px solid rgba(255,255,255,0.15);text-align:${textAlign};">
      ${sidebarIcon(iconPath)}${title}
    </h2>`;

  const mainSectionTitle = (title: string): string => `
    <h2 style="font-family:${fontStack};font-size:12px;font-weight:700;color:${c.accent};text-transform:uppercase;letter-spacing:1.2px;margin:20px 0 10px 0;padding-bottom:5px;border-bottom:1.5px solid ${c.accent};text-align:${textAlign};">${title}</h2>`;

  const contactHtml = `
    <div style="text-align:${textAlign};">
      ${data.address ? `<div style="font-size:10.5px;color:${c.sidebarText};margin-bottom:5px;line-height:1.5;word-break:break-word;">${data.address}</div>` : ''}
      ${data.phone ? `<div style="font-size:10.5px;color:${c.sidebarText};margin-bottom:5px;">${data.phone}</div>` : ''}
      ${data.email ? `<div style="font-size:10.5px;color:${c.sidebarText};word-break:break-word;">${data.email}</div>` : ''}
    </div>`;

  const skillsHtml = data.skills.length > 0 ? `
    <div style="text-align:${textAlign};">
      ${data.skills.map(s => {
        const info = parseSkill(s);
        const dotsCount = Math.max(1, Math.min(5, Math.round(info.percentage / 20)));
        return `
          <div style="margin-bottom:10px;page-break-inside:avoid;break-inside:avoid;">
            <div style="font-size:10.5px;color:${c.sidebarText};font-weight:500;display:flex;justify-content:space-between;flex-direction:${isRTL ? 'row-reverse' : 'row'};">
              <span>${info.name}</span>
              <span style="opacity:0.65;font-size:9.5px;">${info.percentage}%</span>
            </div>
            ${renderSkillDots(dotsCount, isRTL)}
          </div>`;
      }).join('')}
    </div>` : '';

  const coursesHtml = data.courses.length > 0 ? `
    <div style="text-align:${textAlign};">
      ${data.courses.map(course => `
        <div style="font-size:10px;color:${c.sidebarText};margin-bottom:4px;padding:3px 0;page-break-inside:avoid;break-inside:avoid;">${course}</div>
      `).join('')}
    </div>` : '';

  const languagesHtml = data.languages.filter(l => l.name).map(l => `
    <div style="font-size:10.5px;color:${c.sidebarText};margin-bottom:5px;page-break-inside:avoid;break-inside:avoid;text-align:${textAlign};">
      <span style="font-weight:600;">${l.name}</span>${l.level ? ` — ${l.level}` : ''}
    </div>
  `).join('') || '';

  const summaryHtml = data.summary ? `
    <div style="font-size:11px;color:${c.body};line-height:1.7;text-align:${textAlign};margin-bottom:4px;">${data.summary}</div>` : '';

  const experienceHtml = data.workExperience.filter(e => e.jobTitle).map(exp => `
    <div style="margin-bottom:16px;page-break-inside:avoid;break-inside:avoid;">
      <div style="display:flex;${isRTL ? 'flex-direction:row-reverse;' : ''}justify-content:space-between;align-items:baseline;flex-wrap:wrap;">
        <h3 style="font-family:${fontStack};font-size:11px;font-weight:700;color:${c.body};margin:0;text-align:${textAlign};">${exp.jobTitle}</h3>
        ${exp.dateRange ? `<span style="font-size:9.5px;color:${c.secondary};font-weight:500;">${exp.dateRange}</span>` : ''}
      </div>
      ${exp.companyLocation ? `<div style="font-size:10px;color:${c.secondary};margin-top:2px;text-align:${textAlign};">${exp.companyLocation}</div>` : ''}
      ${exp.mainTasks.filter(t => t).length > 0 ? `
        <ul style="margin:6px 0 0 0;padding-${isRTL ? 'right' : 'left'}:16px;text-align:${textAlign};">
          ${exp.mainTasks.filter(t => t).map(t => `<li style="font-size:10px;color:${c.body};line-height:1.6;margin-bottom:3px;">${t}</li>`).join('')}
        </ul>` : ''}
    </div>
  `).join('') || '';

  const educationHtml = data.education.filter(e => e.degree || e.institution).map(edu => `
    <div style="margin-bottom:12px;page-break-inside:avoid;break-inside:avoid;">
      <div style="display:flex;${isRTL ? 'flex-direction:row-reverse;' : ''}justify-content:space-between;align-items:baseline;flex-wrap:wrap;">
        <span style="font-size:11px;font-weight:600;color:${c.body};text-align:${textAlign};">${edu.degree}</span>
        ${edu.year ? `<span style="font-size:9.5px;color:${c.secondary};">${edu.year}</span>` : ''}
      </div>
      ${edu.institution ? `<div style="font-size:10px;color:${c.secondary};margin-top:2px;text-align:${textAlign};">${edu.institution}</div>` : ''}
      ${edu.notes ? `<div style="font-size:10px;color:${c.body};margin-top:4px;text-align:${textAlign};">${edu.notes}</div>` : ''}
    </div>
  `).join('') || '';

  const sidebarWidth = '35%';
  const mainWidth = '65%';

  const userIcon = '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>';
  const bookIcon = '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>';
  const trophyIcon = '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>';
  const globeIcon = '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>';

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:light;">
<head>
  <meta charset="utf-8"><meta name="color-scheme" content="light">
  <title>${data.fullName} - CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Cairo:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    html{color-scheme:light;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    *{box-sizing:border-box;margin:0;padding:0;forced-color-adjust:none;}
  body { background:#FFFFFF; color:${c.body}; color-scheme:light; font-family:${fontStack}; font-size:11px; line-height:1.5; width:210mm; min-height:297mm; margin:0 auto; direction:${dir}; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  .page { width: 210mm; }
  .sidebar { padding:24px 20px; page-break-inside:avoid; }
  .main { padding:24px 28px; }
  .sidebar, .main { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  h2, .contact-item, .skill-item, .experience-item, .education-item, .award-item, .section-heading {
    page-break-inside:avoid;
    break-inside:avoid;
  }
  @media print {
    body { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
    .sidebar { -webkit-print-color-adjust:exact; print-color-adjust:exact; color:#FFFFFF !important; }
    .sidebar * { -webkit-print-color-adjust:exact; print-color-adjust:exact; color:#FFFFFF !important; }
    .main { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
  }
</style></head>
<body>
<div class="page">
  <!-- Header Row -->
  <table style="width:100%; border-collapse:collapse;" cellpadding="0" cellspacing="0">
    <tr>
      <td style="width:35%; vertical-align:middle; border:none; background:${c.mocha}; padding:20px; text-align:center;">
        ${data.profileImage
          ? `<img src="${data.profileImage}" alt="Profile" style="width:110px; height:110px; border-radius:50%; object-fit:cover; display:inline-block; border:3px solid #FFFFFF; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />`
          : `<div style="width:110px; height:110px; border-radius:50%; background:${c.mochaLight}; display:inline-block; vertical-align:middle; border:3px solid rgba(255,255,255,0.25); line-height:104px; text-align:center;"><span style="color:#FFFFFF; font-size:36px; font-weight:900; font-family:${fontStack};">${data.fullName ? data.fullName.charAt(0).toUpperCase() : ''}</span></div>`
        }
      </td>
      <td style="width:65%; vertical-align:middle; border:none; background:${c.mocha}; padding:24px 28px;">
        ${(() => {
          const nameParts = data.fullName.trim().split(' ');
          const firstName = nameParts[0] || data.fullName;
          const lastName = nameParts.slice(1).join(' ') || '';
          const jobTitle = data.workExperience.length > 0 ? data.workExperience[0].jobTitle : '';
          return `
            <div style="text-align:${textAlign};">
              <h1 style="font-family:${fontStack};font-size:28px;font-weight:900;color:${c.white};text-transform:uppercase;letter-spacing:1.5px;margin:0 0 2px 0;line-height:1.2;">${firstName}</h1>
              ${lastName ? `<h1 style="font-family:${fontStack};font-size:28px;font-weight:900;color:${c.white};text-transform:uppercase;letter-spacing:1.5px;margin:0 0 6px 0;line-height:1.2;">${lastName}</h1>` : ''}
              ${jobTitle ? `<div style="font-family:${fontStack};font-size:11px;font-weight:500;color:rgba(255,255,255,0.8);text-transform:uppercase;letter-spacing:2px;margin-top:4px;">${jobTitle}</div>` : ''}
            </div>
          `;
        })()}
      </td>
    </tr>
  </table>

  <!-- Main Body Row -->
  <table style="width:100%; border-collapse:collapse;" cellpadding="0" cellspacing="0">
    <tr>
      <!-- Left Sidebar -->
      <td class="sidebar" style="width:35%; vertical-align:top; border:none; background:${c.mocha}; color:${c.sidebarText};">
        ${contactHtml ? sectionTitle(lbl.address, userIcon) + contactHtml : ''}
        ${skillsHtml ? sectionTitle(lbl.skills, bookIcon) + skillsHtml : ''}
        ${coursesHtml ? sectionTitle(lbl.courses, trophyIcon) + coursesHtml : ''}
        ${languagesHtml ? sectionTitle(lbl.languages, globeIcon) + languagesHtml : ''}
      </td>

      <!-- Right Main Content -->
      <td class="main" style="width:65%; vertical-align:top; border:none; background:#FFFFFF; color:${c.body};">
        ${summaryHtml ? mainSectionTitle(lbl.summary) + summaryHtml : ''}
        ${experienceHtml ? mainSectionTitle(lbl.experience) + experienceHtml : ''}
        ${educationHtml ? mainSectionTitle(lbl.education) + educationHtml : ''}
      </td>
    </tr>
  </table>
</div>
</body>
</html>`;
};
