import ReactTooltip from 'react-tooltip'
import Icon from 'src/components/Icon/Icon'
import SeeMore from 'src/components/SeeMore/SeeMore'
import Avatar from 'src/components/Avatar/Avatar'
import avatar from 'src/components/Avatar/chess-avatar.png'
import MiniButton from 'src/components/MiniButton/MiniButton'

function onClick() {
  return 'test test'
}

export const generated = () => {
  return (
    <div>
      <a data-tip="React-tooltip" href="/#">
        <Icon name="logout" color="grey" />
      </a>
      <ReactTooltip effect="solid">Log Out</ReactTooltip>
    </div>
  )
}

export const seeWrappedFloatingTreasureCard = () => {
  return (
    <div>
      <a data-tip="React-tooltip" href="/#">
        <SeeMore />
      </a>
      <ReactTooltip>
        <div>TEST TEST TEST TEST TEST</div>
      </ReactTooltip>
    </div>
  )
}

export const seeReactTooltipOverlayOfAvatar = () => {
  return (
    <div>
      <a data-tip="React-tooltip" href="/#">
        Test Test
      </a>
      <ReactTooltip effect="solid" place="top">
        <Avatar image={avatar} size={128} bgColor="green" />
      </ReactTooltip>
    </div>
  )
}

export const seeReactTooltipOfAvatar = () => {
  return (
    <div>
      <a data-tip="React-tooltip" href="/#">
        <div>Title</div>
        <Avatar image={avatar} size={128} bgColor="green" />
      </a>
      <ReactTooltip effect="solid">Hey</ReactTooltip>
    </div>
  )
}

export const seeReactTooltipSurroundingMiniButton = () => {
  return (
    <div>
      <a data-tip="React-tooltip" href="/#">
        {' '}
        <MiniButton onClick={() => onClick()}>Mint</MiniButton>
      </a>
      <ReactTooltip place="bottom" effect="solid">
        <MiniButton onClick={() => onClick()} variant="grey">
          <div style={{ fontSize: 36 }}>&#8594;</div>
        </MiniButton>
      </ReactTooltip>
    </div>
  )
}

export default {
  title: 'Components/ReactTooltip',
  parameters: { layout: 'centered' },
}
