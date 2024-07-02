import { createContext, useContext, useEffect, useState } from "react";

/** Represents a theme. */
type Theme = "dark" | "light" | "system";

/** Props for the ThemeProvider component. */
type ThemeProviderProps = {
  /** The child components to be wrapped by the ThemeProvider. */
  children: React.ReactNode;

  /** The default theme to be used if no theme is stored in local storage. */
  defaultTheme?: Theme;

  /** The key used to store the theme in local storage. */
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/**
 * Custom hook that provides the current theme from the ThemeProvider context.
 *
 * @returns The current theme object.
 * @throws {Error} If used outside of a ThemeProvider.
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

/**
 * Provides a theme to the application.
 *
 * @component
 * @param {ThemeProviderProps} props - The component props.
 */
export default function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
