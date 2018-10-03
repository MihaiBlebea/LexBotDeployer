const { exec } = require('child_process')


class SlotManager
{
    constructor(lex, versions, log)
    {
        // Declare dependencies
        this.lex = lex
        this.versions = versions
        this.log = log
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
                    callback(data)
                }
            }
        })
    }

    getSlotVersion(slotName, callback)
    {
        exec(`aws lex-models get-slot-type \
                --region us-east-1 \
                --name ${slotName} \
                --slot-type-version "\\$LATEST"`, (error, stdout, stderr)=> {
            if(error) console.log(error)
            var data = null
            if(stdout)
            {
                data = JSON.parse(stdout)
            }
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
                this.log(`Updating the slot code for ${data.name}`)
                if(callback)
                {
                    callback(data)
                }
            }
        })
    }

    createSlotVersion(slotName, checksum, callback)
    {
        exec(`aws lex-models create-slot-type-version \
                    --region us-east-1 \
                    --name ${slotName} \
                    --checksum ${checksum}`, (error, stdout, stderr)=> {
            if(error) console.log(error)
            console.log(stdout)
            console.log(stderr)
            var data = null
            if(stdout)
            {
                data = JSON.parse(stdout)
            }
            this.log(`Creating a new version for ${data.name}. New version is ${data.version}`)
            if(callback)
            {
                callback(data)
            }
        })
    }

    deleteSlot(slotName)
    {
        exec(`aws lex-models delete-slot-type
                    --name ${slotName}>`, (error, stdout, stderr)=> {
            if(error) console.log(error)
            console.log(stdout)
            console.log(stderr)
            var data = null
            if(stdout)
            {
                data = JSON.parse(stdout)
            }
            this.log(`Deleted ${slotName}.`)
            if(callback)
            {
                callback(data)
            }
        })
    }

    deploySlot(slotName, callback)
    {
        this.log(`Starting to deploy slot ${slotName}.`)
        this.getSlotVersion(slotName, (versionData)=> {
            this.putSlot(slotName, versionData, (data)=> {
                this.createSlotVersion(slotName, data.checksum, (data)=> {
                    this.log(`Slot ${slotName} was deployed.`)
                    if(callback)
                    {
                        callback(data)
                    }
                })
            })
        })
    }

}

module.exports = SlotManager
