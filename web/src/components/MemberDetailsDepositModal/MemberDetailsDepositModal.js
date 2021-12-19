import { useState } from 'react'
import { createPortal } from 'react-dom'

import Button from 'src/components/Button/Button'
import FundsModal from 'src/components/FundsModal/FundsModal'
import Icon from 'src/components/Icon'

const MemberDetailsDepositModal = () => {
  const [isOpen, setOpen] = useState(false)

  const modalContent = createPortal(
    <FundsModal>
      <div className="relative w-full">
        <div className="absolute" style={{ right: 1, top: '-1.5rem' }}>
          <Icon name="wyre" size="5rem" />
        </div>

        <h2 className="font-bold text-2xl">Deposit Funds</h2>

        <p className="mt-4 text-base">
          Fund your wallet using Wyre. Funds are typically added in less than 3
          minutes, and can be withdrawn anytime according to the limits set by Wyre.
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
            Deposit with Wyre
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
        onClick={() => setOpen(true)}
        className="text-sm rounded font-bold deposit-funds"
      >
        Deposit Funds
      </button>
      {isOpen ? modalContent : null}
    </>
  )
}

export default MemberDetailsDepositModal
