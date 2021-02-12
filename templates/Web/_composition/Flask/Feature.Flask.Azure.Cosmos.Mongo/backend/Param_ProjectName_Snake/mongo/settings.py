import os

import dotenv

# Create .env file path.
dotenv_path = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(os.path.realpath(__file__)))),
    ".env",
)

# Load file from the above created path.
dotenv.load_dotenv(dotenv_path)

# Access env file variables.
connection_str = os.getenv("COSMOSDB_CONNSTR")
cosmosDB_user = os.getenv("COSMOSDB_USER")
cosmosDB_password = os.getenv("COSMOSDB_PASSWORD")
