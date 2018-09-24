const AWS = require('aws-sdk')
const zipper = require('./services/zipper')
const LambdaManger = require('./services/LambdaManager')
const tester = require('./services/tester')

const lambda = new AWS.Lambda({ region: 'us-east-1' })
var manager = new LambdaManger(lambda, zipper, tester)

manager.deployLambda('LambdaOne')


// manager.runUnitTesting((result)=> {
//     console.log(result)
// })
//
// manager.createFunction('LambdaOne', (data)=> {
//     console.log(data)
// })
