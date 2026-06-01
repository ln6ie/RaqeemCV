import { CVData } from '../../types/cv';
import { LABELS } from './labels';

export interface EliteTheme {
  primary?: string;
  secondary?: string;
  text?: string;
  background?: string;
  border?: string;
}

export const renderEliteTemplate = (
  data: CVData,
  isRTL: boolean,
  theme?: EliteTheme
): string => {
  const lang = isRTL ? 'ar' : 'en';
  const lbl = LABELS[lang];
  const dir = isRTL ? 'rtl' : 'ltr';
  const textAlign = isRTL ? 'right' : 'left';
  const oppAlign = isRTL ? 'left' : 'right';
  const listPaddingSide = isRTL ? 'padding-right' : 'padding-left';
  const fontStack = "'Inter', 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

  // Strict visual replication of the uploaded CV colors
  const c = {
    yellowBanner: '#F2BD00',   // Perfect match of the bright warm yellow banner
    darkBlack: '#1A1A1A',      // Strict dark black for primary headers and name
    bodyText: '#333333',       // Dark charcoal body text
    mutedText: '#666666',      // Slate gray for secondary text and company names
    borderLine: '#CCCCCC',     // Thin divider lines
    white: '#FFFFFF',
  };

  const initials = data.fullName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

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

  // Spacing helper for columns based on RTL
  const padLeft = isRTL ? '0 15px 0 0' : '0 0 0 15px';
  const padRight = isRTL ? '0 0 0 15px' : '0 15px 0 0';

  // Splitting skills in half to map PERSONAL vs TECHNICAL columns perfectly
  const midpoint = Math.ceil(data.skills.length / 2);
  const personalSkills = data.skills.slice(0, midpoint);
  const technicalSkills = data.skills.slice(midpoint);

  // SVG Icons for the Interests section (Replicating the visual icons in the circles)
  const interestsList = [
    // Book
    `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
    // Plane
    `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`,
    // Soccer ball
    `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>`,
    // Chess / Shield
    `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    // Camera
    `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`
  ];

  const sectionTitle = (title: string): string => `
    <h2 class="section-block" style="font-family:${fontStack}; font-size:12px; font-weight:800; color:${c.darkBlack}; text-transform:uppercase; letter-spacing:1px; margin:22px 0 12px 0; padding-bottom:5px; border-bottom:1.5px solid ${c.darkBlack}; text-align:${textAlign}; page-break-after:avoid;">${title}</h2>`;

  const renderExperience = (): string =>
    data.workExperience.map((exp) => `
      <div class="experience-item" style="page-break-inside:avoid; break-inside:avoid; margin-bottom:15px; text-align:${textAlign};">
        <table style="width:100%; border-collapse:collapse; border:none;" cellpadding="0" cellspacing="0">
          <tr>
            <!-- Left side: Dates & Company (26% Width) -->
            <td style="width:26%; vertical-align:top; border:none; padding-${isRTL ? 'left' : 'right'}:12px;">
              <div style="font-family:${fontStack}; font-size:10.5px; font-weight:700; color:${c.darkBlack};">${exp.dateRange || ''}</div>
              <div style="font-family:${fontStack}; font-size:9.5px; color:${c.mutedText}; margin-top:2px; line-height:1.3;">${exp.companyLocation || ''}</div>
            </td>
            <!-- Right side: Position & Tasks (74% Width) -->
            <td style="width:74%; vertical-align:top; border:none; padding:${padLeft};">
              <h3 style="font-family:${fontStack}; font-size:11.5px; font-weight:800; color:${c.darkBlack}; text-transform:uppercase; letter-spacing:0.5px; margin:0 0 4px 0;">${exp.jobTitle || ''}</h3>
              ${exp.mainTasks.filter((t) => t.trim().length > 0).map((task) => `
                <div style="font-family:${fontStack}; font-size:10px; color:${c.bodyText}; line-height:1.5; margin-bottom:3px; position:relative; padding-${isRTL ? 'right' : 'left'}:12px;">
                  <span style="position:absolute; ${isRTL ? 'right' : 'left'}:0; color:${c.yellowBanner};">&bull;</span>
                  ${task}
                </div>
              `).join('')}
            </td>
          </tr>
        </table>
      </div>`
    ).join('');

  const renderEducation = (): string => `
    <table style="width:100%; border-collapse:collapse; border:none;" cellpadding="0" cellspacing="0">
      <tr>
        ${data.education.map((edu, idx) => `
          <td style="width:33.3%; vertical-align:top; border:none; padding-${isRTL ? 'left' : 'right'}:12px;">
            <div style="font-family:${fontStack}; font-size:11px; font-weight:800; color:${c.darkBlack}; text-transform:uppercase; margin-bottom:3px;">${edu.degree || ''}</div>
            <div style="font-family:${fontStack}; font-size:9.5px; color:${c.mutedText}; margin-bottom:2px;">${edu.institution || ''}</div>
            <div style="font-family:${fontStack}; font-size:9.5px; font-weight:700; color:${c.yellowBanner};">${edu.year || ''}</div>
            ${edu.notes ? `<div style="font-family:${fontStack}; font-size:9px; color:${c.mutedText}; font-style:italic; margin-top:2px;">${edu.notes}</div>` : ''}
          </td>
        `).join('')}
      </tr>
    </table>`;

  const renderSkills = (): string => `
    <table style="width:100%; border-collapse:collapse; border:none;" cellpadding="0" cellspacing="0">
      <tr>
        <!-- Personal Skills Column -->
        <td style="width:50%; vertical-align:top; border:none; padding-${isRTL ? 'left' : 'right'}:15px;">
          <div style="font-family:${fontStack}; font-size:11px; font-weight:800; color:${c.darkBlack}; margin-bottom:8px; letter-spacing:0.5px;">//PERSONAL</div>
          ${personalSkills.map(s => {
            const info = parseSkill(s);
            return `<div style="font-family:${fontStack}; font-size:10px; color:${c.bodyText}; margin-bottom:4px; display:flex; justify-content:space-between; flex-direction:${isRTL ? 'row-reverse' : 'row'};">
              <span>${info.name}</span>
              <span style="color:${c.mutedText}; font-size:9px;">${info.percentage}%</span>
            </div>`;
          }).join('')}
        </td>
        <!-- Technical Skills Column -->
        <td style="width:50%; vertical-align:top; border:none; padding-${isRTL ? 'right' : 'left'}:15px;">
          <div style="font-family:${fontStack}; font-size:11px; font-weight:800; color:${c.darkBlack}; margin-bottom:8px; letter-spacing:0.5px;">//TECHNICAL</div>
          ${technicalSkills.map(s => {
            const info = parseSkill(s);
            return `<div style="font-family:${fontStack}; font-size:10px; color:${c.bodyText}; margin-bottom:4px; display:flex; justify-content:space-between; flex-direction:${isRTL ? 'row-reverse' : 'row'};">
              <span>${info.name}</span>
              <span style="color:${c.mutedText}; font-size:9px;">${info.percentage}%</span>
            </div>`;
          }).join('')}
        </td>
      </tr>
    </table>`;

  // Replicating visual details of Page 2 References section
  const renderReferences = (): string => `
    <table style="width:100%; border-collapse:collapse; border:none;" cellpadding="0" cellspacing="0">
      <tr>
        <td style="width:50%; vertical-align:top; border:none; padding-${isRTL ? 'left' : 'right'}:15px;">
          <table style="width:100%; border-collapse:collapse;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:top; width:45%; font-family:${fontStack}; font-size:9.5px; color:${c.mutedText}; line-height:1.4;">
                Company Name /<br/>Position
              </td>
              <td style="vertical-align:top; padding-${isRTL ? 'right' : 'left'}:10px;">
                <div style="font-family:${fontStack}; font-size:11px; font-weight:800; color:${c.darkBlack}; margin-bottom:2px;">MARTIN MARSHEL</div>
                <div style="font-family:${fontStack}; font-size:9.5px; color:${c.bodyText};">Call: +12 894 55786 125</div>
                <div style="font-family:${fontStack}; font-size:9.5px; color:${c.bodyText};">Email: yourname@email.com</div>
              </td>
            </tr>
          </table>
        </td>
        <td style="width:50%; vertical-align:top; border:none; padding-${isRTL ? 'right' : 'left'}:15px;">
          <table style="width:100%; border-collapse:collapse;" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:top; width:45%; font-family:${fontStack}; font-size:9.5px; color:${c.mutedText}; line-height:1.4;">
                Company Name /<br/>Position
              </td>
              <td style="vertical-align:top; padding-${isRTL ? 'right' : 'left'}:10px;">
                <div style="font-family:${fontStack}; font-size:11px; font-weight:800; color:${c.darkBlack}; margin-bottom:2px;">MARTIN MARSHEL</div>
                <div style="font-family:${fontStack}; font-size:9.5px; color:${c.bodyText};">Call: +12 894 55786 125</div>
                <div style="font-family:${fontStack}; font-size:9.5px; color:${c.bodyText};">Email: yourname@email.com</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>`;

  const contactLine = `
    <strong>Phone:</strong> ${data.phone || ''} &nbsp;|&nbsp; 
    <strong>Email:</strong> ${data.email || ''} 
    ${data.address ? `&nbsp;|&nbsp; <strong>Address:</strong> ${data.address}` : ''}
  `;

  // Determine first work experience job title for subtitle
  const jobTitle = data.workExperience.length > 0 ? data.workExperience[0].jobTitle : 'PROFESSIONAL TITLE';

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}" style="color-scheme:light;">
<head>
  <meta charset="utf-8"><meta name="color-scheme" content="light">
  <title>${data.fullName} - Resume</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Cairo:wght@400;500;600;700;900&display=swap" rel="stylesheet">
  <style>
    @media print {
      body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background: #FFFFFF !important; }
      .force-bg { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .page-break { page-break-before: always; break-before: always; }
    }
    html { color-scheme: light; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    * { box-sizing: border-box; margin: 0; padding: 0; forced-color-adjust: none; }
    .experience-item, .education-item, .section-block { page-break-inside: avoid; break-inside: avoid; }
    body { background-color: #FFFFFF !important; color: ${c.bodyText} !important; color-scheme: light; font-family: ${fontStack}; font-size: 11px; line-height: 1.5; width: 210mm; margin: 0 auto; direction: ${dir}; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    
    .page-container {
      width: 210mm;
      min-height: 297mm;
      padding: 20mm;
      background: #FFFFFF;
      position: relative;
    }
  </style>
</head>
<body>

  <!-- ==================== PAGE 1 ==================== -->
  <div class="page-container">
    <!-- Header Block -->
    <table style="width:100%; border-collapse:collapse; border:none; margin-bottom:15px;" cellpadding="0" cellspacing="0">
      <tr>
        <td style="vertical-align:middle; border:none; text-align:${textAlign};">
          <h1 style="font-family:${fontStack}; font-size:26px; font-weight:900; color:${c.darkBlack}; margin:0; line-height:1.1; letter-spacing:0.5px; text-transform:uppercase;">${data.fullName}</h1>
          <p style="font-family:${fontStack}; font-size:11px; font-weight:700; color:${c.mutedText}; margin:4px 0 0 0; text-transform:uppercase; letter-spacing:1px;">${jobTitle}</p>
        </td>
        <td style="vertical-align:middle; border:none; text-align:${oppAlign}; font-family:${fontStack}; font-size:9.5px; color:${c.mutedText}; line-height:1.4;">
          Company Name<br/>
          Fake Address 798 New Stranger<br/>
          NY City 2560
        </td>
      </tr>
    </table>

    <!-- Full Width Bright Yellow Contact Bar -->
    <div style="background:${c.yellowBanner}; color:#000000; padding:8px 15px; font-family:${fontStack}; font-size:9.5px; font-weight:700; text-align:center; letter-spacing:0.5px; margin-bottom:20px; border-radius:2px;" class="force-bg">
      ${contactLine}
    </div>

    <!-- About Me Grid -->
    <table style="width:100%; border-collapse:collapse; border:none; margin-bottom:15px;" cellpadding="0" cellspacing="0">
      <tr>
        <!-- Circular Profile Image Cell with double rings -->
        <td style="width:110px; vertical-align:middle; border:none; padding-${isRTL ? 'left' : 'right'}:20px; text-align:center;">
          <div style="width:90px; height:90px; border-radius:50%; border:1.8px dashed ${c.yellowBanner}; padding:4px; display:inline-flex; align-items:center; justify-content:center;">
            <div style="width:78px; height:78px; border-radius:50%; border:1px solid ${c.borderLine}; display:flex; align-items:center; justify-content:center; overflow:hidden;">
              ${data.profileImage ? `
                <img src="${data.profileImage}" alt="Profile" style="width:100%; height:100%; object-fit:cover; display:block;" />
              ` : `
                <span style="font-family:${fontStack}; font-size:24px; font-weight:700; color:${c.darkBlack};">${initials}</span>
              `}
            </div>
          </div>
        </td>
        <!-- Summary/About Text -->
        <td style="vertical-align:middle; border:none; text-align:${textAlign};">
          <h2 style="font-family:${fontStack}; font-size:12px; font-weight:800; color:${c.darkBlack}; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px;">ABOUT ME</h2>
          <p style="font-family:${fontStack}; font-size:10px; color:${c.bodyText}; line-height:1.6; margin:0;">
            ${data.summary || ''}
          </p>
        </td>
      </tr>
    </table>

    <!-- Work Experience Section -->
    ${data.workExperience.length > 0 ? `
      <div>
        ${sectionTitle(lbl.experience)}
        ${renderExperience()}
      </div>
    ` : ''}

    <!-- Educations Section (Bottom of Page 1) -->
    ${data.education.length > 0 ? `
      <div style="margin-top:20px;">
        ${sectionTitle(lbl.education)}
        ${renderEducation()}
      </div>
    ` : ''}
  </div>

  <!-- ==================== PAGE 2 ==================== -->
  <div class="page-container page-break">
    <!-- Skills Section -->
    ${data.skills.length > 0 ? `
      <div style="margin-bottom:20px;">
        ${sectionTitle(lbl.skills)}
        ${renderSkills()}
      </div>
    ` : ''}

    <!-- Interests Section -->
    <div style="margin-bottom:20px;">
      ${sectionTitle(isRTL ? 'الاهتمامات' : 'INTERESTS')}
      <div style="display:flex; gap:10px; align-items:center; justify-content:${isRTL ? 'flex-end' : 'flex-start'}; flex-direction:${isRTL ? 'row-reverse' : 'row'}; padding:5px 0;">
        ${interestsList.map(icon => `
          <div style="width:32px; height:32px; border-radius:50%; background:${c.yellowBanner}; display:inline-flex; align-items:center; justify-content:center; box-shadow: 0 2px 5px rgba(0,0,0,0.1);" class="force-bg">
            ${icon}
          </div>
        `).join('')}
      </div>
    </div>

    <!-- References Section -->
    <div style="margin-bottom:20px;">
      ${sectionTitle(isRTL ? 'المراجع' : 'REFERENCE')}
      ${renderReferences()}
    </div>
  </div>

</body>
</html>`;
};
