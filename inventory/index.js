const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {validateEnvVars, getDependencyEnvVar, Publisher, Subscriber} = require('./communicationManager');

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.SENDER_PORT || 3000; // set our port

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

router.route('/')
    .post( async function (req, res) {
        console.log(`Received inventory item ${JSON.stringify(req.body)} at ${new Date()}`);

        //TODO: Ad an inventory item to the system

        res.statusCode = 200;
        res.send(JSON.stringify({OK:"OK"}));
        res.end();
    })
    .get( async function (req, res) {
        console.log(`Getting all inventory items at ${new Date()}`);

        //TODO: Get an inventory ALL item
        res.statusCode = 200;

        res.send(JSON.stringify({OK:"OK"}));
        res.end();
    });

router.route('/:id')
    .get( async function (req, res) {
        console.log(`Getting data for id: ${JSON.stringify(req.params.id)} at ${new Date()}`);

        //TODO: Get an inventory item
        res.statusCode = 200;

        res.send(JSON.stringify({OK:"OK"}));
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


const onInventoryMessageReceived = async (channel, message) => {
    let obj = createStatusObject('ADMAN_INVENTORY', 'onInventoryMessageReceived', 'RECEIVED', message, channel);
    console.log(JSON.stringify(obj));

    //TODO: Process the inventory message

    obj = createStatusObject('ADMAN_INVENTORY', 'onInventoryMessageReceived', 'PUBLISHED', message, null, getDependencyEnvVar('ADMAN_INVENTORY_TOPIC_OUT'));
    obj.rslt = rslt;
    console.log(JSON.stringify(obj));
};

const inventoryPublisher = new Publisher(getDependencyEnvVar('ADMAN_INVENTORY_TOPIC_OUT'));
const inventorySubscriber = new Subscriber(getDependencyEnvVar('ADMAN_INVENTORY_TOPIC_IN'), onInventoryMessageReceived);

console.log(getInitMessage('inventoryPublisher', inventoryPublisher.id));
console.log(getInitMessage('inventorySubscriber', inventorySubscriber.id));

// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

//Start the server
const server = app.listen(port);
const shutdown = () => {
    console.log(`Adman Inventory Server shutting down at ${new Date()}`);
    server.close()
};

console.log('Adman Inventory is listening on port: ' + port);
module.exports = {server, shutdown};
