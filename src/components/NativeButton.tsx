import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, GestureResponderEvent, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BouncyPressable } from './BouncyPressable';
import { GlassicView } from './Glassic';

interface NativeButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  hitSlop?: { top: number; bottom: number; left: number; right: number };
  accessibilityLabel?: string;
  pressDepth?: number;
  haptic?: boolean;
  variant?: 'automatic' | 'bordered' | 'borderedProminent' | 'borderless' | 'glass' | 'glassProminent' | 'plain';
  color?: string;
  size?: 'mini' | 'small' | 'regular' | 'large' | 'extraLarge';
  systemImage?: string;
  label?: string;
}

const ICON_MAP: Record<string, string> = {
  'xmark': 'close',
  'chevron.left': 'chevron-back',
  'chevron.right': 'chevron-forward',
  'arrow.left': 'arrow-back',
  'arrow.right': 'arrow-forward',
  'folder': 'folder-outline',
  'sparkles': 'sparkles',
  'gearshape': 'settings-outline',
  'download': 'download-outline',
  'square.and.arrow.down': 'download-outline',
  'doc.on.clipboard': 'clipboard-outline',
  'checkmark': 'checkmark',
  'square.and.arrow.up': 'share-outline',
  'eye': 'eye-outline',
  'document': 'document-text-outline',
};

export const NativeButton: React.FC<NativeButtonProps> = ({
  onPress,
  onLongPress,
  children,
  style,
  disabled = false,
  hitSlop,
  accessibilityLabel,
  pressDepth = 0.88,
  haptic = true,
  variant = 'plain',
  color,
  systemImage,
  label,
}) => {
  const flattenedStyle = StyleSheet.flatten(style) || {};
  const borderRadius = flattenedStyle.borderRadius !== undefined ? flattenedStyle.borderRadius : 12;

  const renderContent = () => {
    if (children) return children;
    const content: React.ReactNode[] = [];
    if (systemImage) {
      const iconName = ICON_MAP[systemImage] || 'help-circle-outline';
      const iconColor = color || '#8E8E93';
      content.push(<Ionicons key="icon" name={iconName as any} size={20} color={iconColor} />);
    }
    if (label) {
      content.push(
        <Text key="text" style={{ color: color || '#8E8E93', fontWeight: '600', marginLeft: systemImage ? 6 : 0 }}>
          {label}
        </Text>
      );
    }
    return content.length > 0 ? (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        {content}
      </View>
    ) : null;
  };

  if (variant === 'glass' || variant === 'glassProminent') {
    // Extract layout-specific props to the GlassicView container
    const {
      width,
      height,
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      position,
      top,
      bottom,
      left,
      right,
      zIndex,
      alignSelf,
      borderCurve,
      ...pressableStyle
    } = flattenedStyle;

    const glassStyle = {
      width,
      height,
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      position,
      top,
      bottom,
      left,
      right,
      zIndex,
      alignSelf,
      borderCurve,
    };

    return (
      <GlassicView
        cornerRadius={Number(borderRadius)}
        glassEffectStyle={variant === 'glassProminent' ? 'prominent' : 'regular'}
        style={glassStyle}
      >
        <BouncyPressable
          onPress={onPress}
          onLongPress={onLongPress}
          disabled={disabled}
          hitSlop={hitSlop}
          accessibilityLabel={accessibilityLabel}
          pressDepth={pressDepth}
          haptic={haptic}
          style={[
            pressableStyle,
            {
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
              borderWidth: 0,
            },
          ]}
        >
          {renderContent()}
        </BouncyPressable>
      </GlassicView>
    );
  }

  return (
    <BouncyPressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      hitSlop={hitSlop}
      accessibilityLabel={accessibilityLabel}
      pressDepth={pressDepth}
      haptic={haptic}
      style={style}
    >
      {renderContent()}
    </BouncyPressable>
  );
};

