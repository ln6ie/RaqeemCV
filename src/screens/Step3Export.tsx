import React from 'react';
import { useCVContext } from '../context/CVContext';
import { GlassInput } from '../components/GlassInput';
import { PremiumCard } from '../components/PremiumCard';
import { ExportButton } from '../components/ExportButton';

export const Step3Export = () => {
  const { cvData, handleUpdateLanguage, handleExportAction, handleReShare, exportStatus, theme, isDarkMode, isRTL, t } = useCVContext();
  return (
    <>
      <PremiumCard title={t.steps.language}>
        <GlassInput label={t.labels.arabicLevel} value={cvData.languages[0]?.level || ''}
          onChangeText={(v: string) => handleUpdateLanguage(0, v)} placeholder={t.placeholders.arabicLevel}
          isDarkMode={isDarkMode} isRTL={isRTL} />
        <GlassInput label={t.labels.englishLevel} value={cvData.languages[1]?.level || ''}
          onChangeText={(v: string) => handleUpdateLanguage(1, v)} placeholder={t.placeholders.englishLevel}
          isDarkMode={isDarkMode} isRTL={isRTL} />
      </PremiumCard>
      <PremiumCard title={isRTL ? "تصدير السيرة الذاتية" : "Export CV"}>
        <ExportButton theme={theme} isRTL={isRTL} t={t} exportStatus={exportStatus}
          onPress={handleExportAction} onReShare={handleReShare} />
      </PremiumCard>
    </>
  );
};
