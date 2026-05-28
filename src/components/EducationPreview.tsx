import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING, TYPOGRAPHY, getFontFamily } from '../constants/tokens';
import { Education } from '../types/cv';

interface EducationPreviewProps {
  education: Education[];
  theme: any;
  isRTL?: boolean;
}

export const EducationPreview = ({ education, theme, isRTL = false }: EducationPreviewProps) => {
  return (
    <>
      {education.map((edu, idx) => {
        const isLast = idx === education.length - 1;
        return (
          <View
            key={`edu-${idx}`}
            style={[
              styles.educationItem,
              { borderBottomColor: theme.cardBorder },
              isLast ? { borderBottomWidth: 0 } : null,
            ]}
          >
            <Text style={[
              styles.eduTitle,
              { color: theme.textPrimary, fontFamily: getFontFamily(isRTL, 700) }
            ]}>
              {edu.degree}
            </Text>
            <Text style={[
              styles.eduDetails,
              { color: theme.textSecondary, fontFamily: getFontFamily(isRTL, 600) }
            ]}>
              {edu.institution} | {edu.year}
            </Text>
            {edu.notes && (
              <Text style={[
                styles.eduNotes,
                { color: theme.textBody, fontFamily: getFontFamily(isRTL, 400) }
              ]}>
                {edu.notes}
              </Text>
            )}
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  educationItem: {
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
  },
  eduTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm + 1,
    fontWeight: '700',
  },
  eduDetails: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: '600',
    marginTop: 2,
  },
  eduNotes: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontStyle: 'italic',
    marginTop: 4,
  },
});
