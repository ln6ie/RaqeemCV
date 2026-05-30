import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { BouncyPressable } from './BouncyPressable';

interface NativeButtonProps {
  onPress?: () => void;
  children?: React.ReactNode;
  label?: string;
  systemImage?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  hitSlop?: { top: number; bottom: number; left: number; right: number };
  accessibilityLabel?: string;
  variant?: 'automatic' | 'bordered' | 'borderedProminent' | 'borderless' | 'glass' | 'glassProminent' | 'plain';
  color?: string;
  size?: 'mini' | 'small' | 'regular' | 'large' | 'extraLarge';
  pressDepth?: number;
  haptic?: boolean;
}

let NativeButtonImpl: React.FC<NativeButtonProps>;

try {
  const { Button, Host } = require('@expo/ui/swift-ui');
  const { buttonStyle, tint, controlSize } = require('@expo/ui/swift-ui/modifiers');

  NativeButtonImpl = ({
    onPress,
    label,
    systemImage,
    variant = 'glassProminent',
    color,
    size,
    style,
    accessibilityLabel,
  }) => {
    const mods: any[] = [buttonStyle(variant)];
    if (color) mods.push(tint(color));
    if (size) mods.push(controlSize(size));

    return (
      <Host matchContents style={style}>
        <Button
          label={label}
          systemImage={systemImage}
          onPress={onPress}
          modifiers={mods}
          accessibilityLabel={accessibilityLabel}
        />
      </Host>
    );
  };
} catch {
  NativeButtonImpl = ({
    onPress,
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
}

export const NativeButton = NativeButtonImpl;
