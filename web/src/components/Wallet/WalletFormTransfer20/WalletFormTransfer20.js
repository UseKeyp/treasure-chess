import {
  Form,
  Label,
  TextField,
  NumberField,
  FieldError,
  FormError,
} from '@redwoodjs/forms'
import { isHexAddress } from 'src/utils/helpers'
import { useWallet } from 'src/providers/wallet'
import LoadingDots from 'src/components/LoadingDots/LoadingDots'
import Button from 'src/components/Button/Button'

const WalletFormTransfer20 = () => {
  const { transferErc20, transferErc20Loading } = useWallet()

  const onSubmit = async (data) => {
    await transferErc20({ ...data, amount: data.amount.toString() })
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit}>
        <FormError
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="tokenAddress"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          tokenAddress
        </Label>
        <TextField
          name="tokenAddress"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: true,
            validate: (value) =>
              isHexAddress(value) ||
              'address should be 40 character hex string',
          }}
        />
        <FieldError name="tokenAddress" className="rw-field-error" />

        <Label
          name="amount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          amount
        </Label>
        <NumberField
          name="amount"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: true,
            valueAsNumber: true,
            validate: (value) => value > 0 || 'amount should be positive',
          }}
        />
        <FieldError name="amount" className="rw-field-error" />

        <Label
          name="toAddress"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Recipient Address
        </Label>
        <TextField
          name="toAddress"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: true,
            validate: (value) =>
              isHexAddress(value) ||
              'address should be 40 character hex string',
          }}
        />
        <FieldError name="toAddress" className="rw-field-error" />

        <div className="rw-button-group">
          <Button
            disabled={transferErc20Loading}
            type="submit"
            className={`rw-button rw-button-blue w-[200px] h-[40px] text-xl shadow-m hover:sm items-center ${
              transferErc20Loading && 'cursor-not-allowed'
            }`}
            variant={transferErc20Loading ? 'grey' : 'transparent'}
            label={transferErc20Loading ? <LoadingDots /> : 'Transfer'}
          />
        </div>
      </Form>
    </div>
  )
}

export default WalletFormTransfer20
