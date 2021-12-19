import { useState } from 'react'
import { createPortal } from 'react-dom'

import Button from 'src/components/Button/Button'
import FundsModal from 'src/components/FundsModal/FundsModal'
import Icon from 'src/components/Icon'

const MemberDetailsWithdrawModal = () => {
  const [isOpen, setOpen] = useState(false)

  const modalContent = createPortal(
    <FundsModal>
      <div className="relative w-full">
        <div className="absolute" style={{ right: 1, top: '-1.5rem' }}>
          <Icon name="wyre" size="5rem" />
        </div>

        <h2 className="font-bold text-2xl">Deposit Funds</h2>

        <p className="mt-4 text-base">
          Withdraw your funds using Wyre. Funds can be withdrawn anytime according to the limits set by Wyre.
        </p>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-base"
          >
            Cancel
          </button>

          <Button variant="blue" onClick={() => {}}>
            Withdraw with Wyre
          </Button>
        </div>
      </div>
    </FundsModal>,
    document.querySelector('body')
  )

  return (
    <>
      <button
        type="button"
        className="text-sm text-black rounded font-bold withdraw-funds"
        onClick={() => setOpen(true)}
      >
        Withdraw Funds
      </button>
      {isOpen ? modalContent : null}
    </>
  )
}

export default MemberDetailsWithdrawModal
