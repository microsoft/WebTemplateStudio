from azure.cosmos import partition_key
from flask import request
from .sql_client import SQLObj

sql_database_obj = SQLObj()

def get():
    query = "SELECT r.id as id, r.text FROM root r ORDER BY r._ts DESC"
    results_iterable = sql_database_obj.get_container().query_items(
        query,
        enable_cross_partition_query=True,
        max_item_count=2)
    return list(results_iterable)

def create():
    data = request.get_json()
    list_item = {'text': data['text']}
    created = sql_database_obj.get_container().upsert_item(list_item)
    return {'id': created['id'], 'text': list_item['text']}

def delete(id):
    # Use parameterized queries to avoid SQL injection attacks.
    query = "SELECT * FROM c where c.id = @id"
    params = [{"name": "@id", "value": id}]
    result = sql_database_obj.get_container().query_items(
        query,
        parameters=params,
        enable_cross_partition_query=True)
    items = list(result)
    if not items:
        raise Exception('Could not find an item with given id')
    item = items[0]
    sql_database_obj.get_container().delete_item(
        item,
        partition_key=partition_key.NonePartitionKeyValue)
    return {'id': id, 'text': 'This comment was deleted'}