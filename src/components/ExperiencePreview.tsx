import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SPACING, TYPOGRAPHY, getFontFamily } from '../constants/tokens';
import { WorkExperience } from '../types/cv';

interface ExperiencePreviewProps {
  workExperience: WorkExperience[];
  theme: any;
  isRTL?: boolean;
}

export const ExperiencePreview = ({ workExperience, theme, isRTL = false }: ExperiencePreviewProps) => {
  return (
    <>
      {workExperience.map((exp, idx) => {
        const isLast = idx === workExperience.length - 1;
        return (
          <View
            key={`exp-${idx}`}
            style={[
              styles.experienceItem,
              { borderBottomColor: theme.cardBorder },
              isLast ? { borderBottomWidth: 0 } : null,
            ]}
          >
            <Text style={[
              styles.expTitle,
              { color: theme.textPrimary, fontFamily: getFontFamily(isRTL, 700) }
            ]}>
              {exp.jobTitle}
            </Text>
            <Text style={[
              styles.expDetails,
              { color: theme.textSecondary, fontFamily: getFontFamily(isRTL, 600) }
            ]}>
              {exp.companyLocation} | {exp.dateRange}
            </Text>
            <Text style={[
              styles.expTasks,
              { color: theme.textBody, fontFamily: getFontFamily(isRTL, 500) }
            ]}>
              Tasks: {exp.mainTasks.length} bullet points loaded
            </Text>
          </View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  experienceItem: {
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
  },
  expTitle: {
    fontSize: TYPOGRAPHY.fontSize.sm + 1,
    fontWeight: '700',
  },
  expDetails: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: '600',
    marginTop: 2,
  },
  expTasks: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: '500',
    marginTop: 4,
  },
});
