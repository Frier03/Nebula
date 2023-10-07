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
 
    def add_bot(self):
        bot = MinecraftBot()
        self.bots.append(bot)

    def start(self):
        if not self.account_loader.accounts_list_path:
            return

        max_iterator = int(self._config_manager.get_value('Settings', 'max_accounts'))
        throttling_delay = int(self._config_manager.get_value('Settings', 'throttling_delay'))
        accounts_list = self.account_loader.load_accounts()

        for index, account in enumerate(accounts_list):
            if index >= max_iterator:
                break

            print(account)
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
    nebula_client.add_bot()
    nebula_client.start()
