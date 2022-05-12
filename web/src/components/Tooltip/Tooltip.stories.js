import Tooltip from '../Tooltip'
import Button from 'src/components/Button/Button'
import Icon from 'src/components/Icon/Icon'
import SeeMore from 'src/components/SeeMore/SeeMore'
import Avatar from 'src/components/Avatar/Avatar'
import avatar from 'src/components/Avatar/chess-avatar.png'
import MiniButton from 'src/components/MiniButton/MiniButton'

export const generated = () => {
  return (
    <Tooltip content="Log Out" direction="bottom">
      <Button>{<Icon name="logout" color="grey" />}</Button>
    </Tooltip>
  )
}

export const seeMoreTreasures = () => {
  return (
    <Tooltip content="Test Test" direction="right">
      <SeeMore />
    </Tooltip>
  )
}

export const seeWrappedTreasureCard = () => {
  return (
    <div>
      <Tooltip content={<SeeMore />} direction="right">
        {<Icon name="logout" color="grey" />}
      </Tooltip>
    </div>
  )
}

export const seeTooltipOverlayOfAvatar = () => {
  return (
    <Tooltip content="hello" direction="left">
      <Avatar image={avatar} size={128} bgColor="green" />
    </Tooltip>
  )
}

export const seeTooltipOfAvatar = () => {
  return (
    <Tooltip
      content={<Avatar image={avatar} size={128} bgColor="green" />}
      direction="right"
    >
      hello
    </Tooltip>
  )
}

export const seeTooltipSurroundingMiniButton = () => {
  return (
    <Tooltip
      content={
        <MiniButton variant="grey">
          <span style={{ fontSize: 36 }}>&#8594;</span>
        </MiniButton>
      }
      direction="right"
    >
      <MiniButton>Mint</MiniButton>
    </Tooltip>
  )
}

export default {
  title: 'Components/Tooltip',
  parameters: { layout: 'centered' },
}
