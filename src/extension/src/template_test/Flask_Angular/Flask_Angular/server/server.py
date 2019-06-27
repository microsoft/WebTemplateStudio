from flask import Flask, send_from_directory
from flask import jsonify
from flask import make_response
from flask import request
from constants import CONSTANTS
import os
from os.path import exists, join
from sampleData import *


app = Flask(__name__, static_folder = 'build')

# MasterDetail Page Endpoint
@app.route(CONSTANTS['ENDPOINT']['MASTERDETAIL'])
def getMasterDetail():
    return jsonify(
        sampleData['textAssets']
    )

# List Endpoints
@app.route(CONSTANTS['ENDPOINT']['LIST'])
def getList():
    return jsonify(
        sampleData['listTextAssets']['listItems']
    )

@app.route(CONSTANTS['ENDPOINT']['LIST'], methods = ['POST'])
def addListItem():
    data = request.get_json()
    listItem = {'_id': sampleData['listTextAssets']['listId'], 'text': data['text']}
    sampleData['listTextAssets']['listItems'].insert(0, listItem)
    sampleData['listTextAssets']['listId'] += 1
    return make_response(
        jsonify(
            listItem
        ), 201
    )

@app.route(CONSTANTS['ENDPOINT']['LIST'] + '/<int:id>', methods=['DELETE'])
def deleteListItem(id):
    listItemsToRemove = [listItem for listItem in sampleData['listTextAssets']['listItems'] if listItem['_id'] == id]
    if (len(listItemsToRemove) == 0):
        return make_response(jsonify({'error': 'Could not find an item with the given id'}), 404)
    if (len(listItemsToRemove) > 1):
        return make_response(jsonify({'error': 'There is a problem with the server'}), 500)
    sampleData['listTextAssets']['listItems'] = [listItem for listItem in sampleData['listTextAssets']['listItems'] if listItem['_id'] != id]
    return jsonify(
        {'_id': id, 'text': 'This comment was deleted'}
    )

# Grid Page Endpoint
@app.route(CONSTANTS['ENDPOINT']['GRID'])
def getGrid():
    return jsonify(
        sampleData['textAssets']
    )

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
