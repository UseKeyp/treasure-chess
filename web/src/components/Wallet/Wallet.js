import { useAuth } from '@redwoodjs/auth'
import ModalContainer from 'src/components/ModalContainer'
import Button from 'src/components/Button'

import { useModal } from 'src/hooks/useModal'
import { useRamp } from 'src/providers/ramp/ramp'
import MemberBalance from 'src/components/Member/MemberBalance'
import MemberMintCredits from 'src/components/Member/MemberMintCredits'
import { trimAddress } from 'src/utils/helpers'
import { ArrowUpSquareFill, ArrowDownSquareFill } from 'framework7-icons/react'

const Wallet = () => {
  const { isVisible: isVisibleBeta, toggleModal: toggleModalBeta } = useModal()
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
      <ModalContainer
        isVisible={isVisibleBeta}
        hideModal={toggleModalBeta}
        headerText="Request Beta Access"
        content={
          <>
            <iframe
              title="Request Beta Access"
              src="https://mautic.tools.treasurechess.com/form/2"
              width="100%"
              height="500"
            >
              <p>Your browser does not support iframes.</p>
            </iframe>
          </>
        }
      />
    </div>
  )
}

export default Wallet
