/*

 */

const uuidv4 = require('uuid/v4');

class Bid {
    constructor(id, config) {
        this.id;
        this.amount = config.amount || 0;
        this.limit = config.limit || 10;
        this.createTime = new Date();
        this.auction = config.auction;
        this.bidder = config.bidder;
    }

    async save (){
        if(!this.id) this.id = uuidv4();
        if(!this.createDate) this.createDate = new Date();
    }
}