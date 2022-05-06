import { routes } from '@redwoodjs/router'

import Button from 'src/components/Button/Button'
import Icon from 'src/components/Icon/Icon'
import { useLocale } from 'src/providers/locale'

const AllTreasuresButton = () => {
  const { t } = useLocale()

  return (
    <Button
      variant="black"
      to={routes.treasures()}
      className="all-treasures-button"
      textColor="grey"
    >
      <div className="flex items-center">
        <div className="icon">
          <Icon name="treasure_chess" color="#ffffff" height="16px" />
        </div>
        <div>{t('All Treasures')}</div>
      </div>
    </Button>
  )
}

export default AllTreasuresButton
