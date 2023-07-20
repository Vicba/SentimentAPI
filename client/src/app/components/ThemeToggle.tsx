import { useEffect, useState } from "react";

import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>("dark");

  useEffect(() => {
    let storedTheme = localStorage.getItem("theme");

    if (!storedTheme) {
      localStorage.setItem("theme", theme);
    } else {
      setTheme(theme);

      storedTheme === "light"
        ? document.querySelector("html")?.classList.remove("dark")
        : null;
      storedTheme === "dark"
        ? document.querySelector("html")?.classList.add("dark")
        : null;
    }
  }, [theme]);

  const toggleTheme = (theme: string) => {
    let newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    newTheme === "light"
      ? document.querySelector("html")?.classList.remove("dark")
      : document.querySelector("html")?.classList.add("dark");
  };

  return (
    <button
      className="p-2 rounded-md bg-transparent hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
      onClick={() => toggleTheme(theme)}
    >
      {theme === "light" && (
        <FiSun className="text-black w-6 h-6 xs:w-5 xs:h-5" />
      )}
      {theme === "dark" && (
        <FiMoon className="text-white w-6 h-6 xs:w-5 xs:h-5" />
      )}
    </button>
  );
}
