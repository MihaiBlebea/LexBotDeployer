const { exec } = require('child_process')


const getSlotType = (slotName, callback)=> {
    exec(`aws lex-models get-slot-type \
            --region us-east-1 \
            --name ${slotName} \
            --slot-type-version "\\$LATEST"`, (error, stdout, stderr)=> {
        if(error) console.log(error)
        console.log('STDOUT', stdout)
        console.log('STDERR', stderr)
        if(callback)
        {
            callback(stdout)
        }
    })
}


getSlotType('SlotTypeOne', ()=> {
    console.log('ceva')
})
