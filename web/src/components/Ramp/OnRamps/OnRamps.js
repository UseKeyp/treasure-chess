import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import RampProvider from 'src/components/Ramp/RampProvider'
import Icon from 'src/components/Icon'

import { useWallet } from 'src/providers/wallet'
import { useRamp } from 'src/providers/ramp/ramp'

const OnRamps = () => {
  const { getAddress } = useWallet()
  const { currentUser } = useAuth()
  const { submitRamp } = useRamp()

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

  const onRampList = [
    {
      type: 'WERT',
      iconName: 'wert',
      name: 'Wert.io',
      description: (
        <p className="mt-4">
          <Trans i18nkey="web:RampOnRampDetails">
            <b>Fee: 5%</b> <br />
            Available in most places (
            <a
              href="https://support.wert.io/en/articles/5194509-supported-countries"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              list
            </a>
            )
            <br />
            Limit: $1,000 w/o KYC
          </Trans>
        </p>
      ),
    },
    {
      type: 'RAMP_NETWORK',
      iconName: 'ramp_network',
      name: 'Ramp Network',
      description: (
        <p className="mt-4">
          <Trans i18nkey="web:RampOnRampDetails">
            <b>Fee: 2.9% </b>(
            <a
              href="https://support.ramp.network/en/articles/431-transaction-fees"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              details
            </a>
            )
            <br />
            Available in most places (
            <a
              href="https://support.ramp.network/en/articles/433-supported-countries-and-territories"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              list
            </a>
            )
            <br />
            Limit: €100/day
          </Trans>
        </p>
      ),
    },
    {
      type: 'WYRE',
      iconName: 'wyre',
      name: 'Wyre',
      helperText: (
        <p>
          {t(`Tip: Do not use auto-complete, a password manager, or copy/paste. Try
          using a different email if your first attempt fails.`)}
        </p>
      ),
      description: (
        <p className="mt-4">
          <Trans i18nkey="web:WyreOnRampDetails">
            <b>Fee: 2.9% + $0.30</b> (
            <a
              href="https://support.sendwyre.com/hc/en-us/articles/360059565013-Wyre-card-processing-fees"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              details
            </a>
            )
            <br />
            Available in most places (
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
            Limit: $100/day
          </Trans>
        </p>
      ),
    },
    {
      iconName: 'mt_pelerin',
      name: 'Mt Pelerin',
      type: 'MT_PELERIN',
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
      icon: (
        <div className="py-1 flex flex-row justify-center items-center">
          <div className="flex flex-row flex-shrink-0">
            <Icon name="metamask" className="w-6 m-4" />
            <img
              alt="rainbow"
              src="/rainbow_wallet.png"
              width="32px"
              className="ml-2 h-[38px]"
            />
          </div>
          <h2 className="ml-2 text-2xl">{t('Web3 wallet')}</h2>
        </div>
      ),
      name: 'Manual',
      type: 'WALLET_DEPOSIT',
      description: (
        <p className="mt-4">
          <b>Fee: none</b> <br />
          Available everywhere
        </p>
      ),
    },
  ]

  return (
    <div className="grid sm:grid-cols-2 gap-6 sm:grid-flow-row">
      {[...onRampList, feedbackSuggestionCta].map((ramp) => {
        if (!ramp) return null
        let onSubmit = () => {
          submitRamp({ direction: 'ON', type: ramp.type })
        }
        if (ramp.type === 'WALLET_DEPOSIT')
          onSubmit = () => getAddress(currentUser.address)
        return (
          <RampProvider
            key={ramp.name}
            onSubmit={onSubmit}
            isLoading={ramp.isLoading}
            {...ramp}
          />
        )
      })}
    </div>
  )
}
export default OnRamps
