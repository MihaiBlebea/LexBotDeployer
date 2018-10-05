const assert = require('assert')
const lambda = require('./../functions/LambdaTwo/LambdaTwo.js')


describe('Test lambda function', function() {
    it('Should return Centrica', function() {
        assert.equal(lambda.hello(), 'Centrica')
    })
})
