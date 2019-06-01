from flask import Flask
from constants import CONSTANTS

app = Flask(__name__)

# Catching all routes
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return 'You want path: %s' % path

if __name__ == '__main__':
    app.run(port=CONSTANTS['PORT'])