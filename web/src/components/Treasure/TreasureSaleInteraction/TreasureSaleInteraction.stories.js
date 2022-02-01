/* eslint-disable no-console */
import TreasureSaleInteraction from './TreasureSaleInteraction'

const doubleOnClick = (type) => {
  if (type === 'list') console.log('wassssuppp')
  if (type === 'gift') console.log('hi')
}
export const loading = () => {
  return (
    <div>
      <h3>Loading</h3>
      <TreasureSaleInteraction isLoading />
    </div>
  )
}
export const error = () => {
  return (
    <div>
      <h3>Error</h3>
      <TreasureSaleInteraction
        isOwner={false}
        isError={true}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'LISTED', amount: 123, sellerId: 23 }}
      />
      <TreasureSaleInteraction
        isOwner={true}
        isError={true}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'LISTED', amount: 123, sellerId: 23 }}
      />
      <TreasureSaleInteraction
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
      <TreasureSaleInteraction
        isOwner={false}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'LISTED', amount: 123, sellerId: 23 }}
      />
      <br />
      <h3>Success</h3>
      <TreasureSaleInteraction
        isOwner={false}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'SOLD', amount: 123, sellerId: 23 }}
      />
      <br />
      <h3>Listed</h3>
      <TreasureSaleInteraction
        isOwner={true}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'LISTED', amount: 123, sellerId: 23 }}
      />
      <br />
      <h3>Unlisted</h3>
      <TreasureSaleInteraction
        isOwner={true}
        onClick={doubleOnClick}
        marketSale={{ status: 'UNLISTED', sellerId: 23 }}
      />
      <br />
      <h3>Loading</h3>
      <TreasureSaleInteraction isLoading />
      <br />
      <h3>Pending</h3>
      <TreasureSaleInteraction
        isOwner={false}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'PENDING_SOLD', amount: 123, sellerId: 23 }}
      />
      <TreasureSaleInteraction
        isOwner={true}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'PENDING_DELISTED', amount: 123, sellerId: 23 }}
      />
      <TreasureSaleInteraction
        isOwner={true}
        onClick={doubleOnClick}
        marketSale={{ status: 'PENDING_LISTED', sellerId: 23 }}
      />
      <br />
      <h3>Error</h3>
      <TreasureSaleInteraction
        isOwner={false}
        isError={true}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'LISTED', amount: 123, sellerId: 23 }}
      />
      <TreasureSaleInteraction
        isOwner={true}
        isError={true}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'LISTED', amount: 123, sellerId: 23 }}
      />
      <TreasureSaleInteraction
        isOwner={true}
        isError={true}
        onClick={doubleOnClick}
        marketSale={{ status: 'UNLISTED', sellerId: 23 }}
      />
    </div>
  )
}

export default { title: 'Components/TreasureSaleInteraction' }
