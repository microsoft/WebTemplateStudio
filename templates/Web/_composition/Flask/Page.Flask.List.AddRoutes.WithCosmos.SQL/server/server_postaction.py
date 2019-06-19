from flask import Flask
from flask import jsonify
from flask import make_response
//{[{
from flask import request
//}]}
from constants import CONSTANTS
//{[{
from sql.sqlClient import SQLObj
//}]}

 app = Flask(__name__)

 //{[{
# List Endpoints
@app.route(CONSTANTS['ENDPOINT']['LIST'])
def getList():
    queryStr = {
        'query': "SELECT r.id as _id, r.text FROM root r ORDER BY r._ts DESC"}
    options = {}
    options['enableCrossPartitionQuery'] = True
    options['maxItemCount'] = 2
    results_iterable = sqlDatabaseObj.getClient().QueryItems(
        sqlDatabaseObj.getContainer()['_self'], queryStr, options)
    return jsonify(
        list(results_iterable)
    )

 @app.route(CONSTANTS['ENDPOINT']['LIST'], methods=['POST'])
def addListItem():
    data = request.get_json()
    listItem = {'text': data['text']}
    created = list_items.insert_one(listItem)
    return make_response(
        jsonify(
            {'_id': str(created.inserted_id), 'text': listItem['text']}
        ), 201
    )

 @app.route(CONSTANTS['ENDPOINT']['LIST'] + '/<id>', methods=['DELETE'])
def deleteListItem(id):
    queryStr = {'_id': ObjectId(id)}
    count = 0
    result = list_items.find(queryStr)
    for item in iter(result):
        count += 1
    if count == 0:
        return make_response(
            jsonify(
                {'error': 'Could not find an item with given id'}
            ),
            404
        )
    list_items.delete_one(queryStr)
    return jsonify(
        {'_id': id, 'text': 'This comment was deleted'}
    )

 //}]}