import React from 'react';
import { View, Text, TouchableOpacity, Platform, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SvgXml } from 'react-native-svg';
import { useCVContext } from '../context/CVContext';
import { SPACING, getFontFamily } from '../constants/tokens';
import { openWithAI, AIService } from '../constants/ai';
import { SVG_CHATGPT, SVG_GEMINI, SVG_CLAUDE } from '../constants/svg-icons';
import { ModalBottomSheet } from './ModalBottomSheet';
import { GlassicView } from './Glassic';

interface AIServiceSheetProps {
  visible: boolean;
  onClose: () => void;
  prompt: string;
}

export const AIServiceSheet = ({ visible, onClose, prompt }: AIServiceSheetProps) => {
  const { isDarkMode, isRTL, theme } = useCVContext();

  const handleSelect = async (service: AIService) => {
    onClose();
    await openWithAI(prompt, service);
  };

  const services: { key: AIService; svg: string; label: string; desc: string }[] = [
    {
      key: 'chatgpt',
      svg: SVG_CHATGPT,
      label: 'ChatGPT',
      desc: isRTL ? 'ينسخ البرومت ويفتح التطبيق' : 'Copies prompt & opens app',
    },
    {
      key: 'gemini',
      svg: SVG_GEMINI,
      label: 'Gemini',
      desc: isRTL ? 'ينسخ البرومت ويفتح التطبيق' : 'Copies prompt & opens app',
    },
    {
      key: 'claude',
      svg: SVG_CLAUDE,
      label: 'Claude',
      desc: isRTL ? 'ينسخ البرومت ويفتح التطبيق' : 'Copies prompt & opens app',
    },
  ];

  return (
    <ModalBottomSheet
      visible={visible}
      onClose={onClose}
      title={isRTL ? 'تحسين بالذكاء الاصطناعي' : 'Improve with AI'}
      theme={theme}
      isDarkMode={isDarkMode}
      isRTL={isRTL}
      showGrabber
    >

          <View style={{ gap: SPACING.md, paddingTop: SPACING.lg }}>
            <Text style={{
              fontSize: 14,
              color: theme.textSecondary,
              textAlign: isRTL ? 'right' : 'left',
              fontFamily: getFontFamily(isRTL, 400),
              lineHeight: 20,
            }}>
              {isRTL ? 'اختر خدمة الذكاء الاصطناعي لتحسين النص:' : 'Choose an AI service to improve your text:'}
            </Text>

            {services.map((s) => (
              <Pressable
                key={s.key}
                onPress={() => handleSelect(s.key)}
                style={({ pressed }) => [
                  {
                    borderRadius: 58,
                    overflow: 'hidden',
                    opacity: pressed ? 0.9 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  }
                ]}
              >
                <GlassicView
                  cornerRadius={58}
                  glassEffectStyle="regular"
                  isDarkMode={isDarkMode}
                  style={{
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    alignItems: 'center',
                    gap: 14,
                    padding: 16,
                    borderWidth: 0.5,
                    borderColor: isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
                  }}
                >
                  <View style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <SvgXml xml={s.svg} width={30} height={30} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: theme.textPrimary,
                      fontFamily: getFontFamily(isRTL, 700),
                      textAlign: isRTL ? 'right' : 'left',
                    }}>
                      {s.label}
                    </Text>
                    <Text style={{
                      fontSize: 12,
                      color: theme.textSecondary,
                      fontFamily: getFontFamily(isRTL, 400),
                      textAlign: isRTL ? 'right' : 'left',
                      marginTop: 2,
                    }}>
                      {s.desc}
                    </Text>
                  </View>
                  <Ionicons name={isRTL ? 'chevron-back-outline' : 'chevron-forward-outline'} size={20} color={theme.textSecondary} />
                </GlassicView>
              </Pressable>
            ))}
          </View>
    </ModalBottomSheet>
  );
};