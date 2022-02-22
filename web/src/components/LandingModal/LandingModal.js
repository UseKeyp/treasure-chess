import ModalContainer from 'src/components/ModalContainer'
import Icon from 'src/components/Icon'
import { useModal } from 'src/hooks/useModal'
import { useEffect } from 'react'

export const content = (
  <>
    <ul className="ml-10">
      <li>
        <h2 className="-indent-9 ">
          <b>
            <span className="mr-2">❤️</span> 100% of primary sales to creators
          </b>
        </h2>
        <h3 className="mt-2">
          Secondary sales: 90% seller / 5% player / 5% platform
        </h3>
      </li>
      <li>
        <h2 className="-indent-9 ">
          <span className="mr-2">🌱</span> <b>Environmentally friendly</b>
        </h2>
        <h3 className="mt-2 ">
          Less energy is consumed than from playing a game of chess online.
        </h3>
      </li>
      <li>
        <h2 className="-indent-9 ">
          <span className="mr-3">🌞</span>
          <b>Fun</b>
        </h2>
        <h3 className="mt-2 ">
          Support the players and creator you love. Speculation is limited by a
          $100 maximum deposit.
        </h3>
      </li>
    </ul>
    <h3 className="mt-8">
      We need your consent to set cookies on your device as defined in our{' '}
      <a href="/privacy" target="_blank">
        Privacy Policy
      </a>
      .
    </h3>
  </>
)

const LandingModal = () => {
  const { isVisible, toggleModal } = useModal()

  const showModal = () => {
    toggleModal()
    // setTimeout(() => {
    //   toggleModal()
    // }, 10000)
  }

  useEffect(() => {
    const visited = window.localStorage.getItem('gdpr-accepted')
    !visited && showModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = () => {
    window.localStorage.setItem('gdpr-accepted', true)
    /* eslint-disable-next-line no-undef */
    _paq.push(['rememberConsentGiven'])
    toggleModal()
  }

  return (
    <ModalContainer
      headerText="Welcome!"
      submitText="Accept"
      content={content}
      icon={<Icon name="treasure_chess" color="white" height="30px" />}
      hideCancelButton={true}
      // isVisible={true}
      isVisible={isVisible}
      onSubmit={onSubmit}
    />
  )
}

export default LandingModal
