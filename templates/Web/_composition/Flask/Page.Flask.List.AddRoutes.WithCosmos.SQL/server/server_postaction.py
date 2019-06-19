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
    created = sqlDatabaseObj.getClient().CreateItem(
        sqlDatabaseObj.getContainer()['_self'], listItem)
    return make_response(
        jsonify(
            {'_id': created['id'], 'text': listItem['text']}
        ),
        201
    )

@app.route(CONSTANTS['ENDPOINT']['LIST'] + '/<id>', methods=['DELETE'])
def deleteListItem(id):
    # use parameterized queries to avoid SQL injection attacks
    findStr = "SELECT * FROM c where c.id = @id"
    queryStr = {
        'query': findStr,
        'parameters': [
            {'name': '@id', 'value': id}
        ]
    }
    result = sqlDatabaseObj.getClient().QueryItems(
        sqlDatabaseObj.getContainer()['_self'], queryStr)
    count = sum(1 for _ in iter(result))
    if count == 0:
        return make_response(
            jsonify(
                {'error': 'Could not find an item with given id'}
            ),
            404
        )
    for item in iter(result):
        sqlDatabaseObj.getClient().DeleteItem(item['_self'])
    return jsonify(
        {'_id': id, 'text': 'This comment was deleted'}
    )
 //}]}