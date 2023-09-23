"use client";

import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { Theme, ThemeContextProvider } from "./hooks/useThemeProviderContext";
import { ToastContainer } from "react-toastify";

const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<Theme>("dark");

    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");

        document
            .querySelector("html")
            ?.setAttribute("data-theme", localTheme || "dark");
    }, [theme]);

    const contextValues = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme, setTheme]
    );

    return (
        <ThemeContextProvider value={contextValues}>
            {children}
            <ToastContainer theme={theme} />
        </ThemeContextProvider>
    );
};

export default ThemeProvider;
