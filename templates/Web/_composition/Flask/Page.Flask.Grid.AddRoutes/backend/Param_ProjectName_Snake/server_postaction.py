import flask
//{[{
import Param_ProjectName_Snake.sample_data
//}]}
app = flask.Flask(__name__, static_folder="../build")

//{[{
# Grid Page Endpoint
@app.route(ENDPOINT_GRID)
def get_grid():
    return flask.jsonify(Param_ProjectName_Snake.sample_data.sample_orders)

//}]}
