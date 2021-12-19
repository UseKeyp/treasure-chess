import { useState, useCallback } from 'react'
import { createPortal } from 'react-dom'

import { trimAddress } from 'src/utils/helpers'
import Icon from 'src/components/Icon'
import FundsModal from 'src/components/FundsModal/FundsModal'
import styles from './MemberDetailsAddressModal.module.scss'

const MemberDetailsAddressModal = ({ address }) => {
  const [isOpen, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const memberAddress = trimAddress(address)

  const handleCopy = useCallback(() => {
    if (typeof document === 'undefined') {
      return
    }

    const textArea = document.createElement('textarea')
    textArea.value = address
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)
    setCopied(true)

    setTimeout(() => setCopied(false), 4000)
  }, [address])

  const modalContent = createPortal(
    <FundsModal>
      <h2 className="font-bold text-2xl">Deposit USDC</h2>

      <p className="mt-4 text-base">
        <span>WARNING: At this time you can </span>
        <span className={styles['matic-warning']}>
          only deposit USDC on the Polygon Network (Matic).
        </span>
      </p>

      <p className="mt-4 text-base">
        Do not send anything else to this address, or use other networks. You
        will not be able to recover other assets, and they may be lost forever.
        We cannot guarantee support will be added for other networks or assets.
      </p>

      <p className="mt-4 text-base">
        By continuing you agree you’ve read this and understand these risks.
      </p>

      <div className="flex w-full mt-4 items-center justify-between">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-lg"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={() => handleCopy()}
          className={styles['copy-address']}
          disabled={copied}
        >
          {copied ? 'Copied!' : 'Copy Wallet Address'}
        </button>
      </div>
    </FundsModal>,
    document.querySelector('body')
  )

  return (
    <>
      <p className="mt-2">
        <span className="mr-2">{memberAddress}</span>
        <button onClick={() => setOpen(true)}>
          <Icon name="copy" color="#147DDD" />
        </button>
      </p>
      {isOpen ? modalContent : null}
    </>
  )
}

export default MemberDetailsAddressModal
