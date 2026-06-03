import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCVContext } from '../context/CVContext';
import { getFontFamily } from '../constants/tokens';
import { ModalBottomSheet } from './ModalBottomSheet';

import { LargeTextEditorSheetProps } from '../types/components';

export const LargeTextEditorSheet = ({
  visible,
  onClose,
  label,
  value,
  onSave,
  placeholder,
}: LargeTextEditorSheetProps) => {
  const { theme, isRTL, isDarkMode } = useCVContext();
  const [tempValue, setTempValue] = useState(value);

  // Sync state when sheet opens
  React.useEffect(() => {
    if (visible) {
      setTempValue(value);
    }
  }, [visible, value]);

  const handleSave = () => {
    onSave(tempValue);
    onClose();
  };

  return (
    <ModalBottomSheet
      visible={visible}
      onClose={onClose}
      title={label}
      theme={theme}
      isDarkMode={isDarkMode}
      isRTL={isRTL}
      showGrabber
      height="80%"
      keyboardAvoiding
      headerAction={
        <TouchableOpacity
          onPress={handleSave}
          activeOpacity={0.8}
          style={{
            width: 40,
            height: 40,
            borderRadius: 9999,
            backgroundColor: theme.accent,
            alignItems: 'center',
            justifyContent: 'center',
            marginEnd: 12,
          }}
        >
          <Ionicons name="checkmark-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      }
    >


          {/* Text Area Card - borderless, stretches to margins naturally */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={{
                flex: 1,
                minHeight: 180,
                paddingVertical: 12,
                paddingHorizontal: 4,
              }}
            >
              <TextInput
                value={tempValue}
                onChangeText={setTempValue}
                placeholder={placeholder || label}
                placeholderTextColor={isDarkMode ? '#636366' : '#C7C7CC'}
                multiline
                autoFocus
                textAlignVertical="top"
                style={{
                  flex: 1,
                  color: theme.textBody,
                  fontSize: 17,
                  lineHeight: 25,
                  fontFamily: getFontFamily(isRTL, 400),
                  textAlign: isRTL ? 'right' : 'left',
                }}
              />
            </View>
          </ScrollView>


    </ModalBottomSheet>
  );
};
