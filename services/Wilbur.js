

class Wilbur
{
    constructor(requests)
    {
        this.requests = requests
        // this.bots = bots
        // this.intents = intents
        // this.slots = slots
    }

    deploySlots(files)
    {
        const slotFolder = './../repos/slots'
        files.processFiles(slotFolder, (files)=> {

            files.map((file)=> {
                this.requests.deploySlotRequest(file, (data)=> {
                    console.log(data.version)
                })
            })
        })
    }
}

module.exports = Wilbur
