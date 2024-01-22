const Athlete = require('../models/Athlete');
const Sport = require('../models/Sport');

class Athletes {
    async index(req, res) {
        const sports = await Sport.getAll();
        res.render('athletes/index', { sports });
    }

    async search(req, res) {
        const athletes = await Athlete.get(req.body);
        res.render('partials/athletes', { athletes });
    }
}

module.exports = new Athletes;