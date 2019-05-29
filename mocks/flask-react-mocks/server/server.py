from flask import Flask
app = Flask(__name__)

@app.route('/')
def sayHello():
    return "Hello World"

if __name__ == '__main__':
   app.run(debug=True, port=3001)