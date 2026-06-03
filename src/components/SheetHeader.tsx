import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFontFamily } from '../constants/tokens';
import { NativeButton } from './NativeButton';

interface SheetHeaderProps {
  title: string;
  onClose: () => void;
  isRTL?: boolean;
  isDarkMode?: boolean;
  theme: { textPrimary: string; textSecondary: string; cardBackground?: string };
  showGrabber?: boolean;
  headerAction?: React.ReactNode;
  panHandlers?: any;
}

export const SheetHeader = ({
  title,
  onClose,
  isRTL = false,
  isDarkMode = false,
  theme,
  showGrabber = true,
  headerAction,
  panHandlers,
}: SheetHeaderProps) => {
  const CLOSE_SIZE = 56;

  return (
    <View style={styles.wrapper} {...panHandlers}>
      {showGrabber && (
        <View
          style={[
            styles.grabber,
            { backgroundColor: isDarkMode ? '#48484A' : '#C7C7CC' },
          ]}
        />
      )}

      <View style={styles.headerRow}>
        <View style={{ width: CLOSE_SIZE + 12, alignItems: 'flex-start' }}>
          {headerAction}
        </View>

        <Text
          style={[
            styles.title,
            {
              color: theme.textPrimary,
              fontFamily: getFontFamily(isRTL, 900),
            },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {title}
        </Text>

        <View style={{ width: CLOSE_SIZE + 12, alignItems: 'flex-end' }}>
          <NativeButton
            onPress={onClose}
            accessibilityLabel="Close"
            variant="glassProminent"
            systemImage="xmark"
            style={styles.closeButtonInner}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  grabber: {
    width: 36,
    height: 5,
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 16,
    opacity: 0.45,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: 22,
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  closeButtonInner: {
    width: 56,
    height: 56,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
    borderCurve: 'circular',
  },
});
