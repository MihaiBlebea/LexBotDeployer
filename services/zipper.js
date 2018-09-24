const AdmZip = require('adm-zip')


const zipFile = (file, destination)=> {
    var zip = new AdmZip()
    zip.addLocalFolder(file)
    zip.writeZip(destination)
    return zip
}

module.exports = {
    zipFile
}
