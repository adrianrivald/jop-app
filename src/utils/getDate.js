const getDate = (date) => {
    const yyyy = date.getFullYear()
    const MM = ('0' + (date.getMonth() + 1)).slice(-2)
    const dd = ('0' + date.getDate()).slice(-2)
  
    return `${yyyy}-${MM}-${dd}`
}

const getLocaleDateString = value => {
  const dateValue = new Date(value)
  const options = { month: 'long', day: 'numeric', year: 'numeric' }
  return dateValue.toLocaleDateString('id-ID', options)
}

  
  export { getDate, getLocaleDateString }
  