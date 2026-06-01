import React, { useState } from 'react';
import { View, Text, Image, Alert, Pressable, Dimensions } from 'react-native';
import { BouncyPressable } from '../components/BouncyPressable';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system/legacy';
import { useCVContext } from '../context/CVContext';
import { GlassInput } from '../components/GlassInput';
import { AIServiceSheet } from '../components/AIServiceSheet';
import { SPACING, getFontFamily, BORDER_RADIUS } from '../constants/tokens';
import { PROMPTS } from '../constants/ai';
import { GlassicView } from '../components/Glassic';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const Step0Personal = () => {
  const { cvData, updateField, validationErrors, isDarkMode, isRTL, t, theme, activeLanguage } = useCVContext();
  const [aiSheetVisible, setAiSheetVisible] = useState(false);

  const processSelectedImage = async (uri: string) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      updateField('profileImage', `data:image/jpeg;base64,${base64}`);
    } catch (err) {
      Alert.alert(
        isRTL ? 'خطأ في معالجة الصورة' : 'Image Processing Error',
        isRTL
          ? 'فشل في تحويل الصورة إلى التنسيق المطلوب للسيرة الذاتية.'
          : 'Failed to process the photo into the required CV document format.'
      );
    }
  };

  const handleLaunchLibrary = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          isRTL ? 'مطلوب إذن مكتبة الصور' : 'Photo Library Permission Required',
          isRTL
            ? 'يرجى تمكين الوصول إلى مكتبة الصور من إعدادات جهازك لاختيار صورة شخصية لسيرتك الذاتية.'
            : 'Please enable photo library access in your device settings to select a profile photo for your CV.'
        );
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.75,
      });
      if (result.canceled) return;
      await processSelectedImage(result.assets[0].uri);
    } catch (err) {
      Alert.alert(
        isRTL ? 'خطأ' : 'Error',
        isRTL ? 'فشل في فتح معرض الصور.' : 'Failed to open the photo gallery.'
      );
    }
  };

  const handleShowPicker = () => {
    const options: { text: string; onPress?: () => void; style?: 'default' | 'cancel' | 'destructive' }[] = [
      {
        text: isRTL ? 'اختيار من المعرض' : 'Choose from Gallery',
        onPress: handleLaunchLibrary,
      },
    ];

    if (!!cvData.profileImage) {
      options.push({
        text: isRTL ? 'إزالة الصورة' : 'Remove Photo',
        onPress: () => updateField('profileImage', ''),
        style: 'destructive',
      });
    }

    options.push({
      text: isRTL ? 'إلغاء' : 'Cancel',
      style: 'cancel',
    });

    Alert.alert(
      isRTL ? 'الصورة الشخصية' : 'Profile Photo',
      isRTL ? 'اختر طريقة إضافة الصورة الشخصية' : 'Choose how to add your profile photo',
      options,
    );
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

      {/* Modern Premium Profile Photo Uploader Section */}
      <View style={{ alignItems: 'center', alignSelf: 'center', marginVertical: SPACING.md }}>
        <Pressable
          onPress={() => handleShowPicker()}
          style={({ pressed }) => [
            {
              transform: [{ scale: pressed ? 0.96 : 1 }],
            }
          ]}
        >
          {cvData.profileImage ? (
            <View style={{ position: 'relative' }}>
              <View style={{
                width: 104,
                height: 104,
                borderRadius: 52,
                borderWidth: 2,
                borderColor: theme.accent,
                padding: 3,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isDarkMode ? '#1C1C1E' : '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: isDarkMode ? 0.4 : 0.1,
                shadowRadius: 12,
                elevation: 4,
              }}>
                <Image
                  source={{ uri: cvData.profileImage }}
                  style={{ width: 94, height: 94, borderRadius: 47, backgroundColor: isDarkMode ? '#2C2C2E' : '#E8E8ED' }}
                />
              </View>
              <View style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: theme.accent,
                width: 32,
                height: 32,
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: isDarkMode ? '#0A0A0C' : '#FFFFFF',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 3,
              }}>
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </View>
            </View>
          ) : (
            <GlassicView
              cornerRadius={52}
              glassEffectStyle="regular"
              isDarkMode={isDarkMode}
              style={{
                width: 104,
                height: 104,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1.5,
                borderColor: isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
                elevation: 2,
              }}
            >
              <Ionicons name="camera-outline" size={36} color={theme.accent} />
              <View style={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                backgroundColor: isDarkMode ? '#2C2C2E' : '#E8E8ED',
                width: 28,
                height: 28,
                borderRadius: 14,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
              }}>
                <Ionicons name="add" size={18} color={theme.textPrimary} />
              </View>
            </GlassicView>
          )}
        </Pressable>
        <Text style={{
          fontSize: 12,
          fontWeight: '600',
          color: theme.accent,
          fontFamily: getFontFamily(isRTL, 600),
          marginTop: SPACING.sm,
        }}>
          {cvData.profileImage
            ? (isRTL ? 'تغيير الصورة الشخصية' : 'Change Profile Photo')
            : (isRTL ? 'إضافة صورة شخصية' : 'Add Profile Photo')}
        </Text>
      </View>

      <GlassInput label={t.labels.fullName} value={cvData.fullName} onChangeText={(v: string) => updateField('fullName', v)} placeholder={t.placeholders.fullName} isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['fullName']} tip={t.tips.fullName} />
      <GlassInput label={t.labels.address} value={cvData.address} onChangeText={(v: string) => updateField('address', v)} placeholder={t.placeholders.address} isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['address']} tip={t.tips.address} />
      <GlassInput label={t.labels.phone} value={cvData.phone} onChangeText={(v: string) => updateField('phone', v)} placeholder={t.placeholders.phone} keyboardType="phone-pad" isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['phone']} tip={t.tips.phone} />
      <GlassInput label={t.labels.email} value={cvData.email} onChangeText={(v: string) => updateField('email', v)} placeholder={t.placeholders.email} keyboardType="email-address" autoCapitalize="none" isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['email']} tip={t.tips.email} />
      <GlassInput label={t.labels.summary} value={cvData.summary} onChangeText={(v: string) => updateField('summary', v)} placeholder={t.placeholders.summary} multiline numberOfLines={3} isDarkMode={isDarkMode} isRTL={isRTL} error={validationErrors['summary']} tip={t.tips.summary} />
      
      {cvData.summary.trim() && (
        <BouncyPressable
          onPress={() => setAiSheetVisible(true)}
          pressDepth={0.93}
          haptic
          style={{
            flexDirection: isRTL ? 'row-reverse' : 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            gap: 6,
            paddingVertical: 8,
            paddingHorizontal: 14,
            borderRadius: 9999,
            borderWidth: 1,
            borderColor: theme.accent,
          }}
        >
          <Ionicons name="sparkles" size={14} color={theme.accent} />
          <Text style={{ fontSize: 12, fontWeight: '700', color: theme.accent, fontFamily: getFontFamily(isRTL, 700) }}>
            {isRTL ? 'تحسين بالذكاء الاصطناعي' : 'Improve with AI'}
          </Text>
        </BouncyPressable>
      )}

      {/* AIServiceSheet */}
      <AIServiceSheet
        visible={aiSheetVisible}
        onClose={() => setAiSheetVisible(false)}
        prompt={PROMPTS.summary(cvData.summary, activeLanguage)}
      />

      <AIServiceSheet
        visible={aiSheetVisible}
        onClose={() => setAiSheetVisible(false)}
        prompt={PROMPTS.summary(cvData.summary, activeLanguage)}
      />
    </View>
  );
};