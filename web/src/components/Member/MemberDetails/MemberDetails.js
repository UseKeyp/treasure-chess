import { useState } from 'react'
import Avatar from 'src/components/Avatar'
import Button from 'src/components/Button/Button'
import { Link, routes } from '@redwoodjs/router'
import { TwitchIcon } from 'src/components/Icon'
import { useOAuth } from 'src/providers/oAuth'
import { WalletFill, Gear } from 'framework7-icons/react'

import MemberBalance from 'src/components/Member/MemberBalance'
import MemberMintCredits from 'src/components/Member/MemberMintCredits'

import globalConfig from 'src/global.config'

import { getFlagBase64 } from '@treasure-chess/treasure-html'

import { useWallet } from 'src/providers/wallet'

import Tooltip from 'src/components/Tooltip/Tooltip'

const TWITCH = 'TWITCH'

const TwitchLink = ({ isProfile, username: twitchUsername }) => {
  const { getOAuthUrl, revokeOAuth, isLoading } = useOAuth()
  const [username, setUsername] = useState(twitchUsername)
  const onClickTwitch = async () => {
    if (username) {
      const revoked = await revokeOAuth(TWITCH)
      if (revoked) setUsername('')
    } else {
      const oAuthUrl = await getOAuthUrl(TWITCH)
      if (oAuthUrl)
        window.open(
          oAuthUrl.url,
          'Twitch - Connect',
          'width=600,height=1000,toolbar=yes,location=yes,directories=yes,status=yes,menubar=yes,scrollbars=yes,copyhistory=yes,resizable=yes'
        )
    }
  }
  if (isProfile) {
    return (
      <Button disabled={isLoading} onClick={onClickTwitch} className="ml-2">
        <Tooltip
          id="twitch-tooltip"
          effect="solid"
          tooltipChild={
            <div className="flex flex-col text-md text-bold text-center">
              <div className="whitespace-nowrap">Earn $5 in credits</div>
              <div className="whitespace-nowrap">when you connect</div>
              <div className="whitespace-nowrap">your Twitch account</div>
            </div>
          }
          position="right"
          bgColor="dark"
        >
          <div className="flex flex-row">
            <TwitchIcon color={username ? undefined : '#ABB6B9'} />
            <p className="ml-1">{username ? 'Disconnect' : 'Connect'}</p>
          </div>
        </Tooltip>
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
  const { getAddress } = useWallet()
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

          <div className="mt-2 member-details--member-content">
            {member.masterTitle && (
              <div className="bg-red px-[5px] py-[3px] rounded-[3px] mr-2">
                <p className="font-bold">{member.masterTitle}</p>
              </div>
            )}
            <img
              alt={`Flag of ${member.country}`}
              src={getFlagBase64(member.country)}
            />
            <TwitchLink
              username={member.twitchUsername}
              isProfile={isProfile}
            />
          </div>
          {!isProfile && member.address && (
            <div className="mt-4 w-full content-center member-details--member-content">
              <Button
                onClick={() => getAddress(member.address)}
                variant="green"
                size="small"
                className="w-40"
              >
                {t('Donate')}
              </Button>
            </div>
          )}
          {isProfile && (
            <div className="mt-4 grid  gap-4  member-details--member-content">
              <p>
                <Link
                  to={routes.member({ usernameOrAddress: member.username })}
                >
                  {t('Public Profile')}
                </Link>
              </p>
            </div>
          )}
        </div>

        {isProfile && (
          <div className="member-details--funds-actions">
            <MemberBalance />
            <div className="mt-2">
              <MemberMintCredits />
            </div>
            <div className="mt-4">
              <Button
                to={routes.wallet()}
                variant="blue"
                size="small"
                className="w-32"
              >
                <div className="flex py-1 justify-center items-center">
                  <WalletFill className="w-6 h-6 mr-3" />
                  <div>{t('Wallet')}</div>
                </div>
              </Button>
            </div>
            <div>
              <Button
                to={routes.settings()}
                variant="grey"
                size="small"
                className="w-32 mt-4"
              >
                <div className="flex py-1 justify-center items-center">
                  <Gear className="w-6 h-6 mr-3" />
                  <div>{t('Settings')}</div>
                </div>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default MemberDetails
