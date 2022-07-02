import { Trans, useTranslation } from 'react-i18next'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'

import ModalContainer from 'src/components/ModalContainer'
import Icon from 'src/components/Icon'
import FilterPriceInput from 'src/components/FilterPriceInput'
import LoadingDots from 'src/components/LoadingDots'
import Button from 'src/components/Button'

import { trimAddress, getBlockExplorerUrl } from 'src/utils/helpers'
import { useRamp } from 'src/providers/ramp/ramp'
import { useWallet } from 'src/providers/wallet'

const Provider = ({
  error,
  isLoading,
  onSubmit,
  buttonText = 'Continue',
  disabled,
  status,
  highlight,
  description,
  helperText,
  hideButton,
  iconName,
  icon,
  name,
}) => {
  let backgroundColor =
    isLoading || disabled ? 'bg-chessBlack-200 pointer-events-none' : 'bg-green'
  const buttonClassName = `mt-2 w-[272px] h-[40px] text-xl shadow-m hover:sm hover:bg-greenDark hover:shadow-greenDark ${backgroundColor}`
  let errorText
  if (error != null && error != '' && error.length > 0) {
    errorText = error.substring(0, 200)
  } else {
    errorText = ''
  }

  let button = (
    <Button
      id="connection-button"
      className={buttonClassName}
      onClick={onSubmit}
      disabled={isLoading || disabled}
    >
      {isLoading ? <LoadingDots /> : buttonText}
    </Button>
  )
  let iconContent = iconName ? (
    <Icon name={iconName} size="45%" color="white" className="mb-2" />
  ) : (
    <h2>{name}</h2>
  )
  if (icon) iconContent = icon
  return (
    <div
      className={`align-center bg-chessBlack-100 mt-6 p-4 rounded-lg border-[1px] ${
        highlight ? 'border-green' : 'border-chessBlack-100'
      }`}
    >
      <div className="flex align-center items-center">{iconContent}</div>
      {description && <div className="mt-2">{description}</div>}
      <h2 className="mt-2">{status}</h2>
      {!hideButton && button}
      {errorText && (
        <div className="mt-4 font-bold text-errorYellow">{errorText}</div>
      )}
      {helperText && <div className="mt-2">{helperText}</div>}
    </div>
  )
}

const OnRampProvider = ({ ramp, toggleModal, isLoading, onSubmit }) => {
  const { getAddress } = useWallet()
  const { currentUser } = useAuth()

  if (!ramp) return null
  let onClick = async () => {
    await onSubmit(ramp.type)
    toggleModal()
  }
  if (ramp.type === 'WALLET_DEPOSIT')
    onClick = () => {
      toggleModal()
      getAddress(currentUser.address)
    }

  return (
    <Provider
      onSubmit={onClick}
      highlight={true}
      isLoading={isLoading === ramp.type}
      {...ramp}
    />
  )
}

const OffRampProvider = ({ ramp, amount }) => {
  if (!ramp) return null
  let onSubmit = ramp.onConnect
  if (ramp.address) onSubmit = () => ramp.onWithdraw(amount)
  let status
  if (ramp.address)
    status = (
      <div className="flex align-center">
        <div>
          <h4>
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
          <Button onClick={onSubmit} disabled={ramp.isLoading || ramp.disabled}>
            <div className="flex flex-row items-center">
              <Icon name="circle_arrow" height="13" color="white" />
              <p className="ml-2">Update</p>
            </div>
          </Button>
        </div>
      </div>
    )
  const getButtonText = () => {
    if (ramp.disabled) return 'Coming soon'
    else if (ramp.address) return 'Withdraw'
    return 'Connect'
  }
  return (
    <Provider
      onSubmit={onSubmit}
      isLoading={ramp.isLoading}
      disabled={ramp.disabled}
      buttonText={getButtonText()}
      highlight={!!ramp.address}
      status={status}
      {...ramp}
    />
  )
}

