import { CVData } from '../../types/cv';
import { LABELS } from './labels';

export const renderIvyTemplate = (data: CVData, isRTL: boolean): string => {
  const lang = isRTL ? 'ar' : 'en';
  const lbl = LABELS[lang];
  const dir = isRTL ? 'rtl' : 'ltr';
  const textAlign = 'left';
  const fontStack = "'Times New Roman', Times, serif";

  const c = {
    black: '#000000',
    white: '#FFFFFF',
    body: '#000000',
    secondary: '#111111',
  };

  const contactParts: string[] = [];
  if (data.email) contactParts.push(data.email);
  if (data.phone) contactParts.push(data.phone);
  if (data.address) contactParts.push(data.address);
  const contactLine = contactParts.join(' &bull; ');

  const sectionTitle = (title: string): string => `
    <h2 style="font-family:${fontStack};font-size:14px;font-weight:700;color:${c.black};text-align:center;text-transform:uppercase;letter-spacing:0.5px;margin:18px 0 10px 0;padding-bottom:4px;border-bottom:1px solid ${c.black};page-break-after:avoid;">${title}</h2>`;

  const summaryHtml = data.summary ? `
    <div style="text-align:${textAlign};margin-bottom:2px;">
      <p style="font-family:${fontStack};font-size:11px;color:${c.body};line-height:1.5;margin:0;">${data.summary}</p>
    </div>` : '';

  const experienceHtml = data.workExperience.filter(e => e.jobTitle).map(exp => `
    <div class="resume-item" style="margin-bottom:12px;page-break-inside:avoid;break-inside:avoid;">
      <div style="display:flex;${isRTL ? 'flex-direction:row-reverse;' : ''}justify-content:space-between;align-items:baseline;flex-wrap:wrap;">
        <div style="font-family:${fontStack};font-size:11px;font-weight:700;color:${c.black};text-align:${textAlign};">${exp.companyLocation}</div>
        ${exp.dateRange ? `<div style="font-family:${fontStack};font-size:11px;color:${c.black};text-align:right;">${exp.dateRange}</div>` : ''}
      </div>
      <div style="font-family:${fontStack};font-size:11px;font-style:italic;color:${c.black};margin:1px 0 4px 0;text-align:${textAlign};">${exp.jobTitle}</div>
      ${exp.mainTasks.filter(t => t).length > 0 ? `
        <ul style="margin:0 0 0 15px;padding:0;text-align:${textAlign};">
          ${exp.mainTasks.filter(t => t).map(t => `<li style="font-family:${fontStack};font-size:10.5px;color:${c.body};line-height:1.5;margin-bottom:2px;">${t}</li>`).join('')}
        </ul>` : ''}
    </div>
  `).join('') || '';

  const educationHtml = data.education.filter(e => e.degree || e.institution).map(edu => `
    <div class="resume-item" style="margin-bottom:10px;page-break-inside:avoid;break-inside:avoid;">
      <div style="display:flex;${isRTL ? 'flex-direction:row-reverse;' : ''}justify-content:space-between;align-items:baseline;flex-wrap:wrap;">
        <div style="font-family:${fontStack};font-size:11px;font-weight:700;color:${c.black};text-align:${textAlign};">${edu.institution}</div>
        ${edu.year ? `<div style="font-family:${fontStack};font-size:11px;color:${c.black};text-align:right;">${edu.year}</div>` : ''}
      </div>
      <div style="font-family:${fontStack};font-size:11px;font-style:italic;color:${c.black};margin:1px 0 0 0;text-align:${textAlign};">${edu.degree}</div>
      ${edu.notes ? `<div style="font-family:${fontStack};font-size:10.5px;color:${c.body};margin-top:3px;text-align:${textAlign};">${edu.notes}</div>` : ''}
    </div>
  `).join('') || '';

  const skillsHtml = data.skills.length > 0 ? `
    <div class="resume-item" style="page-break-inside:avoid;break-inside:avoid;">
      <p style="font-family:${fontStack};font-size:10.5px;color:${c.body};line-height:1.6;margin:0;text-align:${textAlign};">${data.skills.join(', ')}</p>
    </div>` : '';

  const coursesHtml = data.courses.length > 0 ? `
    <div class="resume-item" style="page-break-inside:avoid;break-inside:avoid;">
      <p style="font-family:${fontStack};font-size:10.5px;color:${c.body};line-height:1.6;margin:0;text-align:${textAlign};">${data.courses.join(', ')}</p>
    </div>` : '';

  const languagesHtml = data.languages.filter(l => l.name).map(l => `
    <span style="font-family:${fontStack};font-size:10.5px;color:${c.body};line-height:1.6;">${l.name}${l.level ? `: ${l.level}` : ''}</span>
  `).join('<span style="color:${c.body};font-size:10.5px;"> &bull; </span>') || '';

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:light;">
<head>
  <meta charset="utf-8"><meta name="color-scheme" content="light">
  <title>${data.fullName} - Resume</title>
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
    ul{list-style-type:disc;}
    @media print{
      body{-webkit-print-color-adjust:exact;print-color-adjust:exact;background:${c.white} !important;color:${c.black} !important;}
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div style="text-align:center;margin-bottom:18px;page-break-after:avoid;">
    <h1 style="font-family:${fontStack};font-size:24px;font-weight:700;color:${c.black};text-transform:uppercase;letter-spacing:1px;margin:0 0 6px 0;">${data.fullName}</h1>
    <div style="font-family:${fontStack};font-size:11px;color:${c.black};line-height:1.5;">${contactLine}</div>
  </div>

  <!-- Summary -->
  ${summaryHtml ? sectionTitle(lbl.summary) + summaryHtml : ''}

  <!-- Work Experience -->
  ${experienceHtml ? sectionTitle(lbl.experience) + experienceHtml : ''}

  <!-- Education -->
  ${educationHtml ? sectionTitle(lbl.education) + educationHtml : ''}

  <!-- Skills -->
  ${skillsHtml ? sectionTitle(lbl.skills) + skillsHtml : ''}

  <!-- Courses -->
  ${coursesHtml ? sectionTitle(lbl.courses) + coursesHtml : ''}

  <!-- Languages -->
  ${languagesHtml ? sectionTitle(lbl.languages) + `<div style="page-break-inside:avoid;break-inside:avoid;">${languagesHtml}</div>` : ''}

</body>
</html>`;
};
