import Icon from 'src/components/Icon'
import MemberLink from 'src/components/MemberLink'

const TreasureSocial = ({ treasure }) => {
  const [label, setLabel] = React.useState(false)
  const linkToShare = `${process.env.APP_DOMAIN}/treasures/${treasure?.tokenId}`

  const labelHandler = React.useCallback(() => {
    if (typeof document === 'undefined') {
      return
    }

    const textArea = document.createElement('textarea')
    textArea.value = linkToShare
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    setLabel(true)

    setTimeout(() => setLabel(false), 2000)
  }, [linkToShare])

  const facebookHandler = () => {
    const uriComponent = encodeURIComponent(linkToShare)
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${uriComponent}`,
      'facebook-share-dialog',
      'width=626,height=436'
    )
  }
  return (
    <div className="treasure-social-container">
      <h1 className="table-header">Details</h1>
      <div className="treasure-social">
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
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
        <div className="treasure-social__persons">
          <p className="treasure-social__person">
            Owner <MemberLink usernameOrAddress={treasure?.owner?.username} />
          </p>
          <p className="treasure-social__person">
            Creator{' '}
            <MemberLink usernameOrAddress={treasure?.minter?.username} />
          </p>
        </div>
        <div className="treasure-social__socials">
          <p className="treasure-social__title">Share this Treasure</p>
          <div className="treasure-social__buttons">
            <button onClick={labelHandler}>
              {label ? (
                <p>Copied</p>
              ) : (
                <Icon name="share" color="#abb6b9" size={24} />
              )}
            </button>
            <button onClick={facebookHandler}>
              <Icon name="facebook" size={24} />
            </button>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://twitter.com/share?ref_src=twsrc%5Etfw&text=Check out this Treasure! Played by ${treasure?.white?.username} and ${treasure?.black?.username}&url=${linkToShare}`}
              className="twitter-share-button"
              data-text={`Check out this Treasure played by ${treasure?.white?.username} and ${treasure?.black?.username}`}
              data-url={linkToShare}
              data-show-count="false"
            >
              <Icon name="twitter" size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TreasureSocial
