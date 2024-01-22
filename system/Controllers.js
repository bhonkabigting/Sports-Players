const fs = require('fs');
const path = require('path');

class Controllers {
  static getControllerFiles() {
    const controllersDir = path.join(__dirname, '../application/controllers');
    return fs.readdirSync(controllersDir);
  }

  static getControllers() {
    const controllerFiles = this.getControllerFiles();
    const controllers = {};

    for (const file of controllerFiles) {
      const controllerName = path.basename(file, '.js');
      const controller = require(path.join(__dirname, `../application/controllers/${file}`));
      controllers[controllerName] = controller;
    }

    return controllers;
  }
}

module.exports = Controllers.getControllers();
