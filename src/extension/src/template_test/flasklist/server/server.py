from flask import Flask
from flask import jsonify
from flask import make_response
from flask import request
import ast
from constants import CONSTANTS
from sampleData import *


app = Flask(__name__)

# List Endpoints
@app.route(CONSTANTS['ENDPOINT']['LIST'])
def getList():
    return jsonify(
        sampleData['listTextAssets']['listItems']
    )

@app.route(CONSTANTS['ENDPOINT']['LIST'], methods = ['POST'])
def addListItem():
    data = request.data.decode('utf-8')
    data = ast.literal_eval(data)
    listItem = {'_id': sampleData['listTextAssets']['id'], 'text': data['text']}
    sampleData['listTextAssets']['listItems'].insert(0, listItem)
    sampleData['listTextAssets']['id'] += 1
    return make_response(
        jsonify(
            listItem
        ), 201
    )

@app.route(CONSTANTS['ENDPOINT']['LIST'] + '/<int:id>', methods=['DELETE'])
def deleteListItem(id):
    listItemToRemove = [listItem for listItem in sampleData['listTextAssets']['listItems'] if listItem['_id'] == id]
    if (len(listItemToRemove) == 0):
        return make_response(jsonify({'error': 'Could not find an item with the given id'}), 404)
    if (len(listItemToRemove) > 1):
        return make_response(jsonify({'error': 'There is a problem with the server'}), 500)
    sampleData['listTextAssets']['listItems'] = [listItem for listItem in sampleData['listTextAssets']['listItems'] if listItem['_id'] != id]
    return jsonify(
        {'_id': id, 'text': 'This comment was deleted'}
    )

# Catching all routes
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    # TODO: This return statement needs to be replaced by the index.html page
    # of compiled front-end application once we figure out how deployment works 
    return 'You want path: %s' % path

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
