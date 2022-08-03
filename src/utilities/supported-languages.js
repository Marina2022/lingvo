import { capitalizeFirstOnlyCase } from "./helper-functions";
/** Letters array */
const letters = 'abcdefshghijklmnopqrstuvwxyz'.split('')
/** Letters pairs array */
const pairs = []

letters.forEach(letter1 => {
   letters.forEach(letter2 => {
      pairs.push(`${letter1}${letter2}`)
   })
})
/** 
 * Browser supported locales gotten after concatenate 'pairs' and 'navigator.languages' arrays.
 * 'navigator.languages' - user installed locales array
 */
const locales = Intl.getCanonicalLocales(pairs.concat(navigator.languages))

/** English lang name provider */
const intlLanguageDisplayNames = new Intl.DisplayNames(['en'], { type: 'language' })
/** Default (system / user installed) lang name provider */
const localLanguageDisplayNames = new Intl.DisplayNames(undefined, { type: 'language' })

/** Native language list */
const nativeLanguageList = locales
   .map(locale => ({
      code: locale.toString(),
      name: intlLanguageDisplayNames.of(locale),
      value: capitalizeFirstOnlyCase(localLanguageDisplayNames.of(locale))
   }))
   .filter(({code, name}) => code !== name)
   .sort((a,b) => 
      a.code === navigator.language ? -1 : 
      b.code === navigator.language ? 1 : 
      a.value < b.value ? -1 : 
      a.value > b.value ? 1 : 0
   )

/**
* @returns {Promise<{data:{code:String,name:String,value:String}}>}
*/
export const getSupportedLanguages = () => new Promise(resolve => resolve(nativeLanguageList))
