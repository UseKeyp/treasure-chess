import winIndicatorWhite from './win-indicator-white.png'
import winIndicatorBlack from './win-indicator-black.png'
import winIndicatorDraw from './win-indicator-draw.png'
import chessBoardIcon from './chess-board-icon.png'
import winIndicatorBlackWhiteEd from './win-indicator-black__white-ed.png'
import winIndicatorWhiteWhiteEd from './win-indicator-white__white-ed.png'
import winIndicatorDrawWhiteEd from './win-indicator-draw__white-ed.png'
import clockIcon from './clock-icon.png'
import ColoredBanner from './ColoredBanner'

import './styles.scss'
import 'flag-icon-css/css/flag-icon.css'

const TreasureCard = ({ treasure }) => {
  const isWhiteEdition = treasure.cardColor === 'white'
  const isDraw = treasure.outcome === 'draw'
  let winnerText = 'Draw!'
  let winIndicatorBanner = isWhiteEdition
    ? winIndicatorDrawWhiteEd
    : winIndicatorDraw
  if (treasure.outcome === 'black') {
    winIndicatorBanner = isWhiteEdition
      ? winIndicatorBlackWhiteEd
      : winIndicatorBlack
    winnerText = 'Black Wins!'
  } else if (treasure.outcome === 'white') {
    winIndicatorBanner = isWhiteEdition
      ? winIndicatorWhiteWhiteEd
      : winIndicatorWhite
    winnerText = 'White Wins!'
  }

  const { white: player1, black: player2 } = treasure
  // TODO: Pull from treasure
  const gifUrl = 'https://media0.giphy.com/media/3o6ZsYLRb6IG6vAkcU/giphy.gif'
  // TODO: Calculate from achievement
  const bannerColors = ['#fffff', '#00000']
  const matchId = treasure.externalUrl.split('/').pop()
  const gameDate = new Date(treasure.endTime)

  return (
    <div
      className={`game-card-container bg-white text-black relative box-content ${
        isWhiteEdition ? 'is-white-edition' : ''
      }`}
      style={{
        borderColor: isWhiteEdition ? '#BEBDB9' : '#000000',
        color: isWhiteEdition ? '#4B4847' : '#ffffff',
      }}
    >
      <h2 className="game-card-title-cont">{treasure.name}</h2>
      <div className="inner-container">
        <div className="top-row-container">
          <div className="profile-container">
            <div
              alt="player 1"
              className="player-pic"
              style={{ backgroundImage: `url(${player1.imgSrc})` }}
            />
            <div className="username-text">
              {player1.id}
              {treasure.whiteMasterTitle && <span className="gm-tag">GM</span>}
            </div>
            <div className="user-details-container">
              {/* `countryCode` should be the ISO 3166-1-alpha-2 code */}
              {/* https://www.iso.org/obp/ui/#search */}
              <span
                className={`flag-icon flag-icon-left flag-icon-${player1.countryCode}`}
              />
              <span className="user-number-text">{treasure.whiteRating}</span>
            </div>
          </div>
          <div className="center-info">
            <img
              className="win-indicator-background"
              style={{
                marginLeft: treasure.outcome !== 'white' ? 'auto' : undefined,
                marginRight: isDraw ? 'auto' : undefined,
              }}
              src={winIndicatorBanner}
              alt=""
            />
            <div
              style={{
                textShadow: isWhiteEdition
                  ? '0px 1px 0px rgba(255, 255, 255, 0.5)'
                  : '0px 1px 0px rgba(0, 0, 0, 0.25)',
              }}
              className="winner-text"
            >
              {winnerText}
              <div className="winner-subtext">by {treasure.termination}</div>
            </div>
          </div>
          <div className="profile-container profile-container_right">
            <div
              alt="player 2"
              className="player-pic"
              style={{ backgroundImage: `url(${player2.imgSrc})` }}
            />
            <div className="username-text">
              {treasure.blackMasterTitle && <span className="gm-tag">GM</span>}
              {player2.id}
            </div>
            <div className="user-details-container">
              <span className="user-number-text">{treasure.blackRating}</span>
              <span
                className={`flag-icon flag-icon-right flag-icon-${player2.countryCode}`}
              />
            </div>
          </div>
        </div>
        <img
          alt="GIF of chess match"
          className="game-card-match-gif"
          src={gifUrl}
        />
        <div className="feature-list-container">
          <ul className="list-disc feature-list">
            {treasure.achievements.split(',').map((feature) => (
              <li key={feature}>
                {feature.replace(/^\w/, (c) => c.toUpperCase())}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="bottom-info-bar"
          style={{ backgroundColor: isWhiteEdition ? '#B6B5B2' : '#292929' }}
        >
          <div className="flex bottom-bar-info-datum">
            <img alt="" src={chessBoardIcon} className="bottom-bar-icon" />
            {treasure.gameRuleVariant}
          </div>
          <div className="flex bottom-bar-info-datum">
            <img alt="" src={clockIcon} className="bottom-bar-icon" />
            {new Date(treasure.timeControl * 1000).toISOString().substr(11, 5)}
          </div>
          <div className="colored-banner-container">
            <ColoredBanner
              lightColor={bannerColors[0]}
              darkColor={bannerColors[1]}
              height={26}
            />
          </div>
        </div>
        <div className="footer-bar">
          <div>
            <span className="green-text">
              <span className="capitalize">
                {treasure.cardColor.replace(/^\w/, (c) => c.toUpperCase())}
              </span>{' '}
              Edition{' '}
            </span>
            1/1
          </div>
          <div className="middle-item">
            <span className="green-text">Match</span>{' '}
            <a href={treasure.externalUrl} target="_blank" rel="noreferrer">
              #{matchId}
            </a>
          </div>
          <div className="right-item">
            {gameDate.toLocaleString('default', { month: 'long' })}{' '}
            <span className="green-text">{gameDate.getDate()}</span>{' '}
            {gameDate.getFullYear()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TreasureCard
