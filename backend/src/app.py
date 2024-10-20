from flask import Flask, request, jsonify
## cors 
from flask_cors import CORS
import datetime
from loadsavejson.loadjson_plain import loadjson_plain

app = Flask(__name__)
CORS(app)

@app.route('/api', methods=['POST'])
def api():
    data = request.get_json()
    return jsonify(data)


@app.route('/today', methods=['GET'])
def today():
    today = datetime.datetime.now().strftime("%Y-%m-%d")
    # epoch
    today_epoch = datetime.datetime.now().timestamp()
    return jsonify({'today': today, 'today_epoch': today_epoch})


sigma_hist = []
times_call = [0]
@app.route('/get', methods=['GET'])
def get_mesurement():    
    return loadjson_plain("../deamon/data.json")
    

if __name__ == '__main__':
    app.run(debug=True)
