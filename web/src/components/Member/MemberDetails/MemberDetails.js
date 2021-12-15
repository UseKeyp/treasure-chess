import Avatar from 'src/components/Avatar'
import { isMobile } from 'src/utils/helpers'
import config from 'src/global.config'

import ExtUrl from './external_url.svg' //TODO Replace it when <Icon> component is done

const MemberDetails = ({ member }) => {
  // TODO: Remove hard-coded values
  const treasureCount = 10
  const memberBalance = 0
  const url = `${config.baseUrl}${member.address}`

  return (
    <div className="MemberDetails">
      <div className="MemberDetails__avatarWrapper flex justify-between items-center">
        <Avatar size={isMobile ? 64 : 165} image={member.imageSrc} />
      </div>
      <div className="MemberDetails__contentWrapper flex flex-col flex-1 justify-between">
        <div className="MemberDetails__contentWrapper__inner flex justify-between">
          <div className="MemberDetails__content flex flex-col justify-between">
            <div className="MemberDetails__content__inner">
              <p className="MemberDetails__text">{member.username}</p>
            </div>
          </div>
          <div className="MemberDetails__content flex flex-col justify-between text-right">
            <div className="flex items-center flex-wrap justify-end">
              <p className="MemberDetails__text MemberDetails__text--small">
                <span className="MemberDetails__coloredText">Treasures:</span>{' '}
              </p>
              <div className="MemberDetails__logoWrapper MemberDetails__text flex items-start">
                <img
                  className="MemberDetails__logo"
                  src=""
                  aria-hidden
                  alt=""
                />{' '}
                <span>{treasureCount}</span>
              </div>
            </div>
            <p className="MemberDetails__text MemberDetails__coloredText">
              $
              {memberBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
        {member.address && (
          <div className="MemberDetails__addressWrapper">
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

export default MemberDetails
