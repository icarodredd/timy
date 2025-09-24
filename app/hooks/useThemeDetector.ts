import { useState, useEffect } from "react";

function useThemeDetector() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>();

  useEffect(() => {
    const getCurrentTheme = () =>
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkTheme(getCurrentTheme());
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event: MediaQueryListEvent) =>
      setIsDarkTheme(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isDarkTheme;
}

export default useThemeDetector;
