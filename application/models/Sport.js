const BaseModel = require("../../system/BaseModel");

class Sport extends BaseModel {
    getAll() {
        const query = `SELECT id, sport FROM sports`;
        return this.getMany(query);
    }
}

module.exports = new Sport;