const { exec } = require('child_process')


class IntentManager
{
    constructor(lex, versions, log)
    {
        // Declare dependencies
        this.lex = lex
        this.versions = versions
        this.log = log
    }

    createIntentVersion(intentName, checksum, callback)
    {
        exec(`aws lex-models create-intent-version \
                    --region us-east-1 \
                    --name ${intentName} \
                    --checksum "${checksum}"`, (error, stdout, stderr)=> {
            if(error) console.log(error)
            var data = null
            if(stdout)
            {
                data = JSON.parse(stdout)
            }
            if(data !== null)
            {
                this.log(`Getting the checksum of the latest version for ${data.name}`)
            }
            if(callback)
            {
                callback(data)
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
                this.log(`Updating the code for intent ${data.name}.`)
                if(callback)
                {
                    callback(data)
                }
            }
        })
    }

    getIntentLatestVersion(intentName, callback)
    {
        exec(`aws lex-models get-intent \
                    --region us-east-1 \
                    --name ${intentName} \
                    --intent-version "\\$LATEST"`, (error, stdout, stderr)=> {
            if(error) console.log(error)
            var data = null
            if(stdout)
            {
                data = JSON.parse(stdout)
            }
            if(data !== null)
            {
                this.log(`Getting the checksum of the latest version for ${data.name}`)
            }
            if(callback)
            {
                callback(data)
            }
        })
    }

    deployIntent(intentName, slotVersions, callback)
    {
        this.log(`Starting to deploy intent ${intentName}.`)
        this.getIntentLatestVersion(intentName, (versionData)=> {
            this.putIntent(intentName, versionData, slotVersions, (data)=> {
                this.createIntentVersion(intentName, data.checksum, (data)=> {
                    this.log(`Intent ${intentName} was deployed.`)
                    if(callback)
                    {
                        callback(data)
                    }
                })
            })
        })
    }
}

module.exports = IntentManager
