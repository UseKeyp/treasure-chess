import { routes } from '@redwoodjs/router'

import Button from 'src/components/Button/Button'
import Icon from 'src/components/Icon/Icon'

const AllTreasuresButton = () => {
  return (
    <Button
      variant="black"
      size="small"
      to={routes.treasures()}
      className="all-treasures-button"
    >
      <div className="flex items-center">
        <div className="mr-4">
          <Icon name="treasure_chest" />
        </div>
        All Treasures
      </div>
    </Button>
  )
}

export default AllTreasuresButton
