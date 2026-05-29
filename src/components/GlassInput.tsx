import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, TYPOGRAPHY, getFontFamily } from '../constants/tokens';
import { LargeTextEditorSheet } from './LargeTextEditorSheet';
import { GlassInputProps } from '../types/components';
import { GlassicView } from './Glassic';

// Smart radius rule (matches Apple design):
// - Single-line fields → full pill (9999) — compact height
// - Multi-line fields  → moderate radius (20) — rectangular feel
const RADIUS_SINGLE = 99999;
const RADIUS_MULTI = 20;

export const GlassInput = ({
  label,
  isDarkMode,
  error,
  isRTL = false,
  style,
  multiline,
  numberOfLines,
  value = '',
  onChangeText,
  placeholder,
  inlineMultiline,
  ...props
}: GlassInputProps) => {
  const theme = isDarkMode ? COLORS.app.dark : COLORS.app.light;
  const [editorVisible, setEditorVisible] = useState(false);

  // ── Tap-to-expand multiline (sheet editor) ─────────────────────
  if (multiline && !inlineMultiline) {
    return (
      <View style={styles.container}>
        <Text style={[
          styles.label,
          { color: theme.textSecondary, textAlign: isRTL ? 'right' : 'left', fontFamily: getFontFamily(isRTL, 600) }
        ]}>
          {label}
        </Text>

        <GlassicView
          cornerRadius={RADIUS_MULTI}
          glassEffectStyle="regular"
          isDarkMode={isDarkMode}
          style={error ? { borderWidth: 1, borderColor: theme.error } : undefined}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setEditorVisible(true)}
            style={styles.inputPaddingMultiline}
          >
            <Text
              numberOfLines={4}
              style={{
                color: value ? theme.textBody : (isDarkMode ? '#636366' : '#C7C7CC'),
                fontSize: TYPOGRAPHY.fontSize.md,
                lineHeight: 22,
                fontFamily: getFontFamily(isRTL, 400),
                textAlign: isRTL ? 'right' : 'left',
              }}
            >
              {value || placeholder || label}
            </Text>

            <Ionicons
              name="expand-outline"
              size={14}
              color={theme.textSecondary}
              style={{ position: 'absolute', bottom: 8, right: isRTL ? undefined : 12, left: isRTL ? 12 : undefined }}
            />
          </TouchableOpacity>
        </GlassicView>

        {error && (
          <View style={[styles.errorRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Ionicons name="alert-circle" size={14} color={theme.error} />
            <Text style={[
              styles.errorText,
              { color: theme.error, textAlign: isRTL ? 'right' : 'left', fontFamily: getFontFamily(isRTL, 400) }
            ]}>
              {error}
            </Text>
          </View>
        )}

        <LargeTextEditorSheet
          visible={editorVisible}
          onClose={() => setEditorVisible(false)}
          label={label}
          value={value}
          placeholder={placeholder}
          onSave={(text) => {
            if (onChangeText) {
              onChangeText(text);
            }
          }}
        />
      </View>
    );
  }

  // ── Inline multiline (TextInput rendered directly) ──────────────
  if (multiline && inlineMultiline) {
    return (
      <View style={styles.container}>
        <Text style={[
          styles.label,
          { color: theme.textSecondary, textAlign: isRTL ? 'right' : 'left', fontFamily: getFontFamily(isRTL, 600) }
        ]}>
          {label}
        </Text>

        <GlassicView
          cornerRadius={RADIUS_MULTI}
          glassEffectStyle="regular"
          isDarkMode={isDarkMode}
          style={error ? { borderWidth: 1, borderColor: theme.error } : undefined}
        >
          <View style={styles.inputPaddingMultiline}>
            <TextInput
              multiline
              numberOfLines={numberOfLines || 8}
              placeholderTextColor={isDarkMode ? '#636366' : '#C7C7CC'}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              textAlignVertical="top"
              style={[
                styles.input,
                {
                  backgroundColor: 'transparent',
                  color: theme.textBody,
                  textAlign: isRTL ? 'right' : 'left',
                  fontFamily: getFontFamily(isRTL, 400),
                  paddingVertical: 12,
                },
                style,
              ]}
              {...props}
            />
          </View>
        </GlassicView>

        {error && (
          <View style={[styles.errorRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
            <Ionicons name="alert-circle" size={14} color={theme.error} />
            <Text style={[
              styles.errorText,
              { color: theme.error, textAlign: isRTL ? 'right' : 'left', fontFamily: getFontFamily(isRTL, 400) }
            ]}>
              {error}
            </Text>
          </View>
        )}
      </View>
    );
  }

  // ── Single-line field ───────────────────────────────────────────
  return (
    <View style={styles.container}>
      <Text style={[
        styles.label,
        { color: theme.textSecondary, textAlign: isRTL ? 'right' : 'left', fontFamily: getFontFamily(isRTL, 600) }
      ]}>
        {label}
      </Text>

      <GlassicView
        cornerRadius={RADIUS_SINGLE}
        glassEffectStyle="regular"
        isDarkMode={isDarkMode}
        style={error ? { borderWidth: 1, borderColor: theme.error } : undefined}
      >
        <View style={styles.inputPadding}>
          <TextInput
            placeholderTextColor={isDarkMode ? '#636366' : '#C7C7CC'}
            textAlignVertical="center"
            style={[
              styles.input,
              {
                backgroundColor: 'transparent',
                color: theme.textBody,
                textAlign: isRTL ? 'right' : 'left',
                fontFamily: getFontFamily(isRTL, 400),
              },
              style,
            ]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            {...props}
          />
        </View>
      </GlassicView>

      {error && (
        <View style={[styles.errorRow, { flexDirection: isRTL ? 'row-reverse' : 'row' }]}>
          <Ionicons name="alert-circle" size={14} color={theme.error} />
          <Text style={[
            styles.errorText,
            { color: theme.error, textAlign: isRTL ? 'right' : 'left', fontFamily: getFontFamily(isRTL, 400) }
          ]}>
            {error}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
    width: '100%',
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: '600',
    marginBottom: SPACING.xs,
    paddingLeft: SPACING.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Single-line: compact pill — 8px top/bottom gives ~42px total height
  inputPadding: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  // Multiline: roomier, standard padding
  inputPaddingMultiline: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    minHeight: 80,
  },
  input: {
    fontSize: TYPOGRAPHY.fontSize.md,
    padding: 0,
    lineHeight: 22,
  },
  errorRow: {
    alignItems: 'center',
    gap: 4,
    marginTop: SPACING.xs,
    paddingLeft: SPACING.xs,
  },
  errorText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: '500',
    flexShrink: 1,
  },
});
