import Avatar from 'src/components/Avatar'
import Icon from 'src/components/Icon'

import MemberBalanceCell from 'src/components/Member/MemberBalanceCell'
import { AddressModal, WithdrawModal, DepositModal } from './modals'

import globalConfig from 'src/global.config'

import { getFlagBase64 } from '@treasure-chess/treasure-html'

import { trimAddress } from 'src/utils/helpers'
import useModal from 'src/hooks/useModal'

const MemberDetails = ({ member, isProfile }) => {
  const { isVisible: isVisibleDep, toggleModal: toggleModalDep } = useModal()
  const { isVisible: isVisibleWit, toggleModal: toggleModalWit } = useModal()
  const { isVisible: isVisibleAdd, toggleModal: toggleModalAdd } = useModal()

  const onSubmitDeposit = () => {}
  const onSubmitWithdraw = () => {}

  return (
    <section className="member-details p-4">
      <DepositModal
        onSubmit={onSubmitDeposit}
        isVisible={isVisibleDep}
        toggleModal={toggleModalDep}
      />
      <WithdrawModal
        onSubmit={onSubmitWithdraw}
        isVisible={isVisibleWit}
        toggleModal={toggleModalWit}
      />
      <AddressModal
        address={member.address}
        isVisible={isVisibleAdd}
        toggleModal={toggleModalAdd}
      />
      <div className="member-details--inner">
        <div className="member-details--avatar">
          <Avatar size="8rem" src={member.imageSrc} />
        </div>

        <div className="member-details--member-info">
          <h3>
            <a
              href={`${globalConfig.CHESS_COM_BASE_URL}members/${member.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold"
            >
              {member.username}
            </a>
          </h3>
          <div className="flex mt-2">
            <p className="mr-2">{trimAddress(member.address)}</p>
            <button onClick={toggleModalAdd}>
              <Icon name="copy" color="#147DDD" />
            </button>
          </div>
          <div className="mt-2">
            {member.masterTitle && <p>{member.masterTitle}</p>}
            <img
              alt={`Flag of ${member.country}`}
              src={getFlagBase64(member.country)}
            />
          </div>
        </div>

        {isProfile && (
          <div className="member-details--funds-actions">
            <h4>
              <MemberBalanceCell />
            </h4>
            <button
              type="button"
              onClick={toggleModalDep}
              className="text-sm rounded font-bold deposit-funds"
            >
              Deposit Funds
            </button>
            <button
              type="button"
              className="text-sm text-black rounded font-bold withdraw-funds"
              onClick={toggleModalWit}
            >
              Withdraw Funds
            </button>
            <p className="mt-2">
              <a
                href={globalConfig.HOW_TO_BUY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                How to buy and FAQ
              </a>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default MemberDetails
