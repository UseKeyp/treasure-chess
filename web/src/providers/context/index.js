import { GamesContextProvider } from './GamesContext'
import { TreasuresContextProvider } from './TreasuresContext'

const AllContextProviders = ({ children }) => {
  // Add additional context providers here
  // This will be automatically injected in to the App and Storybook

  return (
    <GamesContextProvider>
      <TreasuresContextProvider>{children}</TreasuresContextProvider>
    </GamesContextProvider>
  )
}

export default AllContextProviders
export { TreasuresContext } from './TreasuresContext'
export { GamesContext } from './GamesContext'
