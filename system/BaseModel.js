const connection = require('./Database');

class BaseModel {
    constructor() {
        this.connection = connection;
    }

    static lastQuery = [];

    query(sql, args = []) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    this.constructor.lastQuery[this.constructor.lastQuery.length] = sql;
                    resolve(result);
                }
            });
        });
    }

    async getOne(sql, args = []) {
        try {
            const result = await this.query(sql, args);
            if (result.length === 0) {
                return null;
            }
            return result[0];
        } catch (err) {
            throw err;
        }
    }

    async getMany(sql, args = []) {
        try {
            const result = await this.query(sql, args);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = BaseModel;