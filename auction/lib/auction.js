const uuidv4 = require('uuid/v4');

class Auction {
    constructor(id, config) {
        this.id;
        this.name = config.name;
        this.type  = config.type;
        this.height  = config.height;
        this.width  = config.width;
        this.duration  = config.duration;
        this.bids = [];
        this.winner;
        this.startDate = config.startDate;
        this.endDate = config.endDate;
        this.createDate;
        this.onAuctionWonHandler; //event handler that gets called when the auction has a winner
    }

    async save (){
        if(!this.id) this.id = uuidv4();
        if(!this.createDate) this.createDate = new Date();
    }


    async run (){
        if(!this.id) this.id = uuidv4();
        if(!this.createDate) this.createDate = new Date();
    }
}