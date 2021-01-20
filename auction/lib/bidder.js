/*

 */

const uuidv4 = require('uuid/v4');
class Bidder {
    constructor(id, config) {
        this.id;
        this.name = config.name;
        this.description  = config.description;
        this.inventoryItems  = config.inventoryItems;
        this.createDate;
    }

    async save (){
        if(!this.id) this.id = uuidv4();
        if(!this.createDate) this.createDate = new Date();
        this.name = config.name;
        this.description  = config.description;
        this.inventoryItems  = config.inventoryItems;
    }
}