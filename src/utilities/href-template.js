import { t } from "i18next"

export const supportEmail = 'support@lingvonavi.com'
// export const helloEmail = 'hello@lingvoinsta.ru'

/**
 * 
 * @param {{id:Number, name:String, email:String}} param0 
 * @param {String|undefined} message
 * @returns
 */
export const HrefTemplate = ({id, name, email}, message) => {  
    if (id && name && email)  {
      return `mailto:${supportEmail}?subject=Request from ${name} (#${id}:${email})&body=${
        encodeURIComponent(`\n\n\n${message ?? t('messages.info.email_body')}\n\n\n`)
      }`
    } else {
      return `mailto:${supportEmail}?subject=Hello Lingvoinsta`
    }
}