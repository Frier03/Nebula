# nebula.core.v0.2.0.bot.py
import threading
from enum import Enum
import time

from javascript import require, On
mineflayer = require('mineflayer')

#imageUrl = f"https://mc-heads.net/avatar/{self.entity.username}/600.png"
class MinecraftBot(threading.Thread):
    class State(Enum): 
        idle = 0
        connecting = 1
        connected = 2
        failed_to_connect = 3

    def __init__(self) -> None:
        super().__init__()
        self.id = id(self)
        self.entity = None
        self.state = MinecraftBot.State.idle
        self.event = threading.Event()

    def run(self):
        while True:
            time.sleep(5)

    def connect(self, credentials, serverAddress):
        """Connection process"""
        #print(f"Bot {self.id} is connecting...")

        # Set state "connecting" until the bot has connected
        self.state = MinecraftBot.State.connecting

        self.entity = mineflayer.createBot({ 
            'host': serverAddress[0],
            'port': serverAddress[1],
            'version': serverAddress[2],
            'username': credentials.get('email'),
            'password': credentials.get('password'),
            'auth': credentials.get('auth'),
            'hideErrors': True,
            'logErrors': False,
        })
        
        @On(self.entity, 'error')
        def on_error(this, err):
            self.state = MinecraftBot.State.failed_to_connect

        @On(self.entity, 'login')
        def on_login(this):
            self.state = MinecraftBot.State.connected

            print(self.entity.username + " has logged in!")
            self.start()
        
        while self.state == MinecraftBot.State.connecting:
            # No redundant check is needed
            # Await an event to be triggered to set the bot state
            pass

        #print(f"Bot {self.id}. State: {self.state.name}")
        return self.state
    
    def __setup_events(self) -> None:
        pass