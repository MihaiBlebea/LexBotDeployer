
class SlotManager
{
    constructor(lex, versions, logger)
    {
        // Declare dependencies
        this.lex = lex
        this.versions = versions
        this.logger = logger
    }

    getSlotVersions(slotName, callback)
    {
        var params = { name: slotName }
        this.lex.getSlotTypeVersions(params, (error, data)=> {
            if(error)
            {
                console.log(error.stack);
            } else {
                if(callback)
                {
                    this.logger.log(`For slot named ${data.name} version is ${data.version}`)
                    callback(data)
                }
            }
        })
    }

    getSlotVersion(slotName, callback)
    {
        var params = {
            version: "$LATEST",
            name: slotName
        }
        this.lex.getSlotType(params, (error, data)=> {
            // if(error) console.log(error.stack)
            if(callback)
            {
                callback(data)
            }
        })
    }

    putSlot(slotName, versionData, callback)
    {
        var slotFileJson = require('./../repos/slots/' + slotName + '.json')
        if(versionData !== null)
        {
            slotFileJson = {
                ...slotFileJson,
                checksum: versionData.checksum
            }
        }
        this.lex.putSlotType(slotFileJson, (error, data)=> {
            if(error)
            {
                console.log(error.stack);
            } else {
                if(callback)
                {
                    callback(data)
                }
            }
        })
    }

    createSlotVersion(slotName, checksum, callback)
    {
        var params = {
            name: slotName,
            checksum: checksum
        }
        this.lex.createSlotTypeVersion(params, (error, data)=> {
            if(error)
            {
                console.log(error.stack);
            } else {
                if(callback)
                {
                    callback(data)
                }
            }
        })
    }

    deleteSlot(slotName)
    {
        var params = {
            name: slotName
        }
        this.lex.deleteSlotType(params, (error, data)=> {
            if(error)
            {
                console.log(error.stack);
            } else {
                console.log(data)
            }
        })
    }

    deploySlot(slotName, callback, timeout)
    {
        if(!timeout)
        {
            timeout = 1000
        }
        this.getSlotVersion(slotName, (versionData)=> {
            setTimeout(()=> {
                this.putSlot(slotName, versionData, (data)=> {
                    setTimeout(()=> {
                        this.createSlotVersion(slotName, data.checksum, (data)=> {
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

}

module.exports = SlotManager
