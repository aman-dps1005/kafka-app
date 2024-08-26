import {kafka} from "./client";

async function init(){
    const admin=kafka.admin();
    console.log("admin connecting");
    await admin.connect();
    console.log("admin connect success");

    await admin.createTopics({
        topics:[{
            topic:"rider-updates",
            numPartitions:2
        }]
    })

    console.log('topic created successfuly:[rider-updates]');
    await admin.disconnect();

}

init();