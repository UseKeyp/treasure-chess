const GamesContext = React.createContext()

const GamesContextProvider = ({ children }) => {
  const [state, setState] = React.useState({ page: 0 })
  return (
    <GamesContext.Provider value={[state, setState]}>
      {children}
    </GamesContext.Provider>
  )
}

export { GamesContext, GamesContextProvider }
