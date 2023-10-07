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
    config_manager = ConfigManager('configurations.conf')

    # Read values
    username = config_manager.get_value('Settings', 'username')
    password = config_manager.get_value('Settings', 'password')
    server = config_manager.get_value('Settings', 'server')
    port = config_manager.get_value('Settings', 'port')

    print(f'Username: {username}')
    print(f'Password: {password}')
    print(f'Server: {server}')
    print(f'Port: {port}')

    # Update values
    config_manager.set_value('Settings', 'username', 'new_username')
    config_manager.set_value('Settings', 'password', 'new_password')

    # Save the updated configuration
    config_manager.save()
