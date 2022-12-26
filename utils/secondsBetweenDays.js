const secondsBetweenDates = (date) => {
    return Number(new Date().getTime() - new Date(date).getTime())/1000
} 


module.exports = secondsBetweenDates