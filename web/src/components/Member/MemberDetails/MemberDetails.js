import Avatar from 'src/components/Avatar'
import Button from 'src/components/Button/Button'
import { Link, routes } from '@redwoodjs/router'
import Icon, { TwitchIcon } from 'src/components/Icon'
import { useOAuth } from 'src/providers/oAuth'

import MemberBalance from 'src/components/Member/MemberBalance'

import globalConfig from 'src/global.config'

import { getFlagBase64 } from '@treasure-chess/treasure-html'
import { useWallet } from 'src/providers/wallet'

import { trimAddress } from 'src/utils/helpers'

const TwitchLink = ({ isProfile, username }) => {
  const { getOAuthUrl, isLoading } = useOAuth()

  const onConnectTwitch = async () => {
    const oAuthUrl = await getOAuthUrl('TWITCH')
    if (oAuthUrl)
      window.open(
        oAuthUrl.url,
        'Twitch - Connect',
        'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
      )
  }

  if (isProfile) {
    return (
      <Button disabled={isLoading} onClick={onConnectTwitch} className="ml-2">
        <div className="flex flex-row">
          <TwitchIcon color={username ? undefined : '#ABB6B9'} />
          <p className="ml-1">{username ? 'Update' : 'Connect'}</p>
        </div>
      </Button>
    )
  }
  if (username)
    return (
      <div className="ml-2 flex">
        <a
          href={`https://www.twitch.tv/${username}`}
          target="_blank"
          rel="noreferrer"
        >
          <TwitchIcon />
        </a>
      </div>
    )
  return null
}

const MemberDetails = ({ member, isProfile }) => {
  const { deposit, withdraw, getAddress } = useWallet()
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
          <div className="mt-2 w-full content-center member-details--member-content">
            {isProfile ? (
              <div className="flex">
                <p className="mr-2">{trimAddress(member.address)}</p>
                <button onClick={getAddress}>
                  <Icon name="copy" color="#147DDD" />
                </button>
              </div>
            ) : (
              <Button
                onClick={getAddress}
                variant="green"
                size="small"
                className="w-40"
              >
                Donate
              </Button>
            )}
          </div>
          <div className="mt-2 member-details--member-content">
            {member.masterTitle && <p>{member.masterTitle}</p>}
            <img
              alt={`Flag of ${member.country}`}
              src={getFlagBase64(member.country)}
            />
            <TwitchLink
              username={member.twitchUsername}
              isProfile={isProfile}
            />
          </div>
          {isProfile && (
            <div className="mt-2 member-details--member-content">
              <p>
                <Link
                  to={routes.member({ usernameOrAddress: member.username })}
                >
                  View public profile
                </Link>
              </p>
            </div>
          )}
        </div>

        {isProfile && (
          <div className="member-details--funds-actions">
            <h4>
              <MemberBalance />
            </h4>
            <Button
              onClick={deposit}
              variant="blue"
              size="small"
              className="w-32"
            >
              Deposit
            </Button>
            <Button
              onClick={withdraw}
              variant="green"
              // textColor="black"
              size="small"
              className="w-32"
            >
              Withdraw
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
