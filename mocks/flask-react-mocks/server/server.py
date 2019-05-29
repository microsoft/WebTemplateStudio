from flask import Flask
from flask import jsonify
app = Flask(__name__)

sampleData = [
    {'_id': 1, 'text': 'This is the list item 1'},
    {'_id': 2, 'text': 'This is the list item 2'}
]

@app.route('/')
def sayHello():
    return "Hello World"

# List Endpoints
@app.route('/api/list')
def getList():
    return jsonify(
        sampleData
    )

if __name__ == '__main__':
   app.run(debug=True, port=3001)