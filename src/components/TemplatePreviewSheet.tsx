import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { CVTemplate, PreviewCVSchema, TEMPLATE_NAMES, TEMPLATE_DESCRIPTIONS } from '../types/cv';
import { useCVContext } from '../context/CVContext';
import { generateCVTemplate } from '../services/cvTemplate';
import { getFontFamily } from '../constants/tokens';
import { SheetHeader } from './SheetHeader';

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
    <Modal
      visible={visible}
      transparent={Platform.OS === 'android'}
      animationType="slide"
      presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : 'overFullScreen'}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Platform.OS === 'ios' ? theme.background : 'transparent',
          justifyContent: Platform.OS === 'ios' ? 'flex-start' : 'flex-end',
        }}
      >
        {/* Render Android only backdrop to allow click outside to close */}
        {Platform.OS === 'android' && (
          <TouchableOpacity
            style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
            activeOpacity={1}
            onPress={onClose}
          />
        )}

        <View
          style={[
            Platform.OS === 'ios'
              ? {
                  flex: 1,
                  backgroundColor: theme.background,
                  paddingHorizontal: 24,
                  paddingTop: 16,
                }
              : {
                  backgroundColor: theme.cardBackground,
                  borderTopLeftRadius: 28,
                  borderTopRightRadius: 28,
                  paddingHorizontal: 24,
                  paddingTop: 8,
                  paddingBottom: 24,
                  borderWidth: 1,
                  borderColor: theme.cardBorder,
                  borderBottomWidth: 0,
                  width: '100%',
                  height: '92%',
                },
          ]}
        >
          <SheetHeader
            title={template ? TEMPLATE_NAMES[template][lang] : ''}
            onClose={onClose}
            isRTL={isRTL}
            isDarkMode={isDarkMode}
            theme={theme}
            showGrabber={true}
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
          />



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
        </View>
      </View>
    </Modal>
  );
};

