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

    addPermission(lambdaName, callback)
    {
        var params = {
            Action: 'lambda:InvokeFunction',
            FunctionName: lambdaName,
            Principal: 's3.amazonaws.com',
            SourceAccount: 'AKIAINCFUDM6QC6WWYEA',
            SourceArn: 'arn:aws:lambda:us-east-1:216849691610:function:' + lambdaName,
            StatementId: 'ID-1'
        }
        this.lambda.addPermission(params, (error, data)=> {
            if(error) console.log(error, error.stack)
            if(callback)
            {
                callback(data)
            }
        })
    }

    deployLambdaServerless(files, callback)
    {
        files.map((file)=> {

            var counter = 0
            var passed = true
            this.runUnitTesting(file, (result)=> {
                if(result.pass === false)
                {
                    passed = false
                }

                var jsFileName = this.getFileName(file)
                var folderPath = file.replace('/' + jsFileName, '');

                counter++

                if(passed === true)
                {
                    exec('cd ../' + folderPath + ' && serverless deploy', (error, stdout, stderr)=> {
                        if(error) console.log(error)
                        console.log('STDOUT', stdout)
                        console.log('STDERR', stderr)
                    })
                }
            })


            if(counter == files.length - 1)
            {
                callback()
            }
        })
    }
}

module.exports = LambdaManager
