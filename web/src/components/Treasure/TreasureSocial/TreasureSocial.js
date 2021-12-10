import Twitter from './Twitter.svg'
import Facebook from './facebook.svg'
import MemberLink from 'src/components/MemberLink'

const TreasureSocial = ({ treasure }) => {
  const { minter, owner, tokenId, white, black } = treasure
  const rootUrl = process.env.APP_DOMAIN
  const linkToShare = `${rootUrl}/treasures/${tokenId}`
  const facebookHandler = () => {
    const uriComponent = encodeURIComponent(linkToShare)
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${uriComponent}`,
      'facebook-share-dialog',
      'width=626,height=436'
    )
  }
  return (
    <div className="treasure-social">
      <div className="treasure-social__persons">
        <p className="treasure-social__person">
          Owner <MemberLink usernameOrAddress={owner.username} />
        </p>
        <p className="treasure-social__person">
          Creator <MemberLink usernameOrAddress={minter.username} />
        </p>
      </div>
      <div className="treasure-social__socials">
        <p className="treasure-social__title">Share Your Treasure</p>
        <div className="treasure-social__buttons">
          <button onClick={facebookHandler}>
            <Facebook />
          </button>
          <a
            href={`https://twitter.com/share?ref_src=twsrc%5Etfw&text=Check out this Treasure! Played by ${white.username} and ${black.username}&url=${linkToShare}`}
            className="twitter-share-button"
            data-text={`Check out this Treasure! Played by ${white.username} and ${black.username}`}
            data-url={linkToShare}
            data-show-count="false"
          >
            <Twitter />
          </a>
        </div>
      </div>
    </div>
  )
}

export default TreasureSocial
