# nebula.core.v0.2.0.bot.py
import threading
from enum import Enum
import time

from javascript import require, On
mineflayer = require('mineflayer')

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
            print(f"Bot {self.id} - {self.state.name}")
            time.sleep(5)

    def connect(self, credentials, serverAddress):
        """Connection process"""
        print(f"Bot {self.id} is connecting...")

        # Set state "connecting" until the bot has connected
        self.state = MinecraftBot.State.connecting

        self.entity = mineflayer.createBot({ 
            'host': serverAddress[0],
            'port': serverAddress[1],
            'username': credentials.get('email'),
            'password': credentials.get('password'),
            'auth': credentials.get('auth'),
            'hideErrors': True,
            'logErrors': False
        })
        
        @On(self.entity, 'error')
        def onError(this, err):
            if err.details == None: return

            self.state = MinecraftBot.State.failed_to_connect
            print(err.details.reason)

        @On(self.entity, 'spawn')
        def onSpawn(this):
            self.state = MinecraftBot.State.connected
            #self.imageUrl = f"https://mc-heads.net/avatar/{self.entity.username}/600.png"

            self.start()
        
        while self.state == MinecraftBot.State.connecting:
            # No redundant check is needed
            # Await an event to be triggered to set the bot state
            pass

        #print(f"Bot {self.id}. State: {self.state.name}")
        return self.state
    
    def __setup_events(self) -> None:
        pass