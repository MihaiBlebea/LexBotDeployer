const bots = require('./bots.js')
const slots = require('./slots.js')
const intents = require('./intents.js')


const deployBotRequest = (botName, callback, timeout)=> {
    if(!timeout)
    {
        timeout = 1000;
    }
    bots.getBotVersions(botName, (versionData)=> {
        setTimeout(()=> {
            bots.putBot(botName, versionData, (data)=> {
                setTimeout(()=> {
                    bots.createBotVersion(botName, data.checksum, (data)=> {
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


const deployIntentRequest = (intentName, callback, timeout)=> {
    if(!timeout)
    {
        timeout = 1000
    }
    intents.getIntentLatestVersion(intentName, (versionData)=> {
        setTimeout(()=> {
            intents.putIntent(intentName, versionData, (data)=> {
                setTimeout(()=> {
                    intents.createIntentVersion(intentName, data.checksum, (data)=> {
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
    slots.getSlotVersion(slotName, (versionData)=> {
        setTimeout(()=> {
            slots.putSlot(slotName, versionData, (data)=> {
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
