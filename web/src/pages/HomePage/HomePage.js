import FaqSection from 'src/components/FaqSection/FaqSection'
import { Head } from '@redwoodjs/web'

import ModalContainer from 'src/components/ModalContainer/ModalContainer'
import useModal from 'src/hooks/useModal'
import { useEffect } from 'react'
import gdpr from './gdpr'

const HomePage = () => {
  const { isVisible, toggleModal } = useModal()

  useEffect(() => {
    const visited = localStorage['visited']
    !visited && toggleModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full">
      <ModalContainer
        headerText="GDPR Example Title"
        content={gdpr}
        submitText="Accept"
        requireScroll={true}
        hideCancelButton={true}
        isVisible={isVisible}
        onSubmit={() => {
          localStorage['visited'] = true
          toggleModal()
        }}
      />
      <Head>
        <title>Treasure Chess</title>
      </Head>
      <h1 className="font-bold">Treasure Chess</h1>
      {/* TODO: remaining home page content */}
      <FaqSection />
    </div>
  )
}

export default HomePage
