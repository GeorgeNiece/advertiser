const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const uuidv4 = require('uuid/v4');

const {validateEnvVars, getDependencyEnvVar, Publisher, Subscriber} = require('./comManager');

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.ADMAN_MANAGER_PORT || 3000; // set our port

const getInitMessage = (service, id) =>{
    return `${service} ${id} started running at ${new Date()}`;
};

validateEnvVars();

// create our router
const router = express.Router();

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log({request:req});
    next();
});

const defaultAdUrl = 'https://avatars1.githubusercontent.com/u/1110569?s=400&u=a23a575c057869fdf77984b0cda50bc40d845fc0&v=4';
const defaultAd = {id: uuidv4(), url:defaultAdUrl, type:'jpg'};

router.route('/ads')
    .post( async function (req, res) {
        console.log(`Received Ad item ${JSON.stringify(req.body)} at ${new Date()}`);

        //TODO: Ad an Ad item to the system
        throw new Error('POST /ads not implemented');

        res.statusCode = 200;
        res.send(JSON.stringify({OK:"OK"}));
        res.end();
    })
    .get( async function (req, res) {
        console.log(`Getting Ad inventory items at ${new Date()}`);

        //TODO: Get an inventory ALL item
        res.statusCode = 200;

        res.send(JSON.stringify([defaultAd]));
        res.end();
    });

router.route('/ads/:id')
    .get( async function (req, res) {
        console.log(`Getting ad data for id: ${JSON.stringify(req.params.id)} at ${new Date()}`);
        const id = req.query.id;
        //TODO: Get a processed ad item
        res.statusCode = 200;
        res.send(JSON.stringify(defaultAd));
        res.end();
    });

/***
 *
 */
router.route('/ad')
    .get( async function (req, res) {
        console.log(`Getting ad data: ${JSON.stringify(req.params.id)} at ${new Date()}`);

        const adType = req.query.type;
        let ad;

        switch(adType.toUpperCase()){
            case 'IMAGE':
                ad = defaultAd;
            case 'AUDIO':
                ad = {id: uuidv4(), url: 'https://fiftiesweb.com/usa/gettysburg-address-sw.mp3', type:'mp3'};
                break;
            case 'VIDEO':
                ad = {id: uuidv4(), url: 'https://www.youtube.com/watch?v=QH35jVSQ3pU', type:'mp4'};
        }

        //Uses auction to get the right add

        //TODO: Get a processed ad item
        res.statusCode = 200;

        res.send(JSON.stringify(ad));
        res.end();
    });
router.route('/adTypes')
    .get( async function (req, res) {
        console.log(`Getting ad data: ${JSON.stringify(req.params.id)} at ${new Date()}`);

        //Uses auction to get the right add

        //TODO: Get a processed ad item
        res.statusCode = 200;

        res.send(JSON.stringify({adTypes:['IMAGE', 'AUDIO', 'VIDEO']}));
        res.end();
    });


//Start the messaging stuff

const createStatusObject = (service,handler,mode,message, from, to) =>{
    const obj = {
        service,
        handler,
        mode,
        message,
        from,
        to,
        createdOn: new Date()
    };

    return obj;
};


const onAdManagerMessageReceived = async (channel, message) => {
    let obj = createStatusObject('ADMAN_MANAGER', 'onAdManagerMessageReceived', 'RECEIVED', message, channel);
    console.log(JSON.stringify(obj));

    //TODO: Process the inventory message

    obj = createStatusObject('ADMAN_MANAGER', 'onAdManagerMessageReceived', 'PUBLISHED', message, null, getDependencyEnvVar('ADMAN_MANAGER_TOPIC_OUT'));
    obj.rslt = rslt;
    console.log(JSON.stringify(obj));
};

const admanagerPublisher = new Publisher(getDependencyEnvVar('ADMAN_MANAGER_TOPIC_OUT'));
const admanagerSubscriber = new Subscriber(getDependencyEnvVar('ADMAN_MANAGER_TOPIC_IN'), onAdManagerMessageReceived);

console.log(getInitMessage('admanagerPublisher', admanagerPublisher.id));
console.log(getInitMessage('admanagerSubscriber', admanagerSubscriber.id));

// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

//Start the server
const server = app.listen(port);
const shutdown = () => {
    console.log(`Adman Manager Server shutting down at ${new Date()}`);
    server.close()
};

console.log('Adman Manager is listening on port: ' + port);
module.exports = {server, shutdown};
