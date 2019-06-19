import os
from os.path import join, dirname, realpath
from dotenv import load_dotenv

#create .env file path
dotenv_path = join(dirname(dirname(dirname(realpath(__file__)))), '.env')

#load file from path
load_dotenv(dotenv_path)

#access env file variables
connection_str = os.getenv('COSMOSDB_CONNSTR')
cosmosDB_user = os.getenv('COSMOSDB_USER')
cosmosDB_password = os.getenv('COSMOSDB_PASSWORD')