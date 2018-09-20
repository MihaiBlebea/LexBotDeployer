
const log = (message)=> {
    
    var date = new Date()
    var hour = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    var miliseconds = date.getMilliseconds()

    console.log(`[${hour}:${minutes}:${seconds}:${miliseconds}] : ${message}`)

}

module.exports = log
