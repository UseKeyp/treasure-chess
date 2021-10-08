import FilterTextInput from './FilterTextInput'

export const generated = () => {
  return (
  <>
  <FilterTextInput />
  </>
  )
}

export const fromTo = () => {
  return (
    <div style={{display: `flex`, maxWidth: `244px`, alignItems: `center`, justifyContent: `space-between`}}>
      <FilterTextInput />
      <span style={{fontSize: `1rem`}}>to</span>
      <FilterTextInput />
  </div>
  )
}

export default { title: 'Components/FilterTextInput' }
