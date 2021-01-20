const URL = require("url").URL;

const stringIsAValidUrl = (s) => {
    try {
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};

const validateTargets = () =>{
    let arr = [];

    if(!process.env.ADMAN_INVENTORY_URL) arr.push('ADMAN_INVENTORY_URL');
    if(!process.env.ADMAN_INVENTORY_TOPIC_IN) arr.push('ADMAN_INVENTORY_TOPIC_IN');
    if(!process.env.ADMAN_INVENTORY_TOPIC_OUT) arr.push('ADMAN_INVENTORY_TOPIC_OUT');
    if(!process.env.ADMAN_AUCTION_TOPIC_IN) arr.push('ADMAN_AUCTION_TOPIC_IN');
    if(!process.env.ADMAN_AUCTION_TOPIC_OUT) arr.push('ADMAN_AUCTION_TOPIC_OUT');
    if(arr.length > 0){
        const str =  `The following required environment variable are missing: ${JSON.stringify(arr)}. Server shutting down at ${new Date()}.`;
        throw new Error(str);
    }

    arr = [];

    if(!stringIsAValidUrl(process.env.ADMAN_INVENTORY_URL)) arr.push('ADMAN_INVENTORY_URL');

    if(arr.length > 0){
        const str =  `The following required target URLs are not formatted property: ${JSON.stringify(arr)}. Server shutting down at ${new Date()}.`;
        throw new Error(str);
    }
    const topics = getTopics();
    topics.forEach(function(topic) {
        console.log(`${target}'s url is ${getTargetApiUrl(target)}`);
    });
};

const getTopics = ()=> {
    return ['AUCTION_IN','AUCTION_OUT', 'INVENTORY_IN','INVENTORY_OUT'];
};

const getInventoryUrl = ()=> {
    return process.env.ADMAN_INVENTORY_URL;
};

const getTopicName = (TOPIC_ENUM) => {
    switch (TARGET_ENUM) {
        case 'AUCTION_IN':
            return process.env.ADMAN_AUCTION_TOPIC_IN;
        case 'AUCTION_OUT':
            return process.env.ADMAN_AUCTION_TOPIC_OUT;
        case 'INVENTORY_IN':
            return process.env.ADMAN_INVENTORY_TOPIC_IN;
        case 'INVENTORY_OUT':
            return process.env.ADMAN_INVENTORY_TOPIC_OUT;
    }
};

module.exports = {validateTargets,getTopicName,getTopics,getInventoryUrl};


