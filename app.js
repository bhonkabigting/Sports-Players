const { router, express } = require('./config/routes');
const session = require("express-session");
const bodyParser = require("body-parser");
const config = require('./config/main');
const flash = require('./system/middlewares/FlashData');
const profiler = require('./system/middlewares/Profiler');
const app = express();

app.set("views", __dirname + "/application/views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/assets"));
app.use(session(config.session));
app.use(flash);
app.use(profiler);
app.use(router);

app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
});