const assert = require('assert')
const lambda = require('./../functions/LambdaTwo.js')


describe('Test lambda function', function() {
    it('Should return Goodbye World33', function() {
        assert.equal(lambda.goodbye(), 'Goodbye World33')
    })
})
