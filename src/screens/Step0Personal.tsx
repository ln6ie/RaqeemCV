import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { NativeButton } from '../components/NativeButton';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { useCVContext } from '../context/CVContext';
import { GlassInput } from '../components/GlassInput';
import { AIServiceSheet } from '../components/AIServiceSheet';
import { SPACING, getFontFamily } from '../constants/tokens';
import { PROMPTS } from '../constants/ai';

export const Step0Personal = () => {
  const { cvData, updateField, validationErrors, isDarkMode, isRTL, t, theme, activeLanguage } = useCVContext();
  const [aiSheetVisible, setAiSheetVisible] = useState(false);

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission Required', 'Camera roll access is needed to select a profile photo.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (result.canceled) return;
    const uri = result.assets[0].uri;
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      updateField('profileImage', `data:image/jpeg;base64,${base64}`);
    } catch {
      Alert.alert('Error', 'Failed to process the selected image.');
    }
  };

  return (
    <View style={{ gap: SPACING.md }}>
      <Text style={{
        color: theme.textPrimary,
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: -0.3,
        textAlign: isRTL ? 'right' : 'left',
        fontFamily: getFontFamily(isRTL, 700),
      }}>
        {t.steps.personal}
      </Text>

      <TouchableOpacity onPress={handlePickImage} activeOpacity={0.75} style={{ alignItems: 'center', alignSelf: 'center' }}>
        {cvData.profileImage ? (
          <Image
            source={{ uri: cvData.profileImage }}
            style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: isDarkMode ? '#1C1C1E' : '#E8E8ED' }}
          />
        ) : (
          <View style={{
            width: 100, height: 100, borderRadius: 50,
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(60,60,67,0.06)',
            alignItems: 'center', justifyContent: 'center',
            borderWidth: 1,
            borderColor: isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(60,60,67,0.08)',
          }}>
            <Ionicons name="camera" size={32} color={theme.textSecondary} />
          </View>
        )}
      </TouchableOpacity>

      <GlassInput label={t.labels.fullName} value={cvData.fullName} onChangeText={(v: string) => updateField('fullName', v)} placeholder={t.placeholders.fullName} isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['fullName']} tip={t.tips.fullName} />
      <GlassInput label={t.labels.address} value={cvData.address} onChangeText={(v: string) => updateField('address', v)} placeholder={t.placeholders.address} isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['address']} tip={t.tips.address} />
      <GlassInput label={t.labels.phone} value={cvData.phone} onChangeText={(v: string) => updateField('phone', v)} placeholder={t.placeholders.phone} keyboardType="phone-pad" isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['phone']} tip={t.tips.phone} />
      <GlassInput label={t.labels.email} value={cvData.email} onChangeText={(v: string) => updateField('email', v)} placeholder={t.placeholders.email} keyboardType="email-address" autoCapitalize="none" isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['email']} tip={t.tips.email} />
      <GlassInput label={t.labels.summary} value={cvData.summary} onChangeText={(v: string) => updateField('summary', v)} placeholder={t.placeholders.summary} multiline numberOfLines={3} isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['summary']} tip={t.tips.summary} />
      {cvData.summary.trim() && (
        <NativeButton
          onPress={() => setAiSheetVisible(true)}
          variant="glassProminent"
          color={theme.accent}
          style={{
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            paddingVertical: 10,
            paddingHorizontal: 16,
            borderRadius: 9999,
          }}
        >
          <Ionicons name="sparkles" size={16} color={theme.accent} />
          <Text style={{ fontSize: 13, fontWeight: '700', color: theme.accent, fontFamily: getFontFamily(isRTL, 700) }}>
            {isRTL ? 'حسّن الملخص بالذكاء الاصطناعي' : 'Improve Summary with AI'}
          </Text>
        </NativeButton>
      )}
      <AIServiceSheet
        visible={aiSheetVisible}
        onClose={() => setAiSheetVisible(false)}
        prompt={PROMPTS.summary(cvData.summary, activeLanguage)}
      />
    </View>
  );
};