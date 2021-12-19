import { GamesContextProvider } from './GamesContext'

const AllContextProviders = ({ children }) => {
  // Add additional context providers here
  // This will be automatically injected in to the App and Storybook

  return <GamesContextProvider>{children}</GamesContextProvider>
}

export default AllContextProviders
export { GamesContext } from './GamesContext'
