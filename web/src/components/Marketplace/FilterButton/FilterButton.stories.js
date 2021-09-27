import FilterButton from './FilterButton'

export const generated = () => {
	return <FilterButton label={'Storybook'} clickFunction={() => alert('Storybook Function')}/>
}

export const multiple = () => {

	return (
		<div style={{display: 'flex', flexFlow: 'row wrap', maxWidth: '500px', justifyContent: 'space-between'}}>
			<FilterButton label={'Storybook'} clickFunction={() => alert('Storybook Function')}/>
			<FilterButton label={'Lorem'} clickFunction={() => alert('Storybook Function')}/>
			<FilterButton label={'Ipsum'} clickFunction={() => alert('Storybook Function')}/>
			<FilterButton label={'Dolor'} clickFunction={() => alert('Storybook Function')}/>
			<FilterButton label={'Sit'} clickFunction={() => alert('Storybook Function')}/>
			<FilterButton label={'Amet'} clickFunction={() => alert('Storybook Function')}/>
			<FilterButton label={'Dolore'} clickFunction={() => alert('Storybook Function')}/>
			<FilterButton label={'Ut'} clickFunction={() => alert('Storybook Function')}/>
			<FilterButton label={'Laborum'} clickFunction={() => alert('Storybook Function')}/>
			<FilterButton label={'Id'} clickFunction={() => alert('Storybook Function')}/>
			<FilterButton label={'Incididunt'} clickFunction={() => alert('Storybook Function')}/>
			<FilterButton label={'Non'} clickFunction={() => alert('Storybook Function')}/>
			<FilterButton label={'Dolore'} clickFunction={() => alert('Storybook Function')}/>
			<FilterButton label={'Consequat'} clickFunction={() => alert('Storybook Function')}/>
			<FilterButton label={'Aute'} clickFunction={() => alert('Storybook Function')}/>
			<FilterButton label={'Cillum'} clickFunction={() => alert('Storybook Function')}/>
			<FilterButton label={'Excepteur'} clickFunction={() => alert('Storybook Function')}/>
			<FilterButton label={'Id'} clickFunction={() => alert('Storybook Function')}/>
		</div>
	)
}

export default { title: 'Components/FilterButton' }