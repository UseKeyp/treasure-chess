import Avatar from 'src/components/Avatar'
import { isMobile } from 'src/utils/helpers'
import globalConfig from 'src/global.config'
import Section from 'src/components/Section'
import { trimAddress } from 'src/utils/helpers'

import { getFlagBase64 } from '@treasure-chess/treasure-html'
import Icon from 'src/components/Icon' //TODO Replace it when <Icon> component is done

const MemberDetails = ({ member, isProfile }) => {
  const onClickAddress = () => {}

  return (
    <Section>
      <div className="MemberDetails">
        <div className="MemberDetails__avatarWrapper">
          <Avatar size="96px" src={member.imageSrc} />
        </div>
        <div className="MemberDetails__columnWrapper">
          <h3 className="MemberDetails__username">
            <a
              href={`${globalConfig.chessComBaseUrl}members/${member.username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {member.username}
            </a>
          </h3>
          <p className="MemberDetails__address">
            {trimAddress(member.address)}
            <button onClick={onClickAddress}>
              <Icon name="copy" color="#147DDD" />
            </button>
          </p>
          <div className="MemberDetails__flagsRow">
            {member.masterTitle && <p>{member.masterTitle}</p>}
            <img
              className="MemberDetails__flagsRow__countryFlag"
              src={getFlagBase64(member.country)}
            />
          </div>
        </div>
        {isProfile && (
          <div className="MemberDetails__columnWrapper">Another column</div>
        )}
      </div>
    </Section>
  )
}

export default MemberDetails
