import { render } from '@redwoodjs/testing'

import TreasureCard from './TreasureCard'

describe('TreasureCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <TreasureCard
          title="User-Made Title"
          numMoves="42"
          winner="WHITE"
          blackPlayer="Chess.com User 02"
          matchId={9873678}
          rarityFlagColor="#5DCC36"
          edition="white"
          whitePlayer="Chess.com User 01"
          wonByText="Checkmate"
          variantText="Standard"
          openingText="Bird's Opening"
          gifUrl="https://media0.giphy.com/media/3o6ZsYLRb6IG6vAkcU/giphy.gif"
        />
      )
    }).not.toThrow()
  })
})
