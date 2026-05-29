import React from 'react';
import { View, Text } from 'react-native';
import { useCVContext } from '../context/CVContext';
import { getFontFamily } from '../constants/tokens';

interface PremiumCardProps {
  children: React.ReactNode;
  title?: string;
}

export const PremiumCard = ({ children, title }: PremiumCardProps) => {
  const { isDarkMode, isRTL, theme } = useCVContext();

  return (
    <View
      style={{
        borderRadius: 24,
        padding: 24,
        marginBottom: 16,
        ...(isDarkMode
          ? {
              backgroundColor: 'rgba(255, 255, 255, 0.035)',
            }
          : {
              backgroundColor: '#FFFFFF',
              shadowColor: '#000',
              shadowOpacity: 0.03,
              shadowRadius: 20,
              shadowOffset: { width: 0, height: 6 },
              elevation: 2,
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
    </View>
  );
};
