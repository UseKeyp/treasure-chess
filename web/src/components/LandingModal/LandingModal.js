import Banner from 'src/components/Banner'
import { useModal } from 'src/hooks/useModal'
import { useEffect } from 'react'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'

export const content = (
  <>
    <p className="">
      Allow necessary cookies.{' '}
      <a href="/privacy" target="_blank" className="">
        Privacy Policy
      </a>
      .
    </p>
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
    if (!isBrowser) return // Support prerender
    const visited = localStorage.getItem('gdpr-accepted')
    !visited && showModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = () => {
    if (!isBrowser) return // Support prerender
    localStorage.setItem('gdpr-accepted', true)
    try {
      /* eslint-disable-next-line no-undef */
      _paq.push(['rememberConsentGiven'])
    } catch {
      // ignore
    }
    toggleModal()
  }

  return (
    <Banner
      submitText="Accept"
      content={content}
      hideCancelButton={true}
      isVisible={isVisible}
      onSubmit={onSubmit}
    />
  )
}

export default LandingModal
