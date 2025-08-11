export const theme = {
  colors: {
    background: '#0A0A0A',
    surface: '#121212',
    card: '#1E1E1E',
    primary: '#4ADE80',
    secondary: '#06B6D4',
    accent: '#8B5CF6',
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
    textPrimary: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textTertiary: '#808080',
    border: '#2A2A2A',
    white: '#FFFFFF',
    // Category colors
    javascript: '#F7DF1E',
    react: '#61DAFB',
    reactNative: '#00D8FF',
    systemDesign: '#FF6B6B',
    dsa: '#4ECDC4',
    machineCoding: '#45B7D1',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold' as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
    },
    h4: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 24,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    small: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
    },
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.35,
      shadowRadius: 6.27,
      elevation: 12,
    },
  },
};

export type Theme = typeof theme; 