from flask import jsonify, make_response, request
from .sql_client import SQLObj

sql_database_obj = SQLObj()

def get():
    query_str = {
        'query': "SELECT r.id as _id, r.text FROM root r ORDER BY r._ts DESC"}
    options = {}
    options['enableCrossPartitionQuery'] = True
    options['maxItemCount'] = 2
    results_iterable = sql_database_obj.get_client().QueryItems(
        sql_database_obj.get_container()['_self'], query_str, options)
    return jsonify(
        list(results_iterable)
    )

def create():
    data = request.get_json()
    list_item = {'text': data['text']}
    created = sql_database_obj.get_client().CreateItem(
        sql_database_obj.get_container()['_self'], list_item)
    return make_response(
        jsonify(
            {'_id': created['id'], 'text': list_item['text']}
        ),
        201
    )

def destroy(id):
    # use parameterized queries to avoid SQL injection attacks
    findStr = "SELECT * FROM c where c.id = @id"
    query_str = {
        'query': findStr,
        'parameters': [
            {'name': '@id', 'value': id}
        ]
    }
    result = sql_database_obj.get_client().QueryItems(
        sql_database_obj.get_container()['_self'], query_str)
    count = sum(1 for _ in iter(result))
    if count == 0:
        return make_response(
            jsonify(
                {'error': 'Could not find an item with given id'}
            ),
            404
        )
    for item in iter(result):
        sql_database_obj.get_client().DeleteItem(item['_self'])
    return jsonify(
        {'_id': id, 'text': 'This comment was deleted'}
    )