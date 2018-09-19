

class Wilbur
{
    constructor(requests)
    {
        this.requests = requests
        this.slotVersions = []
    }

    deploySlots(files)
    {
        const slotFolder = './../repos/slots'
        files.processFiles(slotFolder, (files)=> {

            files.map((file)=> {
                this.requests.deploySlotRequest(file, (data)=> {
                    this.slotVersions.push({
                        name: data.name,
                        version: data.version
                    })
                    console.log(this.selotVersions)
                })
            })
        })
    }
}

module.exports = Wilbur
