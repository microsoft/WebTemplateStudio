import flask
//{[{
import sample_data
//}]}
app = flask.Flask(__name__, static_folder="build")

//{[{
# Grid Page Endpoint
@app.route(constants.ENDPOINT_GRID)
def get_grid():
    return flask.jsonify(sample_data.sample_orders)

//}]}
