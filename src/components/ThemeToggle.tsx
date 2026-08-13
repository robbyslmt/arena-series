import { useEffect, useState } from "react";
import { cxs } from "../utils/cn";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("collection-theme", theme);
    } catch {
      /* private mode */
    }
  }, [theme]);

  return (
    <button
      type="button"
      aria-pressed={theme === "light"}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cxs(
        "flex h-9 w-9 items-center justify-center border border-line font-mono text-sm transition-colors duration-200",
        "hover:border-signal hover:text-signal focus-visible:border-signal focus-visible:outline-none"
      )}
    >
      <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
    </button>
  );
}