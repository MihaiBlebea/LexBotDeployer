const AWS = require('aws-sdk')


const getSlotVersions = (callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = { name: 'PizzaSauceType' }
    lex.getSlotTypeVersions(params, function(err, data) {
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

const getSlotVersion = (callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = {
        version: "$LATEST",
        name: "PizzaSauceType"
    }
    lex.getSlotType(params, function(err, data) {
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

const putSlot = (checksum, callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = require('./../repos/slots/PizzaSauceType.json')
    params = {
        ...params,
        checksum: checksum
    }
    lex.putSlotType(params, function(err, data) {
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

const createSlotVersion = (checksum, callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = {
        name: 'PizzaSauceType',
        checksum: checksum
    };
    lex.createSlotTypeVersion(params, function(err, data) {
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

const deleteSlot = ()=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = {
        name: 'PizzaSauceType'
    }
    lex.deleteSlotType(params, function(err, data) {
        if(err)
        {
            console.log(err, err.stack);
        } else {
            console.log(data)
        }
    })
}



module.exports = {
    getSlotVersions,
    getSlotVersion,
    createSlotVersion,
    putSlot,
    deleteSlot
}
