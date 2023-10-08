# nebula.core.v0.2.0.bot.py
from enum import Enum
import time

class MinecraftBot():
    class State(Enum): 
        idle = 0
        connecting = 1
        connected = 2

    def __init__(self) -> None:
        self.id = id(self)
        self.state = MinecraftBot.State.idle

    def connect(self, credentials):
        """Simulate a connection process"""
        print(f"Bot {self.id} is connecting...")

        # Set state "connecting" until the bot has connected
        self.state = MinecraftBot.State.connecting
        
        # Simulate a connection process asynchronously
        time.sleep(2)

        # Update the state to "connected"
        self.state = MinecraftBot.State.connected
        print(f"Bot {self.id} is connected. State: {self.state.name}")

        return MinecraftBot.State.connected