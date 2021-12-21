import { useState } from 'react'

import ModalContainer from 'src/components/ModalContainer/ModalContainer'
import Icon from 'src/components/Icon'

const MemberDetailsWithdrawModal = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className="text-sm text-black rounded font-bold withdraw-funds"
        onClick={() => setOpen(true)}
      >
        Withdraw Funds
      </button>
      <ModalContainer
        headerText="Withdraw Funds"
        isVisible={isOpen}
        onSubmit={() => {}}
        hideModal={() => setOpen(false)}
        icon={<Icon name="wyre" />}
        submitText="Withdraw with Wyre"
        content={
          <p className="text-base">
            Withdraw your funds using Wyre. Funds can be withdrawn anytime
            according to the limits set by Wyre.
          </p>
        }
      />
    </>
  )
}

export default MemberDetailsWithdrawModal
