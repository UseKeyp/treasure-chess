import { Form, Submit, Label, SelectField } from '@redwoodjs/forms'
import { useForm } from 'react-hook-form'

import TreasureCard from './TreasureCard'

const TreasureCardConverter = (props) => {
  // here we are cleaning props to delete unused values
  // eslint-disable-next-line no-unused-vars
  const { edition, winner: propsWinner, ...all } = props
  const formMethods = useForm()
  const [cardType, setCardType] = React.useState('black')
  const [winner, setWinner] = React.useState('black')
  const [renderedHTML, setRenderedHTML] = React.useState(<></>)

  const component = React.useRef(null)

  const convertStyle = (element) => {
    if (element === null) return
    if (typeof element === 'string') return
    if (!element) return
    const computedStyle = window.getComputedStyle(element)
    for (let styleKey in element.style) {
      if (isNaN(Number(styleKey))) {
        for (let computedStyleKey in computedStyle) {
          let computedStyleKeyCamelCase = computedStyleKey.replace(
            /\-([a-z])/g,
            (v) => v[1].toUpperCase()
          )
          if (
            typeof element.style[styleKey] !== 'function' &&
            styleKey !== 'cssText' &&
            styleKey !== 'length' &&
            styleKey !== 'parentRule'
          ) {
            if (styleKey == computedStyleKeyCamelCase) {
              element.style[styleKey] = computedStyle[computedStyleKey]
            }
          }
        }
      }
    }
  }

  const convertStylesRecursively = (element) => {
    const children = [...element.childNodes]
    convertStyle(element)
    if (children.length > 0) {
      children.forEach((c) => {
        if (c.tagName) convertStylesRecursively(c)
      })
    }
  }

  const renderCard = () => {
    const parent = component.current
    convertStylesRecursively(parent)
    setRenderedHTML(`${parent.parentElement.innerHTML}`)
  }

  const onSubmit = (data) => {
    setCardType(data.cardType)
    setWinner(data.winner)
    formMethods.reset()
  }

  return (
    <>
      <Form
        formMethods={formMethods}
        onSubmit={onSubmit}
        className="card-to-convert__form"
      >
        <div className="card-to-convert__select">
          <Label name="cardType">Card Type</Label>
          <SelectField name="cardType">
            <option>white</option>
            <option>black</option>
          </SelectField>
        </div>
        <div className="card-to-convert__select">
          <Label name="winner">Winner</Label>
          <SelectField name="winner">
            <option>white</option>
            <option>black</option>
            <option>draw</option>
          </SelectField>
        </div>
        <Submit className="rect-button green rw-button rw-button-blue">
          Render
        </Submit>
      </Form>
      <div className="card-to-convert__content">
        <TreasureCard
          reference={component}
          {...all}
          winner={cardType.toUpperCase()}
          edition={winner.toUpperCase()}
        />
      </div>
      <div className="card-to-convert__converted">
        <button
          className="rect-button green rw-button rw-button-blue"
          onClick={renderCard}
        >
          Convert!
        </button>
        <code>{renderedHTML}</code>
      </div>
    </>
  )
}

export default TreasureCardConverter
