from flask import Flask
from flask import jsonify
from flask import make_response
from constants import CONSTANTS

app = Flask(__name__)

# Catching all routes
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    # Todo: This return statement needs to be replaced by the index.html page
    # of compiled front-end application once we figure out how deployment works 
    return 'You want path: %s' % path

# Error Handler
@app.errorhandler(404)
def page_not_found(error):
	return make_response(
        jsonify(
            {'error': 'Page not found'}
        ),
        404
    )
if __name__ == '__main__':
    app.run(port=CONSTANTS['PORT'])