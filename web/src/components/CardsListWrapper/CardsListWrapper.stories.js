import CardsListWrapper from './CardsListWrapper'
import TreasureCard from 'src/components/Treasure/TreasureCard'
import { treasureCardTestProps } from '../Treasure/TreasureCard/TreasureCard.stories'

const card = <TreasureCard {...treasureCardTestProps} />

const list = Array(25)
  .fill(undefined)
  .map((_, i) => ({ id: i + 1, ...card }))

export const generated = () => {
  return <CardsListWrapper>{list}</CardsListWrapper>
}

export default { title: 'Components/CardsListWrapper' }
