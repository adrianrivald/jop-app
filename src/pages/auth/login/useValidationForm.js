/* eslint-disable import/no-anonymous-default-export */
import { toSentenceCase } from '../../../utils/strings'

const validateFormField = (form, formItem) => {
    // eslint-disable-next-line default-case
    switch(true) {
        case (!form[formItem]): {
          return [false,  { [formItem] : `${toSentenceCase(formItem)} harus diisi` }]
        }
      case (formItem === 'username' && form[formItem].length < 3): {
        return [false,  { [formItem] : `${toSentenceCase(formItem) } minimal 3 karakter` }]
      }
      case (formItem === 'kataSandi' && form[formItem].length < 6): {
        return [false,  { [formItem] : `${toSentenceCase(formItem) } minimal 6 karakter` }]
      }
    }
  
    return [true, {}]
  }

export default (form) => {
    const errorMessage = {
      username: '',
      kataSandi: '',
    }

    let formErrorMessage = {}
    let formValid = true
  
    for (const formItem in errorMessage) {
      const [fieldValid, fieldErrorMessage] = validateFormField(form, formItem)
      formErrorMessage = Object.assign(formErrorMessage, fieldErrorMessage)
      formValid = formValid && fieldValid
    }
  
    return [formValid, Object.assign(errorMessage, formErrorMessage)]
  }