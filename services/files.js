const fs = require('fs')


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


module.exports = {
    extractFiles,
    processFiles
}
