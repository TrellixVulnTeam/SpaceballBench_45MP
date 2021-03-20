from flask import Flask, render_template_string
from flask import request, jsonify, redirect
import requests
import socket

hostname = socket.gethostname()

app = Flask(__name__)

PORT = 5001

COUNT = 0

@app.route('/')
def hello_world():
    print(hostname)
    r = requests.get(f"http://flask_tx:5002/api")
    # r = requests.get("https://v2.jokeapi.dev/joke/Any")
    return 'Hello, World From RX' + r.text

@app.route('/addone')
def addone():
    global COUNT
    COUNT += 1
    return
    # return redirect("/counter")

@app.route('/counter')
def counter():
    COUNT = 1
    cntr = request.args.get('counter')
    test_str = "RTESTSETT"
    return render_template_string("<h1>{{test_str}}</h1><button type=\"button\" onclick=\"window.location.href=\'{{ url_for( \'hello_world\') }}\';\">Forward</button>")

@app.route('/redirect')
def redirect():
    cntr = request.args.get('counter')
    return render_template_string("<button type=\"button\" onclick=\"window.location.href=\'{{ url_for( \'hello_world\') }}\';\">Forward</button>")



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=PORT)
