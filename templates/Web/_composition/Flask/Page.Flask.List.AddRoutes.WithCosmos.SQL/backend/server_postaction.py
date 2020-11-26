import constants
//{[{
import sql.service
//}]}

app = flask.Flask(__name__, static_folder="build")

//{[{
# List Endpoints
@app.route(constants.ENDPOINT_LIST)
def get_list():
    return flask.jsonify(sql.service.get())


@app.route(constants.ENDPOINT_LIST, methods=["POST"])
def add_list_item():
    json_response = flask.jsonify(sql.service.create())
    return flask.make_response(json_response, constants.HTTP_STATUS_201_CREATED)


@app.route(constants.ENDPOINT_LIST + "/<item_id>", methods=["DELETE"])
def delete_list_item(item_id):
    try:
        removed_item = flask.jsonify(sql.service.delete(item_id))
        return removed_item
    except Exception as ex:
        err_response = flask.jsonify({"error": str(ex)})
        return flask.make_response(err_response, constants.HTTP_STATUS_404_NOT_FOUND)

//}]}