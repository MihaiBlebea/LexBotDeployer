const AWS = require('aws-sdk')


const createIntentVersion = (checksum, callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = {
        name: 'DocOrderPizza',
        checksum: checksum
    }
    lex.createIntentVersion(params, function(err, data) {
        if(err)
        {
            console.log(err, err.stack);
        } else {
            if(callback)
            {
                callback(data)
            }
        }
    })
}

const putIntent = (checksum, callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = require('./../repos/intents/DocOrderPizza.json')
    params = {
        ...params,
        checksum: checksum
    }
    lex.putIntent(params, function(err, data) {
        if(err)
        {
            console.log(err, err.stack);
        } else {
            if(callback)
            {
                callback(data)
            }
        }
    })
}

const getIntentVersions = (callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = {
        name: 'DocOrderPizza'
    }
    lex.getIntentVersions(params, function(err, data) {
        if(err)
        {
            console.log(err, err.stack);
        } else {
            if(callback)
            {
                callback(data)
            }
        }
    })
}

const getIntentLatestVersion = (callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = {
        version: '$LATEST',
        name: 'DocOrderPizza'
    }
    lex.getIntent(params, function(err, data) {
        if(err)
        {
            console.log(err, err.stack);
        } else {
            if(callback)
            {
                callback(data)
            }
        }
    })
}


module.exports = {
    putIntent,
    createIntentVersion,
    getIntentVersions,
    getIntentLatestVersion
}
