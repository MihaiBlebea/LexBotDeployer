const fs = require('fs')
const changedGitFiles = require('changed-git-files')


const extractFiles = (folder, callback)=> {
    fs.readdir(folder, (err, files) => {
        callback(files)
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
        callback(fileNames)
    })
}

const getChangedFiles = (callback)=> {
    changedGitFiles((error, results)=> {
        if(error) console.log(error)
        console.log(results)

        callback(results)
    })
}


module.exports = {
    extractFiles,
    processFiles,
    getChangedFiles
}
