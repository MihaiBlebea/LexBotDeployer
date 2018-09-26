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

    getFileName(fileName)
    {
        var splitLambdaName = fileName.split('/')
        return splitLambdaName[splitLambdaName.length - 1]
    }

    runUnitTesting(lambdaName, callback)
    {
        var testName = this.getFileName(lambdaName)
        this.tester.testLambda('./../repos/lambdas/tests/' + testName, callback)
    }

    deployLambdaServerless(files, callback)
    {
        files.map((file)=> {

            var counter = 0
            var passed = true
            this.runUnitTesting(file, (result)=> {
                console.log(result)
                if(result.pass === false)
                {
                    passed = false
                }

                var folderPath = file.replace('.js', '/');
                console.log(counter, files.length, passed)
                counter++
                if(counter === files.length - 1 && passed === true)
                {
                    exec('cd ../' + folderPath + ' && pwd && serverless deploy', (error, stdout, stderr)=> {
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

        // this.files.processFiles('./../repos/lambdas/functions', (slotFiles)=> {
        //     slotFiles.shift()
        //     var serverlessFileIndex = slotFiles.indexOf('serverless')
        //     if(serverlessFileIndex > -1)
        //     {
        //         slotFiles.splice(serverlessFileIndex, 1)
        //     }
        //
        //     var counter = 0
        //     var passed = true
        //     slotFiles.map((fileName)=> {
        //         this.runUnitTesting(fileName, (result)=> {
        //
        //             if(result.pass === false)
        //             {
        //                 passed = false
        //             }
        //
        //             counter++
        //             if(counter === slotFiles.length - 1 && passed === true)
        //             {
        //                 exec('cd ../repos/lambdas/functions && pwd && serverless deploy', (error, stdout, stderr)=> {
        //                     if(error) console.log(error)
        //                     console.log('STDOUT', stdout)
        //                     console.log('STDERR', stderr)
        //                     if(callback)
        //                     {
        //                         callback(stdout)
        //                     }
        //                 })
        //             }
        //         })
        //     })
        // })
    }
}

module.exports = LambdaManager
