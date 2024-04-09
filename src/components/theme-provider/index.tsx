import type React from "react"
import { createContext, useState } from "react"

type ThemeContextType = {
  theme: "dark" | "light"
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => null,
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const storedTheme = localStorage.getItem("theme")
  const currentTheme = storedTheme ? (storedTheme as "dark" | "light") : "dark"
  const [theme, setTheme] = useState(currentTheme)

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const theme = prevTheme === "dark" ? "light" : "dark"
      localStorage.setItem("theme", theme)
      return theme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={`${theme} text-foreground bg-background`}>
        {children}
      </main>
    </ThemeContext.Provider>
  )
}
