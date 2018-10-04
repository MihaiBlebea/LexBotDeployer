

class Wilbur
{
    constructor(files, versions, slotManager, intentManager, botManager, lambdaManager)
    {
        // Declare dependencies //
        this.files = files
        this.versions = versions

        this.slotManager = slotManager
        this.intentManager = intentManager
        this.botManager = botManager
        this.lambdaManager = lambdaManager

        // Store resources versions //
        this.slotVersions = []
        this.intentVersions = []
        this.botVersions = []

        // Class attributes

    }

    // Main point of entry in the app, bootstrap the app //
    deploy(changedFiles, callback)
    {
        console.log('CHANGED FILES', changedFiles)
        this.files.getChangedLambdasFiles(changedFiles, (files)=> {

            // Check if we have any deleted files
            var deletedFiles = this.hasDeletedFiles(files)
            var modifiedFiles = this.hasModifiedFiles(files)

            if(deletedFiles.length > 0)
            {
                // Trigger delete lambda
            }

            if(modifiedFiles.length > 0)
            {
                this.deployLambdaStuff(modifiedFiles, (result)=> {
                    if(callback)
                    {
                        callback()
                    }
                })
            }
        })

        this.files.getChangedBotsFiles(changedFiles, (files)=> {

            // Check if we have any deleted files
            var deletedFiles = this.hasDeletedFiles(files)

            if(deletedFiles.length > 0)
            {
                // console.log('Deleted files', deletedFiles)
                // let processedFiles = this.processDeletedFiles(deletedFiles)
                //
                // processedFiles.map((file)=> {
                //     if(file.type === 'slots')
                //     {
                //         console.log(process.cwd())
                //         let json = require('./../' + file.path)
                //         console.log('Deleted file JSON', json)
                //         slotName = json.name
                //         this.slotManager.deleteSlot(slotName)
                //     }
                // })
            }

            // Check if all changed files are flagged as deleted
            if(deletedFiles.length !== files.length)
            {
                this.deployBotStuff(()=> {
                    if(callback)
                    {
                        callback()
                    }
                })
            }
        })
    }

    hasDeletedFiles(files)
    {
        result = []
        files.map((file)=> {
            if(file.status === 'Deleted')
            {
                result.push(file.filename)
            }
        })
        return result
    }

    processDeletedFiles(files)
    {
        result = []
        files.map((file)=> {
            return result.push(this.splitFilePath(file))
        })
        return result
    }

    splitFilePath(path)
    {
        let splitFile = path.split('/')
        console.log(splitFile.length - 1)
        return {
            fileName: splitFile[splitFile.length - 1],
            type: splitFile[splitFile.length - 2],
            path: path
        }
    }

    hasModifiedFiles(files)
    {
        result = []
        files.map((file)=> {
            if(['Modified', 'Added'].includes(file.status))
            {
                result.push(file.filename)
            }
        })
        return result
    }

    deployBotStuff(callback)
    {
        this.deploySlots(()=> {
            this.deployIntents(()=> {
                this.deployBots(()=> {
                    if(callback)
                    {
                        callback()
                    }
                })
            })
        })
    }

    deployLambdaStuff(files, callback)
    {
        console.log('LAMBDA', files)
        this.lambdaManager.deployLambdaServerless(files, (result)=> {
            if(callback)
            {
                console.log('RESULT AFTER DEPLOY', result)
                this.lambdaManager.addPermission('LambdaThree', (data)=> {
                    callback(data)
                })
            }
        })
    }

    deploySlots(callback)
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
                        callback()
                    }
                })
            })
        })
    }

    deployIntents(callback)
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
                        callback()
                    }
                })
            })
        })
    }

    deployBots(callback)
    {
        const slotFolder = './../repos/bots'
        this.files.processFiles(slotFolder, (botFiles)=> {

            botFiles.map((file)=> {
                this.botManager.deployBot(file, this.intentVersions, (data)=> {
                    this.botVersions.push({
                        name: data.name,
                        version: data.version
                    })
                    callback()
                })
            })
        })
    }
}

module.exports = Wilbur
