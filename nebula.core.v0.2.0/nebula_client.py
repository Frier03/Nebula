import threading
from bot import MinecraftBot
from scripts.configManager import ConfigManager
from scripts.accountLoader import AccountLoader
import time

class NebulaClient:
    def __init__(self) -> None:
        self.bots: list(threading.Thread) = []
        self._config_manager: ConfigManager = None
        self._account_loader: AccountLoader = None

        self._initialize()

    def start(self):
        if not self._account_loader.path:
            return

        max_iterator = int(self._config_manager.get_value('Settings', 'max_accounts'))
        throttling_delay = int(self._config_manager.get_value('Settings', 'throttling_delay'))
        host = self._config_manager.get_value('ServerConfiguration', 'host')
        port = self._config_manager.get_value('ServerConfiguration', 'port')

        accounts_list = self._account_loader.load_accounts()

        for index, credentials in enumerate(accounts_list):
            if index >= max_iterator:
                break

            bot = MinecraftBot()
            state = bot.connect(credentials, (host, port))
            self.bots.append(bot) if state == MinecraftBot.State.connected else 0

            time.sleep(throttling_delay / 1000)

    @property
    def ConfigManager(self):
        return self._config_manager
    @property
    def AccountManager(self):
        return self._account_loader
    
    def _initialize(self):
        self._config_manager = ConfigManager('nebula.core.v0.2.0/configurations.conf')
        self._account_loader = AccountLoader()

if __name__ == '__main__':
    nebula_client = NebulaClient()
    nebula_client._account_loader.set_accounts_path('/Users/petfri/Documents/GitHub/Nebula/accounts.txt')
    nebula_client.start()