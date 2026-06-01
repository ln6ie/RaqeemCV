import React from 'react';
import { View, StyleSheet } from 'react-native';

import { SPACING, BORDER_RADIUS } from '../constants/tokens';
import { TranslationSet } from '../constants/translations';
import { RaqeemLogo } from './RaqeemLogo';
import { GlassicView } from './Glassic';
import { NativeButton } from './NativeButton';

interface HeaderProps {
  isDarkMode: boolean;
  onOpenSettings: () => void;
  onOpenAIPrompt: () => void;
  onOpenCVManager: () => void;
  onLoadSample: () => void;
  theme: any;
  isRTL: boolean;
  t: TranslationSet;
  activeStep: number;
}

export const Header = ({
  isDarkMode,
  onOpenSettings,
  onOpenAIPrompt,
  onOpenCVManager,
  onLoadSample,
  theme,
  isRTL,
  t,
  activeStep,
}: HeaderProps) => {
  return (
    <GlassicView
      cornerRadius={24}
      glassEffectStyle="regular"
      isDarkMode={isDarkMode}
      style={{
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 1000,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
      }}
    >
      <View style={{ paddingTop: 56, paddingHorizontal: 0, paddingBottom: 12 }}>
        <View
          style={{
            flexDirection: isRTL ? 'row-reverse' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          {/* Logo */}
          <View style={{ marginLeft: isRTL ? 0 : 12, marginRight: isRTL ? 12 : 0 }}>
            <RaqeemLogo width={60} height={40} layout="iconOnly" isDarkMode={isDarkMode} isRTL={isRTL} />
          </View>

          {/* Right action buttons */}
          <View
            style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              gap: SPACING.sm,
              alignItems: 'center',
              marginRight: isRTL ? 0 : 12,
              marginLeft: isRTL ? 12 : 0,
            }}
          >
            <GlassicView
              cornerRadius={9999}
              glassEffectStyle="regular"
              isDarkMode={isDarkMode}
              style={{ flexDirection: 'row', gap: 2, paddingHorizontal: 4, paddingVertical: 4 }}
            >
              {/* CV Manager */}
              <NativeButton
                onPress={onOpenCVManager}
                systemImage="folder"
                variant="plain"
                style={styles.headerButton}
                accessibilityLabel="CV Manager"
                color={theme.textPrimary}
              />

              {/* Sample CV loader */}
              <NativeButton
                onPress={onLoadSample}
                systemImage="document"
                variant="plain"
                style={styles.headerButton}
                accessibilityLabel="Load Sample CV"
                color={theme.textSecondary}
              />

              {/* AI Prompt */}
              <NativeButton
                onPress={onOpenAIPrompt}
                systemImage="sparkles"
                variant="plain"
                style={styles.headerButton}
                accessibilityLabel="AI Prompt"
                color={theme.accent}
              />

              {/* Settings */}
              <NativeButton
                onPress={onOpenSettings}
                systemImage="gearshape"
                variant="plain"
                style={styles.headerButton}
                accessibilityLabel="Settings"
                color={theme.textPrimary}
              />
            </GlassicView>
          </View>
        </View>

        {/* Progress stepper */}
        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', gap: 4, paddingHorizontal: 12 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <View
              key={i}
              style={{
                flex: 1,
                height: 4,
                borderRadius: 4,
                backgroundColor:
                  i <= activeStep
                    ? theme.accent
                    : isDarkMode
                      ? '#2C2C2E'
                      : '#E5E5EA',
              }}
            />
          ))}
        </View>
      </View>
    </GlassicView>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    borderRadius: BORDER_RADIUS.full,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderCurve: 'circular',
  },
});
