import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActionSheetIOS,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Cairo_400Regular, Cairo_700Bold, Cairo_900Black } from '@expo-google-fonts/cairo';
import { COLORS, getFontFamily } from './src/constants/tokens';
import { translations } from './src/constants/translations';
import { useCV } from './src/hooks/useCV';
import { GlassInput } from './src/components/GlassInput';
import { StatusBanner } from './src/components/StatusBanner';
import { Header } from './src/components/Header';
import { SectionCard } from './src/components/SectionCard';
import { ExperiencePreview } from './src/components/ExperiencePreview';
import { Splash } from './src/components/Splash';
import { Education } from './src/types/cv';
import { styles } from './src/styles/app.styles';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pdfLang, setPdfLang] = useState<'en' | 'ar'>('en');
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'ar'>('en');
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  useFonts({
    'Cairo': Cairo_400Regular,
    'Cairo-Bold': Cairo_700Bold,
    'Cairo-Black': Cairo_900Black,
  });

  const isRTL = activeLanguage === 'ar';
  const t = translations[activeLanguage];
  const theme = isDarkMode ? COLORS.app.dark : COLORS.app.light;

  const {
    cvData,
    updateField,
    updateSkillsString,
    updateCoursesString,
    validationErrors,
    isLoading,
    systemError,
    handleGeneratePDF,
  } = useCV();

  if (showSplash) {
    return <Splash onFinish={() => setShowSplash(false)} />;
  }

  const activeSkillsText = cvData.skills.join(', ');
  const activeCoursesText = cvData.courses.join(', ');

  const handleUpdateEducation = (field: keyof Education, val: string) => {
    const list = [...cvData.education];
    if (list[0]) {
      list[0] = { ...list[0], [field]: val };
      updateField('education', list);
    }
  };

  const handleUpdateLanguage = (idx: number, level: string) => {
    const list = [...cvData.languages];
    if (list[idx]) {
      list[idx] = { ...list[idx], level };
      updateField('languages', list);
    }
  };

  const handleOpenSettings = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [
            t.actionSheet.cancel,
            t.actionSheet.toggleTheme,
            t.actionSheet.pdfEnglish,
            t.actionSheet.pdfArabic,
          ],
          cancelButtonIndex: 0,
          title: 'CV Builder Preferences',
          message: 'Configure your layout settings',
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            setIsDarkMode((prev) => !prev);
          } else if (buttonIndex === 2) {
            setPdfLang('en');
            setActiveLanguage('en');
          } else if (buttonIndex === 3) {
            setPdfLang('ar');
            setActiveLanguage('ar');
          }
        }
      );
    } else {
      setIsSettingsVisible(true);
    }
  };

  const rtlRow = isRTL
    ? { flexDirection: 'row-reverse' as const }
    : { flexDirection: 'row' as const };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <Header
          isDarkMode={isDarkMode}
          onOpenSettings={handleOpenSettings}
          theme={theme}
          isRTL={isRTL}
          t={t}
        />

        <View style={[styles.stepperTrack, rtlRow]}>
          {[0, 1, 2, 3].map((stepIdx) => (
            <View
              key={stepIdx}
              style={[
                styles.stepIndicator,
                {
                  backgroundColor:
                    stepIdx <= activeStep ? theme.textPrimary : theme.borderMuted,
                },
              ]}
            />
          ))}
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <StatusBanner isDarkMode={isDarkMode} isLoading={isLoading} error={systemError} isRTL={isRTL} translations={t.status} />

          {activeStep === 0 && (
            <SectionCard title={t.steps.personal} theme={theme} isRTL={isRTL}>
              <GlassInput
                label={t.labels.fullName}
                value={cvData.fullName}
                onChangeText={(val: string) => updateField('fullName', val)}
                placeholder={t.labels.fullName}
                isDarkMode={isDarkMode}
                isRTL={isRTL}
                error={validationErrors['fullName']}
              />
              <GlassInput
                label={t.labels.address}
                value={cvData.address}
                onChangeText={(val: string) => updateField('address', val)}
                placeholder={t.labels.address}
                isDarkMode={isDarkMode}
                isRTL={isRTL}
                error={validationErrors['address']}
              />
              <GlassInput
                label={t.labels.phone}
                value={cvData.phone}
                onChangeText={(val: string) => updateField('phone', val)}
                placeholder={t.labels.phone}
                keyboardType="phone-pad"
                isDarkMode={isDarkMode}
                isRTL={isRTL}
                error={validationErrors['phone']}
              />
              <GlassInput
                label={t.labels.email}
                value={cvData.email}
                onChangeText={(val: string) => updateField('email', val)}
                placeholder={t.labels.email}
                keyboardType="email-address"
                autoCapitalize="none"
                isDarkMode={isDarkMode}
                isRTL={isRTL}
                error={validationErrors['email']}
              />
              <GlassInput
                label={t.labels.summary}
                value={cvData.summary}
                onChangeText={(val: string) => updateField('summary', val)}
                placeholder={t.labels.summary}
                multiline
                numberOfLines={3}
                isDarkMode={isDarkMode}
                isRTL={isRTL}
                error={validationErrors['summary']}
              />
            </SectionCard>
          )}

          {activeStep === 1 && (
            <SectionCard
              title={`${t.steps.experience} (${cvData.workExperience.length} items)`}
              theme={theme}
              isRTL={isRTL}
            >
              <ExperiencePreview workExperience={cvData.workExperience} theme={theme} isRTL={isRTL} />
            </SectionCard>
          )}

          {activeStep === 2 && (
            <View>
              <SectionCard title={t.steps.education} theme={theme} isRTL={isRTL}>
                <GlassInput
                  label={t.labels.degree}
                  value={cvData.education[0]?.degree || ''}
                  onChangeText={(val: string) => handleUpdateEducation('degree', val)}
                  placeholder={t.labels.degree}
                  isDarkMode={isDarkMode}
                  isRTL={isRTL}
                />
                <GlassInput
                  label={t.labels.institution}
                  value={cvData.education[0]?.institution || ''}
                  onChangeText={(val: string) => handleUpdateEducation('institution', val)}
                  placeholder={t.labels.institution}
                  isDarkMode={isDarkMode}
                  isRTL={isRTL}
                />
                <GlassInput
                  label={t.labels.graduationYear}
                  value={cvData.education[0]?.year || ''}
                  onChangeText={(val: string) => handleUpdateEducation('year', val)}
                  placeholder={t.labels.graduationYear}
                  isDarkMode={isDarkMode}
                  isRTL={isRTL}
                />
                <GlassInput
                  label={t.labels.honors}
                  value={cvData.education[0]?.notes || ''}
                  onChangeText={(val: string) => handleUpdateEducation('notes', val)}
                  placeholder={t.labels.honors}
                  isDarkMode={isDarkMode}
                  isRTL={isRTL}
                />
              </SectionCard>
              <SectionCard title={t.steps.skills} theme={theme} isRTL={isRTL}>
                <GlassInput
                  label={t.labels.skills}
                  value={activeSkillsText}
                  onChangeText={updateSkillsString}
                  placeholder={t.labels.skills}
                  isDarkMode={isDarkMode}
                  isRTL={isRTL}
                />
                <GlassInput
                  label={t.labels.courses}
                  value={activeCoursesText}
                  onChangeText={updateCoursesString}
                  placeholder={t.labels.courses}
                  isDarkMode={isDarkMode}
                  isRTL={isRTL}
                />
              </SectionCard>
            </View>
          )}

          {activeStep === 3 && (
            <View>
              <SectionCard title={t.steps.language} theme={theme} isRTL={isRTL}>
                <GlassInput
                  label={t.labels.arabicLevel}
                  value={cvData.languages[0]?.level || ''}
                  onChangeText={(val: string) => handleUpdateLanguage(0, val)}
                  placeholder={t.labels.arabicLevel}
                  isDarkMode={isDarkMode}
                  isRTL={isRTL}
                />
                <GlassInput
                  label={t.labels.englishLevel}
                  value={cvData.languages[1]?.level || ''}
                  onChangeText={(val: string) => handleUpdateLanguage(1, val)}
                  placeholder={t.labels.englishLevel}
                  isDarkMode={isDarkMode}
                  isRTL={isRTL}
                />
              </SectionCard>

              <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: theme.buttonBackground }]}
                activeOpacity={0.85}
                onPress={() => handleGeneratePDF(isDarkMode, pdfLang)}
                disabled={isLoading}
              >
                <Text style={[
                  styles.primaryButtonText,
                  { color: theme.buttonText, fontFamily: getFontFamily(isRTL, 800) }
                ]}>
                  {isLoading ? t.buttons.generating : t.buttons.export}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={[styles.navRow, rtlRow]}>
            {activeStep > 0 && (
              <TouchableOpacity
                style={[styles.navButton, { backgroundColor: theme.borderMuted }]}
                onPress={() => setActiveStep((prev) => prev - 1)}
              >
                <Text style={[
                  styles.navButtonText,
                  { color: theme.textSecondary, fontFamily: getFontFamily(isRTL, 800) }
                ]}>
                  {t.buttons.back}
                </Text>
              </TouchableOpacity>
            )}
            {activeStep < 3 && (
              <TouchableOpacity
                style={[styles.navButton, { backgroundColor: theme.buttonBackground, flex: 1 }]}
                onPress={() => setActiveStep((prev) => prev + 1)}
              >
                <Text style={[
                  styles.navButtonText,
                  { color: theme.buttonText, fontFamily: getFontFamily(isRTL, 800) }
                ]}>
                  {t.buttons.next}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal
        visible={isSettingsVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsSettingsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setIsSettingsVisible(false)}
        >
          <View
            style={[
              styles.actionSheetContainer,
              { backgroundColor: theme.cardBackground, borderColor: theme.cardBorder },
            ]}
          >
            <Text style={[
              styles.sheetTitle,
              { color: theme.textPrimary, fontFamily: getFontFamily(isRTL, 800) }
            ]}>
              {t.preferences.title}
            </Text>
            <TouchableOpacity
              style={[styles.sheetButton, { backgroundColor: theme.inputBackground }]}
              onPress={() => setIsDarkMode((prev) => !prev)}
            >
              <Text style={[
                styles.sheetButtonText,
                { color: theme.textPrimary, fontFamily: getFontFamily(isRTL, 700) }
              ]}>
                {t.preferences.toggleTheme}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sheetButton, { backgroundColor: theme.inputBackground }]}
              onPress={() => {
                const nextLang = activeLanguage === 'en' ? 'ar' : 'en';
                setActiveLanguage(nextLang);
                setPdfLang(nextLang);
              }}
            >
              <Text style={[
                styles.sheetButtonText,
                { color: theme.textPrimary, fontFamily: getFontFamily(isRTL, 700) }
              ]}>
                {isRTL ? t.preferences.pdfLangAr : t.preferences.pdfLang}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: theme.buttonBackground }]}
              onPress={() => setIsSettingsVisible(false)}
            >
              <Text style={[
                styles.cancelButtonText,
                { color: theme.buttonText, fontFamily: getFontFamily(isRTL, 800) }
              ]}>
                {t.buttons.close}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
