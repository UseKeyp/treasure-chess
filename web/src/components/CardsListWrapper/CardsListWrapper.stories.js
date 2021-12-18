import CardsListWrapper from './CardsListWrapper'

const list = Array(25)
  .fill(undefined)
  .map((_, i) => ({ id: i + 1 }))

export const generated = () => {
  return <CardsListWrapper>{list}</CardsListWrapper>
}

export default { title: 'Components/CardsListWrapper' }
