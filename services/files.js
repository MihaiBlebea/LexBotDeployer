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
        return files.map((file)=> {
            return callback(getFileName(file))
        })
    })
}


module.exports = {
    extractFiles,
    processFiles
}
