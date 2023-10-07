import configparser

class ConfigManager:
    def __init__(self, filename):
        self.filename = filename
        self.config = configparser.ConfigParser()
        self.config.read(self.filename)

    def get_value(self, section, option):
        return self.config.get(section, option)

    def set_value(self, section, option, value):
        print(self.config.has_section(section))
        if not self.config.has_section(section):
            self.config.add_section(section)
        self.config.set(section, option, value)
        self.save()

    def save(self):
        with open(self.filename, 'w') as configfile:
            self.config.write(configfile)

    def __format__(self, __format_spec: str) -> str:
        pass

# Usage
if __name__ == "__main__":
    config_manager = ConfigManager('nebula.core.v0.2.0/configurations.conf')

    # Example
    username = config_manager.get_value('Settings', 'max_accounts')