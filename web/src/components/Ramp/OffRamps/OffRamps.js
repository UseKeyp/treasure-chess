import { Link, routes } from '@redwoodjs/router'

import RampProvider from 'src/components/Ramp/RampProvider'
import Icon from 'src/components/Icon'
import Button from 'src/components/Button'
import FilterPriceInput from 'src/components/FilterPriceInput'

import { trimAddress, getBlockExplorerUrl } from 'src/utils/helpers'
import { useRamp } from 'src/providers/ramp/ramp'

const OffRamps = () => {
  const { submitRamp, offRamps } = useRamp()
  const feedbackSuggestionCta = {
    name: 'Your favorite provider',
    disabled: true,
    highlight: false,
    hideButton: true,
    description: (
      <p className="mt-4">
        <Trans i18nkey="FavoriteOnRampDetails">
          Have a suggestion?{' '}
          <Link to={routes.settings()} className="underline">
            Let us know!
          </Link>
        </Trans>
      </p>
    ),
  }
  const offRampList = [
    {
      type: 'WYRE',
      icon: (
        <div className="flex justify-center">
          <img
            alt="Wyre and Plaid logos"
            src="/icons/wyre_plaid.png"
            className="h-[38px]"
          />
        </div>
      ),
      name: 'Wyre + Plaid',
      description: (
        <>
          <p className="mt-4">
            <b>Fee: 0.2%</b> <br />
            Available in US, MX, AU, EU, CN, BR
          </p>
        </>
      ),
      helperText: <p className="italic">{t('Available on desktop-only')}</p>,
    },
    {
      type: 'COINBASE',
      iconName: 'coinbase',
      name: 'Coinbase',
      description: (
        <>
          <p className="mt-4">
            <b>Fee: none</b> <br />
            Available in most places (
            <a
              href="https://www.coinbase.com/places"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              list
            </a>
            )
          </p>
        </>
      ),
    },
    {
      type: 'MT_PELERIN',
      iconName: 'mt_pelerin',
      buttonText: 'Coming Soon',
      name: 'Mt Pelerin',
      disabled: true,
      description: (
        <p className="mt-4">
          <Trans i18nkey="MtPelerinOnRampDetails">
            <b>Fee: 1.5% + CHF 1.2</b> (
            <a
              href="https://www.mtpelerin.com/pricing"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              details
            </a>
            )
            <br />
            Available in most places excluding the US (
            <a
              href="https://developers.mtpelerin.com/service-information/supported-countries"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              list
            </a>
            )
            <br />
            Limit: CHF 200/purchase
          </Trans>
        </p>
      ),
    },
    {
      type: 'WALLET_DEPOSIT',
      name: 'Manual',
      icon: (
        <div className="py-1 flex flex-row justify-center items-center">
          <div className="flex flex-row flex-shrink-0">
            <Icon name="metamask" className="w-6 h-6 m-4" />
            <img
              alt="rainbow"
              src="/rainbow_wallet.png"
              width="32px"
              className="ml-2"
            />
          </div>
          <h2 className="ml-2 text-2xl">{t('Web3 wallet')}</h2>
        </div>
      ),
      disabled: true,
      buttonText: 'Coming Soon',
      description: (
        <p className="mt-4">
          <b>Fee: none</b> <br />
          Available everywhere
        </p>
      ),
      helperText: (
        <p className="italic">
          <Trans i18nkey="web:requestBetaAccess">
            <b>Beta feature</b>. Request to be a Beta Tester in{' '}
            <Link className="underline" to={routes.settings()}>
              Settings
            </Link>
            .
          </Trans>
        </p>
      ),
    },
  ]

  const offRampsWithData = offRampList.map((ramp) => {
    const rampData = offRamps.find((data) => data.type === ramp.type)
    return { ...ramp, ...rampData }
  })

  const OffRamp = ({ ramp }) => {
    const [amount, setAmount] = React.useState()
    if (!ramp) return null
    let onSubmit = (reconnect) => {
      submitRamp({ direction: 'OFF', type: ramp.type, amount, reconnect })
    }
    if (!ramp) return null
    let status
    if (ramp.address)
      status = (
        <div className="">
          <div className="flex align-center justify-between">
            <div>
              <h4>
                ✅{' '}
                <i>
                  Connected to{' '}
                  <a
                    href={getBlockExplorerUrl({ address: ramp.address })}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {trimAddress(ramp.address)}
                  </a>
                </i>
              </h4>
              <h4>
                <i>{ramp.accountNickname}</i>
              </h4>
            </div>
            <div className="flex ml-4 align-center">
              <Button
                size="small"
                onClick={() => onSubmit(true)}
                disabled={ramp.isLoading || ramp.disabled}
              >
                <div className="flex flex-row items-center">
                  <Icon name="circle_arrow" height="13" color="white" />
                  <p className="ml-2">Change account</p>
                </div>
              </Button>
            </div>
          </div>
          {ramp.address && (
            <div className="">
              <h4 className="mt-2 mb-2 w-[50%]">Amount</h4>
              <FilterPriceInput value={amount} setValue={setAmount} />
            </div>
          )}
        </div>
      )
    const getButtonText = () => {
      if (ramp.disabled) return 'Coming soon'
      else if (ramp.address) return 'Withdraw'
      return 'Connect'
    }
    return (
      <RampProvider
        key={ramp.name}
        onSubmit={onSubmit}
        buttonText={getButtonText()}
        highlightStatus={!!ramp.address}
        status={status}
        {...ramp}
      />
    )
  }

  return (
    <div className="">
      <div className="grid sm:grid-cols-2 gap-6 sm:grid-flow-row">
        {[...offRampsWithData, feedbackSuggestionCta].map((ramp) => (
          <OffRamp key={ramp.name} ramp={ramp} />
        ))}
      </div>
    </div>
  )
}
export default OffRamps
