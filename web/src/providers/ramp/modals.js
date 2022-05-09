import ModalContainer from 'src/components/ModalContainer'
import Icon from 'src/components/Icon'
import FilterPriceInput from 'src/components/FilterPriceInput'
import { useRamp, VendorConnection } from 'src/providers/ramp/ramp'

export const DepositModal = ({ isVisible, toggleModal }) => {
  const { deposit } = useRamp()
  return (
    <ModalContainer
      isVisible={isVisible}
      onSubmit={deposit}
      hideModal={toggleModal}
      headerText="Add Funds"
      icon={<Icon name="wyre" size="29" />}
      submitText="Continue to Wyre"
      content={
        <>
          {' '}
          <p className="text-base">
            Use a debit card to instantly add funds to your account.
          </p>
          <p className="mt-4">
            Fees - Wyre: 2.9% + $0.30 (
            <a
              className="underline"
              rel="noreferrer"
              href="https://docs.sendwyre.com/reference/hosted-checkout#tr  ansaction-processing-limits"
              target="_blank"
            >
              see limits
            </a>
            )
          </p>
          <p className="mt-4">
            We are actively working to improve this experience, and to add
            support for more regions. If you have feedback please let us know
            using the{' '}
            <a
              className="underline"
              href="/feedback"
              rel="noreferrer"
              target="_blank"
            >
              Feedback Form
            </a>
            .
          </p>
          <p className="mt-4">
            <i>
              By submitting, I authorize Wyre Payments, Inc., to electronically
              charge my credit/debit card (and, if necessary, electronically
              credit my card) using the card indicated by me. I understand that
              this authorization will remain in full force and effect until I
              notify Treasure Chess that I wish to revoke this authorization. I
              agree that credit/debit card transactions I authorize, comply with
              all applicable law.{' '}
            </i>
          </p>
        </>
      }
    />
  )
}
export const WithdrawModal = ({ isVisible, toggleModal }) => {
  const [amount, setAmount] = React.useState('0')
  const { ramps, isLoading } = useRamp()
  const isConnected = ramps.map((ramp) => ramp.address && true).includes(true)
  return (
    <ModalContainer
      headerText="Cash Out"
      isVisible={isVisible}
      onSubmit={toggleModal}
      hideModal={toggleModal}
      // icon={<Icon name="wyre" size="29" />}
      content={
        <>
          <p className="text-base">Send funds to your bank at any time.</p>
          <p className="mt-4">
            Supported Countries - Wyre: US
            {/*, Coinbase:{' '}
            <a
              className="underline"
              rel="noreferrer"
              target="_blank"
              href="https://www.coinbase.com/places"
            >
              see full list
            </a>*/}
          </p>
          <p className="">Fees - Wyre: 0.2%</p>
          <p className="mt-4">
            For your protection, funds can only be sent one-way from your
            Treasure Chess account to your bank. Funds can never be withdrawn
            from your bank using this method. We are actively working to improve
            this experience, and to add support for more regions. If you have
            issues please let us know using the{' '}
            <a
              className="underline"
              rel="noreferrer"
              target="_blank"
              href="/feedback"
            >
              Feedback Form
            </a>
            .
          </p>
          {isConnected && (
            <>
              <h4 className="mt-4 ">Amount to cash out</h4>
              <FilterPriceInput value={amount} setValue={setAmount} />
            </>
          )}
          {ramps.map((ramp) => (
            <VendorConnection
              key={ramp.name}
              isLoading={isLoading}
              amount={amount}
              ramp={ramp}
              toggleModal={toggleModal}
            />
          ))}
        </>
      }
    />
  )
}
