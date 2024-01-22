const express = require('express');
const router = express.Router();
const controllers = require('../system/Controllers');

/* 
To add a new route, use the router's HTTP method functions (e.g. get, post, put, delete) to map a URL path to a controller method. 

For example, to add a new route for the '/about' path, you could use:
    router.get('/about', controllers.Users.about);
This would map the GET method for the '/about' path to the 'about' method of the Users controller defined in the controllers module.
*/
router.get('/', controllers.Athletes.index);
router.post('/search', controllers.Athletes.search); 

module.exports = { router, express };