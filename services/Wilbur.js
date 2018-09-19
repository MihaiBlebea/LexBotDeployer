

class Wilbur
{
    constructor(requests, files)
    {
        this.requests = requests
        this.files = files

        this.slotVersions = []
        this.intentVersions = []
    }

    deploySlots()
    {
        const slotFolder = './../repos/slots'
        this.files.processFiles(slotFolder, (slotFiles)=> {

            slotFiles.map((file)=> {
                this.requests.deploySlotRequest(file, (data)=> {
                    this.slotVersions.push({
                        name: data.name,
                        version: data.version
                    })
                    console.log(this.slotVersions)
                })
            })
        })
    }

    deployIntents()
    {
        const slotFolder = './../repos/intents'
        this.files.processFiles(slotFolder, (intentFiles)=> {

            intentFiles.map((file)=> {
                this.requests.deployIntentRequest(file, (data)=> {
                    this.intentVersions.push({
                        name: data.name,
                        version: data.version
                    })
                    console.log(this.intentVersions)
                })
            })
        })
    }
}

module.exports = Wilbur
