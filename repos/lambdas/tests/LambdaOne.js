const assert = require('assert')
const lambda = require('./../functions/LambdaOne/LambdaOne.js')


describe('Test lambda function', function() {
    it('Should return hello World', function() {
        assert.equal(lambda.hello(), 'hello World222')
    })
})
