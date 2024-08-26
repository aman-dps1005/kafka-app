import {kafka} from "./client";
import readline from "readline";

const rl=readline.createInterface({
    input: process.stdin,
    output:process.stdout
})

async function init(){
    const producer=kafka.producer();

    console.log('connecting producer');
    await producer.connect();
    console.log('producer connected successfully');

    rl.setPrompt('>');
    rl.prompt();

    rl.on('line',async function(line){
        const [ridername,location]=line.split(' ');
        await producer.send({
            topic:'rider-updates',
            messages:[
                {
                    partition:location.toLowerCase()==='north'?0:1,
                    key:'location-update',
                    value:JSON.stringify({name:ridername,loc:location})
                }
            ]
        })
    
    }).on('close',async()=>{
        await producer.disconnect();
    })
}

init();