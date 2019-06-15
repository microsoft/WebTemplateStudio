from flask import Flask
from flask import jsonify
from flask import make_response
from constants import CONSTANTS
//{[{
from sampleData import *
//}]}

app = Flask(__name__)

//{[{
# List Endpoints
@app.route(CONSTANTS['ENDPOINT']['LIST'])
def getList():
    return jsonify(
        sampleData['listTextAssets']
    )

@app.route(CONSTANTS['ENDPOINT']['LIST'], methods = ['POST'])
def addListItem():
    data = request.data.decode('utf-8')
    data = ast.literal_eval(data)
    listItem = {'_id': sampleData['listId'], 'text': data['text']}
    sampleData['listTextAssets'].insert(0, listItem)
    sampleData['listId'] += 1
    return make_response(
        jsonify(
            listItem
        ), 201
    )

@app.route(CONSTANTS['ENDPOINT']['LIST'] + '/<int:id>', methods=['DELETE'])
def deleteListItem(id):
    listItemToRemove = [listItem for listItem in sampleData['listTextAssets'] if listItem['_id'] == id]
    if (len(listItemToRemove) == 0):
        return make_response(jsonify({'error': 'Could not find an item with the given id'}), 404)
    if (len(listItemToRemove) > 1):
        return make_response(jsonify({'error': 'There is a problem with the server'}), 500)
    sampleData['listTextAssets'] = [listItem for listItem in sampleData['listTextAssets'] if listItem['_id'] != id]
    return jsonify(
        {'_id': id, 'text': 'This comment was deleted'}
    )
//}]}
