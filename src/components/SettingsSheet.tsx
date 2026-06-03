import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCVContext } from '../context/CVContext';
import { getFontFamily } from '../constants/tokens';
import { ModalBottomSheet } from './ModalBottomSheet';
import { GlassicView } from './Glassic';
import appJson from '../../app.json';

export const SettingsSheet = () => {
  const {
    isSettingsVisible,
    setIsSettingsVisible,
    isDarkMode,
    themePreference,
    setThemePreference,
    activeLanguage,
    setActiveLanguage,
    setPdfLang,
    theme,
    t,
    isRTL,
  } = useCVContext();

  return (
    <ModalBottomSheet
      visible={isSettingsVisible}
      onClose={() => setIsSettingsVisible(false)}
      title={t.preferences.title}
      theme={theme}
      isDarkMode={isDarkMode}
      isRTL={isRTL}
      showGrabber
    >


          <View style={{ marginBottom: 16 }}>
            <View style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              borderRadius: 9999,
              padding: 4,
            }}>
              {([['light', 'sunny-outline', isRTL ? 'فاتح' : 'Light'],
                ['system', 'phone-portrait-outline', isRTL ? 'النظام' : 'System'],
                ['dark', 'moon-outline', isRTL ? 'داكن' : 'Dark']] as const).map(([mode, icon, label]) => {
                const isActive = themePreference === mode;
                const pillContent = (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                      flexDirection: isRTL ? 'row-reverse' : 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4,
                      paddingVertical: 10,
                      paddingHorizontal: 4,
                      minHeight: 40,
                      borderRadius: 9999,
                    }}
                    onPress={() => setThemePreference(mode)}
                  >
                    <Ionicons name={icon} size={14} color={isActive ? theme.accent : theme.textSecondary} />
                    <Text style={{
                      color: isActive ? theme.accent : theme.textSecondary,
                      fontFamily: getFontFamily(isRTL, 800),
                      fontSize: 12,
                    }} numberOfLines={1} adjustsFontSizeToFit>{label}</Text>
                  </TouchableOpacity>
                );

                return isActive ? (
                  <GlassicView key={mode} cornerRadius={9999} glassEffectStyle="regular" isDarkMode={isDarkMode} style={{ flex: 1 }}>
                    {pillContent}
                  </GlassicView>
                ) : (
                  <View key={mode} style={{ flex: 1 }}>
                    {pillContent}
                  </View>
                );
              })}
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <View style={{
              flexDirection: isRTL ? 'row-reverse' : 'row',
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
              borderRadius: 9999,
              padding: 4,
            }}>
              {([['en', isRTL ? 'إنجليزي' : 'English'],
                ['ar', isRTL ? 'عربي' : 'العربية']] as const).map(([lang, label]) => {
                const isActive = activeLanguage === lang;
                const pillContent = (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 10,
                      paddingHorizontal: 4,
                      minHeight: 40,
                      borderRadius: 9999,
                    }}
                    onPress={() => {
                      setActiveLanguage(lang);
                      setPdfLang(lang);
                    }}
                  >
                    <Text style={{
                      color: isActive ? theme.accent : theme.textSecondary,
                      fontFamily: getFontFamily(isRTL, 800),
                      fontSize: 13,
                    }}>{label}</Text>
                  </TouchableOpacity>
                );

                return isActive ? (
                  <GlassicView key={lang} cornerRadius={9999} glassEffectStyle="regular" isDarkMode={isDarkMode} style={{ flex: 1 }}>
                    {pillContent}
                  </GlassicView>
                ) : (
                  <View key={lang} style={{ flex: 1 }}>
                    {pillContent}
                  </View>
                );
              })}
            </View>
          </View>

          {/* App Info Section */}
          <View style={{ marginTop: 8, alignItems: 'center', gap: 10, paddingBottom: 32 }}>
            <Text style={{
              color: isDarkMode ? '#636366' : '#8E8E93',
              fontFamily: getFontFamily(isRTL, 400),
              fontSize: 13,
              textAlign: 'center',
            }}>
              {isRTL ? `إصدار التطبيق: ${appJson.expo.version}` : `App Version: ${appJson.expo.version}`}
            </Text>

            <Text style={{
              color: isDarkMode ? '#636366' : '#8E8E93',
              fontFamily: getFontFamily(isRTL, 400),
              fontSize: 13,
              textAlign: 'center',
              opacity: 0.7,
            }}>
              {isRTL ? 'برمجة وتطوير: عبدالله كريم' : 'Developed by: Abdullah Kareem'}
            </Text>

            <GlassicView
              cornerRadius={100}
              glassEffectStyle="regular"
              isDarkMode={isDarkMode}
            >
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => Linking.openURL('https://www.instagram.com/elcom.lab/').catch(() => {})}
                style={{
                  flexDirection: isRTL ? 'row-reverse' : 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                }}
              >
              <Ionicons name="logo-instagram" size={16} color={isDarkMode ? '#EBEBF5' : '#3C3C43'} />
              <Text style={{
                color: isDarkMode ? '#EBEBF5' : '#3C3C43',
                fontFamily: getFontFamily(isRTL, 700),
                fontSize: 13,
              }}>
                @elcom.lab
              </Text>
            </TouchableOpacity>
            </GlassicView>
          </View>
    </ModalBottomSheet>
  );
};
