import { useAuth } from '@redwoodjs/auth'
import { routes, Link } from '@redwoodjs/router'
import Button from 'src/components/Button'

import { useRamp } from 'src/providers/ramp/ramp'
import MemberBalance from 'src/components/Member/MemberBalance'
import MemberMintCredits from 'src/components/Member/MemberMintCredits'
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
import Accordion from 'src/components/Accordion/Accordion'

const Wallet = () => {
  const { currentUser } = useAuth()
  const { withdraw, getRampUrl, isLoading } = useRamp()

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

  const addFundsItems = [
    {
      title: 'Credits',
      subtitle: 'Instantly add funds using a debit card.',
      description: (
        <div>
          <div className="grid grid-cols-2 gap-2 grid-flow-row">
            {getDepositOptions({ getRampUrl, isLoading }).map((item) => {
              return <div key={item.key}>{item}</div>
            })}
          </div>
        </div>
      ),
      button: (
        <Button variant="blue" size="small" className="w-32">
          <div className="flex py-1 justify-center flex-row items-center">
            <ArrowDownSquareFill className="w-6 h-6 mr-3" />
            {t('Add funds')}
          </div>
        </Button>
      ),
    },
  ]

  const cashOutItems = [
    {
      title: 'Cash out',
      subtitle: <p className="pr-18">Send funds to your bank at any time.</p>,
      description: (
        <div>
          <div className="grid grid-cols-2 gap-2 grid-flow-row">
            {getWithdrawalOptions({ getRampUrl, isLoading }).map((item) => {
              return <div key={item.key}>{item}</div>
            })}
          </div>
        </div>
      ),
      button: (
        <Button
          onClick={withdraw}
          variant="green"
          size="small"
          className="w-32"
        >
          <div className="flex py-1 justify-center flex-row items-center">
            <ArrowDownSquareFill className="w-6 h-6 mr-3" />
            {t('Cash out')}
          </div>
        </Button>
      ),
    },
  ]

  return (
    <div className="max-width-container">
      <h1>{'Wallet'}</h1>
      <div className="bg-chessBlack-100 rounded-lg">
        <Accordion
          content={
            <div>
              {addFundsItems.map((item) => (
                <div
                  key={item.title}
                  className={`grid grid-cols-4 bg-chessBlack-100 pl-4 pr-4 pb-4 rounded-lg border-[1px] ${
                    item.highlight ? 'border-green' : 'border-chessBlack-100'
                  }`}
                >
                  <div className="col-span-4 md:col-span-3">
                    {item.description && <div>{item.description}</div>}
                    <div className="mt-4">{item.status}</div>
                    {item.errorText && (
                      <div className="mt-4 font-bold text-errorYellow">
                        {item.errorText}
                      </div>
                    )}
                    {item.helperText && (
                      <div className="mt-3">{item.helperText}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          }
          unexpandedContent={
            <div>
              {addFundsItems.map((item) => (
                <div
                  key={item.title}
                  className={`grid grid-cols-4 align-center bg-chessBlack-100 mt-6 pt-4 pl-4 pr-4 rounded-lg border-[1px] ${
                    item.highlight ? 'border-green' : 'border-chessBlack-100'
                  }`}
                >
                  <div className="col-span-3">
                    <div className="flex align-center">
                      {item.iconContent || <h3>{item.title}</h3>}
                    </div>
                    {<div className="mt-2 text-xs mr-14">{item.subtitle}</div>}
                    <div className="mt-4">{item.status}</div>
                    {item.errorText && (
                      <div className="mt-4 font-bold text-errorYellow">
                        {item.errorText}
                      </div>
                    )}
                    {item.helperText && (
                      <div className="mt-3">{item.helperText}</div>
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
          }
        />
      </div>
      <div className="bg-chessBlack-100 rounded-lg">
        <Accordion
          content={
            <div>
              {cashOutItems.map((item) => (
                <div
                  key={item.name}
                  className={`grid grid-cols-4 bg-chessBlack-100 pl-4 pr-4 pb-4 rounded-lg border-[1px] ${
                    item.highlight ? 'border-green' : 'border-chessBlack-100'
                  }`}
                >
                  <div className="col-span-4 md:col-span-3">
                    {item.description && <div>{item.description}</div>}
                    <div className="mt-4">{item.status}</div>
                    {item.errorText && (
                      <div className="mt-4 font-bold text-errorYellow">
                        {item.errorText}
                      </div>
                    )}
                    {item.helperText && (
                      <div className="mt-3">{item.helperText}</div>
                    )}
                  </div>
                </div>
              ))}
              <p className="mt-2 p-4 italic">
                For your protection, funds can only be sent one-way from your
                Treasure Chess wallet to your bank. Funds can never be withdrawn
                from your bank using this method.
              </p>
            </div>
          }
          unexpandedContent={
            <div>
              {cashOutItems.map((item) => (
                <div
                  key={item.title}
                  className={`grid grid-cols-4 align-center bg-chessBlack-100 mt-6 pt-4 pl-4 pr-4 rounded-lg border-[1px] ${
                    item.highlight ? 'border-green' : 'border-chessBlack-100'
                  }`}
                >
                  <div className="col-span-3">
                    <div className="flex align-center">
                      {item.iconContent || <h3>{item.title}</h3>}
                    </div>
                    {<div className="mt-2 text-xs mr-14">{item.subtitle}</div>}
                    <div className="mt-4">{item.status}</div>
                    {item.errorText && (
                      <div className="mt-4 font-bold text-errorYellow">
                        {item.errorText}
                      </div>
                    )}
                    {item.helperText && (
                      <div className="mt-3">{item.helperText}</div>
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
          }
        />
      </div>
      <div>
        {items.map((item) => (
          <div
            key={item.title}
            className={`grid grid-cols-4 align-center bg-chessBlack-100 mt-6 p-4 rounded-lg border-[1px] ${
              item.highlight ? 'border-green' : 'border-chessBlack-100'
            }`}
          >
            <div className="col-span-3">
              <div className="flex align-center">
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
              {item.helperText && <div className="mt-3">{item.helperText}</div>}
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
