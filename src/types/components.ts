import { TextInputProps } from 'react-native';
import { ThemeColors } from './theme';

export interface GlassInputProps extends TextInputProps {
  label: string;
  isDarkMode: boolean;
  error?: string;
  isRTL?: boolean;
}

export interface ExportButtonProps {
  theme: ThemeColors;
  isRTL: boolean;
  t: any;
  exportStatus: 'idle' | 'generating' | 'completed';
  onPress: () => void;
  onReShare: () => void;
}


export interface LargeTextEditorSheetProps {
  visible: boolean;
  value: string;
  label: string;
  onSave: (val: string) => void;
  onClose: () => void;
  placeholder?: string;
}
