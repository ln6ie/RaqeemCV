import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCVContext } from '../context/CVContext';
import { WorkExperience } from '../types/cv';
import { GlassInput } from '../components/GlassInput';
import { PremiumCard } from '../components/PremiumCard';
import { sharedStyles } from '../styles/shared.styles';
import { SPACING, getFontFamily } from '../constants/tokens';

export const Step1Experience = () => {
  const {
    cvData, updateWorkExperience, updateWorkExperienceTask,
    addWorkExperienceTask, addWorkExperience, removeWorkExperience,
    theme, isRTL, isDarkMode, t,
  } = useCVContext();

  const rtlRow = isRTL ? { flexDirection: 'row-reverse' as const } : { flexDirection: 'row' as const };
  const textAlign = isRTL ? 'right' : 'left';

  return (
    <View style={{ gap: SPACING.md }}>
      {cvData.workExperience.length === 0 && (
        <PremiumCard
          title={`${t.steps.experience} (0)`}
          isDarkMode={isDarkMode}
          isRTL={isRTL}
        >
          <Text style={{ color: theme.textSecondary, textAlign: 'center', marginVertical: SPACING.lg, fontFamily: getFontFamily(isRTL, 400) }}>
            No experience entries yet. Add one below.
          </Text>
        </PremiumCard>
      )}

      {cvData.workExperience.map((exp, expIdx) => {
        if (expIdx === 0) {
          return (
            <PremiumCard
              key={`exp-card-${expIdx}`}
              title={`${t.steps.experience} (${cvData.workExperience.length})`}
              isDarkMode={isDarkMode}
              isRTL={isRTL}
            >
              <ExpContent exp={exp} expIdx={expIdx} />
            </PremiumCard>
          );
        }

        return (
          <View
            key={`exp-card-${expIdx}`}
            style={[
              isDarkMode
                ? { backgroundColor: 'rgba(255,255,255,0.035)' }
                : {
                    backgroundColor: '#FFFFFF',
                    shadowColor: '#000',
                    shadowOpacity: 0.03,
                    shadowRadius: 20,
                    shadowOffset: { width: 0, height: 6 },
                    elevation: 2,
                  },
              { borderRadius: 24, padding: 24, marginBottom: 16 },
            ]}
          >
            <ExpContent exp={exp} expIdx={expIdx} />
          </View>
        );
      })}

      <TouchableOpacity 
        style={[
          sharedStyles.addButton, 
          { 
            backgroundColor: theme.accent, 
            borderRadius: 14, 
            paddingVertical: 14, 
            shadowColor: theme.accent,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 6,
            elevation: 3,
            marginTop: SPACING.xs,
          }
        ]} 
        onPress={addWorkExperience}
      >
        <View style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap: SPACING.xs }}>
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={[sharedStyles.addButtonText, { color: '#FFFFFF', fontFamily: getFontFamily(isRTL, 800), fontSize: 14 }]}>
            {isRTL ? 'إضافة خبرة مهنية جديدة' : 'Add New Experience'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

function ExpContent({ exp, expIdx }: { exp: WorkExperience; expIdx: number }) {
  const {
    updateWorkExperience, updateWorkExperienceTask,
    addWorkExperienceTask, removeWorkExperience,
    cvData, theme, isRTL, isDarkMode, t,
  } = useCVContext();

  const rtlRow = isRTL ? { flexDirection: 'row-reverse' as const } : { flexDirection: 'row' as const };

  return (
    <View>
      <View style={[rtlRow, { justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md }]}>
        <Text style={{ color: theme.accent, fontSize: 13, fontWeight: '800', letterSpacing: 0.5, textTransform: 'uppercase', fontFamily: getFontFamily(isRTL, 800) }}>
          {isRTL ? `الخبرة المهنية #${expIdx + 1}` : `Work Experience #${expIdx + 1}`}
        </Text>
        {cvData.workExperience.length > 1 && (
          <TouchableOpacity
            style={[sharedStyles.removeButton, { backgroundColor: isDarkMode ? 'rgba(255,69,58,0.15)' : 'rgba(255,59,48,0.08)' }]}
            onPress={() => removeWorkExperience(expIdx)}
          >
            <Ionicons name="trash-outline" size={16} color={theme.error} />
          </TouchableOpacity>
        )}
      </View>

      <GlassInput label={isRTL ? 'المسمى الوظيفي' : 'Job Title'} value={exp.jobTitle} onChangeText={(v: string) => updateWorkExperience(expIdx, 'jobTitle', v)} placeholder={t.placeholders.jobTitle} isDarkMode={isDarkMode} isRTL={isRTL} />
      <GlassInput label={isRTL ? 'الشركة / الموقع' : 'Company / Location'} value={exp.companyLocation} onChangeText={(v: string) => updateWorkExperience(expIdx, 'companyLocation', v)} placeholder={t.placeholders.companyLocation} isDarkMode={isDarkMode} isRTL={isRTL} />
      <GlassInput label={isRTL ? 'الفترة الزمنية' : 'Date Range'} value={exp.dateRange} onChangeText={(v: string) => updateWorkExperience(expIdx, 'dateRange', v)} placeholder={t.placeholders.dateRange} isDarkMode={isDarkMode} isRTL={isRTL} />

      <Text style={{
        color: theme.textSecondary, fontSize: 12, fontWeight: '700', letterSpacing: 0.5,
        marginBottom: SPACING.xs, paddingHorizontal: 4, textTransform: 'uppercase',
        textAlign: isRTL ? 'right' : 'left', fontFamily: getFontFamily(isRTL, 700),
      }}>
        {isRTL ? 'المهام والإنجازات الرئيسية' : 'Main Tasks & Achievements'}
      </Text>

      {exp.mainTasks.map((task: string, taskIdx: number) => (
        <GlassInput key={`t-${expIdx}-${taskIdx}`} label={isRTL ? `المهمة ${taskIdx + 1}` : `Task ${taskIdx + 1}`} value={task}
          onChangeText={(v: string) => updateWorkExperienceTask(expIdx, taskIdx, v)}
          placeholder={t.placeholders.task} isDarkMode={isDarkMode} isRTL={isRTL} multiline numberOfLines={2}
        />
      ))}

      <TouchableOpacity
        style={{ flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', gap: SPACING.xs, paddingVertical: SPACING.sm }}
        onPress={() => addWorkExperienceTask(expIdx)}
      >
        <Ionicons name="add-circle-outline" size={18} color={theme.accent} />
        <Text style={{ color: theme.accent, fontSize: 13, fontWeight: '700', fontFamily: getFontFamily(isRTL, 700) }}>
          {isRTL ? 'إضافة مهمة' : 'Add Task'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
