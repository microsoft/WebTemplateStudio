import flask
//{[{
import src.sample_data
//}]}
app = flask.Flask(__name__, static_folder="../build")

//{[{
# Grid Page Endpoint
@app.route(ENDPOINT_GRID)
def get_grid():
    return flask.jsonify(src.sample_data.sample_orders)

//}]}
