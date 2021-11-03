import FilterCheckbox from './FilterCheckbox'

export const generated = () => {
  return <FilterCheckbox options={options} />
}

export default { title: 'Components/FilterCheckbox' }

const options = ['A', 'B', 'C']
