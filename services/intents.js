const AWS = require('aws-sdk')


const createIntentVersion = (intentName, checksum, callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = {
        name: intentName,
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

const putIntent = (intentName, checksum, callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = require('./../repos/intents/' + intentName + '.json')
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

const getIntentVersions = (intentName, callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = {
        name: intentName
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

const getIntentLatestVersion = (intentName, callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = {
        version: '$LATEST',
        name: intentName
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
