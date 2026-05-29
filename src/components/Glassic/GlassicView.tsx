import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView, BlurTint } from 'expo-blur';
import { GlassicViewProps, GlassEffectStyle } from './GlassicView.types';

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

export const GlassicView = ({
  children,
  cornerRadius = 0,
  glassEffectStyle = 'regular',
  isInteractive = true,
  tintColor,
  isDarkMode = false,
  style,
}: GlassicViewProps) => {

  const tint = resolveBlurTint(glassEffectStyle);
  const refractionBg = tintColor || (isDarkMode ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.45)');
  const borderColor = isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.55)';

  return (
    <View style={[{ borderRadius: cornerRadius, overflow: 'hidden', borderWidth: 0.5, borderColor }, style]}>
      <BlurView
        intensity={65}
        tint={tint}
        style={StyleSheet.absoluteFill}
        pointerEvents={isInteractive ? 'auto' : 'none'}
      />
      {/* Semi-transparent overlay simulates iOS refraction */}
      <View style={[StyleSheet.absoluteFill, { backgroundColor: refractionBg }]} pointerEvents="none" />
      {children}
    </View>
  );
};
