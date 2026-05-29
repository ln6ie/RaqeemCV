import React from 'react';
import { useCVContext } from '../context/CVContext';
import { GlassInput } from '../components/GlassInput';
import { PremiumCard } from '../components/PremiumCard';

export const Step0Personal = () => {
  const { cvData, updateField, validationErrors, isDarkMode, isRTL, t } = useCVContext();
  return (
    <PremiumCard title={t.steps.personal}>
      <GlassInput label={t.labels.fullName} value={cvData.fullName} onChangeText={(v: string) => updateField('fullName', v)} placeholder={t.placeholders.fullName} isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['fullName']} />
      <GlassInput label={t.labels.address} value={cvData.address} onChangeText={(v: string) => updateField('address', v)} placeholder={t.placeholders.address} isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['address']} />
      <GlassInput label={t.labels.phone} value={cvData.phone} onChangeText={(v: string) => updateField('phone', v)} placeholder={t.placeholders.phone} keyboardType="phone-pad" isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['phone']} />
      <GlassInput label={t.labels.email} value={cvData.email} onChangeText={(v: string) => updateField('email', v)} placeholder={t.placeholders.email} keyboardType="email-address" autoCapitalize="none" isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['email']} />
      <GlassInput label={t.labels.summary} value={cvData.summary} onChangeText={(v: string) => updateField('summary', v)} placeholder={t.placeholders.summary} multiline numberOfLines={3} isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['summary']} />
    </PremiumCard>
  );
};
