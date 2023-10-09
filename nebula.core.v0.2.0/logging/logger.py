from formatter import Formatter
from file_handler import FileHandler
from log_record import LogRecord

from enum import Enum

class SeverityLevel(Enum):
    notset: 0       =   True
    debug: 1        =   True
    info: 2         =   True
    warning: 3      =   True
    critical: 4     =   False

    @classmethod
    def _find_severity_for(cls, severity):
        # Search for the severity level by name and return its value.
        for level in cls:
            if level.name == severity:
                return level.value

class Logger():
    """
    Instances of the Logger class represent a single logging channel. Each minecraft bot has their own child logging channel. A loggers parent is referred to a minecraft bot.
    """
    def __init__(self, parent=None, severity_level=SeverityLevel.notset) -> None:
        self._formatter: Formatter = Formatter()
        self._file_handler: FileHandler = FileHandler()
        self._log_record: LogRecord = LogRecord()

        self.severity: SeverityLevel = severity_level
        self.parent = parent
        self.disabled = False

    def _is_severity_enabled_for(self, level: SeverityLevel):
        """
        Is this logger enabled for severity level 'level'?
        """

        if self.disabled: 
            return False
        
        return SeverityLevel._find_severity_for(level.name)
            

    def _log(self, level: SeverityLevel, timestamp, msg):
        """
        Low-level logging routine. Formats the log and creates a LogRecord.
        """

        if self.disabled:
            return False
        
        if not self._is_severity_enabled_for(level):
            return False
        
        pass

if __name__ == '__main__':
    logger = Logger()
    is_enabled = logger._is_severity_enabled_for(SeverityLevel.info)