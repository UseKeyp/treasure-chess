import {
  Form,
  FormError,
  FieldError,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { Link } from '@redwoodjs/router'

import PropTypes from 'prop-types'

const MintForm = (props) => {
  return (
    <div className="rw-form-wrapper mint-set-title">
      <Form
        onSubmit={props.onSave}
        error={props.error}
        className="mint-set-title__form"
      >
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
        <TextField
          name="title"
          className="rw-input mint-set-title__input "
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          placeholder="Awesome London System"
        />
        <FieldError name="title" className="rw-field-error" />
        <Submit className="rect-button green rw-button rw-button-blue mint-set-title__submit">
          Mint
        </Submit>
      </Form>
      <Link to="faq" className="mint-set-title__link">
        What does mint mean?
      </Link>
    </div>
  )
}

export default MintForm