export const DepositModal = ({ isVisible, toggleModal }) => {
  const { getRampUrl, isLoading } = useRamp()
  const onSubmit = (type) => getRampUrl({ direction: 'ON', type })
  const { t } = useTranslation('web')

  const onRamps = [
    {
      type: 'RAMP_NETWORK',
      iconName: 'ramp_network',
      name: 'Ramp Network',
      description: (
        <p className="mt-4">
          <Trans i18nkey="web:RampOnRampDetails">
            Regions: Most places (
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
            <br />
            Fee: 2.9% (
            <a
              href="https://support.ramp.network/en/articles/431-transaction-fees"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              details
            </a>
            )
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
            Regions: Most places (
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
            <br />
            Fee: 2.9% + $0.30 (
            <a
              href="https://support.sendwyre.com/hc/en-us/articles/360059565013-Wyre-card-processing-fees"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              details
            </a>
            )
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
            Regions: Most places excluding the US (
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
            <br />
            Fee: 1.5% + CHF 1.2 (
            <a
              href="https://www.mtpelerin.com/pricing"
              target="_blank"
              className="underline"
              rel="noreferrer"
            >
              details
            </a>
            )
          </Trans>
        </p>
      ),
    },
    {
      type: 'WERT',
      iconName: 'wert',
      buttonText: 'Coming Soon',
      name: 'Wer.io',
      disabled: true,
      description: (
        <p className="mt-4">
          <Trans i18nkey="web:RampOnRampDetails">
            Regions: Most places (
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
            Limit: $1,000/week
            <br />
            Fee: 5%
          </Trans>
        </p>
      ),
    },
    {
      icon: (
        <div className="flex py-1 justify-center flex-row items-center">
          <Icon name="metamask" className="w-6 h-6 m-4" />
          <img
            alt="rainbow"
            src="/rainbow_wallet.png"
            width="32px"
            className="ml-2"
          />
          <h2 className="ml-2">{t('Web3 wallet')}</h2>
        </div>
      ),
      name: 'Manual',
      type: 'WALLET_DEPOSIT',
      description: (
        <p className="mt-4">
          Regions: All
          <br />
          Fee: none
        </p>
      ),
    },
  ]

  const feedbackSuggestionCta = {
    name: 'Your favorite provider',
    disabled: true,
    highlight: false,
    hideButton: true,
    description: (
      <p className="mt-4">
        <Trans i18nkey="FaroviteOnRampDetails">
          Have a suggestion?{' '}
          <Link to={routes.settings()} className="underline">
            Let us know!
          </Link>
        </Trans>
      </p>
    ),
  }

  return (
    <ModalContainer
      isVisible={isVisible}
      hideModal={toggleModal}
      headerText="Funding Options"
      content={
        <>
          <p className="text-base">Choose a payment provider</p>
          {[...onRamps, feedbackSuggestionCta].map((ramp) => (
            <OnRampProvider
              key={ramp.name}
              ramp={ramp}
              toggleModal={toggleModal}
              isLoading={isLoading}
              onSubmit={onSubmit}
            />
          ))}
        </>
      }
    />
  )
}

export const WithdrawModal = ({ isVisible, toggleModal }) => {
  const [amount, setAmount] = React.useState('0')
  const { offRamps, isLoading } = useRamp()
  const isConnected = offRamps
    .map((ramp) => ramp.address && true)
    .includes(true)

  const feedbackSuggestionCta = {
    name: 'Your favorite provider',
    disabled: true,
    highlight: false,
    hideButton: true,
    description: (
      <p className="mt-4">
        <Trans i18nkey="FaroviteOnRampDetails">
          Have a suggestion?{' '}
          <Link to={routes.settings()} className="underline">
            Let us know!
          </Link>
        </Trans>
      </p>
    ),
  }
  return (
    <ModalContainer
      headerText="Cash Out Options"
      isVisible={isVisible}
      onSubmit={toggleModal}
      hideModal={toggleModal}
      content={
        <>
          <p className="text-base">Choose a payment provider</p>
          {isConnected && (
            <div className="bg-chessBlack-100 p-2 mt-4 rounded-lg ">
              <h4 className="mb-2">Amount</h4>
              <FilterPriceInput value={amount} setValue={setAmount} />
            </div>
          )}
          {[...offRamps, feedbackSuggestionCta].map((ramp) => (
            <OffRampProvider
              key={ramp.name}
              isLoading={isLoading}
              amount={amount}
              ramp={ramp}
              toggleModal={toggleModal}
            />
          ))}
          <p className="mt-4 italic">
            For your protection, funds can only be sent one-way from your
            Treasure Chess wallet to your bank. Funds can never be withdrawn
            from your bank using this method.
          </p>
        </>
      }
    />
  )
}
