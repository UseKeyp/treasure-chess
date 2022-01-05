/* eslint-disable no-console */
import ItemSaleInteraction from './ItemSaleInteraction'

export const generated = () => {
  return (
    <div>
      <br />
      <h3>Default</h3>
      <ItemSaleInteraction
        isOwner={false}
        onClick={() => console.log('shalom')}
        price={123}
        listStatus={null}
      />
      <br />
      <h3>Loading</h3>
      <ItemSaleInteraction
        isOwner={false}
        onClick={() => console.log('shalom')}
        price={321}
        listStatus="LOADING"
      />
      <br />
      <h3>Success</h3>
      <ItemSaleInteraction
        isOwner={false}
        onClick={() => console.log('shalom')}
        price={2323}
        listStatus="SUCCESS"
      />
      <br />
      <h3>Error</h3>
      <ItemSaleInteraction
        isOwner={false}
        onClick={() => console.log('shalom')}
        price={1738}
        listStatus="ERROR"
      />
      <br />
      <h3>isOwner === true</h3>
      <ItemSaleInteraction
        isOwner={true}
        onClick={() => console.log('shalom')}
        price={420}
        listStatus={null}
      />
    </div>
  )
}

export default { title: 'Components/ItemSaleInteraction' }
