from nicegui import ui, app

class Interface:
    def __init__(self):
        ...

    def build(self):
        app.native.window_args['resizable'] = False

        with ui.header().classes(replace='row items-center'):
            with ui.tabs():
                ui.tab('General')
                ui.tab('Accounts')
                ui.tab('Botting')
                ui.tab('Settings')
                ui.tab('About')

    def run(self):
        ui.run(title="Nebula", native=True, fullscreen=False)
