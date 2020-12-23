import flask
//{[{
import src.sql.service
//}]}
app = flask.Flask(__name__, static_folder="../build")

//{[{
# List Endpoints
@app.route(ENDPOINT_LIST)
def get_list():
    return flask.jsonify(src.sql.service.get())


@app.route(ENDPOINT_LIST, methods=["POST"])
def add_list_item():
    json_response = flask.jsonify(src.sql.service.create())
    return flask.make_response(json_response, http.HTTPStatus.CREATED)


@app.route(ENDPOINT_LIST + "/<item_id>", methods=["DELETE"])
def delete_list_item(item_id):
    try:
        removed_item = flask.jsonify(src.sql.service.delete(item_id))
        return removed_item
    except ValueError as ex:
        err_response = flask.jsonify({"error": str(ex)})
        return flask.make_response(err_response, http.HTTPStatus.NOT_FOUND)

//}]}