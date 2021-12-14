import ModalContainer from './ModalContainer'

const body =
  'Fund your wallet using Wyre. Funds are typically added in less than 3 minutes, and can be withdrawn anytime according to the limits set by Wyre.'

export const generated = () => {
  return (
    <div
      // Simulating a mobile device
      style={{
        width: '100%',
        height: 800,
        overflowY: 'scroll',
        border: '1px solid #fff',
        borderRadius: 10,
        position: 'relative',
      }}
    >
      <ModalContainer
        headerText="Deposit Funds"
        bodyText={body}
        submitText="Deposit with Wyre"
        onSubmit={() => {
          /* eslint-disable-next-line no-console */
          console.log('ONSUBMIT MODAL')
        }}
        onClose={() => {
          /* eslint-disable-next-line no-console */
          console.log('CLOSED MODAL')
        }}
      >
        ModalContainer content
        <button className="rect-button green">Modal content button</button>
      </ModalContainer>
    </div>
  )
}

export default { title: 'Components/ModalContainer' }
