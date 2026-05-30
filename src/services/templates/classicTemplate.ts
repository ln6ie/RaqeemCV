import { CVData } from '../../types/cv';
import { LABELS } from './labels';

export const renderClassicTemplate = (data: CVData, isRTL: boolean): string => {
  const lang = isRTL ? 'ar' : 'en';
  const lbl = LABELS[lang];
  const dir = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';
  const listPaddingSide = isRTL ? 'padding-right' : 'padding-left';
  const fontStack = "'Cairo', 'Times New Roman', Times, serif";
  const c = { background: '#FFFFFF', primaryHeader: '#000000', body: '#000000', border: '#000000', secondaryText: '#333333' };
  const colorScheme = 'light';

  const splitTwo = (arr: string[]): [string[], string[]] => {
    const half = Math.ceil(arr.length / 2);
    return [arr.slice(0, half), arr.slice(half)];
  };
  const [leftSkills, rightSkills] = splitTwo(data.skills);
  const [leftCourses, rightCourses] = splitTwo(data.courses);

  const renderBulletColumn = (items: string[], fontSizePx: number = 10.5): string =>
    items.length > 0
      ? `<ul style="margin:0; ${listPaddingSide}:16px; list-style-type:disc;">
           ${items.map((item) => `<li style="margin-bottom:4px; font-size:${fontSizePx}px; color:${c.body}; text-align:${textAlign}; font-family:${fontStack};">${item}</li>`).join('')}
         </ul>`
      : '';

  const renderTwoColumnTable = (left: string[], right: string[]): string => `
    <table style="width:100%; border-collapse:collapse; border:none; margin-bottom:8px;" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:50%; vertical-align:top; border:none; padding-right:${isRTL ? '0' : '8px'}; padding-left:${isRTL ? '8px' : '0'};">
          ${renderBulletColumn(left, 10)}
        </td>
        <td style="width:50%; vertical-align:top; border:none;">
          ${renderBulletColumn(right, 10)}
        </td>
      </tr>
    </table>`;

  const renderExperience = (): string =>
    data.workExperience.map((exp) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px; text-align:${textAlign};">
        <h3 style="font-family:${fontStack}; font-size:12px; font-weight:bold; color:${c.body}; margin:0 0 2px 0;">${exp.jobTitle}</h3>
        <p style="font-family:${fontStack}; font-size:11px; font-weight:normal; color:${c.secondaryText}; margin:0 0 1px 0;">${exp.companyLocation}</p>
        <p style="font-family:${fontStack}; font-size:10.5px; font-style:italic; color:${c.secondaryText}; margin:0 0 4px 0;">${exp.dateRange}</p>
        <p style="font-family:${fontStack}; font-weight:bold; font-size:10px; color:${c.body}; margin:4px 0 2px 0;">${lbl.mainTasks}</p>
        <ul style="margin:0; ${listPaddingSide}:16px; list-style-type:disc;">
          ${exp.mainTasks.filter((t) => t.trim().length > 0).map((task) =>
            `<li style="margin-bottom:3px; font-family:${fontStack}; font-size:10px; color:${c.body}; text-align:${textAlign}; line-height:1.4;">${task}</li>`
          ).join('')}
        </ul>
      </div>`
    ).join('');

  const renderEducation = (): string =>
    data.education.map((edu) => `
      <div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:10px; text-align:${textAlign};">
        <h3 style="font-family:${fontStack}; font-size:12px; font-weight:bold; color:${c.body}; margin:0 0 2px 0;">${edu.degree}</h3>
        <p style="font-family:${fontStack}; font-size:11px; font-weight:normal; color:${c.body}; margin:0 0 2px 0;">${edu.institution} ${edu.year}</p>
        ${edu.notes ? `<p style="font-family:${fontStack}; font-size:10px; font-style:italic; color:${c.secondaryText}; margin:0;">${edu.notes}</p>` : ''}
      </div>`
    ).join('');

  const renderLanguages = (): string =>
    data.languages.map((langItem) => `
      <div style="font-family:${fontStack}; font-size:10.5px; color:${c.body}; text-align:${textAlign}; margin-bottom:4px;">
        <span style="font-weight:bold;">${langItem.name}:</span> ${langItem.level}
      </div>`
    ).join('');

  const sectionTitle = (title: string): string => `
    <h2 style="font-family:${fontStack}; font-size:14px; font-weight:bold; color:${c.primaryHeader}; border-bottom:1px solid ${c.border}; padding-bottom:2px; margin:14px 0 8px 0; letter-spacing:0.2px; text-align:${textAlign};">${title}</h2>`;

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:${colorScheme};">
<head>
  <meta charset="utf-8"><meta name="color-scheme" content="${colorScheme}">
  <title>${data.fullName} - CV</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>
    html{color-scheme:${colorScheme};-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    *{box-sizing:border-box;margin:0;padding:0;forced-color-adjust:none;}
    body{background-color:${c.background} !important;color:${c.body} !important;color-scheme:${colorScheme};font-family:${fontStack};font-size:11px;line-height:1.5;padding:30px;width:210mm;min-height:297mm;margin:0 auto;direction:${dir};text-align:justify;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
  </style>
</head>
<body>
  <div style="text-align:center; margin-bottom:14px; page-break-inside:avoid;">
    <h1 style="font-family:${fontStack}; font-size:24px; font-weight:bold; color:${c.body}; margin-bottom:6px; letter-spacing:-0.2px;">${data.fullName}</h1>
    <div style="border-top:1px solid ${c.border}; border-bottom:1px solid ${c.border}; padding:6px 0; font-family:${fontStack}; font-size:10.5px; font-weight:normal; color:${c.body}; width:100%; text-align:center; margin-bottom:10px; background-color:${c.background};">
      ${lbl.address} : ${data.address} | ${data.phone} | ${data.email}
    </div>
  </div>
  ${data.summary ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px;">${sectionTitle(lbl.summary)}<p style="font-family:${fontStack}; font-size:11px; color:${c.body}; text-align:justify; margin:0; line-height:1.5;">${data.summary}</p></div>` : ''}
  ${data.skills.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px;">${sectionTitle(lbl.skills)}${renderTwoColumnTable(leftSkills, rightSkills)}</div>` : ''}
  ${data.workExperience.length > 0 ? `<div style="margin-bottom:14px;">${sectionTitle(lbl.experience)}${renderExperience()}</div>` : ''}
  ${data.education.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px;">${sectionTitle(lbl.education)}${renderEducation()}</div>` : ''}
  ${data.courses.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px;">${sectionTitle(lbl.courses)}${renderTwoColumnTable(leftCourses, rightCourses)}</div>` : ''}
  ${data.languages.length > 0 ? `<div style="page-break-inside:avoid; break-inside:avoid; margin-bottom:14px;">${sectionTitle(lbl.languages)}${renderLanguages()}</div>` : ''}
</body>
</html>`;
};
