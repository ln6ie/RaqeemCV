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

// Safely try-catch the @expo/ui import to prevent crashes in Expo Go or uncompiled builds
let Host: any = null;
let SwiftUIButton: any = null;
let buttonStyleMod: any = null;
let tintMod: any = null;
let controlSizeMod: any = null;
let labelStyleMod: any = null;
let frameMod: any = null;
let buttonBorderShapeMod: any = null;
let foregroundColorMod: any = null;
let isNativeUIReady = false;

try {
  const swiftUI = require('@expo/ui/swift-ui');
  const modifiers = require('@expo/ui/swift-ui/modifiers');
  Host = swiftUI.Host;
  SwiftUIButton = swiftUI.Button;
  buttonStyleMod = modifiers.buttonStyle;
  tintMod = modifiers.tint;
  foregroundColorMod = modifiers.foregroundColor;
  controlSizeMod = modifiers.controlSize;
  labelStyleMod = modifiers.labelStyle;
  frameMod = modifiers.frame;
  buttonBorderShapeMod = modifiers.buttonBorderShape;
  isNativeUIReady = true;
} catch (err) {
  console.log('[NativeButton Debug] Error loading @expo/ui:', err);
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
  variant = 'plain',
  color,
  systemImage,
  size,
  label,
}) => {
  const flattenedStyle = StyleSheet.flatten(style) || {};

  // Pre-resolve dynamic/infinite border radius to exact numeric values.
  // Native iOS CALayers do not support 9999 for small views and often render them as sharp rectangles.
  const wVal = typeof flattenedStyle.width === 'number' ? flattenedStyle.width : 44;
  const hVal = typeof flattenedStyle.height === 'number' ? flattenedStyle.height : 44;

  let borderRadius = 12;
  if (flattenedStyle.borderRadius !== undefined) {
    borderRadius = Number(flattenedStyle.borderRadius);
  }

  if (wVal === hVal) {
    borderRadius = wVal / 2; // Exact radius for perfect circles
  } else if (borderRadius >= 1000) {
    borderRadius = hVal / 2; // Exact radius for perfect capsules
  }

  // Render method for React Native fallback
  const renderFallback = () => {
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

  // We can render ANY button natively if @expo/ui is available, we have a system image or a label,
  // and there are no custom React Native children.
  // Can render native ONLY if:
  // - @expo/ui is available
  // - Button has systemImage or label (no children)
  // - Button is not circular, OR buttonBorderShape modifier is available (for perfect circles)
  const isCircular = wVal === hVal && wVal > 0;
  const hasBorderShapeFix = !isCircular || buttonBorderShapeMod != null;
  const canRenderNative =
    hasBorderShapeFix &&
    isNativeUIReady &&
    Host &&
    SwiftUIButton &&
    ((typeof systemImage === 'string' && systemImage.length > 0) || (typeof label === 'string' && label.length > 0)) &&
    !children;

  if (canRenderNative) {
    const mods: any[] = [];
    if (buttonStyleMod) {
      mods.push(buttonStyleMod(variant));
    }
    if (isCircular && buttonBorderShapeMod) {
      mods.push(buttonBorderShapeMod('circle'));
    }
    if (color) {
      if (variant === 'plain' && foregroundColorMod) {
        mods.push(foregroundColorMod(color));
      } else if (tintMod) {
        mods.push(tintMod(color));
      }
    }

    // Auto-determine control size based on layout dimensions to prevent squeezing/clipping
    const wVal = typeof flattenedStyle.width === 'number' ? flattenedStyle.width : 44;
    const hVal = typeof flattenedStyle.height === 'number' ? flattenedStyle.height : 44;
    const resolvedSize = size || (wVal <= 32 ? 'small' : wVal <= 44 ? 'regular' : 'large');

    if (controlSizeMod) {
      mods.push(controlSizeMod(resolvedSize));
    }
    if (labelStyleMod && systemImage && !label) {
      mods.push(labelStyleMod('iconOnly'));
    }

    // Force frame constraints at the SwiftUI level to prevent horizontal stretching
    if (frameMod) {
      const frameParams: Record<string, number> = {};
      if (typeof flattenedStyle.width === 'number') frameParams.width = flattenedStyle.width;
      if (typeof flattenedStyle.height === 'number') frameParams.height = flattenedStyle.height;
      if (Object.keys(frameParams).length > 0) {
        mods.push(frameMod(frameParams));
      }
    }

    // Build a minimal Host style — only layout dims and position.
    const hostStyle: Record<string, any> = {};
    if (typeof flattenedStyle.width === 'number') hostStyle.width = flattenedStyle.width;
    if (typeof flattenedStyle.height === 'number') hostStyle.height = flattenedStyle.height;
    if (flattenedStyle.margin !== undefined) hostStyle.margin = flattenedStyle.margin;
    if (flattenedStyle.marginTop !== undefined) hostStyle.marginTop = flattenedStyle.marginTop;
    if (flattenedStyle.marginBottom !== undefined) hostStyle.marginBottom = flattenedStyle.marginBottom;
    if (flattenedStyle.marginLeft !== undefined) hostStyle.marginLeft = flattenedStyle.marginLeft;
    if (flattenedStyle.marginRight !== undefined) hostStyle.marginRight = flattenedStyle.marginRight;
    if (flattenedStyle.marginHorizontal !== undefined) hostStyle.marginHorizontal = flattenedStyle.marginHorizontal;
    if (flattenedStyle.marginVertical !== undefined) hostStyle.marginVertical = flattenedStyle.marginVertical;
    if (flattenedStyle.alignSelf !== undefined) hostStyle.alignSelf = flattenedStyle.alignSelf;

    const hasExplicitWidth = typeof flattenedStyle.width === 'number';
    const hasExplicitHeight = typeof flattenedStyle.height === 'number';

    return (
      <Host
        matchContents={!hasExplicitWidth && !hasExplicitHeight}
        style={hostStyle}
      >
        <SwiftUIButton
          label={label || accessibilityLabel || 'Button'}
          systemImage={systemImage}
          onPress={onPress}
          modifiers={mods}
          accessibilityLabel={accessibilityLabel}
        />
      </Host>
    );
  }

  // For all other cases: use the spring-animated BouncyPressable fallback
  return renderFallback();
};
