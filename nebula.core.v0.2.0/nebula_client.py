# nebula.core.v0.2.0.nebula_client.py
from threading import Thread
from bot import MinecraftBot

class NebulaClient:
    def __init__(self) -> None:
        self.bots: list(Thread) = []

    def add_bot(self):
        bot = MinecraftBot()
        self.bots.append(bot)
    
    @property
    def _initialize(self):
        # Pre-initialization logic goes here
        return

if __name__ == '__main__':
    nebula_client = NebulaClient()
    #nebula_client.add_bot()