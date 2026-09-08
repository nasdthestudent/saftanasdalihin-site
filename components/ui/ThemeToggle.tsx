"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return <div className="h-6 w-6" />;
  }

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle Dark Mode"
      className="rounded-full p-2 transition-colors duration-300 hover:bg-secondary active:scale-95"
    >
      {isDark ? (
        <FiSun size={20} className="text-foreground/70" />
      ) : (
        <FiMoon size={20} className="text-foreground/70" />
      )}
    </button>
  );
}