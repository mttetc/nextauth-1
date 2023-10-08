import { createContext, useContext } from "react";

export type Theme = "light" | "dark";

export type ThemeContextProps = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextProps | null>(null);
export const ThemeContextProvider = ThemeContext.Provider;

export const useThemeProviderContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error(
            "useThemeProviderContext must be used within a ThemeProvider"
        );
    }
    return context;
};
