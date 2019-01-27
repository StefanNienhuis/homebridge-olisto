var Olisto = require('olisto');
var Service, Characteristic, HomebridgeAPI;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  HomebridgeAPI = homebridge;

  homebridge.registerPlatform('homebridge-olisto', 'Olisto', OlistoPlatform);
  homebridge.registerAccessory('homebridge-olisto', 'OlistoAccessory', OlistoAccessory);
};

function OlistoPlatform(log, config) {
  this.log = log;
  this.triggs = config.triggs;
}

OlistoPlatform.prototype.accessories = function(callback) {
  this.accessories = [];

  for (var i = 0; i < this.triggs.length; i++) {
    var olistoAccessory = new OlistoAccessory(this.log, this.triggs[i], this);
    this.accessories.push(olistoAccessory);
  }

  callback(this.accessories);
}

function OlistoAccessory(log, config, platform) {
  this.platform = platform;
  this.log = log;
  this.name = config.name;
  this.type = config.type || "push";
  this.connecturl = config.connecturl
  this.connector = new Olisto(this.connecturl);

  // Check for valid config

  if (this.type != "push" && this.type != "switch" && this.type != "outlet") {
    log.error('Invalid type, please use "push", "switch" or "outlet"!');
    log.error('Now using default "push."')
    this.type = "push"
  }

  if (this.type == "push" || this.type == "switch") {
    this.service = new Service.Switch(this.name);

    this.service
      .getCharacteristic(Characteristic.On)
      //.on('get', this.getOn.bind(this))
      .on('set', this.setOn.bind(this));
  } else if (this.type == "outlet") {
    this.service = new Service.Outlet(this.name)

    this.service
      .getCharacteristic(Characteristic.On)
      //.on('get', this.getOn.bind(this))
      .on('set', this.setOn.bind(this));

    this.service
      .setCharacteristic(Characteristic.OutletInUse, true)
  }
}

OlistoAccessory.prototype.getInformationService = function() {
  var informationService = new Service.AccessoryInformation();
  informationService
    .setCharacteristic(Characteristic.Name, this.name)
    .setCharacteristic(Characteristic.Manufacturer, 'StefanNienhuis')
    .setCharacteristic(Characteristic.Model, this.type.charAt(0).toUpperCase() + this.type.slice(1))
    .setCharacteristic(Characteristic.SerialNumber, this.connecturl);

  return informationService;
}

OlistoAccessory.prototype.getServices = function() {
  return [this.service, this.getInformationService()];
};

/* Requested feature: get value of connector from Olisto
OlistoAccessory.prototype.getOn = function(callback) {

}
*/

OlistoAccessory.prototype.setOn = function(on, callback) {
  var accessory = this;

  if (accessory.type == "push") {
    // Accessory is a push button
    if (+on == 1) {
      accessory.connector.setOn();
      callback(accessory.service.setCharacteristic(Characteristic.On, 0));
    }

  } else if (accessory.type == "switch" || accessory.type == "outlet") {
    // Accessory is an switch or outlet
    accessory.connector.setValue(this.name + +on);
    callback(null);
  }
}
