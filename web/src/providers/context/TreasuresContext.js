const TreasuresContext = React.createContext()

const TreasuresContextProvider = ({ children }) => {
  const [state, setState] = React.useState({})
  return (
    <TreasuresContext.Provider value={[state, setState]}>
      {children}
    </TreasuresContext.Provider>
  )
}

export { TreasuresContext, TreasuresContextProvider }
