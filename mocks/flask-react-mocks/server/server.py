from flask import Flask
from flask import jsonify
from flask import request
from flask import make_response
import ast
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

@app.route('/api/list', methods = ['POST'])
def addListItem():
    data = request.data.decode('utf-8')
    data = ast.literal_eval(data)
    listItem = {'_id': 3, 'text': data['text']}
    sampleData.append(listItem)
    return jsonify(
        listItem
    )

if __name__ == '__main__':
   app.run(debug=True, port=3001)