import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView, BlurTint } from 'expo-blur';
import { GlassicViewProps, GlassEffectStyle } from './GlassicView.types';

let GlassView: any = null;
let isLiquidGlassAvailable = false;

try {
  GlassView = require('expo-glass-effect').GlassView;
  isLiquidGlassAvailable = true;
} catch {
  // expo-glass-effect native module unavailable (Expo Go or pre-iOS 26)
}

const BLUR_TINT_MAP: Record<GlassEffectStyle, BlurTint> = {
  regular: 'systemMaterial',
  prominent: 'systemThickMaterial',
  extraDark: 'dark',
  light: 'light',
  dark: 'dark',
  ultraThin: 'systemUltraThinMaterial',
  thin: 'systemThinMaterial',
  thick: 'systemThickMaterial',
};

function resolveBlurTint(style: GlassEffectStyle): BlurTint {
  return BLUR_TINT_MAP[style] || 'systemMaterial';
}

function resolveGlassStyle(style: GlassEffectStyle): GlassEffectStyle {
  return style;
}

export const GlassicView = ({
  children,
  cornerRadius = 0,
  glassEffectStyle = 'regular',
  isInteractive = true,
  isDarkMode = false,
  style,
}: GlassicViewProps) => {

  const borderColor = isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.55)';
  const bgColor = isDarkMode ? 'rgba(28,28,30,0.55)' : 'rgba(255,255,255,0.45)';

  // ── iOS 26+ native GlassView ─────────────────────────────────
  if (isLiquidGlassAvailable && GlassView) {
    return (
      <View style={[{ position: 'relative', borderRadius: cornerRadius, borderWidth: 0.5, borderColor }, style]}>
        <GlassView
          glassEffectStyle={glassEffectStyle}
          style={[StyleSheet.absoluteFill, { borderRadius: cornerRadius }]}
          pointerEvents={isInteractive ? 'auto' : 'none'}
        />
        {children}
      </View>
    );
  }

  // ── BlurView fallback (pre-iOS 26 or Expo Go) ────────────────
  const tint = resolveBlurTint(glassEffectStyle);

  return (
    <View
      style={[
        {
          position: 'relative',
          borderRadius: cornerRadius,
          overflow: 'hidden',
          borderWidth: 0.5,
          borderColor,
          backgroundColor: bgColor,
        },
        style,
      ]}
    >
      <BlurView
        intensity={70}
        tint={tint}
        style={[StyleSheet.absoluteFill, { borderRadius: cornerRadius }]}
        pointerEvents="none"
      />
      {children}
    </View>
  );
};
