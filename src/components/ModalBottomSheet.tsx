import React, { useRef, useEffect } from 'react';
import {
  Modal,
  View,
  Platform,
  TouchableOpacity,
  Animated,
  PanResponder,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { SheetHeader } from './SheetHeader';

interface ModalBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  theme: any;
  isDarkMode: boolean;
  isRTL: boolean;
  showGrabber?: boolean;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  height?: any; // Optional custom height for Android card, e.g., '80%'
  keyboardAvoiding?: boolean; // If true, wrap in KeyboardAvoidingView
}

export const ModalBottomSheet = ({
  visible,
  onClose,
  title,
  theme,
  isDarkMode,
  isRTL,
  showGrabber = true,
  headerAction,
  children,
  height,
  keyboardAvoiding = false,
}: ModalBottomSheetProps) => {
  const translateY = useRef(new Animated.Value(0)).current;

  // Reset translateY when visibility changes
  useEffect(() => {
    if (visible) {
      translateY.setValue(0);
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only start drag if dragging downwards
        return gestureState.dy > 5;
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 120 || gestureState.vy > 0.5) {
          Animated.timing(translateY, {
            toValue: 800,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            onClose();
            translateY.setValue(0);
          });
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const content = (
    <View style={{ flex: 1, justifyContent: Platform.OS === 'ios' ? 'flex-start' : 'flex-end' }}>
      {Platform.OS === 'android' && (
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />
        </TouchableOpacity>
      )}

      <Animated.View
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
                paddingTop: 8,
                paddingBottom: 24,
                borderWidth: 0.5,
                borderColor: theme.cardBorder,
                borderBottomWidth: 0,
                width: '100%',
                height: height || undefined,
                transform: [{ translateY }],
              },
        ]}
      >
        <SheetHeader
          title={title}
          onClose={onClose}
          isRTL={isRTL}
          isDarkMode={isDarkMode}
          theme={theme}
          showGrabber={showGrabber}
          headerAction={headerAction}
          panHandlers={Platform.OS === 'android' ? panResponder.panHandlers : undefined}
        />
        {children}
      </Animated.View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent={Platform.OS === 'android'}
      animationType="slide"
      presentationStyle={Platform.OS === 'ios' ? 'pageSheet' : 'overFullScreen'}
      onRequestClose={onClose}
    >
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={{ flex: 1, backgroundColor: Platform.OS === 'ios' ? theme.background : 'transparent' }}
        >
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </Modal>
  );
};
