import flask
//{[{
import Param_ProjectName_Snake.sample_data
//}]}
app = flask.Flask(__name__, static_folder="../build")

//{[{
# MasterDetail Page Endpoint
@app.route(ENDPOINT_MASTER_DETAIL)
def get_master_detail():
    return flask.jsonify(Param_ProjectName_Snake.sample_data.sample_orders)

//}]}
