

class IntentManager
{
    constructor(lex, versions)
    {
        // Declare dependencies
        this.lex = lex
        this.versions = versions
    }

    createIntentVersion(intentName, checksum, callback)
    {
        var params = {
            name: intentName,
            checksum: checksum
        }
        this.lex.createIntentVersion(params, (error, data)=> {
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

    putIntent(intentName, versionData, slotVersions, callback)
    {
        var intentFileJson = require('./../repos/intents/' + intentName + '.json')
        intentFileJson = this.versions.updateIntentSlots(intentFileJson, slotVersions)

        if(versionData !== null)
        {
            intentFileJson = {
                ...intentFileJson,
                checksum: versionData.checksum
            }
        }
        this.lex.putIntent(intentFileJson, (error, data)=> {
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

    getIntentVersions(intentName, callback)
    {
        var params = {
            name: intentName
        }
        this.lex.getIntentVersions(params, (error, data)=> {
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

    getIntentLatestVersion(intentName, callback)
    {
        var params = {
            version: '$LATEST',
            name: intentName
        }
        this.lex.getIntent(params, (error, data)=> {
            // if(err) console.log(err.stack)
            if(callback)
            {
                callback(data)
            }
        })
    }

    deployIntent(intentName, slotVersions, callback, timeout)
    {
        if(!timeout)
        {
            timeout = 1000
        }
        this.getIntentLatestVersion(intentName, (versionData)=> {
            setTimeout(()=> {
                this.putIntent(intentName, versionData, slotVersions, (data)=> {
                    setTimeout(()=> {
                        this.createIntentVersion(intentName, data.checksum, (data)=> {
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

module.exports = IntentManager
