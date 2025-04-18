import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type Theme = 'light' | 'dark' | 'system';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Get initial theme from localStorage or default to 'system'
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      return savedTheme || 'system';
    }
    return 'system';
  });

  // Track whether dark mode is active (either via theme or system preference)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Effect to handle theme changes and system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Update theme based on current settings
    const updateTheme = () => {
      const isDark = theme === 'system' ? mediaQuery.matches : theme === 'dark';
      setIsDarkMode(isDark);
      updateDocumentClass(isDark);
    };

    // Set initial value
    updateTheme();

    // Listen for system preference changes
    if (theme === 'system') {
      mediaQuery.addEventListener('change', updateTheme);
      return () => mediaQuery.removeEventListener('change', updateTheme);
    }
  }, [theme]);

  // Helper function to update document class
  const updateDocumentClass = (isDark: boolean) => {
    console.log('Updating dark mode:', isDark);
    // Force a small delay to ensure the DOM is ready
    setTimeout(() => {
      if (isDark) {
        document.documentElement.classList.add('dark');
        console.log('Added dark class');
      } else {
        document.documentElement.classList.remove('dark');
        console.log('Removed dark class');
      }
      // Log the current state of the HTML element
      console.log('Current HTML classes:', document.documentElement.className);
    }, 0);
  };

  // Toggle between light and dark (ignoring system)
  const toggleTheme = () => {
    console.log(
      'Toggle theme called, current theme:',
      theme,
      'isDarkMode:',
      isDarkMode,
    );
    setTheme((prevTheme) => {
      const newTheme =
        prevTheme === 'light'
          ? 'dark'
          : prevTheme === 'dark'
            ? 'light'
            : isDarkMode
              ? 'light'
              : 'dark';
      console.log('Changing theme from', prevTheme, 'to', newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
