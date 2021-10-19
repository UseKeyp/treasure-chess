import FilterDropdown from './FilterDropdown'

export const single = () => {
  return (
    <FilterDropdown
      label={'Storybook'}
      clickFunction={() => alert('Storybook Function')}
    />
  )
}

export default { title: 'Components/Marketplace/FilterDropdown' }
