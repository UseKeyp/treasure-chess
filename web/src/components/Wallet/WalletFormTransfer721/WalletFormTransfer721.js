import {
  Form,
  Label,
  TextField,
  NumberField,
  FieldError,
  FormError,
  Submit,
} from '@redwoodjs/forms'
import { useWallet } from 'src/providers/wallet'
import { isHexAddress } from 'src/utils/helpers'
import Button from 'src/components/Button/Button'

const WalletFormTransfer721 = () => {
  const { transfer, transferLoading } = useWallet()
  const onSubmit = async (value) => {
    await transfer({
      variables: { ...value },
    })
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
          Token Address
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
          name="tokenId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          tokenId
        </Label>
        <NumberField
          name="tokenId"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: true,
            valueAsNumber: true,
            validate: (value) => value > 0 || 'tokenId should be positive',
          }}
        />
        <FieldError name="tokenId" className="rw-field-error" />

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
          <Submit
            disabled={transferLoading}
            className="rw-button rw-button-blue"
          >
            Transfer
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default WalletFormTransfer721
