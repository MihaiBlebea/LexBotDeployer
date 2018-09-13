const AWS = require('aws-sdk')


const putBot = (checksum, callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = require('./../repos/lexbot.json')
    params = {
        ...params,
        checksum: checksum
    }
    lex.putBot(params, function(err, data) {
        if(err)
        {
            console.log(err, err.stack);
        } else {
            callback(data)
        }
    })
}

const getBots = ()=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = {
        maxResults: 10,
        nextToken: ""
    };
    lex.getBots(params, function(err, data) {
        if(err)
        {
            console.log(err, err.stack);
        } else {
            console.log(data)
        }
    })
}

const createBotVersion = (checksum, callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = {
        name: 'OrderFlowersBot',
        checksum: checksum
    }
    lex.createBotVersion(params, function(err, data) {
        if(err)
        {
            console.log(err, err.stack);
        } else {
            callback(data)
        }
    })
}

const getBotVersions = (callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = {
        name: 'OrderFlowersBot',
        versionOrAlias: '$LATEST'
    }
    lex.getBot(params, function(err, data) {
        if(err)
        {
            console.log(err, err.stack);
        } else {
            callback(data)
        }
    })
}

const deleteBot = ()=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = {
        name: 'OrderFlowersBot'
    }
    lex.deleteBot(params, function(err, data) {
        if(err)
        {
            console.log(err, err.stack);
        } else {
            console.log(data)
        }
    })
}


module.exports = {
    createBotVersion,
    getBots,
    putBot,
    deleteBot,
    getBotVersions
}
