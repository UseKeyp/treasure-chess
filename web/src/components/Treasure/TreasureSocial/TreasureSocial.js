import Twitter from './Twitter.svg'
import Facebook from './facebook.svg'
import MemberLink from 'src/components/MemberLink'

const TreasureSocial = ({ treasure }) => {
  const { minter, owner, id, white, black } = treasure
  const rootUrl = process.env.TOKEN_URI_DOMAIN
  const linkToShare = `${rootUrl}/treasures/${id}`

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
          Owner <MemberLink id={owner.id} member={owner} />
        </p>
        <p className="treasure-social__person">
          Creator <MemberLink id={minter.id} member={minter} />
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
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charset="utf-8"
          ></script>
          <script>
            {(function (d, s, id) {
              var js,
                fjs = d.getElementsByTagName(s)[0]
              if (d.getElementById(id)) return
              js = d.createElement(s)
              js.id = id
              js.src =
                'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0'
              fjs.parentNode.insertBefore(js, fjs)
            })(document, 'script', 'facebook-jssdk')}
          </script>
        </div>
      </div>
    </div>
  )
}

export default TreasureSocial
