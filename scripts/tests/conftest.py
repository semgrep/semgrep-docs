# Put scripts/ on sys.path so the tests can import the modules they cover.
#
# pytest only adds a test file's own directory, which is scripts/tests/ -- the
# scripts themselves live one level up.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
