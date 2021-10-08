import FilterPriceInput from './FilterPriceInput'

export const generated = () => {
  return (
    <>
      <FilterPriceInput />
    </>
  )
}

export const fromTo = () => {
  return (
    <div
      style={{
        display: `flex`,
        maxWidth: `244px`,
        alignItems: `center`,
        justifyContent: `space-between`,
      }}
    >
      <FilterPriceInput />
      <span style={{ fontSize: `1rem`, margin: `0 1ex` }}>to</span>
      <FilterPriceInput />
    </div>
  )
}

export default { title: 'Components/FilterPriceInput' }
