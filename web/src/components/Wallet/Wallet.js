import { useAuth } from '@redwoodjs/auth'
import { routes, Link } from '@redwoodjs/router'
import Button from 'src/components/Button'

import { useRamp } from 'src/providers/ramp/ramp'
import MemberBalance from 'src/components/Member/MemberBalance'
import MemberMintCredits from 'src/components/Member/MemberMintCredits'
import Accordion from 'src/components/Accordion/Accordion'
import { trimAddress } from 'src/utils/helpers'
import {
  getDepositOptions,
  getWithdrawalOptions,
} from 'src/providers/ramp/modals'

import {
  ArrowUpSquareFill,
  ArrowDownSquareFill,
  PaperplaneFill,
} from 'framework7-icons/react'

const Wallet = () => {
  const { currentUser } = useAuth()
  const { getRampUrl, isLoading } = useRamp()

  const [addFundsToggle, setAddFundsToggle] = React.useState(false)
  const [cashOutToggle, setCashOutToggle] = React.useState(false)

  if (!currentUser) {
    return <></>
  }

  const items = [
    {
      title: t('Details'),
      subtitle: `Address ${trimAddress(currentUser.address)}`,
      button: (
        <>
          <MemberBalance />
          <div className="mt-2 pb-4">
            <MemberMintCredits />
          </div>
        </>
      ),
    },
    {
      title: t('Add Funds'),
      subtitle: t('Instantly add funds using a debit card.'),
      contents: (
        <Accordion toggle={addFundsToggle}>
          <div className="grid sm:grid-cols-2 gap-6 sm:grid-flow-row">
            {getDepositOptions({ getRampUrl, isLoading }).map((item) => {
              return <div key={item.key}>{item}</div>
            })}
          </div>
        </Accordion>
      ),
      button: (
        <Button
          onClick={() => setAddFundsToggle(!addFundsToggle)}
          variant="blue"
          size="small"
          className="w-32"
        >
          <div className="flex py-1 justify-center flex-row items-center">
            <ArrowDownSquareFill className="w-6 h-6 mr-3" />
            {t('Add funds')}
          </div>
        </Button>
      ),
    },
    {
      title: t('Cash out'),
      subtitle: t('Send funds to your bank at any time.'),
      contents: (
        <Accordion toggle={cashOutToggle}>
          <p className="pr-4 pb-2 italic">
            For your protection, funds can only be sent one-way from your
            Treasure Chess wallet to your bank. Funds can never be withdrawn
            from your bank using this method.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 sm:grid-flow-row">
            {getWithdrawalOptions({ getRampUrl, isLoading }).map((item) => {
              return <div key={item.key}>{item}</div>
            })}
          </div>
        </Accordion>
      ),
      button: (
        <Button
          onClick={() => setCashOutToggle(!cashOutToggle)}
          variant="green"
          size="small"
          className="w-32"
        >
          <div className="flex py-1 justify-center flex-row items-center">
            <ArrowUpSquareFill className="w-6 h-6 mr-3" />
            {t('Cash out')}
          </div>
        </Button>
      ),
    },
    {
      title: 'Send Tokens',
      disabled: true,
      subtitle: t('Send ERC20 and ERC721 tokens to another web3 wallet.'),
      button: (
        <Button disabled variant="blue" size="small" className="w-32">
          <div className="flex flex-row py-1 justify-center items-center">
            <PaperplaneFill className="w-6 h-6 mr-3" />
            <div> {t('Send')}</div>
          </div>
        </Button>
      ),
      contents: (
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

  return (
    <div className="max-width-container">
      <h1>{'Wallet'}</h1>
      {
        <div>
          {items.map((item) => (
            <div
              key={item.title}
              className={` bg-chessBlack-100 mt-6 p-4 rounded-lg border-[1px] ${
                item.highlight ? 'border-green' : 'border-chessBlack-100'
              }`}
            >
              <div className="grid grid-cols-3 align-center">
                <div className="col-span-2 mr-5">
                  <div className="flex align-center">
                    {item.iconContent || <h3>{item.title}</h3>}
                  </div>
                  {item.subtitle && <p className="mt-2">{item.subtitle}</p>}
                </div>
                <div className="col-span-1">
                  {!item.hideButton && (
                    <div className="flex justify-end ml-10">
                      <div>{item.button}</div>
                    </div>
                  )}
                </div>
              </div>
              {item.contents && <div className="mt-4">{item.contents}</div>}
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default Wallet
