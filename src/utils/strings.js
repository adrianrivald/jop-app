const toSentenceCase = text => {
    const result = text.replace( /([A-Z])/g, " $1" )
    return result.charAt(0).toUpperCase() + result.slice(1)
  }
  
  const toUpperCamelCase = value => value.charAt(0).toUpperCase().concat(value.slice(1))
  
  const capitalize = string => {
    if (typeof string !== 'string') return ''
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  
  export { toSentenceCase, toUpperCamelCase, capitalize }