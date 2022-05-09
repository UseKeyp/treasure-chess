import ModalContainer from 'src/components/ModalContainer'

export const AddressModal = ({ address, isVisible, toggleModal }) => {
  const [textToPass, setTextToPass] = React.useState('Accept')

  const handleCopy = () => {
    if (typeof document === 'undefined') {
      return
    }

    const textArea = document.createElement('textarea')
    textArea.value = address
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    setTextToPass('Address Copied!')

    setTimeout(() => setTextToPass('Accept'), 4000)
  }

  return (
    <ModalContainer
      isVisible={isVisible}
      headerText="Deposit MUSDC"
      submitText={textToPass}
      onSubmit={() => handleCopy()}
      hideModal={toggleModal}
      content={
        <>
          <p className="text-base">
            <span className={'modals__matic-warning'}>
              WARNING: Only deposit <b>MUSDC</b> on the{' '}
              <b>Polygon (Matic) network</b>. Do not send funds using Coinbase.
            </span>
          </p>

          <p className="mt-4 text-base">
            Do not send anything else to this address. Do not use other
            networks.{' '}
            <b>
              You will not be able to recover unsupported assets, and they may
              be lost forever.
            </b>{' '}
            We cannot guarantee support will be added for other networks or
            assets.
          </p>

          <p className="mt-4 text-base">
            By continuing you agree you’ve read this and understand these risks.
          </p>
        </>
      }
    />
  )
}
