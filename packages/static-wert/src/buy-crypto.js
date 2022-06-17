import WertWidget from '@wert-io/widget-initializer'
import { v4 as uuidv4 } from 'uuid'

const address = new URL(location.href).searchParams.get('address')
const email = new URL(location.href).searchParams.get('email')
if (address) {
  const options = {
    partner_id: 'default',
    container_id: 'widget',
    click_id: uuidv4(), // unique id of purhase in your system
    width: 400,
    height: 600,
    currency: 'USD',
    // currency_amount: 100,
    // commodity_amount: 5;
    commodity: 'USDC:polygon',
    commodities: 'USDC:polygon',
    address,
    email,
    redirect_url: 'https://treasure.chess.com/redirect/wert',
    extra: {
      item_info: {
        author_image_url: 'https://treasure.chess.com/icon.png',
        author: 'Treasure Chess',
        image_url: 'https://treasure.chess.com/icon.png',
        name: 'String',
        seller: 'Treasure Chess',
      },
    },
    listeners: {
      loaded: () => {
        const container = window.document.getElementById('container')
        container.setAttribute('style', 'display:none;')
      },
    },
    // theme: 'dark',
    color_background: '#4f4f4f',
    color_buttons: '#47A7FF',
    color_buttons_text: '#fff',
    color_secondary_buttons: '#272522',
    color_secondary_buttons_text: '#fff',
    color_main_text: '#fff',
    color_secondary_text: '#fff',
    color_icons: '#fff',
    color_links: '#147DDD',
    color_success: '#88C54B',
    color_warning: '#FFBB0D',
    color_error: '#FFBB0D',
  }
  const wertWidget = new WertWidget(options)

  wertWidget.mount()
} else {
  window.document.write(
    '<h3>Whops! Something is not right<br/><br/></h3><p>You can close this window</p>'
  )
}
