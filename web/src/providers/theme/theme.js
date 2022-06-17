import themeConfig from '../../../config/tailwind.config'
import Background from 'src/components/Background'
import { useState } from 'react'

const ThemeContext = React.createContext()

const ThemeContextProvider = ({ children }) => {
  const { theme } = themeConfig

  const [themeName, setThemeName] = useState('')

  const toggleFaqTheme = (isToggled) => {
    isToggled ? setThemeName('about-page') : setThemeName('')
  }

  const toggleHomeTheme = (isToggled) => {
    isToggled ? setThemeName('home-page') : setThemeName('')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleFaqTheme, toggleHomeTheme }}>
      <Background themeName={themeName}>{children}</Background>
    </ThemeContext.Provider>
  )
}

const useTheme = () => React.useContext(ThemeContext)

export { ThemeContextProvider, useTheme }
