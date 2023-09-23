const PropertiesReader = require('properties-reader');
const fs = require('fs');

const configFilePath = 'configuration.properties'; // Replace with the actual file path
const properties = PropertiesReader(configFilePath);

exports.updateProperty = (key, val) => {
    properties.set(key, val);
    properties.save(configFilePath);
};

exports.getConfig = (searchKey) => { return properties.get(searchKey); };
