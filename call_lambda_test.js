const AWS = require('aws-sdk')
const zipper = require('./services/zipper')
const LambdaManger = require('./services/LambdaManager')
const tester = require('./services/tester')
const { exec } = require('child_process')
const files = require('./services/files')

const lambda = new AWS.Lambda({ region: 'us-east-1' })
var manager = new LambdaManger(lambda, zipper, tester)

// manager.deployLambda('LambdaOne')

files.processFiles('repos/lambdas/functions', (slotFiles)=> {
    slotFiles.shift()
    serverlessFileIndex = slotFiles.indexOf('serverless')
    if(serverlessFileIndex > -1)
    {
        slotFiles.splice(serverlessFileIndex, 1)
    }

    slotFiles.map((fileName)=> {
        manager.runUnitTesting(fileName, (result)=> {
            console.log(result)

            if(result.pass === true)
            {
                exec('cd repos/lambdas/functions && pwd && serverless deploy', (error, stdout, stderr)=> {
                    if(error)
                    {
                        console.log(error)
                    }

                    console.log(`stdout: ${stdout}`)
                    console.log(`stderr: ${stderr}`)
                })
            }
        })
    })
})
