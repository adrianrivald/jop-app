const getDateTime = (date) => {
    const newDate = new Date(date)
    const hh = ('0'+newDate.getHours()).slice(-2)
    const mm = ('0'+newDate.getMinutes()).slice(-2)
    return `${hh}:${mm}`
}

export { getDateTime }