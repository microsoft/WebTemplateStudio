from flask import Flask, send_from_directory
from flask import jsonify
from flask import make_response
from constants import CONSTANTS
import os
from os.path import exists, join

app = Flask(__name__, static_folder = 'build')

# Catching all routes
# This route is used to serve all the routes in the frontend application after deployment
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    file_to_serve = path if path and exists(join(app.static_folder, path)) else 'index.html'
    return send_from_directory(app.static_folder, file_to_serve)

# Error Handler
@app.errorhandler(404)
def page_not_found(error):
    json_response = jsonify({'error': 'Page not found'})
    return make_response(json_response, 404)

if __name__ == '__main__':
    app.run(port=CONSTANTS['PORT'])