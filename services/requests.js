const bots = require('./bots.js')
const slots = require('./slots.js')
const intents = require('./intents.js')


const deployBotRequest = (callback, timeout)=> {
    if(!timeout)
    {
        timeout = 1000;
    }
    bots.getBotVersions((data)=> {
        // setTimeout(()=> {
        //     bots.putBot(data.checksum, (data)=> {
        //         setTimeout(()=> {
        //             bots.createBotVersion(data.checksum, (data)=> {
        //                 if(callback)
        //                 {
        //                     setTimeout(()=> {
        //                         callback(data)
        //                     }, timeout)
        //                 }
        //             })
        //         }, timeout)
        //     })
        // }, timeout)
        console.log(data)
    })
}


const deployIntentRequest = (callback, timeout)=> {
    if(!timeout)
    {
        timeout = 1000
    }
    intents.getIntentLatestVersion((data)=> {
        setTimeout(()=> {
            intents.putIntent(data.checksum, (data)=> {
                setTimeout(()=> {
                    intents.createIntentVersion(data.checksum, (data)=> {
                        if(callback)
                        {
                            setTimeout(()=> {
                                callback(data)
                            }, timeout)
                        }
                    })
                }, timeout)
            })
        }, timeout)
    })
}


const deploySlotRequest = (slotName, callback, timeout)=> {
    if(!timeout)
    {
        timeout = 1000
    }
    slots.getSlotVersion(slotName, (data)=> {
        setTimeout(()=> {
            slots.putSlot(slotName, data.checksum, (data)=> {
                setTimeout(()=> {
                    slots.createSlotVersion(slotName, data.checksum, (data)=> {
                        if(callback)
                        {
                            setTimeout(()=> {
                                callback(data)
                            }, timeout)
                        }
                    })
                }, timeout)
            })
        }, timeout)
    })
}

module.exports = {
    deployBotRequest,
    deployIntentRequest,
    deploySlotRequest
}
