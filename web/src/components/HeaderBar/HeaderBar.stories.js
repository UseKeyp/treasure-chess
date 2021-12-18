import HeaderBar from './HeaderBar'
import Button from '../Button/Button'

export const generated = () => {
  return <HeaderBar text="Featured Players" />
}

export const withSmallText = () => {
  return <HeaderBar type="small" text="Featured Players" />
}

export const withChildren = () => {
  return (
    <HeaderBar text="Featured Players">
      <Button>button</Button>
    </HeaderBar>
  )
}

export const withChildrenAndJustified = () => {
  return (
    <HeaderBar text="Featured Players" justifyChildren="right">
      <Button>button</Button>
    </HeaderBar>
  )
}

export const withSmallTextChildrenAndJustified = () => {
  return (
    <HeaderBar type="small" text="Featured Players" justifyChildren="right">
      <Button>button</Button>
    </HeaderBar>
  )
}

export default { title: 'Components/HeaderBar' }
