from flask import Flask, send_from_directory
from flask import jsonify
from flask import make_response
from constants import CONSTANTS
import os
from os.path import exists, join

app = Flask(__name__, static_folder = 'build')

# Catching all routes
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    if path != "" and exists(join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# Error Handler
@app.errorhandler(404)
def page_not_found(error):
	return make_response(
        jsonify(
            {'error': 'Page not found'}
        ),
        404
    )
if __name__ == '__main__':
    app.run(port=CONSTANTS['PORT'])