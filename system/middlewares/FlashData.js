/*
You can use the `req.session.flash` to store some data that will only be available for the next request.
*/
class FlashData {
    static flash(req, res, next) {
        if (req.session.flash && !req.session.validFlash) {
            req.session.validFlash = true;
        }
        else {
            delete req.session.flash;
            delete req.session.validFlash;
        }
    
        next();
    }
}

module.exports = FlashData.flash;