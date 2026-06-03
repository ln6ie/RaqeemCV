import React, { useState } from 'react';
import {
  View, ScrollView, Text, KeyboardAvoidingView,
  Platform, Animated,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Cairo_400Regular, Cairo_700Bold, Cairo_900Black } from '@expo-google-fonts/cairo';
import { SPACING, getFontFamily } from './src/constants/tokens';
import { CVProvider, useCVContext } from './src/context/CVContext';
import { sharedStyles } from './src/styles/shared.styles';
import { Header } from './src/components/Header';
import { NativeButton } from './src/components/NativeButton';
import { StatusBanner } from './src/components/StatusBanner';
import { Step0Template } from './src/screens/Step0Template';
import { Step0Personal } from './src/screens/Step0Personal';
import { Step1Experience } from './src/screens/Step1Experience';
import { Step2Education } from './src/screens/Step2Education';
import { Step3Export } from './src/screens/Step3Export';
import { SettingsSheet } from './src/components/SettingsSheet';
import { AIPromptSheet } from './src/components/AIPromptSheet';
import { CVManager } from './src/components/CVManager';
import { PDFImporter } from './src/components/PDFImporter';
import { UpdateShield } from './src/components/UpdateShield';

function AppShell() {
  const {
    theme, isDarkMode, isRTL, t, activeStep,
    handleNext, handlePrev, handleOpenSettings, handleOpenAIPrompt, handleOpenCVManager,
    loadSampleCV, isPDFImporterVisible, setIsPDFImporterVisible,
    snackMessage, snackOpacity, snackTranslateY,
  } = useCVContext();

  const insets = useSafeAreaInsets();

  return (
    <View style={[sharedStyles.root, { backgroundColor: theme.background }]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />

      <Header isDarkMode={isDarkMode} onOpenSettings={handleOpenSettings} onOpenAIPrompt={handleOpenAIPrompt} onOpenCVManager={handleOpenCVManager} onLoadSample={loadSampleCV} theme={theme} isRTL={isRTL} t={t} activeStep={activeStep} />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[sharedStyles.flex, { backgroundColor: theme.background }]}>
        <ScrollView
          style={{ backgroundColor: theme.background }}
          contentContainerStyle={{
            paddingTop: 150,
            paddingBottom: insets.bottom + 20 + SPACING.lg + SPACING.md,
            paddingHorizontal: 16,
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <StatusBanner />

          {activeStep === 0 && <Step0Template />}
          {activeStep === 1 && <Step0Personal />}
          {activeStep === 2 && <Step1Experience />}
          {activeStep === 3 && <Step2Education />}
          {activeStep === 4 && <Step3Export />}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={{
        position: 'absolute', bottom: insets.bottom + SPACING.sm,
        right: SPACING.lg, left: SPACING.lg,
        flexDirection: isRTL ? 'row-reverse' : 'row', alignItems: 'center', zIndex: 50, pointerEvents: 'box-none',
      }}>
        {activeStep > 0 && (
          <NativeButton
            onPress={handlePrev}
            systemImage={isRTL ? 'arrow.right' : 'arrow.left'}
            variant="glassProminent"
            style={{
              width: 56,
              height: 56,
              borderRadius: 9999,
              alignItems: 'center',
              justifyContent: 'center',
              borderCurve: 'circular',
            }}
            accessibilityLabel={isRTL ? 'السابق' : 'Previous'}
            color={theme.accent}
          />
        )}
        <View style={{ flex: 1 }} />
        {activeStep < 4 && (
          <NativeButton
            onPress={handleNext}
            systemImage={isRTL ? 'arrow.left' : 'arrow.right'}
            variant="glassProminent"
            style={{
              width: 56,
              height: 56,
              borderRadius: 9999,
              alignItems: 'center',
              justifyContent: 'center',
              borderCurve: 'circular',
            }}
            accessibilityLabel={isRTL ? 'التالي' : 'Next'}
            color={theme.accent}
          />
        )}
      </View>

      {snackMessage && (
        <Animated.View
          style={[sharedStyles.snackPill, {
            top: insets.top + 10, backgroundColor: theme.success,
            opacity: snackOpacity, transform: [{ translateY: snackTranslateY }],
            flexDirection: isRTL ? 'row-reverse' : 'row',
            zIndex: 1001, elevation: 1001,
            justifyContent: 'center',
            gap: 6,
          }]}
          pointerEvents="none"
        >
          <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
          <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600', fontFamily: getFontFamily(isRTL, 600), textAlign: 'center' }} numberOfLines={1}>
            {snackMessage}
          </Text>
        </Animated.View>
      )}

      {/* Render modular settings bottom sheet */}
      <SettingsSheet />
      <AIPromptSheet />
      <CVManager />
      <PDFImporter visible={isPDFImporterVisible} onClose={() => setIsPDFImporterVisible(false)} />
    </View>
  );
}

function AppBoot() {
  const [fontsLoaded, fontError] = useFonts({
    'Cairo': Cairo_400Regular,
    'Cairo-Bold': Cairo_700Bold,
    'Cairo-Black': Cairo_900Black,
  });
  const [showSplash, setShowSplash] = useState(true);

  // Safely fallback to true if there is a font error or if loading takes too long
  return (
    <CVProvider>
      <AppGate fontsLoaded={fontsLoaded || !!fontError} showSplash={showSplash} setShowSplash={setShowSplash} />
    </CVProvider>
  );
}

import { IntroScreen } from './src/screens/IntroScreen';

function AppGate({ fontsLoaded, showSplash, setShowSplash }: { fontsLoaded: boolean; showSplash: boolean; setShowSplash: (v: boolean) => void }) {
  const { themeLoaded, theme, isDarkMode } = useCVContext();
  const activeTheme = isDarkMode ? 'dark' : 'light';

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  const effectiveBg = theme?.background || '#0A0A0C';

  return (
    <View style={{ flex: 1, backgroundColor: effectiveBg }}>
      {themeLoaded && <AppShell />}
      {showSplash && (
        <IntroScreen
          isThemeReady={themeLoaded && fontsLoaded}
          onFinish={handleSplashFinish}
        />
      )}
      {themeLoaded && <UpdateShield />}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppBoot />
    </SafeAreaProvider>
  );
}
