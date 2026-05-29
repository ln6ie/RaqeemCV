import React from 'react';
import { View, Text, TouchableOpacity, Modal, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCVContext } from '../context/CVContext';
import { sharedStyles } from '../styles/shared.styles';
import { getFontFamily } from '../constants/tokens';
import { SheetHeader } from './SheetHeader';

export const SettingsSheet = () => {
  const {
    isSettingsVisible,
    setIsSettingsVisible,
    isDarkMode,
    setIsDarkMode,
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
          {/* Grabber indicator (pure iOS style) */}
          <View
            style={{
              width: 40,
              height: 5,
              borderRadius: 2.5,
              backgroundColor: isDarkMode ? '#48484A' : '#E5E5EA',
              alignSelf: 'center',
              marginBottom: 20,
            }}
          />

          <SheetHeader title={t.preferences.title} onClose={() => setIsSettingsVisible(false)} isRTL={isRTL} isDarkMode={isDarkMode} theme={theme} />

          <View style={{ marginBottom: 16 }}>
            <View
              style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#E5E5EA',
                borderRadius: 9999,
                padding: 4,
              }}
            >
              {([['light', 'sunny-outline', isRTL ? 'فاتح' : 'Light'],
                ['dark', 'moon-outline', isRTL ? 'داكن' : 'Dark']] as const).map(([mode, icon, label]) => {
                const isActive = isDarkMode === (mode === 'dark');
                return (
                  <TouchableOpacity
                    key={mode}
                    activeOpacity={0.7}
                    style={{
                      flex: 1,
                      flexDirection: isRTL ? 'row-reverse' : 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      paddingVertical: 10,
                      borderRadius: 9999,
                      backgroundColor: isActive ? theme.cardBackground : 'transparent',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: isActive ? 0.08 : 0,
                      shadowRadius: 2,
                      elevation: isActive ? 1 : 0,
                    }}
                    onPress={() => setIsDarkMode(mode === 'dark')}
                  >
                    <Ionicons name={icon} size={16} color={isActive ? theme.accent : theme.textSecondary} />
                    <Text style={{
                      color: isActive ? theme.accent : theme.textSecondary,
                      fontFamily: getFontFamily(isRTL, 800),
                      fontSize: 13,
                    }}>{label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={{ marginBottom: 16 }}>
            <View
              style={{
                flexDirection: isRTL ? 'row-reverse' : 'row',
                backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : '#E5E5EA',
                borderRadius: 9999,
                padding: 4,
              }}
            >
              {([['en', isRTL ? 'إنجليزي' : 'English'],
                ['ar', isRTL ? 'عربي' : 'العربية']] as const).map(([lang, label]) => {
                const isActive = activeLanguage === lang;
                return (
                  <TouchableOpacity
                    key={lang}
                    activeOpacity={0.7}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingVertical: 10,
                      borderRadius: 9999,
                      backgroundColor: isActive ? theme.cardBackground : 'transparent',
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 1 },
                      shadowOpacity: isActive ? 0.08 : 0,
                      shadowRadius: 2,
                      elevation: isActive ? 1 : 0,
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
              })}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
