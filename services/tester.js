const Mocha = require('mocha')
const fs = require('fs')
const path = require('path')


const testLambda = (file, callback)=> {
    var mocha = new Mocha()

    mocha.addFile(file)

    mocha.run((failures)=> {
        console.log(failures)
        if(failures)
        {
            callback({ pass: false })
        } else {
            callback({ pass: true })
        }
        // process.exitCode = failures ? -1 : 0
    })
}

module.exports = {
    testLambda
}
