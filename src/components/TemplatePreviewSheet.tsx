import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { CVTemplate, PreviewCVSchema, TEMPLATE_NAMES, TEMPLATE_DESCRIPTIONS } from '../types/cv';
import { useCVContext } from '../context/CVContext';
import { generateCVTemplate } from '../services/cvTemplate';
import { getFontFamily } from '../constants/tokens';
import { ModalBottomSheet } from './ModalBottomSheet';

interface Props {
  template: CVTemplate | null;
  onClose: () => void;
}

export const TemplatePreviewSheet = ({ template, onClose }: Props) => {
  const { cvData, isDarkMode, pdfLang, isRTL, theme, updateField } = useCVContext();
  const [html, setHtml] = useState('');
  const prevTemplate = useRef<CVTemplate | null>(null);
  const lang = isRTL ? 'ar' : 'en';

  useEffect(() => {
    if (!template) return;
    prevTemplate.current = template;
    const previewData = { ...cvData, template };
    const result = PreviewCVSchema.safeParse(previewData);
    setHtml(generateCVTemplate(result.data as any, pdfLang));
  }, [template, cvData, isDarkMode, pdfLang]);

  const visible = template !== null;

  return (
    <ModalBottomSheet
      visible={visible}
      onClose={onClose}
      title={template ? (isRTL ? TEMPLATE_NAMES[template].ar : TEMPLATE_NAMES[template].en) : ''}
      theme={theme}
      isDarkMode={isDarkMode}
      isRTL={isRTL}
      showGrabber
      height="92%"
      headerAction={
        <TouchableOpacity
          onPress={() => { if (template) { updateField('template', template); onClose(); } }}
          style={{
            backgroundColor: theme.accent,
            borderRadius: 9999,
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700', fontFamily: getFontFamily(isRTL, 700) }}>
            {isRTL ? 'اختيار' : 'Select'}
          </Text>
        </TouchableOpacity>
      }
    >
      {html ? (
        <WebView
          source={{ html }}
          style={{ flex: 1, backgroundColor: '#FFFFFF', borderRadius: 12, overflow: 'hidden' }}
          originWhitelist={['*']}
          scalesPageToFit={Platform.OS === 'android'}
        />
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 15, color: theme.textSecondary, textAlign: 'center', fontFamily: getFontFamily(isRTL, 400) }}>
            {isRTL ? 'جارٍ التحميل...' : 'Loading...'}
          </Text>
        </View>
      )}
    </ModalBottomSheet>
  );
};
