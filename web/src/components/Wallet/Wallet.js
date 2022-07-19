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
  const { getRampUrl, isLoading } = useRamp()

  if (!currentUser) {
    return <></>
  }

  const sendTokensItems = [
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
        <p className="mb-4 mr-8">
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

  const detailsItems = [
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
          <div className="mt-2 pb-4">
            <MemberMintCredits />
          </div>
        </>
      ),
    },
  ]
  const addFundsItems = [
    {
      title: 'Credits',
      subtitle: 'Instantly add funds using a debit card.',
      description: (
        <div>
          <div className="grid sm:grid-cols-2 gap-2 sm:grid-flow-row">
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
      subtitle: <p>Send funds to your bank at any time.</p>,
      description: (
        <div>
          <div className="grid sm:grid-cols-2 gap-2 sm:grid-flow-row">
            {getWithdrawalOptions({ getRampUrl, isLoading }).map((item) => {
              return <div key={item.key}>{item}</div>
            })}
          </div>
        </div>
      ),
      button: (
        <Button variant="green" size="small" className="w-32">
          <div className="flex py-1 justify-center flex-row items-center">
            <ArrowUpSquareFill className="w-6 h-6 mr-3" />
            {t('Cash out')}
          </div>
        </Button>
      ),
    },
  ]

  return (
    <div className="max-width-container">
      <h1>{'Wallet'}</h1>
      {
        <div>
          {detailsItems.map((item) => (
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
                {item.description && (
                  <div className="mt-2 mr-10">{item.description}</div>
                )}
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
                <div className="flex justify-end ml-10">
                  <div>{item.button}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      }
      <div className="bg-chessBlack-100 rounded-lg mt-4">
        <Accordion
          unexpandedContent={addFundsItems.map((item) => (
            <div
              key={item.title}
              className={`flex bg-chessBlack-100 pt-4 pl-4 pr-4 rounded-lg border-[1px] ${
                item.highlight ? 'border-green' : 'border-chessBlack-100'
              }`}
            >
              <div className="flex-col">
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
            </div>
          ))}
          toggle={addFundsItems.map((item) => (
            <div
              key={item.title}
              className={`pr-4 flex rounded-lg mb-8 sm:mb-2 ${
                item.highlight ? 'border-green' : 'border-chessBlack-100'
              }`}
            >
              <div className="flex justify-end">
                <div>{item.button}</div>
              </div>
            </div>
          ))}
        >
          {
            <div>
              {addFundsItems.map((item) => (
                <div
                  key={item.title}
                  className={`grid grid-cols-4 bg-chessBlack-100 pl-4 pr-4 pb-2 rounded-lg border-[1px] ${
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
        </Accordion>
      </div>
      <div className="bg-chessBlack-100 rounded-lg mt-4">
        <Accordion
          unexpandedContent={cashOutItems.map((item) => (
            <div
              key={item.title}
              className={`flex bg-chessBlack-100 pt-4 pl-4 pr-4 rounded-lg border-[1px] ${
                item.highlight ? 'border-green' : 'border-chessBlack-100'
              }`}
            >
              <div className="flex-col">
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
            </div>
          ))}
          toggle={cashOutItems.map((item) => (
            <div
              key={item.title}
              className={`pr-4 flex rounded-lg mb-8 sm:mb-2 ${
                item.highlight ? 'border-green' : 'border-chessBlack-100'
              }`}
            >
              <div className="flex justify-end">
                <div>{item.button}</div>
              </div>
            </div>
          ))}
        >
          {
            <div>
              <p className="pl-4 pr-4 pb-2 italic">
                For your protection, funds can only be sent one-way from your
                Treasure Chess wallet to your bank. Funds can never be withdrawn
                from your bank using this method.
              </p>
              <div>
                {cashOutItems.map((item) => (
                  <div
                    key={item.title}
                    className={`grid grid-cols-4 bg-chessBlack-100 pl-4 pr-4 pb-2 rounded-lg border-[1px] ${
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
            </div>
          }
        </Accordion>
      </div>
      {
        <div>
          {sendTokensItems.map((item) => (
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
                  <div className="mt-2 mr-10">{item.description}</div>
                )}
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
                <div className="flex justify-end ml-10">
                  <div>{item.button}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default Wallet
