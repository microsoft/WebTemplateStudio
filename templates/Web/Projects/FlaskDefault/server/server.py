from flask import Flask
from constants import CONSTANTS

app = Flask(__name__)

# Catching all routes
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    # Todo: This return statement needs to be replaced by the index.html page
    # of compiled front-end application once we figure out how deployment works 
    return 'You want path: %s' % path

if __name__ == '__main__':
    app.run(port=CONSTANTS['PORT'])