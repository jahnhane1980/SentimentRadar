import { Platform, StatusBar } from 'react-native';

export const Theme = {
  colors: {
    background: '#FFFFFF',
    primaryBlue: '#005bb5',
    secondaryBlue: '#4da6ff',
    textMain: '#000000',
    textSecondary: '#333333',
    disabled: '#D3D3D3',
    anthracite: '#2F2F2F',
    lightGrey: '#F5F5F5',
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
    // Workaround für SafeAreaView auf Android
    statusBarPadding: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  borderRadius: {
    default: 8,
    large: 16,
  },
  typography: {
    // System-Font Mapping
    fontFamilyBold: Platform.select({
      ios: 'System',
      android: 'sans-serif-medium',
    }),
    fontFamilyNormal: Platform.select({
      ios: 'System',
      android: 'sans-serif',
    }),
    fontFamilyLight: Platform.select({
      ios: 'System',
      android: 'sans-serif-light',
    }),
    fontSizeSmall: 12,
    fontSizeMedium: 16,
    fontSizeLarge: 20,
    fontSizeTitle: 28,
    fontWeightBold: '700',
    fontWeightNormal: '400',
  }
};