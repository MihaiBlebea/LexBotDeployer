const assert = require('assert')
const lambda = require('./LambdaOne.js')


describe('Test lambda function', function() {
    it('Should return Hello', function() {
        assert.equal(lambda.hello(), 'hello World')
    })
})
