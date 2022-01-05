import Header from 'src/components/Header'

import SiteFooter from './SiteFooter'

import ModalContainer from 'src/components/ModalContainer/ModalContainer'
import { useModal } from 'src/hooks/useModal'
import { useEffect } from 'react'

const DefaultLayout = ({ children }) => {
  const { isVisible, toggleModal } = useModal()

  useEffect(() => {
    const visited = window.localStorage.getItem('gdpr-accepted')
    !visited && toggleModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <ModalContainer
        headerText="Please allow us to store cookies"
        submitText="Accept"
        content="We need your consent to set cookies on your device. To agree, click 'Accept' below."
        hideCancelButton={true}
        isVisible={isVisible}
        onSubmit={() => {
          window.localStorage.setItem('gdpr-accepted', true)
          toggleModal()
        }}
      />
      <div className="flex flex-col min-h-screen">
        <header className="relative mb-8">
          <Header />
        </header>
        <div className="flex-grow">
          <div className="max-w-7xl mx-auto px-0 sm:px-0 sm:max-w-screen">
            {children}
          </div>
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
