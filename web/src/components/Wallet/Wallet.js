import { useAuth } from '@redwoodjs/auth'
import ModalContainer from 'src/components/ModalContainer'
import Button from 'src/components/Button'
import Icon from 'src/components/Icon'

import { useModal } from 'src/hooks/useModal'
import { useRamp } from 'src/providers/ramp/ramp'
import MemberBalance from 'src/components/Member/MemberBalance'
import MemberMintCredits from 'src/components/Member/MemberMintCredits'
import { trimAddress } from 'src/utils/helpers'
import { useWallet } from 'src/providers/wallet'

const Wallet = () => {
  const { isVisible: isVisibleBeta, toggleModal: toggleModalBeta } = useModal()
  const { currentUser } = useAuth()
  const { deposit, withdraw } = useRamp()
  const { getAddress } = useWallet()

  if (!currentUser) {
    return <></>
  }

  const items = [
    {
      title: 'Balances',
      description: (
        <div className="flex">
          <p className="mr-2">{trimAddress(currentUser.address)}</p>
          <Button onClick={() => getAddress(currentUser.address)}>
            <Icon name="copy" color="#147DDD" />
          </Button>
        </div>
      ),
      button: (
        <>
          <MemberBalance />
          <div className="mt-2 mb-4">
            <MemberMintCredits />
          </div>
        </>
      ),
    },
    {
      title: 'Add Funds',
      description: 'Instantly add funds using a debit card.',
      button: (
        <Button onClick={deposit} variant="blue" size="small" className="w-32">
          {t('Add Funds')}
        </Button>
      ),
    },
    {
      title: 'Cash out',
      description: 'Send funds to your bank at any time.',
      button: (
        <Button
          onClick={withdraw}
          variant="green"
          size="small"
          className="w-32"
        >
          {t('Cash Out')}
        </Button>
      ),
    },
  ]

  return (
    <div className="max-width-container">
      <h1>{'Wallet'}</h1>
      <div className="member-details--funds-actions"></div>

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
              {item.description && <p className="mt-2">{item.description}</p>}
              <p className="mt-4">{item.status}</p>
              {item.errorText && (
                <div className="mt-4 font-bold text-errorYellow">
                  {item.errorText}
                </div>
              )}
              {item.helperText && (
                <p className="mt-3 italic">{item.helperText}</p>
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
