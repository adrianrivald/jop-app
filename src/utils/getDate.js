const getDate = (date) => {
    const yyyy = date.getFullYear()
    const MM = ('0' + (date.getMonth() + 1)).slice(-2)
    const dd = ('0' + date.getDate()).slice(-2)
  
    return `${yyyy}-${MM}-${dd}`
  }
  
  export { getDate }
  