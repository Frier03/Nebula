const PropertiesReader = require('properties-reader');

// Define the path to your configuration file
const configFilePath = 'configuration.properties'; // Replace with the actual file path

// Read and parse the configuration file
const properties = PropertiesReader(configFilePath);

// Export a function to load all properties
module.exports = () => {
    const config = {};

    // Load all properties from the configuration file
    properties.each((key, value) => {
        config[key] = value;
    });

    return config;
};
