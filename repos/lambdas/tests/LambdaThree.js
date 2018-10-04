const assert = require('assert')
const lambda = require('./../functions/LambdaThree/LambdaThree.js')


describe('Test lambda function 3', function() {
    it('Should return hello wwwWorleeeee', function() {
        assert.equal(lambda.goodbye(), 'hello Worleeeee')
    })
})
