import os

//{[{
import sql.service
//}]}
import constants

app = flask.Flask(__name__, static_folder='build')

//{[{
# List Endpoints
@app.route(constants.ENDPOINT_LIST)
def get_list():
    return jsonify(sql.service.get())

@app.route(constants.ENDPOINT_LIST, methods=['POST'])
def add_list_item():
    json_response = jsonify(sql.service.create())
    return make_response(json_response, constants.HTTP_STATUS_201_CREATED)

@app.route(constants.ENDPOINT_LIST + '/<id>', methods=['DELETE'])
def delete_list_item(id):
    try:
        removed_item = jsonify(sql.service.delete(id))
        return removed_item
    except Exception as ex:
        err_response = jsonify({'error': str(ex)})
        return make_response(err_response, constants.HTTP_STATUS_404_NOT_FOUND)
//}]}