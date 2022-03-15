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

const WalletFormTransfer721 = () => {
  const onSubmit = (_data) => {
    // TODO: implement transferErc721
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
          <Submit className="rw-button rw-button-blue">Transfer</Submit>
        </div>
      </Form>
    </div>
  )
}

export default WalletFormTransfer721
