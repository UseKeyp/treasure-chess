import FilterButton from './FilterButton'

export const single = () => {
	return <FilterButton label={'Storybook'} clickFunction={() => alert('Storybook Function')}/>
}

export const grid = () => {

	// If you want to display multitudes, I recommend writing a wrapper component for your array.
	// Can be a simple div, use the below styling to achieve the visuals indicated in storybook.
	const style = {
		display: 'flex',
		flexFlow: 'row wrap', //forces line wrapping of components
		maxWidth: '500px', //arbitrary width, change at your leisure on page
		justifyContent: 'space-between' // opinionated, I think this is the 'griddiest' appearance without using grid spec.
	}

	return (
		<div style={style}>
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

export const list = () => {

	// If you want a simple list as indicated in Figma/Market_Page -> Search Results,
	// use a flex-row wrapper like this:
	const style = {
		display: 'flex',
		flexFlow: 'row nowrap' // Multiple components will exceed and width bounds you set, take care to paginate your array
	}

	return (
		<div style={style}>
			<FilterButton label={'Lorem'} clickFunction={() => alert('Storybook Function')} />
			<FilterButton label={'Ipsum'} clickFunction={() => alert('Storybook Function')} />
			<FilterButton label={'Dolor'} clickFunction={() => alert('Storybook Function')} />
			<FilterButton label={'Sit'} clickFunction={() => alert('Storybook Function')} />
			<FilterButton label={'Amet'} clickFunction={() => alert('Storybook Function')} />
		</div>
	)
}

export default { title: 'Components/Marketplace/FilterButton' }