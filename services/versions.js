
const updateIntentSlots = (intent, newSlotVersions)=> {
    var slots = intent.slots

    //process slot versions
    var slotArray = processResourceChildren(newSlotVersions)

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
    var intentArray = processResourceChildren(newIntentVersions)

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


module.exports = {
    updateIntentSlots,
    updateBotIntents
}
