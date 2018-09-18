const program = require('commander')

const bots = require('./services/bots')
const slots = require('./services/slots')
const intents = require('./services/intents')
const requests = require('./services/requests')


program
    .command('bot:make-version')
    .action(()=> {
        console.log('>> Update the bot and increment the version')
        bots.getBotVersions((data)=> {
            setTimeout(()=> {
                bots.putBot(data.checksum, (data)=> {
                    setTimeout(()=> {
                        bots.createBotVersion(data.checksum, (data)=> {
                            console.log(data)
                        })
                    }, 500)
                })
            }, 500)
        })
    })

program
    .command('bot:update')
    .action(()=> {
        console.log('>> Update a bot with NO version increment')
        bots.getBotVersions((data)=> {
            setTimeout(()=> {
                bots.putBot(data.checksum, (data)=> {
                    console.log(data)
                })
            }, 500)
        })
    })

program
    .command('bot:get-versions')
    .action(()=> {
        console.log('Get checksum of the lates bot version')
        bots.getBotVersions((data)=> {
            console.log(data.checksum)
        })
    })

program
    .command('intent:make-version')
    .action(()=> {
        console.log('Get checksum of the lates bot version')
        intents.getIntentLatestVersion((data)=> {
            intents.putIntent(data.checksum, (data)=> {
                intents.createIntentVersion(data.checksum, (data)=> {
                    console.log(data)
                })
            })
        })
    })

program
    .command('slot:make-version')
    .action(()=> {
        console.log('Get checksum of the lates bot version')
        slots.getSlotVersion((data)=> {
            setTimeout(()=> {
                slots.putSlot(data.checksum, (data)=> {
                    setTimeout(()=> {
                        slots.createSlotVersion(data.checksum, (data)=> {
                            console.log(data)
                        })
                    }, 500)
                })
            }, 500)
        })
    })



program
    .command('test')
    .action(()=> {
        requests.deploySlotRequest((data)=> {
            console.log(data.version)
        })
    })



program.parse(process.argv)
