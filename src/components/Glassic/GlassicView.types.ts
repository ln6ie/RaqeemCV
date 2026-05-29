import { ViewStyle } from 'react-native';

export type GlassEffectStyle = 
  | 'regular'
  | 'prominent'
  | 'extraDark'
  | 'light'
  | 'dark'
  | 'ultraThin'
  | 'thin'
  | 'thick';

export interface GlassicViewProps {
  children: React.ReactNode;
  cornerRadius?: number;
  glassEffectStyle?: GlassEffectStyle;
  isInteractive?: boolean;
  tintColor?: string;
  isDarkMode?: boolean;
  style?: ViewStyle;
}
