import { MetaTags } from '@redwoodjs/web'
import WertModule from '@wert-io/module-react-component'
import { isProduction } from 'src/utils/helpers'

import Icon from 'src/components/Icon'

const WertPage = () => {
  const address = new URL(location.href).searchParams.get('address')
  const email = new URL(location.href).searchParams.get('email')

  return (
    <>
      <MetaTags title="Wert" description="Wert.io checkout" />
      <div className="h-screen w-full flex justify-center items-center">
        <div className="w-full sm:w-[400px]">
          <div className="wert-container w-full sm:w-[400px]">
            <div className="flex justify-center items-center h-[60px]">
              <Icon name="wert" color="white" />
            </div>
            {address && (
              <WertModule
                options={{
                  origin: isProduction
                    ? 'https://widget.wert.io'
                    : 'https://sandbox.wert.io',
                  partner_id: '01G5FDZZ2RY85QT8WY7AMN95P5',
                  container_id: 'wert',
                  // width: 400,
                  height: 550,
                  currency: 'USD',
                  // currency_amount: 100,
                  // commodity_amount: 5;
                  commodity: isProduction ? 'MATIC:polygon' : 'ETH',
                  commodities: isProduction ? 'MATIC:polygon' : 'ETH',
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
                    loaded: () => {},
                  },
                  // theme: 'dark',
                  color_background: '#4f4f4f',
                  color_buttons: '#125BF5',
                  color_buttons_text: '#fff',
                  color_secondary_buttons: '#272522',
                  color_secondary_buttons_text: '#fff',
                  color_main_text: '#fff',
                  color_secondary_text: '#ABB6B9',
                  color_icons: '#fff',
                  color_links: '#147DDD',
                  color_success: '#88C54B',
                  color_warning: '#FFBB0D',
                  color_error: '#FFBB0D',
                }}
              />
            )}
          </div>
          <div className="flex justify-center items-center h-[50px]">
            <p>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://support.wert.io/en/collections/2862595-help-centre"
              >
                {t('Wert Customer Support')}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default WertPage
