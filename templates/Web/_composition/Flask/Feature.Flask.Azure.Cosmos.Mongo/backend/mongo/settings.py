import os
from os.path import join, dirname, realpath
from dotenv import load_dotenv

# Create .env file path.
dotenv_path = join(dirname(dirname(realpath(__file__))), '.env')

# Load file from the above created path.
load_dotenv(dotenv_path)

# Access env file variables.
connection_str = os.getenv('COSMOSDB_CONNSTR')
cosmosDB_user = os.getenv('COSMOSDB_USER')
cosmosDB_password = os.getenv('COSMOSDB_PASSWORD')