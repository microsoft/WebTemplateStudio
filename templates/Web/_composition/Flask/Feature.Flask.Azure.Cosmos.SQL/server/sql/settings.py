import os
from os.path import join, dirname, realpath
from dotenv import load_dotenv

#create .env file path
dotenv_path = join(dirname(dirname(dirname(realpath(__file__)))), '.env')

#load file from path
load_dotenv(dotenv_path)

#access env file variables
connection_key = os.getenv('COSMOSDB_URI')
master_key = os.getenv('COSMOSDB_PRIMARY_KEY')