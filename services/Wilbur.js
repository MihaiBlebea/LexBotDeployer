

class Wilbur
{
    constructor(files, versions, slotManager, intentManager, botManager)
    {
        // Declare dependencies //
        this.files = files
        this.versions = versions

        this.slotManager = slotManager
        this.intentManager = intentManager
        this.botManager = botManager

        // Store resources versions //
        this.slotVersions = []
        this.intentVersions = []
        this.botVersions = []
    }

    deploySlots()
    {
        const slotFolder = './../repos/slots'
        this.files.processFiles(slotFolder, (slotFiles)=> {

            var counter = 0
            slotFiles.map((file)=> {
                this.slotManager.deploySlot(file, (data)=> {
                    this.slotVersions.push({
                        name: data.name,
                        version: data.version
                    })
                    counter++
                    if(counter === slotFiles.length - 1)
                    {
                        this.deployIntents()
                    }
                })
            })
        })
    }

    deployIntents()
    {
        const slotFolder = './../repos/intents'
        this.files.processFiles(slotFolder, (intentFiles)=> {

            var counter = 0
            intentFiles.map((file)=> {
                this.intentManager.deployIntent(file, this.slotVersions, (data)=> {
                    this.intentVersions.push({
                        name: data.name,
                        version: data.version
                    })
                    counter++
                    if(counter === intentFiles.length - 1)
                    {
                        this.deployBots()
                    }
                })
            })
        })
    }

    deployBots()
    {
        const slotFolder = './../repos/bots'
        this.files.processFiles(slotFolder, (botFiles)=> {

            botFiles.map((file)=> {
                this.botManager.deployBot(file, this.intentVersions, (data)=> {
                    this.botVersions.push({
                        name: data.name,
                        version: data.version
                    })
                }, 2000)
            })
        })
    }
}

module.exports = Wilbur
