import Twitter from './Twitter.svg'
import Facebook from './facebook.svg'

const TreasureSocial = ({ creator, owner, treasureId }) => {
  return (
    <div className="treasure-social">
      <div className="treasure-social__persons">
        <p className="treasure-social__person">
          Owner<span>{owner}</span>
        </p>
        <p className="treasure-social__person">
          Creator<span>{creator}</span>
        </p>
      </div>
      <div className="treasure-social__socials">
        <p className="treasure-social__title">Share Your Treasure</p>
        <div className="treasure-social__buttons">
          <Facebook />
          <a
            href="https://twitter.com/share?ref_src=twsrc%5Etfw"
            className="twitter-share-button"
            data-text="Check out this Treasure! Played by ${white player} and ${black player}"
            data-url={`http://localhost:8910/treasures/${treasureId}`}
            data-show-count="false"
          >
            <Twitter />
          </a>
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charset="utf-8"
          ></script>
        </div>
      </div>
    </div>
  )
}

export default TreasureSocial
