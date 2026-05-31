import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { BouncyPressable } from '../components/BouncyPressable';
import { Ionicons } from '@expo/vector-icons';
import { CVTemplate, TEMPLATE_NAMES, TEMPLATE_DESCRIPTIONS } from '../types/cv';
import { useCVContext } from '../context/CVContext';
import { TemplatePreviewSheet } from '../components/TemplatePreviewSheet';
import { SPACING, getFontFamily } from '../constants/tokens';
import { GlassicView } from '../components/Glassic';

const ALL_TEMPLATES: CVTemplate[] = ['classic', 'engineering', 'hospitality', 'executive', 'zenith', 'creative-edge', 'profile-elegance'];

export const Step0Template = () => {
  const { cvData, updateField, isDarkMode, isRTL, theme, t } = useCVContext();
  const current = cvData.template || 'classic';
  const lang = isRTL ? 'ar' : 'en';
  const [previewTarget, setPreviewTarget] = useState<CVTemplate | null>(null);

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
        {t.steps.template}
      </Text>
      <Text style={{
        color: theme.textSecondary,
        fontSize: 13,
        textAlign: isRTL ? 'right' : 'left',
        fontFamily: getFontFamily(isRTL, 400),
        marginBottom: SPACING.xs,
      }}>
        {isRTL ? 'اختر القالب المناسب لسيرتك الذاتية. اضغط مطولاً لمعاينته.' : 'Choose your CV template. Long-press to preview.'}
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 8,
          paddingHorizontal: 4,
        }}
      >
        <View style={{
          flexDirection: isRTL ? 'row-reverse' : 'row',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          {ALL_TEMPLATES.map((tmpl) => {
            const isActive = current === tmpl;
            const name = TEMPLATE_NAMES[tmpl][lang];
            const cardWidth = (Dimensions.get('window').width - 32 - 8 - 12) / 2;

            return (
              <BouncyPressable
                key={tmpl}
                onPress={() => updateField('template', tmpl)}
                onLongPress={() => setPreviewTarget(tmpl)}
                pressDepth={0.96}
                haptic={false}
                style={{ width: cardWidth }}
              >
                <GlassicView
                  cornerRadius={16}
                  glassEffectStyle={isActive ? 'prominent' : 'regular'}
                  isDarkMode={isDarkMode}
                  style={{
                    padding: 14,
                    minHeight: 120,
                    justifyContent: 'space-between',
                    borderWidth: isActive ? 2 : 0.5,
                    borderColor: isActive ? theme.accent : (isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'),
                  }}
                >
                  <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Ionicons
                      name={isActive ? "checkmark-circle" : "ellipse-outline"}
                      size={20}
                      color={isActive ? theme.accent : theme.textSecondary}
                    />
                    <Ionicons
                      name="eye-outline"
                      size={16}
                      color={theme.textSecondary}
                      style={{ opacity: 0.6 }}
                    />
                  </View>

                  <View>
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '700',
                      color: isActive ? theme.accent : theme.textPrimary,
                      fontFamily: getFontFamily(isRTL, 700),
                      textAlign: isRTL ? 'right' : 'left',
                    }} numberOfLines={2}>
                      {name}
                    </Text>
                    <Text style={{
                      fontSize: 10,
                      color: theme.textSecondary,
                      fontFamily: getFontFamily(isRTL, 400),
                      textAlign: isRTL ? 'right' : 'left',
                      marginTop: 2,
                    }} numberOfLines={2}>
                      {TEMPLATE_DESCRIPTIONS[tmpl][lang]}
                    </Text>
                  </View>
                </GlassicView>
              </BouncyPressable>
            );
          })}
        </View>
      </ScrollView>

      <TemplatePreviewSheet
        template={previewTarget}
        onClose={() => setPreviewTarget(null)}
      />
    </View>
  );
};
