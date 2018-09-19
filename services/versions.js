const intent = require('./repos/intents/IntentOne.json')


const getIntentSlots = (intent, newSlotVersions)=> {
    var slots = intent.slots

    //process slot versions
    var slotArray = []
    newSlotVersions.forEach((slot)=> {
        return slotArray[slot.name] = slot.version
    })

    console.log(slotArray)

    // slots.map((slot)=> {
    //     if(slot.name.includes(slot.name))
    // })
}
