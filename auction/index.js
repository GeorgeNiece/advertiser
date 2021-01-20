/*
supported message

{

}

 */

// call the packages we need
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const {validateEnvVars, getDependencyEnvVar, Publisher, Subscriber} = require('./comManager');

// configure body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.ADMAN_AUCTION_PORT || 3000; // set our port

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

router.route('/auctions')
    .get( async function (req, res) {
        console.log(`Getting all auctions on ${new Date()}`);

        /*
        auctions out
        [{
            id: UUID,
            title: string,
            fileTypes: array,
            runtime: time
            stateDate: date,
            endDate: date,
            bids: [{
              bid: decimal,
              date: date,
              bidderId: UUID
            }],
            winner:{
              bid: decimal,
              date: date,
              bidderId: UUID
            }
        }]
         */

        //TODO: Get auctions
        res.statusCode = 200;

        res.send(JSON.stringify({OK:"OK"}));
        res.end();
    })
    .post( async function (req, res) {
        console.log(`Received auction ${JSON.stringify(req.body)} at ${new Date()}`);

        //TODO: Add an auction to the system

        /* auction in
        {
            title: string,
            fileTypes: array,
            runtime: time
            stateDate: date,
            endDate: date,
        }

           auction out
        {
            id: UUID,
            title: string,
            fileTypes: array,
            runtime: time
            stateDate: date,
            endDate: date,
        }


         */

        res.statusCode = 200;
        res.send(JSON.stringify({auction:{}}));
        res.end();
    })

router.route('/auctions/:id')
    .get( async function (req, res) {
        console.log(`Getting auction at ${new Date()}`);

        //TODO: Get an auction
        /*
        auction out
        {
            id: UUID,
            title: string,
            fileTypes: array,
            runtime: time
            stateDate: date,
            endDate: date,
             bids: [{
              bid: decimal,
              date: date,
              bidder: {id: UUID, name:string}
            }],
            winner:{
              bid: decimal,
              date: date,
              bidder: {id: UUID, name:string}
            }
        }
        */
        res.statusCode = 200;

        res.send(JSON.stringify({auction:{}}));
        res.end();
    });


router.route('/bidders/')
    .get( async function (req, res) {
        console.log(`Getting data for bid id: ${JSON.stringify(req.params.id)} at ${new Date()}`);

        //TODO: Get bidders
        /*
        [{
          id:UUID,
          name: string
          bids: [{auction:{id: UUID, name:string}, date: date, amount: decimal}]
        }]
       */

        res.statusCode = 200;

        res.send(JSON.stringify({bid:{}}));
        res.end();
    })
    .post ( async function (req, res) {

    })

router.route('/bidders/:id')
    .get( async function (req, res) {
        console.log(`Getting data for bid id: ${JSON.stringify(req.params.id)} at ${new Date()}`);

        //TODO: Get bidder
        /*
          {
            id:UUID,
            name: string
            bids: [{auction:{id: UUID, name:string}, date: date, amount: decimal}]
          }
         */
        res.statusCode = 200;

        res.send(JSON.stringify({bid:{}}));
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


const onAuctionMessageReceived = async (channel, message) => {
    let obj = createStatusObject('ADMAN_AUCTION', 'onAuctionMessageReceived', 'RECEIVED', message, channel);
    console.log(JSON.stringify(obj));

    //TODO: Process the auction message

    obj = createStatusObject('ADMAN_AUCTION', 'onAuctionMessageReceived', 'PUBLISHED', message, null, getDependencyEnvVar('ADMAN_AUCTION_TOPIC_OUT'));
    obj.rslt = rslt;
    console.log(JSON.stringify(obj));
};

const auctionPublisher = new Publisher(getDependencyEnvVar('ADMAN_INVENTORY_TOPIC_OUT'));
const auctionSubscriber = new Subscriber(getDependencyEnvVar('ADMAN_INVENTORY_TOPIC_IN'), onAuctionMessageReceived);

console.log(getInitMessage('auctionPublisher', auctionPublisher.id));
console.log(getInitMessage('auctionSubscriber', auctionSubscriber.id));

// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

//Start the server
const server = app.listen(port);
const shutdown = () => {
    console.log(`Adman Auction Server shutting down at ${new Date()}`);
    server.close()
};

console.log('Adman Auction is listening on port: ' + port);
module.exports = {server, shutdown};
