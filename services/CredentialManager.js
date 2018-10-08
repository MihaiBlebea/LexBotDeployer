const AWS = require('aws-sdk')


class CredentialManager
{
    constructor()
    {
        var configuredAWS = AWS.config.loadFromPath('./../repos/config.json')
        return configuredAWS
    }
}

module.exports = CredentialManager
