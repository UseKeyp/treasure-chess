import FeaturedPlayers from './FeaturedPlayers'

export const desktop = () => {
  return (
    <div className="max-w-[1280px]">
      <FeaturedPlayers seeAllUrl="/treasures" />
    </div>
  )
}

export default { title: 'Components/FeaturedPlayers' }
