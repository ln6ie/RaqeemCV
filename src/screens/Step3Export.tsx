import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useCVContext } from '../context/CVContext';
import { GlassInput } from '../components/GlassInput';
import { NativeButton } from '../components/NativeButton';
import { ExportButton } from '../components/ExportButton';
import { CVPreview } from '../components/CVPreview';
import { SPACING, getFontFamily } from '../constants/tokens';

export const Step3Export = () => {
  const { cvData, handleUpdateLanguage, handleExportAction, handleReShare, exportStatus, theme, isDarkMode, isRTL, t } = useCVContext();
  const [previewVisible, setPreviewVisible] = useState(false);

  return (
    <View style={{ gap: SPACING.md }}>
      <Text style={{
        color: theme.textPrimary,
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: -0.3,
        textAlign: isRTL ? 'right' : 'left',
        fontFamily: getFontFamily(isRTL, 700),
      }}>
        {t.steps.language}
      </Text>
      <GlassInput label={t.labels.arabicLevel} value={cvData.languages[0]?.level || ''}
        onChangeText={(v: string) => handleUpdateLanguage(0, v)} placeholder={t.placeholders.arabicLevel}
        isDarkMode={isDarkMode} isRTL={isRTL} tip={t.tips.arabicLevel} />
      <GlassInput label={t.labels.englishLevel} value={cvData.languages[1]?.level || ''}
        onChangeText={(v: string) => handleUpdateLanguage(1, v)} placeholder={t.placeholders.englishLevel}
        isDarkMode={isDarkMode} isRTL={isRTL} tip={t.tips.arabicLevel} />

      {exportStatus === 'idle' ? (
        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', gap: 10, justifyContent: 'center' }}>
          <NativeButton
            onPress={() => setPreviewVisible(true)}
            variant="glassProminent"
            systemImage="eye"
            style={{
              width: 56,
              height: 56,
              borderRadius: 9999,
              alignItems: 'center',
              justifyContent: 'center',
              borderCurve: 'circular',
            }}
            accessibilityLabel={isRTL ? 'معاينة' : 'Preview'}
            color={theme.accent}
          />

          <NativeButton
            onPress={handleExportAction}
            variant="glassProminent"
            systemImage="square.and.arrow.up"
            style={{
              width: 56,
              height: 56,
              borderRadius: 9999,
              alignItems: 'center',
              justifyContent: 'center',
              borderCurve: 'circular',
            }}
            accessibilityLabel={isRTL ? 'تصدير' : 'Export'}
            color={theme.accent}
          />
        </View>
      ) : (
        <ExportButton theme={theme} isRTL={isRTL} t={t} exportStatus={exportStatus}
          onPress={handleExportAction} onReShare={handleReShare} />
      )}

      <CVPreview
        visible={previewVisible}
        onClose={() => setPreviewVisible(false)}
        onExport={handleExportAction}
      />
    </View>
  );
};
