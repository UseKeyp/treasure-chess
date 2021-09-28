import { MetaTags } from '@redwoodjs/web'

import Button from 'src/components/Button'

import TreasureCardCell from 'src/components/Treasure/TreasureCardCell'
import TreasureOpeningCell from 'src/components/Treasure/TreasureOpeningCell'
import TreasureMovesCell from 'src/components/Treasure/TreasureMovesCell'
import TreasureNftDetailsCell from 'src/components/Treasure/TreasureNftDetailsCell'

const TreasurePage = ({ id }) => {
  const ACCEPT_HIGHEST_BID = 'accept highest bid'
  const PUT_ON_SALE = 'put on sale'
  const TRANSFER_NFT = 'transfer nft'
  const onClick = (id) => {
    /* eslint-disable-next-line no-console */
    console.log(id)
  }
  return (
    <div className="item-page max-width-container">
      <MetaTags
        title="Treasure"
        // description="About the awesome team"
        // ogUrl="https://awesomeredwoodapp.com/start"
        // ogContentUrl="https://awesomeredwoodapp.com/static/og.png"
        // robots={['nofollow']}
      />
      <div className="grid grid-rows-1">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
          <div className="flex justify-center items-start order-2 md:order-1">
            <div className="details-wrapper">
              <h2 className="text-center text-5xl">Game Details</h2>
              <br />
              <TreasureOpeningCell id={id} />
              <br />
              <TreasureMovesCell id={id} />
            </div>
          </div>
          <div className="flex flex-col justify-start items-center order-1 md:order-2">
            <TreasureCardCell id={id} />
            <div className="buttons-wrapper w-full flex flex-wrap justify-center">
              <Button
                onClick={() => onClick(ACCEPT_HIGHEST_BID)}
                variant="green"
              >
                Accept Highest Bid
              </Button>
              <Button onClick={() => onClick(PUT_ON_SALE)} variant="gold">
                Put On Sale
              </Button>
              <Button onClick={() => onClick(TRANSFER_NFT)} variant="grey">
                Transfer NFT
              </Button>
            </div>
          </div>
          <div className="flex justify-center items-start order-3">
            <TreasureNftDetailsCell id={id} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TreasurePage
