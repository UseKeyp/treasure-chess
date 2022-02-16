import Avatar from 'src/components/Avatar'
import Button from 'src/components/Button/Button'
import Icon from 'src/components/Icon'
import { useAuth } from '@redwoodjs/auth'
import MemberBalance from 'src/components/Member/MemberBalance'

import globalConfig from 'src/global.config'

import { getFlagBase64 } from '@treasure-chess/treasure-html'
import { useWallet } from 'src/providers/wallet'

import { trimAddress } from 'src/utils/helpers'

const MemberDetails = ({ member, isProfile }) => {
  const { isAuthenticated } = useAuth()
  const { deposit, withdraw, getAddress } = useWallet()

  return (
    <section className="member-details p-4 w-full lg:w-1/2">
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
          <div className="flex mt-2 mx-auto lg:mx-0 ">
            {isAuthenticated ? (
              <>
                <p className="mr-2">{trimAddress(member.address)}</p>
                <button onClick={getAddress}>
                  <Icon name="copy" color="#147DDD" />
                </button>
              </>
            ) : (
              <Button variant="green" size="small" className="w-40">
                Donate
              </Button>
            )}
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
              <MemberBalance />
            </h4>
            <Button
              onClick={deposit}
              variant="green"
              size="small"
              className="w-40"
            >
              Deposit Funds
            </Button>
            <Button
              onClick={withdraw}
              variant="orange"
              textColor="black"
              size="small"
              className="w-40"
            >
              Withdraw Funds
            </Button>
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
