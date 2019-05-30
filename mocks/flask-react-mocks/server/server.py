from flask import Flask
from flask import jsonify
from flask import request
from flask import make_response
from sampleData import *
from constants import CONSTANTS
import ast
import datetime
app = Flask(__name__)

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
    return jsonify(
        listItem
    )

@app.route(CONSTANTS['ENDPOINT']['LIST'] + '/<int:id>', methods=['DELETE'])
def deleteListItem(id):
    for i in range(len(sampleData['listTextAssets'])): 
        if sampleData['listTextAssets'][i]['_id'] == id: 
            del sampleData['listTextAssets'][i] 
            return jsonify(
                {'_id': id, 'text': 'This comment was deleted'}
            )
    return jsonify({'error': 'Could not find an item with given id'})

# Grid Endpoint
@app.route(CONSTANTS['ENDPOINT']['GRID'])
def getGrid():
    return jsonify(
        sampleGridData
    )

# MasterDetail Endpoint
@app.route(CONSTANTS['ENDPOINT']['MASTERDETAIL'])
def getMasterDetail():
    return jsonify(
        sampleGridData
    )

if __name__ == '__main__':
   app.run(debug=True, port=CONSTANTS['PORT'])