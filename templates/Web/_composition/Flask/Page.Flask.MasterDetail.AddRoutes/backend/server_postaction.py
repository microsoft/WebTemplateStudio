import constants
//{[{
import sample_data
//}]}

app = flask.Flask(__name__, static_folder="build")

//{[{
# MasterDetail Page Endpoint
@app.route(constants.ENDPOINT_MASTER_DETAIL)
def get_master_detail():
    return flask.jsonify(sample_data.sample_orders)

//}]}
