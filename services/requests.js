const bots = require('./bots.js')
const slots = require('./slots.js')
const intents = require('./intents.js')


const deployBotRequest = (callback, timeout)=> {
    if(!timeout)
    {
        timeout = 1000;
    }
    bots.getBotVersions((data)=> {
        setTimeout(()=> {
            bots.putBot(data.checksum, (data)=> {
                setTimeout(()=> {
                    bots.createBotVersion(data.checksum, (data)=> {
                        if(callback)
                        {
                            callback(data)
                        }
                    })
                }, timeout)
            })
        }, timeout)
    })
}


const deploySlotRequest = (callback, timeout)=> {
    if(!timeout)
    {
        timeout = 1000
    }
    slots.getSlotVersion((data)=> {
        setTimeout(()=> {
            slots.putSlot(data.checksum, (data)=> {
                setTimeout(()=> {
                    slots.createSlotVersion(data.checksum, (data)=> {
                        if(callback)
                        {
                            callback(data)
                        }
                    })
                }, timeout)
            })
        }, timeout)
    })
}

module.exports = {
    deployBotRequest,
    deploySlotRequest
}
