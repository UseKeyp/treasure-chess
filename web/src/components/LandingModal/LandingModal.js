import ModalContainer from 'src/components/ModalContainer'
import Icon from 'src/components/Icon'
import { useModal } from 'src/hooks/useModal'
import { useEffect } from 'react'

const LandingModal = () => {
  const { isVisible, toggleModal } = useModal()

  useEffect(() => {
    const visited = window.localStorage.getItem('gdpr-accepted')
    !visited && toggleModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = () => {
    window.localStorage.setItem('gdpr-accepted', true)
    /* eslint-disable-next-line no-undef */
    _paq.push(['rememberConsentGiven'])
    toggleModal()
  }

  const content = (
    <>
      <ul className="ml-8">
        <li>
          <h3 className="-indent-7 ">
            <b>
              <span className="mr-2">❤️</span> 95% of sales go directly to
              creators and players - that&apos;s you!
            </b>
          </h3>
          <p className="mt-2 ">First sale: 95% player / 5% platform</p>
          <p className="">
            Additional sales: 90% seller / 5% player / 5% platform
          </p>
        </li>
        <li>
          <h3 className="-indent-7 ">
            <span className="mr-2">🌱</span> <b>Environmentally friendly</b>
          </h3>
          <p className="mt-2 ">
            Less energy is used than playing a game of chess online.
          </p>
        </li>
        <li>
          <h3 className="-indent-7 ">
            <span className="mr-3">🌞</span>
            <b>Keep it fun</b>
          </h3>
          <p className="mt-2 ">
            Support the players and creator you love. Speculation is limited by
            a $100 maximum deposit.
          </p>
        </li>
      </ul>
      <p className="mt-8">
        We need your consent to set cookies on your device. To agree, click
        &apos;Accept&apos; below.
      </p>
    </>
  )

  return (
    <ModalContainer
      headerText="Treasure Chess Collectibles"
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
