const assert = require('assert')
const lambda = require('./../functions/LambdaFour/LambdaFour.js')


describe('Test lambda function 3', function() {
    it('Should return hello wwwWorleeeee', function() {
        assert.equal(lambda.hello(), 'hello Worleeeee')
    })
})
