import React from 'react';
import { View, Text, TouchableOpacity, Modal, Platform, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCVContext } from '../context/CVContext';
import { getFontFamily } from '../constants/tokens';
import { SheetHeader } from './SheetHeader';
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
    <Modal
      visible={isSettingsVisible}
      transparent={Platform.OS === 'android'}
      animationType="slide"
      presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : 'overFullScreen'}
      onRequestClose={() => setIsSettingsVisible(false)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: theme.background,
          justifyContent: Platform.OS === 'ios' ? 'flex-start' : 'flex-end',
        }}
      >
        {/* Render Android only backdrop to allow click outside to close */}
        {Platform.OS === 'android' && (
          <TouchableOpacity
            style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}
            activeOpacity={1}
            onPress={() => setIsSettingsVisible(false)}
          />
        )}

        <View
          style={[
            Platform.OS === 'ios'
              ? {
                  flex: 1,
                  backgroundColor: theme.background,
                  paddingHorizontal: 24,
                  paddingTop: 16,
                }
              : {
                  backgroundColor: theme.cardBackground,
                  borderTopLeftRadius: 28,
                  borderTopRightRadius: 28,
                  paddingHorizontal: 24,
                  paddingVertical: 24,
                  borderWidth: 1,
                  borderColor: theme.cardBorder,
                  borderBottomWidth: 0,
                  width: '100%',
                },
          ]}
        >

          <SheetHeader title={t.preferences.title} onClose={() => setIsSettingsVisible(false)} isRTL={isRTL} isDarkMode={isDarkMode} theme={theme} showGrabber />


          <View style={{ marginBottom: 16 }}>
            {/* Bar: subtle background — no glass, so active pill can pop */}
          <View
              style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                borderRadius: 9999,
                padding: 4,
              }}
            >
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
            <View
              style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                borderRadius: 9999,
                padding: 4,
              }}
            >
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
        </View>
      </View>
    </Modal>
  );
};
