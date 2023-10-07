import threading
from bot import MinecraftBot
from scripts.configManager import ConfigManager
from scripts.accountLoader import AccountLoader
import asyncio

class NebulaClient:
    def __init__(self) -> None:
        self.bots: list(threading.Thread) = []
        self._config_manager: ConfigManager = None
        self._account_loader: AccountLoader = None

        self._initialize()
 
    def add_bot(self, credentials):
        bot = MinecraftBot(credentials)
        self.bots.append(bot)
        return bot

    def start(self):
        if not self._account_loader.path:
            return

        max_iterator = int(self._config_manager.get_value('Settings', 'max_accounts'))
        throttling_delay = int(self._config_manager.get_value('Settings', 'throttling_delay'))
        accounts_list = self._account_loader.load_accounts()

        for index, credentials in enumerate(accounts_list):
            if index >= max_iterator:
                break

            bot = self.add_bot(credentials)
            bot.connect()

            asyncio.sleep(throttling_delay)

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
    nebula_client.start()
