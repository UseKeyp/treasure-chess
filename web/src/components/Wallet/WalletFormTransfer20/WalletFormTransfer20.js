import {
  Form,
  Label,
  TextField,
  NumberField,
  FieldError,
  Submit,
  FormError,
} from '@redwoodjs/forms'
import { isHexAddress } from 'src/utils/helpers'
import { BigNumber } from '@ethersproject/bignumber'
import { useWallet } from 'src/providers/wallet'
import { useToast } from 'src/providers/toast'

const WalletFormTransfer20 = () => {
  const { toast } = useToast()
  const { transferErc20, transferErc20Loading } = useWallet()

  const onSubmit = async (data) => {
    data.amount = BigNumber.from(data.amount)
    const transferErc20Response = await transferErc20(
      data.tokenAddress,
      data.recipientAddress,
      data.amount
    )
    if (transferErc20Response) {
      toast.success('Transferred!')
    }
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
          name="recipientAddress"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          recipientAddress
        </Label>
        <TextField
          name="recipientAddress"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: true,
            validate: (value) =>
              isHexAddress(value) ||
              'address should be 40 character hex string',
          }}
        />
        <FieldError name="recipientAddress" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={transferErc20Loading}
            className="rw-button rw-button-blue"
          >
            Transfer
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default WalletFormTransfer20
