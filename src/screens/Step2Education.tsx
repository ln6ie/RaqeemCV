import React from 'react';
import { useCVContext } from '../context/CVContext';
import { GlassInput } from '../components/GlassInput';
import { PremiumCard } from '../components/PremiumCard';

export const Step2Education = () => {
  const { cvData, handleUpdateEducation, updateSkillsString, updateCoursesString, isRTL, isDarkMode, t } = useCVContext();
  return (
    <>
      <PremiumCard title={t.steps.education} isDarkMode={isDarkMode} isRTL={isRTL}>
        <GlassInput label={t.labels.degree} value={cvData.education[0]?.degree || ''}
          onChangeText={(v: string) => handleUpdateEducation('degree', v)} placeholder={t.placeholders.degree}
          isDarkMode={isDarkMode} isRTL={isRTL} />
        <GlassInput label={t.labels.institution} value={cvData.education[0]?.institution || ''}
          onChangeText={(v: string) => handleUpdateEducation('institution', v)} placeholder={t.placeholders.institution}
          isDarkMode={isDarkMode} isRTL={isRTL} />
        <GlassInput label={t.labels.graduationYear} value={cvData.education[0]?.year || ''}
          onChangeText={(v: string) => handleUpdateEducation('year', v)} placeholder={t.placeholders.graduationYear}
          isDarkMode={isDarkMode} isRTL={isRTL} />
        <GlassInput label={t.labels.honors} value={cvData.education[0]?.notes || ''}
          onChangeText={(v: string) => handleUpdateEducation('notes', v)} placeholder={t.placeholders.honors}
          isDarkMode={isDarkMode} isRTL={isRTL} />
      </PremiumCard>
      <PremiumCard title={t.steps.skills} isDarkMode={isDarkMode} isRTL={isRTL}>
        <GlassInput label={t.labels.skills} value={cvData.skills.join(', ')} onChangeText={updateSkillsString}
          placeholder={t.placeholders.skills} isDarkMode={isDarkMode} isRTL={isRTL} />
        <GlassInput label={t.labels.courses} value={cvData.courses.join(', ')} onChangeText={updateCoursesString}
          placeholder={t.placeholders.courses} isDarkMode={isDarkMode} isRTL={isRTL} />
      </PremiumCard>
    </>
  );
};
