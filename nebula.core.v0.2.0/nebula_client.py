import threading
from bot import MinecraftBot
from scriptConfigManager import ConfigManager

class NebulaClient:
    def __init__(self) -> None:
        self.bots: list(threading.Thread) = []
        self._config_manager: ConfigManager = None

        self._initialize()
 
    def add_bot(self):
        bot = MinecraftBot()
        self.bots.append(bot)

    def start(self):
        pass

    @property
    def ConfigManager(self):
        return self._config_manager

    def _initialize(self):
        self._config_manager = ConfigManager('nebula.core.v0.2.0/configurations.conf')

if __name__ == '__main__':
    nebula_client = NebulaClient()
    nebula_client.add_bot()
    nebula_client.start()
