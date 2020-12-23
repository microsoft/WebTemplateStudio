import os
//{[{
import uuid
//}]}
import flask
//{[{
import src.sample_data
//}]}
app = flask.Flask(__name__, static_folder="../build")

//{[{
# List Endpoints
@app.route(ENDPOINT_LIST)
def get_list():
    return flask.jsonify(src.sample_data.sample_list)


@app.route(ENDPOINT_LIST, methods=["POST"])
def add_list_item():
    data = flask.request.get_json()
    list_item = {"id": str(uuid.uuid4()), "text": data["text"]}
    src.sample_data.sample_list.insert(0, list_item)
    json_response = flask.jsonify(list_item)
    return flask.make_response(json_response, http.HTTPStatus.CREATED)


@app.route(ENDPOINT_LIST + "/<string:item_id>", methods=["DELETE"])
def delete_list_item(item_id):
    item_to_remove = next(
        (item for item in src.sample_data.sample_list if item["id"] == item_id),
        None,
    )
    if item_to_remove is None:
        json_response = flask.jsonify(
            {"error": "Could not find an item with the given id"}
        )
        return flask.make_response(json_response, http.HTTPStatus.NOT_FOUND)
    src.sample_data.sample_list.remove(item_to_remove)
    return flask.jsonify({"id": item_id, "text": "This comment was deleted"})

//}]}
