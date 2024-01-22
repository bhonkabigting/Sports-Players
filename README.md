# MVC Framework

## Folder Structure
application/
├─ controllers/
├─ models/
├─ views/
assets/
├─ css/
├─ images/
├─ js/
config/
├─ main.js
├─ routes.js
node_modules/
system/
├─ libraries/
│  ├─ Validator.js
├─ middlewares/
│  ├─ FlashData.js
│  ├─ Profiler.js
├─ BaseModel.js
├─ Database.js
├─ GetControllers.js
├─ package-lock.json
├─ package.json
app.js

## Features

### Validator
To use it, you first need to import the class by requiring the file where it is defined.
For example, if you want to use it in your model you need to require it like this :
    `const validator = require("../../libraries/Validator");`

Once you have imported the class you need to set the rules:
There are two ways to set the rules,
    First is by using the 'setRules' method like this:
        `validator.setRules("field name", "data", ["required", "min-4", "max-5", "email", "alpha"]);`
        
    Second is by assigning it directly to the 'rules' property like this:
        `validator.rules = [
            ["First Name", student.first_name, ["required", "alpha"]],
            ["Last Name", student.last_name, ["required", "alpha"]],
            ["Email", student.email, ["email"]],
            ["Password", student.password, ["required", "min-8", "max-20"]],
            ["Password", student.confirm_password, [`match-${student.password}`]]
        ];`

After we have set all the validation rules, we call the `isValid` method.
If the data is invalid, the `isValid` method returns false;
The `validator.errors` array contains all the error messages generated during validation.
This is an example on how to implement this:
    `if (validator.isValid()) {
        this.insert(student);
        return ["Registration is successful."];
    }
    else {
        return validator.errors;
    }`

### Flash Data
You can use the `req.session.flash` to store some data that will only be available for the next request.

### Profiler
Set the `enable_profiler` value to `true` to enable the profiler and `false` to disable the profiler in main.js file in the config folder.

## Instruction to run

### Setting configurations
You can set the port, session, database host and profiler in the config.js  

### Adding a route
To add a new route, use the router's HTTP method functions (e.g. get, post, put, delete) to map a URL path to a controller method. 

For example, to add a new route for the '/about' path, you could use:
    `router.get('/about', controllers.Users.about);`
This would map the GET method for the `/about` path to the `about` method of the `Users` controller defined in the controllers module.

### Creating a model
First, import the `BaseModel` in your ModelName.js file like this:
    `const BaseModel = require("../../system/BaseModel");`

Then create a class and extend it with `BaseModel` like this:
    `class ModelName extends BaseModel {}`

Lastly, import it like this:
    `module.exports = new ModelName;`

### Using MySQL queries
You can use MySQL queries in the model class in three ways:
First is by using `query` method like this:
    `this.query(sql, args);`

Second is by using `getMany` method to get more than one row like this:
    `this.getMany(sql, args)`

This is by using `getOne` method to get only one row like this:
    `this.getOne(sql, args)`

### Creating a controller
You can create a controller like this:
    `class ControllerName {}`

You also need to import it like this:
    `module.exports = new ControllerName;`

### Run
Type "node app.js" on the command line.