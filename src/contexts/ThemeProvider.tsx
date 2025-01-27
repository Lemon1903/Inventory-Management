/**
 * Program Title: ThemeProvider.tsx
 * Programmers: Khent Alba
 * 
 * Where the program fits in the general software design:
 * - This file is a component that provides a theme to the application.
 * 
 * Date written and revised:
 * - Written: July 17, 2024
 * - Revised: January 26, 2025
 * 
 * Purpose:
 * - The purpose of this component is to provide dark and light themes to the application.
 * 
 * Data Structures used:
 * - Theme type ("dark" | "light" | "system") to represent possible themes.
 * - ThemeProviderState object with theme and setTheme properties.
 * - ThemeProviderContext created using React's createContext.
 * 
 * Algorithms used:
 * - Initialization of the theme state by retrieving the value from localStorage or falling 
 * back to defaultTheme.
 * - Logic to dynamically add or remove theme classes ("light" or "dark") to the HTML root 
 * element based on the theme state.
 * - Conditional theme detection when theme is "system", using window.matchMedia to check 
 * for the system's color scheme.
 * 
 * Control:
 * - State management using useState for the current theme.
 * - Side effects managed with useEffect for updating the DOM and applying the appropriate theme class.
 * - Event-driven updates via the setTheme function, which updates localStorage and the 
 * state simultaneously.
 */

import { createContext, useContext, useEffect, useState } from "react";

/** Represents a theme. */
export type Theme = "dark" | "light" | "system";

/** Props for the ThemeProvider component. */
export type ThemeProviderProps = {
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
