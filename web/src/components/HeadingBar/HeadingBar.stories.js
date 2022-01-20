import HeadingBar from './HeadingBar'
import Button from '../Button/Button'

export const generated = () => {
  return <HeadingBar text="Featured Players" />
}

export const withSmallText = () => {
  return <HeadingBar type="small" text="Featured Players" />
}

export const withChildren = () => {
  return (
    <HeadingBar text="Featured Players">
      <Button>button</Button>
    </HeadingBar>
  )
}

export const withChildrenAndJustified = () => {
  return (
    <HeadingBar text="Featured Players" justifyChildren="right">
      <Button>button</Button>
    </HeadingBar>
  )
}

export const withSmallTextChildrenAndJustified = () => {
  return (
    <HeadingBar type="small" text="Featured Players" justifyChildren="right">
      <Button>button</Button>
    </HeadingBar>
  )
}

export default { title: 'Components/HeadingBar' }
