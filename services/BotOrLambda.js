
class BotOrLambda
{
    constructor(files)
    {
        this.files = files
    }

    getChangedLambdasFiles(changedFiles, callback)
    {
        if(changedFiles.length > 0)
        {
            result = []
            changedFiles.map((file)=> {
                if(file.filename.includes('repos/lambdas/functions/') &&
                    file.filename.includes('.serverless') === false &&
                    file.filename.includes('.yml') === false)
                {
                    result.push(file)
                }
            })
            if(callback)
            {
                callback(result)
            }
        }
    }

    getChangedBotsFiles(changedFiles, callback)
    {
        if(changedFiles.length > 0)
        {
            result = []
            changedFiles.map((file)=> {
                if(file.filename.includes('repos/') && file.filename.includes('repos/lambdas/') === false)
                {
                    result.push(file)
                }
            })
            if(callback)
            {
                callback(result)
            }
        }
    }
}
