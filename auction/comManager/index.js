const {Publisher, Subscriber} = require('resel-redis-broker');

const validateEnvVars = () => {
    const missingEnvVars = [];
    const envVarNames = getDependencyEnvVars();
    envVarNames.forEach(envVar => {
        if (!process.env[envVar]) missingEnvVars.push(envVar);
    });

    if (missingEnvVars.length > 0) {
        const str = `The following required environment variable are missing: ${JSON.stringify(missingEnvVars)}. Server shutting down at ${new Date()}.`;
        throw new Error(str);
    }
};


const getDependencyEnvVar = (envVar) => {
    return process.env[envVar];
};

const getDependencyEnvVars = () => {
    return ['REDIS_HOST', 'REDIS_PORT',
        'REDIS_PWD', 'ADMAN_MANAGER_TOPIC_IN', 'ADMAN_MANAGER_TOPIC_OUT',
        'ADMAN_AUCTION_TOPIC_IN', 'ADMAN_AUCTION_TOPIC_OUT'];
};

module.exports = {validateEnvVars, getDependencyEnvVar, Publisher, Subscriber};