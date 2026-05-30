/**
 * BouncyPressable — iOS 26-style spring press button
 *
 * Replicates the native UIKit/SwiftUI bouncy press interaction:
 *  - Press:   scales down to 0.88 with spring physics (fast)
 *  - Release: spring-bounces back to 1.0 with overshoot
 *
 * Uses React Native's built-in Animated API with useNativeDriver: true
 * so all animation runs on the UI thread — zero JS-thread jank.
 *
 * No external dependencies required (no Reanimated, no Haptics lib).
 * Haptic feedback is triggered via the Vibration API as a lightweight fallback.
 */

import React, { useRef, useCallback } from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  Platform,
  Vibration,
} from 'react-native';

// ── iOS 26 spring constants ───────────────────────────────────────────────────
//
// Values derived from Apple's ".bouncy(duration: 0.4)" preset:
//   - friction: 4   → low damping → noticeable overshoot on release
//   - tension:  140 → high stiffness → snappy press-down
//   - useNativeDriver: true → runs on the UI thread, never drops frames
//
const SPRING_DOWN = {
  toValue: 0.88,
  friction: 8,
  tension: 300,
  useNativeDriver: true,
} as const;

const SPRING_UP = {
  toValue: 1,
  friction: 3,    // Low friction = bouncy overshoot on release
  tension: 120,
  useNativeDriver: true,
} as const;

// ── Props ─────────────────────────────────────────────────────────────────────

interface BouncyPressableProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  /** How far to scale down on press. Default: 0.88 (iOS 26 standard) */
  pressDepth?: number;
  /** Enable light haptic on press (uses Vibration.vibrate). Default: true */
  haptic?: boolean;
  hitSlop?: { top: number; bottom: number; left: number; right: number };
  accessibilityLabel?: string;
  accessibilityRole?: 'button' | 'link' | 'menuitem' | 'search' | 'imagebutton';
}

// ── Component ─────────────────────────────────────────────────────────────────

export const BouncyPressable: React.FC<BouncyPressableProps> = ({
  children,
  onPress,
  onLongPress,
  style,
  disabled = false,
  pressDepth = 0.88,
  haptic = true,
  hitSlop,
  accessibilityLabel,
  accessibilityRole = 'button',
}) => {
  const scale = useRef(new Animated.Value(1)).current;
  const springDownRef = useRef<Animated.CompositeAnimation | null>(null);
  const springUpRef = useRef<Animated.CompositeAnimation | null>(null);

  const handlePressIn = useCallback(() => {
    if (disabled) return;

    // Cancel any in-flight release animation before pressing again
    springUpRef.current?.stop();

    // Lightweight haptic: 1ms vibration pattern mimics UIImpactFeedbackStyle.light
    if (haptic && Platform.OS === 'android') {
      Vibration.vibrate(1);
    }

    springDownRef.current = Animated.spring(scale, {
      ...SPRING_DOWN,
      toValue: pressDepth,
    });
    springDownRef.current.start();
  }, [disabled, haptic, pressDepth, scale]);

  const handlePressOut = useCallback(() => {
    // Cancel any in-flight press-down animation
    springDownRef.current?.stop();

    springUpRef.current = Animated.spring(scale, SPRING_UP);
    springUpRef.current.start();
  }, [scale]);

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={disabled ? undefined : onPress}
      onLongPress={disabled ? undefined : onLongPress}
      disabled={disabled}
      hitSlop={hitSlop}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole}
      style={{ opacity: 1 }} // Override Pressable default opacity feedback
    >
      <Animated.View
        style={[
          style,
          { transform: [{ scale }] },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};
