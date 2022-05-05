import Banner from 'src/components/Banner'
import { useModal } from 'src/hooks/useModal'
import { useEffect } from 'react'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'
// import aboutContent from 'src/pages/AboutPage/about'
// import FaqSection from 'src/components/FaqSection/FaqSection'

// <FaqSection
// title=""
// questionList={[aboutContent[2], aboutContent[3], aboutContent[4]]}
// />
export const content = (
  <>
    <p className="">
      We need your consent to set cookies on your device as defined in our{' '}
      <a href="/privacy" target="_blank" className="underline">
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
