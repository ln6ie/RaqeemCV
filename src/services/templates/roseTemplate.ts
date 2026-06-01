import { CVData } from '../../types/cv';
import { LABELS } from './labels';

export const renderRoseTemplate = (data: CVData, isRTL: boolean): string => {
  const lang = isRTL ? 'ar' : 'en';
  const lbl = LABELS[lang];
  const dir = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';
  const fontStack = "'Optima', 'Georgia', 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  const cols = {
    sidebarBg: '#FDF2F8',
    background: '#FFFFFF',
    body: '#334155',
    secondary: '#64748B',
    accent: '#9D174D',
    rose: '#D81B60',
    border: '#FBCFE8',
    tagBg: '#FFFFFF',
    tagBorder: '#FBCFE8',
  };

  const jobTitle = data.workExperience.length > 0 ? data.workExperience[0].jobTitle : '';

  const sectionTitle = (title: string): string => `
    <h2 style="font-family:${fontStack}; font-size:12px; font-weight:600; color:${cols.accent}; text-transform:uppercase; letter-spacing:1.5px; margin:24px 0 10px 0; padding-bottom:6px; border-bottom:1.5px solid ${cols.border}; text-align:${textAlign};">${title}</h2>`;

  const sidebarSection = (title: string, content: string): string => `
    ${sectionTitle(title)}
    <div style="font-size:12px; line-height:1.7; color:${cols.body}; text-align:${textAlign};">${content}</div>`;

  const contactHtml = `
    <div style="margin-bottom:4px;">
      ${data.address ? `<div style="margin-bottom:6px;"><span style="font-weight:600;color:${cols.accent};font-size:11px;">${lbl.address}</span><br/><span style="font-size:12px;color:${cols.body};">${data.address}</span></div>` : ''}
      ${data.phone ? `<div style="margin-bottom:4px;font-size:12px;color:${cols.body};">${data.phone}</div>` : ''}
      ${data.email ? `<div style="font-size:12px;color:${cols.accent};">${data.email}</div>` : ''}
    </div>`;

  const skillsHtml = data.skills.length > 0 ? `
    <div style="display:flex;flex-wrap:wrap;gap:6px;${isRTL ? 'justify-content:flex-end' : 'justify-content:flex-start'};margin-top:4px;">
      ${data.skills.map(s => `<span style="display:inline-block;padding:4px 12px;border-radius:20px;background:${cols.tagBg};color:${cols.accent};border:1px solid ${cols.tagBorder};font-size:11px;font-weight:500;">${s}</span>`).join('')}
    </div>` : '';

  const educationHtml = data.education.filter(e => e.degree || e.institution).map(e => `
    <div style="margin-bottom:12px;page-break-inside:avoid;">
      <div style="font-size:12px;font-weight:600;color:${cols.body};">${e.degree}</div>
      <div style="font-size:11px;color:${cols.secondary};margin-top:2px;">${e.institution}${e.year ? ' — ' + e.year : ''}</div>
      ${e.notes ? `<div style="font-size:11px;color:${cols.body};margin-top:4px;">${e.notes}</div>` : ''}
    </div>`).join('') || `<div style="font-size:12px;color:${cols.secondary};">—</div>`;

  const languagesHtml = data.languages.filter(l => l.name).map(l => `
    <div style="margin-bottom:6px;page-break-inside:avoid;">
      <span style="display:inline-block;padding:3px 14px;border-radius:20px;background:${cols.tagBg};color:${cols.accent};border:1px solid ${cols.tagBorder};font-size:11px;margin-bottom:3px;">${l.name}</span>
      ${l.level ? `<span style="font-size:11px;color:${cols.secondary};margin-${isRTL ? 'right' : 'left'}:6px;">${l.level}</span>` : ''}
    </div>`).join('') || '';

  const coursesHtml = data.courses.length > 0 ? `
    <div style="display:flex;flex-wrap:wrap;gap:6px;${isRTL ? 'justify-content:flex-end' : 'justify-content:flex-start'};">
      ${data.courses.map(c => `<span style="display:inline-block;padding:3px 12px;border-radius:20px;background:${cols.tagBg};color:${cols.accent};border:1px solid ${cols.tagBorder};font-size:10px;">${c}</span>`).join('')}
    </div>` : '';

  const summaryHtml = data.summary ? `
    <div style="margin-bottom:6px;line-height:1.8;font-size:13px;color:${cols.body};text-align:${textAlign};">${data.summary}</div>` : '';

  const experienceHtml = data.workExperience.filter(e => e.jobTitle).map(exp => `
    <div style="margin-bottom:20px;page-break-inside:avoid;">
      <div style="display:flex;${isRTL ? 'flex-direction:row-reverse;' : ''}justify-content:space-between;align-items:baseline;flex-wrap:wrap;">
        <div style="font-size:14px;font-weight:600;color:${cols.accent};text-align:${textAlign};">${exp.jobTitle}</div>
        ${exp.dateRange ? `<div style="font-size:11px;color:${cols.secondary};font-style:italic;">${exp.dateRange}</div>` : ''}
      </div>
      ${exp.companyLocation ? `<div style="font-size:12px;color:${cols.secondary};margin-top:2px;text-align:${textAlign};">${exp.companyLocation}</div>` : ''}
      ${exp.mainTasks.filter(t => t).length > 0 ? `
        <ul style="margin:8px 0 0 0;padding-${isRTL ? 'right' : 'left'}:18px;text-align:${textAlign};">
          ${exp.mainTasks.filter(t => t).map(t => `<li style="font-size:12px;color:${cols.body};line-height:1.7;margin-bottom:4px;">${t}</li>`).join('')}
        </ul>` : ''}
    </div>`).join('') || '<div style="font-size:12px;color:#94A3B8;">—</div>';

  const sidebarWidth = '35%';
  const mainWidth = '65%';

  return `<!DOCTYPE html>
<html dir="${dir}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  @page { margin: 0; size: A4; }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 0; font-family: ${fontStack}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .page { width: 210mm; }
  .sidebar { background: ${cols.sidebarBg}; }
  .main { background: ${cols.background}; }
  .profile-img { width: 120px; height: 120px; border-radius: 50%; border: 4px solid #FFFFFF; object-fit: cover; box-shadow: 0 4px 10px rgba(0,0,0,0.05); display: block; margin: 0 auto 16px auto; }
  .name { font-size: 28px; font-weight: 300; color: ${cols.body}; letter-spacing: -0.5px; margin: 0 0 4px 0; text-align: ${textAlign}; }
  .job-title { font-size: 15px; font-weight: 400; color: ${cols.accent}; margin: 0 0 18px 0; text-align: ${textAlign}; }
  @media print {
    .sidebar { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .main { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    h2, .experience-item { page-break-inside: avoid; }
  }
</style></head>
<body>
<div class="page">
  <table style="width:100%; border-collapse:collapse;" cellpadding="0" cellspacing="0">
    <tr>
      <!-- Sidebar -->
      <td style="width:35%; vertical-align:top; border:none; background:${cols.sidebarBg}; padding:30px;">
        ${data.profileImage ? `<img class="profile-img" src="${data.profileImage}" alt="Profile" />` : ''}

        ${sidebarSection(lbl.languages, languagesHtml || `<div style="font-size:12px;color:${cols.secondary};">—</div>`)}

        ${educationHtml ? sidebarSection(lbl.education, educationHtml) : ''}

        ${skillsHtml ? sidebarSection(lbl.skills, skillsHtml) : ''}

        ${coursesHtml ? sidebarSection(lbl.courses, coursesHtml) : ''}

        ${contactHtml ? sidebarSection(lbl.address, contactHtml) : ''}
      </td>

      <!-- Main Content -->
      <td style="width:65%; vertical-align:top; border:none; background:${cols.background}; padding:30px;">
        <h1 class="name">${data.fullName}</h1>
        ${jobTitle ? `<div class="job-title">${jobTitle}</div>` : ''}

        ${summaryHtml ? sectionTitle(lbl.summary) + summaryHtml : ''}

        ${sectionTitle(lbl.experience)}
        ${experienceHtml}
      </td>
    </tr>
  </table>
</div>
</body>
</html>`;
};
