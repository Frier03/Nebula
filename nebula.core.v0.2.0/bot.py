# nebula.core.v0.2.0.bot.py
import threading
from enum import Enum
import asyncio

class MinecraftBot(threading.Thread):
    class State(Enum):
        idle = 0
        connecting = 1
        connected = 2

    def __init__(self, **kwargs) -> None:
        super().__init__()
        self.id = id(self)
        self.state = MinecraftBot.State.idle

    async def connect(self) -> State:
        """Simulate a connection process"""
        print(f"Bot {self.id} is connecting...")

        # Yield "connecting" until the bot has connected
        yield MinecraftBot.State.connecting
        
        # Simulate a connection process asynchronously
        await asyncio.sleep(2)

        # Update the state to "connected"
        self.state = MinecraftBot.State.connected
        print(f"Bot {self.id} is connected. State: {self.state.name}")

        # Signal the end of the generator
        raise StopAsyncIteration