import React from 'react';
import { Text, Platform } from 'react-native';
import { useCVContext } from '../context/CVContext';
import { getFontFamily } from '../constants/tokens';
import { GlassicView } from './Glassic';

interface PremiumCardProps {
  children: React.ReactNode;
  title?: string;
}

export const PremiumCard = ({ children, title }: PremiumCardProps) => {
  const { isDarkMode, isRTL, theme } = useCVContext();

  return (
    <GlassicView
      cornerRadius={24}
      glassEffectStyle="regular"
      isDarkMode={isDarkMode}
      style={{
        marginBottom: 16,
        padding: 24,
        ...Platform.select({
          android: {
            elevation: 2,
          },
          default: {},
        }),
      }}
    >
      {title && (
        <Text
          style={{
            color: theme.textPrimary,
            fontSize: 18,
            fontWeight: '800',
            letterSpacing: 0.5,
            marginBottom: 16,
            textAlign: isRTL ? 'right' : 'left',
            fontFamily: getFontFamily(isRTL, 800),
          }}
        >
          {title}
        </Text>
      )}
      {children}
    </GlassicView>
  );
};
