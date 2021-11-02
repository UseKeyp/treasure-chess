import Avatar from 'src/components/Avatar'
import { isMobile } from 'src/utils/helpers'
import config from 'src/global.config'

import treasureLogo from './treasure_chess_logo.png'
import ExtUrl from './external_url.svg' //TODO Replace it when <Icon> component is done

const ProfileBox = ({ member }) => {
  // TODO: Remove hard-coded values
  const treasureCount = 10
  const memberBalance = 0
  const url = `${config.baseUrl}${member.address}`

  return (
    <div className="profileBox">
      <div className="profileBox__avatarWrapper flex justify-between items-center">
        <Avatar size={isMobile ? 64 : 165} image={member.imageSrc} />
      </div>
      <div className="profileBox__contentWrapper flex flex-col flex-1 justify-between">
        <div className="profileBox__contentWrapper__inner flex justify-between">
          <div className="profileBox__content flex flex-col justify-between">
            <div className="profileBox__content__inner">
              <p className="profileBox__text">{member.username}</p>
            </div>
          </div>
          <div className="profileBox__content flex flex-col justify-between text-right">
            <div className="flex items-center flex-wrap justify-end">
              <p className="profileBox__text profileBox__text--small">
                <span className="profileBox__coloredText">Treasures:</span>{' '}
              </p>
              <div className="profileBox__logoWrapper profileBox__text flex items-start">
                <img
                  className="profileBox__logo"
                  src={treasureLogo}
                  aria-hidden
                  alt=""
                />{' '}
                <span>{treasureCount}</span>
              </div>
            </div>
            <p className="profileBox__text profileBox__coloredText">
              $
              {memberBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
        {member.address && (
          <div className="profileBox__addressWrapper">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex"
            >
              {member.address} <ExtUrl />
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileBox
