var fs = require('fs');

class LambdaManager
{
    constructor(lambda, zipper, tester)
    {
        // Define dependencies
        this.lambda = lambda
        this.zipper = zipper
        this.tester = tester
    }

    runUnitTesting(lambdaName, callback)
    {
        this.tester.testLambda('./repos/lambdas/' + lambdaName + '/' + lambdaName + 'Test.js', callback)
    }

    createFunction(lambdaName, callback)
    {
        var folder = './../repos/lambdas/' + lambdaName + '/'
        var lambdaFileJson = require(folder + lambdaName + '.json')

        if(fs.existsSync('./repos/lambdas/LambdaOne/LambdaOne.zip'))
        {
            fs.unlinkSync('./repos/lambdas/LambdaOne/LambdaOne.zip')
        }

        this.zipper.zipFile('./repos/lambdas/LambdaOne', './repos/lambdas/LambdaOne/LambdaOne.zip')

        lambdaFileJson = {
            ...lambdaFileJson,
            Code: {
                ...lambdaFileJson.Code,
                ZipFile: './repos/lambdas/LambdaOne/LambdaOne.zip'
            }
        }

        fs.chmod('./repos/lambdas/LambdaOne/LambdaOne.zip', '755', (error)=> {
            if(error)
            {
                console.log(error)
            }
        })

        console.log(lambdaFileJson)

        this.lambda.createFunction(lambdaFileJson, (error, data)=> {
            if(error)
            {
                console.log(error, error.stack)
            } else {
                if(callback)
                {
                    callback(data)
                }
            }
        })
    }

    deployLambda(lambdaName)
    {
        this.runUnitTesting(lambdaName, (data)=> {
            console.log(data.pass)
            if(data.pass)
            {
                this.createFunction(lambdaName, (data)=> {
                    console.log(data)
                })
            }
        })
    }
}

module.exports = LambdaManager
