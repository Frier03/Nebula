from pathlib import Path

class AccountLoader:
    def __init__(self) -> None:
        self.path: Path = None

    def set_accounts_path(self, path) -> bool:
        if not Path(path).exists() or not Path(path).is_file():
            return False
        if not Path(path).suffix.lower() == '.txt':
            return False

        self.path = Path(path)
        return True
        
    def load_accounts(self) -> None:
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