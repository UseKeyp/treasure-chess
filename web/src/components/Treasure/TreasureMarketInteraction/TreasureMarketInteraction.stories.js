/* eslint-disable no-console */
import TreasureMarketInteraction from './TreasureMarketInteraction'

const doubleOnClick = (type) => {
  if (type === 'list') console.log('wassssuppp')
  if (type === 'gift') console.log('hi')
}
export const loading = () => {
  return (
    <div>
      <h3>Loading</h3>
      <TreasureMarketInteraction isLoading />
    </div>
  )
}
export const error = () => {
  return (
    <div>
      <h3>Error</h3>
      <TreasureMarketInteraction
        isOwner={false}
        isError={true}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'LISTED', amount: 123, sellerId: 23 }}
      />
      <TreasureMarketInteraction
        isOwner={true}
        isError={true}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'LISTED', amount: 123, sellerId: 23 }}
      />
      <TreasureMarketInteraction
        isOwner={true}
        isError={true}
        onClick={doubleOnClick}
        marketSale={{ status: 'UNLISTED', sellerId: 23 }}
      />
    </div>
  )
}
export const generated = () => {
  return (
    <div>
      <br />
      <h3>Default</h3>
      <TreasureMarketInteraction
        isOwner={false}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'LISTED', amount: 123, sellerId: 23 }}
      />
      <br />
      <h3>Success</h3>
      <TreasureMarketInteraction
        isOwner={false}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'SOLD', amount: 123, sellerId: 23 }}
      />
      <br />
      <h3>Listed</h3>
      <TreasureMarketInteraction
        isOwner={true}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'LISTED', amount: 123, sellerId: 23 }}
      />
      <br />
      <h3>Unlisted</h3>
      <TreasureMarketInteraction
        isOwner={true}
        onClick={doubleOnClick}
        marketSale={{ status: 'UNLISTED', sellerId: 23 }}
      />
      <br />
      <h3>Loading</h3>
      <TreasureMarketInteraction isLoading />
      <br />
      <h3>Pending</h3>
      <TreasureMarketInteraction
        isOwner={false}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'PENDING_SOLD', amount: 123, sellerId: 23 }}
      />
      <TreasureMarketInteraction
        isOwner={true}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'PENDING_DELISTED', amount: 123, sellerId: 23 }}
      />
      <TreasureMarketInteraction
        isOwner={true}
        onClick={doubleOnClick}
        marketSale={{ status: 'PENDING_LISTED', sellerId: 23 }}
      />
      <br />
      <h3>Error</h3>
      <TreasureMarketInteraction
        isOwner={false}
        isError={true}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'LISTED', amount: 123, sellerId: 23 }}
      />
      <TreasureMarketInteraction
        isOwner={true}
        isError={true}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'LISTED', amount: 123, sellerId: 23 }}
      />
      <TreasureMarketInteraction
        isOwner={true}
        isError={true}
        onClick={doubleOnClick}
        marketSale={{ status: 'UNLISTED', sellerId: 23 }}
      />
    </div>
  )
}

export default { title: 'Components/TreasureMarketInteraction' }
