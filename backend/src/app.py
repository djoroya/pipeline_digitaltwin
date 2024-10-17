from flask import Flask, request, jsonify
## cors 
from flask_cors import CORS
import datetime
import numpy as np
from sim import sim
import json
from valiente.profile import profile

params = json.load(open("pipes.json"))
params_value = {k: v["value"] for k,v in params.items()}

rdata = sim()
tspan = rdata['tspan']
pspan = rdata['pspan']
date_span = rdata['date_span']
long_time = rdata['long_time']


now0 = datetime.datetime.now().timestamp()

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

@app.route('/get', methods=['GET'])
def get_mesurement():
    now = datetime.datetime.now().timestamp()
    now_mod = np.mod(now, long_time)

    idx = np.argmin(np.abs(tspan - now_mod ))

    spiras_list = rdata['spiras'][idx]
    preassure  = pspan[idx]


    diff = np.diff(spiras_list) != 0
    arange = np.arange(1,len(spiras_list))

    arange = np.concatenate([[0],
                             arange[diff] - 0.5, 
                             [len(spiras_list)]])
    BreakDistributionList = arange/len(spiras_list)*100
    BreakDistributionList

    r = profile(params_value,preassure, BreakDistributionList)
    z0 = r["z_span"][0]
    zf = r["z_span"][-1]
    arange = np.arange(0,len(spiras_list))  

    arange_norm = z0 + arange/len(spiras_list)*(zf-z0)
    arange_norm = arange_norm.tolist()
    return {
        "p":pspan[idx],
        "now": datetime.datetime.fromtimestamp(now).strftime("%Y-%m-%d %H:%M:%S"),
        "date_df": date_span[idx].strftime("%Y-%m-%d %H:%M:%S"),
        "posix": now,
        "spiras": spiras_list,
        "sigma": r["s_theta_total"],
        "z_span": r["z_span"],
        "arange": arange_norm
    }

if __name__ == '__main__':
    app.run(debug=True)
