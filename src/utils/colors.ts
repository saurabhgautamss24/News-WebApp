
export const colors = {
  
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb', 
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  
 
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  
  
  background: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    tertiary: '#f3f4f6',
  },
  
  
  text: {
    primary: '#111827',
    secondary: '#4b5563',
    muted: '#6b7280',
    disabled: '#9ca3af',
  },
  
  
  border: {
    light: '#e5e7eb',
    medium: '#d1d5db',
    dark: '#9ca3af',
  }
} as const;


export const cssVariables = {
  '--color-primary': colors.primary[600],
  '--color-primary-hover': colors.primary[700],
  '--color-text-primary': colors.text.primary,
  '--color-text-secondary': colors.text.secondary,
  '--color-text-muted': colors.text.muted,
  '--color-background': colors.background.primary,
  '--color-background-secondary': colors.background.secondary,
  '--color-border': colors.border.light,
} as const;


export function getColor(colorKey: string, fallback?: string): string {
 
  const colorMap: Record<string, string> = {
    'primary.600': colors.primary[600],
    'primary.700': colors.primary[700],
    'gray.100': colors.gray[100],
    'gray.200': colors.gray[200],
    'gray.400': colors.gray[400],
    'gray.500': colors.gray[500],
    'gray.600': colors.gray[600],
    'text.primary': colors.text.primary,
    'text.secondary': colors.text.secondary,
    'text.muted': colors.text.muted,
    'background.primary': colors.background.primary,
    'success': colors.success,
    'error': colors.error,
    'warning': colors.warning,
  };
  
  return colorMap[colorKey] || fallback || '#000000';
}


export function applyConsistentColors(element: HTMLElement, colorMap: Record<string, string>) {
  Object.entries(colorMap).forEach(([property, color]) => {
    element.style.setProperty(property, color);
  });
} 