import { render } from '@redwoodjs/testing/web'

import ItemSaleInteraction from './ItemSaleInteraction'

describe('ItemSaleInteraction', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ItemSaleInteraction />)
    }).not.toThrow()
  })
})
