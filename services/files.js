const fs = require('fs')
const changedGitFiles = require('changed-git-files')


const extractFiles = (folder, callback)=> {
    fs.readdir(folder, (err, files)=> {
        if(callback)
        {
            callback(files)
        }
    })
}

const getFileName = (file)=> {
    return file.split('.')[0]
}

const processFiles = (folderFiles, callback)=> {
    extractFiles(folderFiles, (files)=> {
        let fileNames = files.map((file)=> {
            return getFileName(file)
        })
        if(callback)
        {
            callback(fileNames)
        }
    })
}

const getChangedFiles = (callback)=> {
    changedGitFiles((error, results)=> {
        if(error) console.log(error)
        if(callback)
        {
            callback(results)
        }
    })
}

const getChangedLambdasFiles = (changedFiles, callback)=> {
    if(changedFiles.length > 0)
    {
        result = []
        changedFiles.map((file)=> {
            console.log(file)
            if(file.status === 'Modified' &&
               file.filename.includes('/repos/lambdas/functions/') &&
               file.filename.includes('/repos/lambdas/functions/.serverless') === false)
            {
                result.push(file.filename)
            }
        })
        if(callback)
        {
            callback(result)
        }
    }
}


module.exports = {
    extractFiles,
    processFiles,
    getChangedFiles,
    getChangedLambdasFiles
}
