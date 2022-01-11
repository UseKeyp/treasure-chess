import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const MemberForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.member?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="address"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Address
        </Label>
        <TextField
          name="address"
          defaultValue={props.member?.address}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="address" className="rw-field-error" />

        <Label
          name="rating"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Rating
        </Label>
        <NumberField
          name="rating"
          defaultValue={props.member?.rating}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="rating" className="rw-field-error" />

        <Label
          name="imageSrc"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image src
        </Label>
        <TextField
          name="imageSrc"
          defaultValue={props.member?.imageSrc}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="imageSrc" className="rw-field-error" />

        <Label
          name="country"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Country
        </Label>
        <TextField
          name="country"
          defaultValue={props.member?.country}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="country" className="rw-field-error" />

        <Label
          name="masterTitle"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Master title
        </Label>
        <TextField
          name="masterTitle"
          defaultValue={props.member?.masterTitle}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />
        <FieldError name="masterTitle" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default MemberForm
