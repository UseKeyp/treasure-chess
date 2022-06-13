import { useAuth } from '@redwoodjs/auth'
import Button from 'src/components/Button'

import { useRamp } from 'src/providers/ramp/ramp'
import MemberBalance from 'src/components/Member/MemberBalance'
import MemberMintCredits from 'src/components/Member/MemberMintCredits'
import { trimAddress } from 'src/utils/helpers'
import {
  ArrowUpSquareFill,
  ArrowDownSquareFill,
  PaperplaneFill,
} from 'framework7-icons/react'

const Wallet = () => {
  const { currentUser } = useAuth()
  const { deposit, withdraw } = useRamp()

  if (!currentUser) {
    return <></>
  }

  const items = [
    {
      title: 'Details',
      description: (
        <>
          <p>Address:</p>
          <p className="">{trimAddress(currentUser.address)}</p>
        </>
      ),
      button: (
        <>
          <MemberBalance />
          <div className="mt-2">
            <MemberMintCredits />
          </div>
        </>
      ),
    },
    {
      title: 'Add Funds',
      description: <p>Instantly add funds using a debit card.</p>,
      button: (
        <Button onClick={deposit} variant="blue" size="small" className="w-32">
          <div className="flex py-1 justify-center flex-row items-center">
            <ArrowDownSquareFill className="w-6 h-6 mr-3" />
            {t('Add funds')}
          </div>
        </Button>
      ),
    },
    {
      title: 'Cash out',
      description: <p>Send funds to your bank at any time.</p>,
      button: (
        <Button
          onClick={withdraw}
          variant="green"
          size="small"
          className="w-32"
        >
          <div className="flex flex-row py-1 justify-center items-center">
            <ArrowUpSquareFill className="w-6 h-6 mr-3" />
            <div> {t('Cash out')}</div>
          </div>
        </Button>
      ),
    },
    {
      title: 'Send Tokens',
      disabled: true,
      button: (
        <Button disabled variant="blue" size="small" className="w-32">
          <div className="flex flex-row py-1 justify-center items-center">
            <PaperplaneFill className="w-6 h-6 mr-3" />
            <div> {t('Send')}</div>
          </div>
        </Button>
      ),
      description: (
        <p className="mb-4">
          Send ERC20 and ERC721 tokens to another web3 wallet.
        </p>
      ),
      status: (
        <p className="italic">
          <Trans i18nkey="web:requestBetaAccess">
            Beta feature. Request to be a Beta Tester in{' '}
            <a className="underline" href="/settings">
              Settings
            </a>
            .
          </Trans>
        </p>
      ),
    },
  ]

  return (
    <div className="max-width-container">
      <h1>{'Wallet'}</h1>
      <div className="grid grid-rows-2">
        {items.map((item) => (
          <div
            key={item.title}
            className={`grid grid-cols-2 align-center gap-4  bg-chessBlack-100 mt-6 p-4 rounded-lg border-[1px] ${
              item.highlight ? 'border-green' : 'border-chessBlack-100'
            }`}
          >
            <div>
              <div className="flex align-center items-center">
                {item.iconContent || <h3>{item.title}</h3>}
              </div>
              {item.description && (
                <div className="mt-2">{item.description}</div>
              )}
              <div className="mt-4">{item.status}</div>
              {item.errorText && (
                <div className="mt-4 font-bold text-errorYellow">
                  {item.errorText}
                </div>
              )}
              {item.helperText && (
                <div className="mt-3 ">{item.helperText}</div>
              )}
            </div>
            {!item.hideButton && (
              <div className="flex justify-end">
                <div>{item.button}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wallet
