## cors 
import datetime
import numpy as np
from sim import sim
import json
from valiente.profile import profile
from statsmodels.tsa.arima.model import ARIMA
from loadsavejson.savejson import savejson
import time
params = json.load(open("pipes.json"))
params_value = {k: v["value"] for k,v in params.items()}

rdata = sim()
tspan = rdata['tspan']
pspan = rdata['pspan']
date_span = rdata['date_span']
long_time = rdata['long_time']

def create_model(series):
    model = ARIMA(series, order=(3, 2, 3)) # p, d, q
    model_fit = model.fit()
    return model_fit

print("The forecast model will be trained")
forecast_model = create_model(np.random.random(10))
print("The forecast model was trained")


sigma_hist = []
times_call = [0]
def get_mesurement():    
    global forecast_model  # Declara que vas a usar la variable global forecast_model
    global sigma_hist
    now = datetime.datetime.now().timestamp()
    now_mod = np.mod(now, long_time)

    idx = np.argmin(np.abs(tspan - now_mod ))


    if idx  == 0:
        # datadta 
        sigma_hist = []
    spiras_list = rdata['spiras'][idx]
    preassure  = pspan[idx]


    diff = np.diff(spiras_list) != 0
    arange = np.arange(1,len(spiras_list))

    arange = np.concatenate([[0],
                             arange[diff] - 0.5, 
                             [len(spiras_list)]])
    BreakDistributionList = arange/len(spiras_list)*100

    r = profile(params_value,preassure, BreakDistributionList)
    z0 = r["z_span"][0]
    zf = r["z_span"][-1]
    arange = np.arange(0,len(spiras_list))  

    arange_norm = z0 + arange/len(spiras_list)*(zf-z0)
    arange_norm = arange_norm.tolist()

    sigma_max = float(np.max(r["s_theta_total"]))
    # sigma_hist.append(sigma_max)
    sigma_hist.append(sigma_max)


    if len(sigma_hist) > 200:
        sigma_hist.pop(0)

    times_call[0] =  times_call[0] + 1
    times_call[0] = np.mod(times_call[0], 2)
    print(50*"*")

    if times_call[0] == 0:
        print("The forecast model will be trained")
        print("Size of the sigma_hist: ", len(sigma_hist))
        forecast_model = create_model(sigma_hist)
    else:
        print("The forecast model will be used")
        print("Size of the sigma_hist: ", len(sigma_hist))
        # add the sigma_hist last value to the model
        try:
            forecast_model = forecast_model.append(sigma_hist[-2:-1], refit=False)
        except:
            print("Error in the append of the model")


    nstep_forecast = 20
    forecast = forecast_model.get_forecast(steps=nstep_forecast)
    sigma_forecast = forecast.predicted_mean.tolist()

    #if sigma_forecast has nan values, then we will use the last value and repeat it
    if np.isnan(sigma_forecast).any():
        sigma_forecast = np.array(sigma_forecast)
        idx_nan = np.isnan(sigma_forecast)
        sigma_forecast[idx_nan] = sigma_forecast[~idx_nan][-1]

    time_forecast = np.linspace(now, now + 1*nstep_forecast, nstep_forecast).tolist()

    sigma_forecast = sigma_forecast[1:]
    time_forecast  = time_forecast[1:]
    conf_int = forecast.conf_int().tolist()
    conf_int = conf_int[1:]

    return {
        "p":pspan[idx],
        "now": datetime.datetime.fromtimestamp(now).strftime("%Y-%m-%d %H:%M:%S"),
        "date_df": date_span[idx].strftime("%Y-%m-%d %H:%M:%S"),
        "posix": now,
        "spiras": spiras_list,
        "sigma": r["s_theta_total"],
        "z_span": r["z_span"],
        "arange": arange_norm,
        "sigma_max": sigma_max,
        "forecast": sigma_forecast,
        "time_forecast": time_forecast,
        "conf_int": conf_int
        }


if __name__ == "__main__":

    time_sleep = 0.5
    while True:
        t0 = time.time()
        r = get_mesurement()
        savejson(r, "data.json")
        dt = time.time() - t0
        time.sleep( np.max([time_sleep - dt, 0]) )


