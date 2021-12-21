import { useState } from 'react'

import ModalContainer from 'src/components/ModalContainer/ModalContainer'
import Icon from 'src/components/Icon'

const MemberDetailsDepositModal = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm rounded font-bold deposit-funds"
      >
        Deposit Funds
      </button>
      <ModalContainer
        isVisible={isOpen}
        onSubmit={() => {}}
        hideModal={() => setOpen(false)}
        headerText="Deposit Funds"
        icon={<Icon name="wyre" />}
        submitText="Deposit with Wyre"
        content={
          <p className="text-base">
            Fund your wallet using Wyre. Funds are typically added in less than
            3 minutes, and can be withdrawn anytime according to the limits set
            by Wyre.
          </p>
        }
      />
    </>
  )
}

export default MemberDetailsDepositModal
