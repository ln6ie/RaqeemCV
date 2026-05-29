import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SPACING, BORDER_RADIUS } from '../constants/tokens';
import { TranslationSet } from '../constants/translations';
import { RaqeemLogo } from './RaqeemLogo';

interface HeaderProps {
  isDarkMode: boolean;
  onOpenSettings: () => void;
  onOpenAIPrompt: () => void;
  theme: any;
  isRTL: boolean;
  t: TranslationSet;
}

export const Header = ({ isDarkMode, onOpenSettings, onOpenAIPrompt, theme, isRTL, t }: HeaderProps) => {
  return (
    <View
      style={[
        styles.headerContainer,
        { flexDirection: isRTL ? 'row-reverse' : 'row' },
      ]}
    >
      <RaqeemLogo width={36} height={36} layout="iconOnly" isDarkMode={isDarkMode} isRTL={isRTL} />

      <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', gap: SPACING.sm, alignItems: 'center' }}>
        {/* AI Copier Sparkles Button */}
        <TouchableOpacity
          onPress={onOpenAIPrompt}
          activeOpacity={0.85}
          style={[
            styles.settingsButton,
            { backgroundColor: isDarkMode ? 'rgba(10, 132, 255, 0.15)' : 'rgba(10, 132, 255, 0.08)' },
          ]}
        >
          <Ionicons name="sparkles" size={18} color={theme.accent} />
        </TouchableOpacity>

        {/* Traditional Settings Button */}
        <TouchableOpacity
          onPress={onOpenSettings}
          activeOpacity={0.85}
          style={[
            styles.settingsButton,
            { backgroundColor: 'rgba(150, 150, 150, 0.15)' },
          ]}
        >
          <Ionicons name="settings-outline" size={18} color={theme.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: Platform.OS === 'android' ? SPACING.md : SPACING.sm,
    paddingBottom: SPACING.md,
  },
  settingsButton: {
    borderRadius: BORDER_RADIUS.full,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});
