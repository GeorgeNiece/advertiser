const uuidv4 = require('uuid/v4');

class InventoryItem {
    async constructor(id, config) {
        if(id)
        {
            this.id = id;
            await load(this.id)
                .then( rslt => {
                    this.name = rslt.name;
                    this.type  = rslt.type;
                    this.height  = rslt.height;
                    this.width  = rslt.width;
                    this.duration  = rslt.duration;
                    this.bidder  = rslt.bidder;
                    this.createDate;
                })
        }else{
            this.name = config.name;
            this.type  = config.type;
            this.height  = config.height;
            this.width  = config.width;
            this.duration  = config.duration;
            this.bidder  = config.bidder;
            this.createDate;
        }
    }

    async load(id){
        //TODO implement this
        throw new Error('InventoryItem.load() not implemented');
    }

    async save (){
        if(!this.id) this.id = uuidv4();
        if(!this.createDate) this.createDate = new Date();
    }
}