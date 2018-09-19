
class BotManager
{
    constructor(lex, versions)
    {
        // Declare dependencies
        this.lex = lex
        this.versions = versions
    }

    putBot(botName, versionData, intentVersions, callback)
    {
        var botFileJson = require('./../repos/bots/' + botName + '.json')
        botFileJson = this.versions.updateBotIntents(botFileJson, intentVersions)
        if(versionData !== null)
        {
            botFileJson = {
                ...botFileJson,
                checksum: versionData.checksum
            }
        }

        this.lex.putBot(botFileJson, (error, data)=> {
            if(error)
            {
                console.log(error.stack);
            } else {
                callback(data)
            }
        })
    }

    getBots()
    {
        var params = {
            maxResults: 10,
            nextToken: ""
        };
        this.lex.getBots(params, (error, data)=> {
            if(error)
            {
                console.log(error.stack);
            } else {
                console.log(data)
            }
        })
    }

    createBotVersion(botName, checksum, callback)
    {
        var params = {
            name: botName,
            checksum: checksum
        }

        this.lex.createBotVersion(params, (error, data)=> {
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

    getBotVersions(botName, callback)
    {
        var params = {
            name: botName,
            versionOrAlias: '$LATEST'
        }
        this.lex.getBot(params, (error, data)=> {
            // if(error) console.log(error, error.stack)
            if(callback)
            {
                callback(data)
            }
        })
    }

    deleteBot(botName)
    {
        var params = {
            name: botName
        }
        this.lex.deleteBot(params, (error, data)=> {
            if(error)
            {
                console.log(error.stack);
            } else {
                console.log(data)
            }
        })
    }

    deployBot(botName, intentVersions, callback, timeout)
    {
        if(!timeout)
        {
            timeout = 1000;
        }
        this.getBotVersions(botName, (versionData)=> {
            setTimeout(()=> {
                this.putBot(botName, versionData, intentVersions, (data)=> {
                    setTimeout(()=> {
                        this.createBotVersion(botName, data.checksum, (data)=> {
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

module.exports = BotManager
