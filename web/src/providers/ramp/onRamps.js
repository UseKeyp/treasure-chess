import { isBrowser } from '@redwoodjs/prerender/browserUtils'

const openWindow = (url) =>
  isBrowser &&
  window.open(
    url,
    'Treasure Chess - Deposit',
    'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
  )
const encodeBody = (body) =>
  Object.keys(body)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(body[key]))
    .join('&')

export const getOnramps = ({ userAddres, depositWyre, toggleModal }) => {
  const onSubmit = (callback) => {
    callback()
    toggleModal()
  }

  const perelinUrl =
    'https://buy.mtpelerin.com/?' +
    encodeBody({
      type: 'web',
      net: 'matic_mainnet',
      nets: 'matic_mainnet',
      bdc: 'USDC',
      crys: 'USDC',
      addr: userAddres,
      tabs: 'buy',
      mylogo: 'https://treasure.chess.com/logo.png',
      primary: '#47433f',
      success: '#0096c6',
    })
  const rampNetworkUrl =
    'https://buy.ramp.network/?' +
    encodeBody({
      userAddress: userAddres,
      hostLogoUrl: 'https://treasure.chess.com/logo.png',
      hostAppName: 'Treasure Chess',
      swapAsset: 'MATIC_USDC',
      finalUrl: process.env.APP_DOMAIN + '/redirect/rampNetwork',
      // Enable for testing
      //'https://ri-widget-staging.firebaseapp.com/',
    })

  return [
    {
      onSubmit: () => onSubmit(depositWyre),
      iconName: 'wyre',
      name: 'Wyre',
      helperText:
        'Tip: Do not use auto-complete, a password manager, or copy/paste. Try using different emails.',
      description: (
        <p className="mt-4">
          Regions: Americas, Europe, Africa, Asia (
          <a
            href="https://docs.sendwyre.com/reference/hosted-checkout#supported-states-and-countries"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            list
          </a>
          )
          <br />
          Limits: $100/day
          <br />
          Fees: 2.9% + $0.30
        </p>
      ),
    },
    {
      onSubmit: () => onSubmit(() => openWindow(perelinUrl)),
      // iconName: 'pelerin',
      name: 'Mt Pelerin',
      description: (
        <p className="mt-4">
          Regions: Most places excluding the US
          <br />
          Limits: CHF 200/purchase
          <br />
          Fees: 1.5% + CHF 1.2 (
          <a
            href="https://www.mtpelerin.com/pricing"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            details
          </a>
          )
        </p>
      ),
    },
    {
      onSubmit: () => onSubmit(() => openWindow(rampNetworkUrl)),
      // iconName: 'ramp_network',
      name: 'Ramp Network',
      description: (
        <p className="mt-4">
          Regions: Most places excluding the US
          <br />
          Limits: €100/day
          <br />
          Fees: 2.9% (
          <a
            href="https://support.ramp.network/en/articles/431-transaction-fees"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            details
          </a>
          )
        </p>
      ),
    },
    feedbackSuggestionCta,
  ]
}
export const feedbackSuggestionCta = {
  name: 'Your favorite provider',
  disabled: true,
  highlight: false,
  hideButton: true,
  description: (
    <p className="mt-4">
      Have a suggestion?{' '}
      <a
        href="https://treasure.chess.com/feedback"
        target="_blank"
        className="underline"
        rel="noreferrer"
      >
        Let us know!
      </a>
    </p>
  ),
}
