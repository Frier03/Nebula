from pathlib import Path

class AccountLoader:
    def __init__(self):
        self.path: Path = None

    def set_accounts_path(self, path):
        if not Path(path).exists() or not Path(path).is_file():
            return 'Path does not exist or is not a file'
        if not Path(path).suffix.lower() == '.txt':
            return 'Invalid file extension, .txt expected'

        self.path = Path(path)
        return 'ok'
        
    def load_accounts(self):
        accounts = []
        with open(self.path, 'r') as file:
            for line in file:
                parts = line.strip().split(':')
                if len(parts) == 3:
                    email, password, auth = parts
                    accounts.append({'email': email, 'password': password, 'auth': auth})
                else:
                    print(f"Skipping invalid line: {line.strip()}")
        return accounts