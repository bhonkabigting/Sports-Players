const BaseModel = require("../../system/BaseModel");

class Athlete extends BaseModel {
    /* Get all athletes that match the parameters.
    */
    get(params) {
        if (!params.name) {
            params.name = '';
        }

        let query = `SELECT name, img_url FROM athletes WHERE name LIKE ?`;
        const values = [`%${params.name}%`];

        if (params.gender) {
            query += ` AND gender IN (?)`;
            values[values.length] = params.gender;
        }

        if (params.sports) {
            query += ` AND sport_id IN (?)`;
            values[values.length] = params.sports;
        }

        query += ` ORDER BY name`;

        return this.getMany(query, values);      
    }
}

module.exports = new Athlete;