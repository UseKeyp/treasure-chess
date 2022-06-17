import Avatar from 'src/components/Avatar/Avatar'
import avatar from 'src/components/Avatar/chess-avatar.png'
import Icon from 'src/components/Icon/Icon'
import MiniButton from 'src/components/MiniButton/MiniButton'
import SeeMore from 'src/components/SeeMore/SeeMore'
import Tooltip from 'src/components/Tooltip/Tooltip'

function onClick() {
  return 'test test'
}

export const generated = () => {
  return (
    <Tooltip effect="solid" text="Log Out" position="bottom" bgColor="dark">
      <Icon name="logout" color="grey" />
    </Tooltip>
  )
}

export const seeWrappedFloatingTreasureCard = () => {
  return (
    <Tooltip effect="float" text="TEST TEST TEST TEST TEST" bgColor="dark">
      <SeeMore />
    </Tooltip>
  )
}

export const seeReactTooltipOverlayOfAvatar = () => {
  return (
    <Tooltip text="Hello" position="top" effect="solid">
      <Avatar image={avatar} size={128} bgColor="green" />
    </Tooltip>
  )
}

export const seeReactTooltipOfAvatar = () => {
  return (
    <Tooltip text="Hey" position="top" effect="solid">
      <div>Test</div>
      <Avatar image={avatar} size={128} bgColor="green" />
    </Tooltip>
  )
}

export const seeReactTooltipSurroundingMiniButton = () => {
  return (
    <Tooltip
      position="bottom"
      effect="solid"
      tooltipChild={
        <MiniButton variant="grey" onClick={() => onClick()}>
          <div style={{ fontSize: 36 }}>&#8594;</div>
        </MiniButton>
      }
    >
      <MiniButton onClick={() => onClick()}>Mint</MiniButton>
    </Tooltip>
  )
}

export default {
  title: 'Components/Tooltip',
  parameters: { layout: 'centered' },
}
