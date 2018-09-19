const intent = require('./../repos/intents/IntentOne.json')


var slotsObj =  [
    { name: 'SlotTypeOne', version: '6' },
    { name: 'SlotTypeTwo', version: '6' }
]

var intentsObj =  [
    { name: 'IntentOne', version: '1' },
    { name: 'IntentTwo', version: '1' } 
]

const updateIntentSlots = (intent, newSlotVersions)=> {
    var slots = intent.slots

    //process slot versions
    var slotArray = []
    newSlotVersions.forEach((slot)=> {
        return slotArray[slot.name] = slot.version
    })

    newSlots = []
    slots.map((slot)=> {
        if(Object.keys(slotArray).includes(slot.name))
        {
            newSlots.push({
                ...slot,
                slotTypeVersion: slotArray[slot.name]
            })
        }
    })

    return {
        ...intent,
        slots: newSlots
    }
}


const updateBotIntents = (bot, newIntentVersions)=> {
    var intents = bot.intents

    //process slot versions
    var intentArray = processResourceChildren(intents)

    newIntents = []
    intents.map((intent)=> {
        if(Object.keys(intentArray).includes(intent.intentName))
        {
            newIntents.push({
                ...intent,
                intentVersion: intentArray[intent.intentName]
            })
        }
    })

    return {
        ...bot,
        intents: newIntents
    }
}


const processResourceChildren = (resources)=> {
    var result = []
    resources.forEach((resource)=> {
        return result[resource.name] = resource.version
    })
    return result
}


// newIntent = updateIntentSlots(intent, slotsObj)
newBot = updateBotIntents(bot, intentsObj)
console.log(newBot)
