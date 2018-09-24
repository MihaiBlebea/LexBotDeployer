const fs = require('fs')
const { exec } = require('child_process')


class LambdaManager
{
    constructor(lambda, tester, files)
    {
        // Define dependencies
        this.lambda = lambda
        this.zipper = null
        this.tester = tester
        this.files = files
    }

    runUnitTesting(lambdaName, callback)
    {
        this.tester.testLambda('./../repos/lambdas/tests/' + lambdaName + 'Test.js', callback)
    }

    // createFunction(lambdaName, callback)
    // {
    //     var folder = './../repos/lambdas/' + lambdaName + '/'
    //     var lambdaFileJson = require(folder + lambdaName + '.json')
    //
    //     if(fs.existsSync('./repos/lambdas/LambdaOne/LambdaOne.zip'))
    //     {
    //         fs.unlinkSync('./repos/lambdas/LambdaOne/LambdaOne.zip')
    //     }
    //
    //     this.zipper.zipFile('./repos/lambdas/LambdaOne', './repos/lambdas/LambdaOne/LambdaOne.zip')
    //
    //     lambdaFileJson = {
    //         ...lambdaFileJson,
    //         Code: {
    //             ...lambdaFileJson.Code,
    //             ZipFile: './repos/lambdas/LambdaOne/LambdaOne.zip'
    //         }
    //     }
    //
    //     fs.chmod('./repos/lambdas/LambdaOne/LambdaOne.zip', '755', (error)=> {
    //         if(error)
    //         {
    //             console.log(error)
    //         }
    //     })
    //
    //     console.log(lambdaFileJson)
    //
    //     this.lambda.createFunction(lambdaFileJson, (error, data)=> {
    //         if(error)
    //         {
    //             console.log(error, error.stack)
    //         } else {
    //             if(callback)
    //             {
    //                 callback(data)
    //             }
    //         }
    //     })
    // }
    //
    // deployLambda(lambdaName)
    // {
    //     this.runUnitTesting(lambdaName, (data)=> {
    //         console.log(data.pass)
    //         if(data.pass)
    //         {
    //             this.createFunction(lambdaName, (data)=> {
    //                 console.log(data)
    //             })
    //         }
    //     })
    // }

    deployLambdaServerless(callback)
    {
        this.files.processFiles('./../repos/lambdas/functions', (slotFiles)=> {
            slotFiles.shift()
            var serverlessFileIndex = slotFiles.indexOf('serverless')
            if(serverlessFileIndex > -1)
            {
                slotFiles.splice(serverlessFileIndex, 1)
            }

            slotFiles.map((fileName)=> {
                this.runUnitTesting(fileName, (result)=> {
                    if(result.pass === true)
                    {
                        exec('cd ../repos/lambdas/functions && pwd && serverless deploy', (error, stdout, stderr)=> {
                            if(error) console.log(error)
                            console.log('STDOUT', stdout)
                            console.log('STDERR', stderr)
                            if(callback)
                            {
                                callback(stdout)
                            }
                        })
                    }
                })
            })
        })
    }
}

module.exports = LambdaManager
