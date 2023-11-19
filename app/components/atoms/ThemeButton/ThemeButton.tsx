"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

const ThemeButton = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="bg-rose-300/30 p-2 rounded-lg text-rose-300"
    >
      {resolvedTheme === "dark" ? <HiOutlineSun /> : <HiOutlineMoon />}
    </button>
  );
};

export default ThemeButton;
