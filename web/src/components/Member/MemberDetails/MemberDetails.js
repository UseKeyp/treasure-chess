import Avatar from 'src/components/Avatar'
import globalConfig from 'src/global.config'
import MemberBalanceCell from 'src/components/Member/MemberBalanceCell'
import MemberDetailsAddressModal from 'src/components/MemberDetailsAddressModal/MemberDetailsAddressModal'

import { getFlagBase64 } from '@treasure-chess/treasure-html'

const MemberDetails = ({ member, isProfile }) => {
  return (
    <section className="member-details p-4">
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
          <MemberDetailsAddressModal address={member.address} />
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
              onClick={() => {}}
              className="text-sm rounded font-bold deposit-funds"
            >
              Deposit Funds
            </button>
            <button
              type="button"
              onClick={() => {}}
              className="text-sm text-black rounded font-bold withdraw-funds"
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
