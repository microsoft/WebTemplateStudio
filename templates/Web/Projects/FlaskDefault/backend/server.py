import os
import flask

import constants

app = flask.Flask(__name__, static_folder="build")

# Catching all routes
# This route is used to serve all the routes in the frontend application after deployment.
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    file_to_serve = "index.html"
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        file_to_serve = path
    return flask.send_from_directory(app.static_folder, file_to_serve)


# Error Handler
@app.errorhandler(constants.HTTP_STATUS_404_NOT_FOUND)
def page_not_found():
    json_response = flask.jsonify({"error": "Page not found"})
    return flask.make_response(json_response, constants.HTTP_STATUS_404_NOT_FOUND)


if __name__ == "__main__":
    app.run(port=constants.PORT)
