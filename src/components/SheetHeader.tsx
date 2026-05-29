import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFontFamily } from '../constants/tokens';

interface SheetHeaderProps {
  title: string;
  onClose: () => void;
  isRTL?: boolean;
  isDarkMode?: boolean;
  theme: { textPrimary: string; textSecondary: string };
}

export const SheetHeader = ({ title, onClose, isRTL = false, isDarkMode = false, theme }: SheetHeaderProps) => {
  return (
    <View style={[styles.headerRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
      <Text style={[styles.title, { color: theme.textPrimary, fontFamily: getFontFamily(isRTL, 900) }]}>
        {title}
      </Text>
      <TouchableOpacity
        onPress={onClose}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        style={[styles.closeButton, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#E5E5EA' }]}
      >
        <Ionicons name="close-outline" size={18} color={theme.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
});
