/* eslint-disable no-console */
import ItemSaleInteraction from './ItemSaleInteraction'

const doubleOnClick = (type) => {
  if (type === 'list') console.log('wassssuppp')
  if (type === 'gift') console.log('hi')
}
export const generated = () => {
  return (
    <div>
      <br />
      <h3>Default</h3>
      <ItemSaleInteraction
        isOwner={false}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'LISTED', amount: 123, sellerId: 23 }}
      />
      <br />
      <h3>Success</h3>
      <ItemSaleInteraction
        isOwner={false}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'SOLD', amount: 123, sellerId: 23 }}
      />
      <br />
      <h3>Listed</h3>
      <ItemSaleInteraction
        isOwner={true}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'LISTED', amount: 123, sellerId: 23 }}
      />
      <br />
      <h3>Unlisted</h3>
      <ItemSaleInteraction
        isOwner={true}
        onClick={doubleOnClick}
        marketSale={{ status: 'UNLISTED', sellerId: 23 }}
      />
      <br />
      <h3>Loading</h3>
      <ItemSaleInteraction isLoading={true} />
      <br />
      <h3>Pending</h3>
      <ItemSaleInteraction
        isOwner={false}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'PENDING_SOLD', amount: 123, sellerId: 23 }}
      />
      <ItemSaleInteraction
        isOwner={true}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'PENDING_DELISTED', amount: 123, sellerId: 23 }}
      />
      <ItemSaleInteraction
        isOwner={true}
        onClick={doubleOnClick}
        marketSale={{ status: 'PENDING_LISTED', sellerId: 23 }}
      />
      <br />
      <h3>Error</h3>
      <ItemSaleInteraction
        isOwner={false}
        isError={true}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'LISTED', amount: 123, sellerId: 23 }}
      />
      <ItemSaleInteraction
        isOwner={true}
        isError={true}
        onClick={() => console.log('shalom')}
        marketSale={{ status: 'LISTED', amount: 123, sellerId: 23 }}
      />
      <ItemSaleInteraction
        isOwner={true}
        isError={true}
        onClick={doubleOnClick}
        marketSale={{ status: 'UNLISTED', sellerId: 23 }}
      />
    </div>
  )
}

export default { title: 'Components/ItemSaleInteraction' }
