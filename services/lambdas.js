const AWS = require('aws-sdk')

const createFunction = ()=> {
    var lambda = new AWS.Lambda({ region: 'us-east-1' })
    var params = require('./../repos/lambdas/hello.json')
    lambda.createFunction(params, function(err, data) {
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
