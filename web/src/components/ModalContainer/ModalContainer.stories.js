import ModalContainer from './ModalContainer'

import logo from '../../assets/icons/wyre.png'

const bodyWyreDeposit =
  'Fund your wallet using Wyre. Funds are typically added in less than 3 minutes, and can be withdrawn anytime according to the limits set by Wyre.'

const bodyWyreWithdrawal =
  'Withdraw your funds using Wyre. Funds can be withdrawn anytime according to the limits set by Wyre.'

const bodyStyle = { fontSize: '16px' }

const bodyDeposit = (
  <div>
    <p className="pb-2" style={bodyStyle}>
      WARNING: At this time you can only deposit USDC on the Polygon Network
      (Matic).
    </p>
    <p className="pb-2" style={bodyStyle}>
      Do not send anything else to this address, or use other networks. You will
      not be able to recover other assets, and they may be lost forever. We
      cannot guarantee support will be added for other networks or assets.
    </p>
    <p className="pb-2" style={bodyStyle}>
      By continuing you agree you’ve read this and understand these risks.
    </p>
  </div>
)

export const wyreDeposit = () => {
  return (
    <div>
      <ModalContainer
        headerText="Deposit Funds"
        bodyText={bodyWyreDeposit}
        submitText="Deposit with Wyre"
        iconSrc={logo}
        onSubmit={() => {
          /* eslint-disable-next-line no-console */
          console.log('ONSUBMIT MODAL')
        }}
        onClose={() => {
          /* eslint-disable-next-line no-console */
          console.log('CLOSED MODAL')
        }}
      />
      <div>
        <p style={{ fontSize: '20px' }}>
          “Money never made a man happy yet, nor will it. There is nothing in
          its nature to produce happiness. The more a man has, the more he
          wants. Instead of its filling a vacuum, it makes one.”
        </p>
      </div>
    </div>
  )
}

export const wyreWithdrawal = () => {
  return (
    <div>
      <ModalContainer
        headerText="Withdrawal Funds"
        bodyText={bodyWyreWithdrawal}
        submitText="Withdrawal with Wyre"
        iconSrc={logo}
        onSubmit={() => {
          /* eslint-disable-next-line no-console */
          console.log('ONSUBMIT MODAL')
        }}
        onClose={() => {
          /* eslint-disable-next-line no-console */
          console.log('CLOSED MODAL')
        }}
      />
      <div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
      </div>
    </div>
  )
}

export const deposit = () => {
  return (
    <div>
      <ModalContainer
        headerText="Deposit USDC"
        bodyText={bodyDeposit}
        submitText="Copy Wallet Address"
        onSubmit={() => {
          /* eslint-disable-next-line no-console */
          console.log('ADDRESS COPIED')
        }}
        onClose={() => {
          /* eslint-disable-next-line no-console */
          console.log('CLOSED MODAL')
        }}
      />
      <div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
        <div>blah blah blah home content</div>
      </div>
    </div>
  )
}

export default { title: 'Components/ModalContainer' }
