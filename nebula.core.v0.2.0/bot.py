# nebula.core.v0.2.0.bot.py
import threading
from enum import Enum

class MinecraftBot(threading.Thread):
    class State(Enum):
        idle = 0

    def __init__(self, **kwargs) -> None:
        super().__init__()
        self.id = id(self)

        print(f"Minecraft Bot has been added!")

    async def connect() -> State:
        """Yield 1 until the bot has connected"""
        pass

