import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { BouncyPressable } from './BouncyPressable';

interface NativeButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  children?: React.ReactNode;
  label?: string;
  systemImage?: string;
  style?: any;
  disabled?: boolean;
  hitSlop?: { top: number; bottom: number; left: number; right: number };
  accessibilityLabel?: string;
  variant?: string;
  color?: string;
  size?: string;
  pressDepth?: number;
  haptic?: boolean;
}

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
}) => (
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
    {children}
  </BouncyPressable>
);
