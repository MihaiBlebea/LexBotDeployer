const AWS = require('aws-sdk')


const getSlotVersions = (slotName, callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = { name: slotName }
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

const getSlotVersion = (slotName, callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = {
        version: "$LATEST",
        name: slotName
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

const putSlot = (slotName, checksum, callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = require('./../repos/slots/' + slotName + '.json')
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

const createSlotVersion = (slotName, checksum, callback)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = {
        name: slotName,
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

const deleteSlot = (slotName)=> {
    var lex = new AWS.LexModelBuildingService({ region: 'us-east-1' })
    var params = {
        name: slotName
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
