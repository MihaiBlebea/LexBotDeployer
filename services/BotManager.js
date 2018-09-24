
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
            if(data !== null)
            {
                this.log(`Getting the checksum for the latest version of bot ${data.name}.`)
            }

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

    putBotAlias(params, callback)
    {
        // var params = {
        //     botName: 'STRING_VALUE',
        //     botVersion: 'STRING_VALUE',
        //     name: 'STRING_VALUE',
        //     checksum: 'STRING_VALUE',
        //     description: 'STRING_VALUE'
        // };
        this.lex.putBotAlias(params, (error, data)=> {
            if(error)
            {
                console.log(error, error.stack);
            } else {
                if(callback)
                {
                    callback(data)
                }
            }
        })
    }

    deployBot(botName, intentVersions, callback, timeout)
    {
        if(!timeout)
        {
            timeout = 1000;
        }

        this.log(`Starting to deploy bot ${botName}.`)
        this.getBotVersions(botName, (versionData)=> {
            setTimeout(()=> {
                this.putBot(botName, versionData, intentVersions, (data)=> {
                    setTimeout(()=> {
                        this.createBotVersion(botName, data.checksum, (data)=> {
                            this.log(`Bot ${botName} was deployed.`)

                            var params = {
                                botName: botName,
                                botVersion: data.version,
                                name: 'Testing'
                            }
                            //
                            // this.putBotAlias(params, (data)=>{
                            //     if(callback)
                            //     {
                            //         setTimeout(()=> {
                            //             callback(data)
                            //         }, timeout)
                            //     }
                            // })
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
