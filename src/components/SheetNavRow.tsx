import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFontFamily, SPACING } from '../constants/tokens';

interface SheetNavRowProps {
  label: string;
  iconName: string;
  onPress: () => void;
  valueText?: string;
  isDestructive?: boolean;
  isRTL: boolean;
  isDarkMode?: boolean;
  selected?: boolean;
  theme: { textPrimary: string; textSecondary: string; error: string; accent: string };
}

export const SheetNavRow = ({
  label, iconName, onPress, valueText,
  isDestructive = false, isRTL, isDarkMode = false,
  selected = false, theme,
}: SheetNavRowProps) => {
  const color = isDestructive ? theme.error : selected ? theme.accent : theme.textPrimary;
  const chevron = isRTL ? 'chevron-back' : 'chevron-forward';
  const selectedBg = isDarkMode ? 'rgba(10, 132, 255, 0.12)' : 'rgba(0, 85, 165, 0.08)';

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.row,
        { flexDirection: isRTL ? 'row-reverse' : 'row' },
        selected && { backgroundColor: selectedBg, borderRadius: 9999, paddingHorizontal: SPACING.md, overflow: 'hidden' },
      ]}
    >
      <View style={[styles.leading, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        <Ionicons name={iconName as any} size={20} color={isDestructive ? theme.error : selected ? theme.accent : theme.textSecondary} />
        <Text style={[styles.label, { color, fontFamily: getFontFamily(isRTL, 600) }]}>{label}</Text>
      </View>

      <View style={[styles.trailing, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
        {valueText !== undefined && (
          <Text style={[styles.value, { color: theme.textSecondary, fontFamily: getFontFamily(isRTL, 500) }]}>{valueText}</Text>
        )}
        <Ionicons
          name={selected ? 'checkmark-circle' : chevron}
          size={selected ? 18 : 14}
          color={selected ? theme.accent : theme.textSecondary}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  leading: {
    alignItems: 'center',
    gap: 12,
  },
  label: {
    fontSize: 17,
  },
  trailing: {
    alignItems: 'center',
    gap: 6,
  },
  value: {
    fontSize: 15,
  },
});
