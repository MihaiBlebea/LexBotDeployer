
class BotManager
{
    constructor(lex, versions, log)
    {
        // Declare dependencies
        this.lex = lex
        this.versions = versions
        this.log = log
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
                this.log(`Updating the code for the bot ${data.name}.`)
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
                this.log(`Creating a new version for bot ${data.name}. New bot version is ${data.version}`)
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
            this.log(`Getting the checksum for the latest version of bot ${data.name}.`)
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
        console.log(timeout)
        this.log(`Starting to deploy bot ${botName}.`)
        this.getBotVersions(botName, (versionData)=> {
            setTimeout(()=> {
                this.putBot(botName, versionData, intentVersions, (data)=> {
                    setTimeout(()=> {
                        this.createBotVersion(botName, data.checksum, (data)=> {
                            this.log(`Bot ${botName} was deployed.`)
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
