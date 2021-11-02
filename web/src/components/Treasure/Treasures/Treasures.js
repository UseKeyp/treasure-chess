import { Link, routes } from '@redwoodjs/router'

const TreasuresList = ({ treasures }) => {
  return (
    <div className="">
      {treasures.map((treasure) => (
        <div className="m-4" key={treasure.id}>
          {treasure.title}
        </div>
      ))}
    </div>
  )
}

export default TreasuresList
