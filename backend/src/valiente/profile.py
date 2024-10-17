
from .beam import pipeline
import numpy as np
longitud   =   1000

def find_p(ipipe,sc_T):
    preassure_1 = 1*1e6 # MPa to Pa
    preassure_2 = 2*1e6 # MPa to Pa
    s_theta_total_1_max = np.max(ipipe.s_theta_total(preassure_1))
    s_theta_total_2_max = np.max(ipipe.s_theta_total(preassure_2))

    # y = mx + b
    m = (s_theta_total_2_max - s_theta_total_1_max)/(preassure_2 - preassure_1)
    b = s_theta_total_1_max - m*preassure_1
    preassure = (sc_T - b)/m
    s_theta_total = ipipe.s_theta_total(preassure)

    return preassure,s_theta_total

def profile(params,preassure,BreakDistributionList):


    preassure = 1e6*preassure # MPa to Pa
    for key in params:
        try:
            params[key] = float(params[key])
        except:
            print("Error with key",key)
            pass

    params = params.copy()

    params["measures"] = dict()
    params["measures"]["sc_T"] = params["sc_T"]
    params["measures"]["ss_0"] = params["ss_0"]
    
    params["L"] = longitud*params["s"]/2

    ipipe = pipeline(params,N_z=int(longitud),chapa=True,asym=True)
    sc_T = params["measures"]["sc_T"]


    Nholes = int((len(BreakDistributionList) -2)/2)
    # BreakDistributionList is a lis [0,10,20,30] that indicates the position of the holes
    # zspan[0] -> 0
    # zspan[-1] -> 100
    p_s = ipipe.modelparams["p_s"]
    z_span = ipipe.modelparams["z_span"]
    z0 = z_span[0]
    z1 = z_span[-1]
    nn = [ z0 + (z1-z0)*i/100 
            for i in BreakDistributionList]

    def theta_heviside(z):
        return 0.5*(1+np.tanh(100*(z)))
    def p_bvp(z):

        r = 0*z
        for i in range(Nholes):
#                if z > p_s[i] and z < p_s[i+1]:
            r = r + theta_heviside(z-nn[2*i+1])*theta_heviside(nn[2*i+2]-z)    
        return p_s*(r)
    
    pconst = lambda z: 0*z + p_s

    ipipe.solve(lambda z: p_bvp(z),verbose=0)

    p_bvp_num = np.sign(p_bvp(z_span))

    s_theta_total = ipipe.s_theta_total(preassure)


    # to list
    s_theta_total = s_theta_total*1e-6


    minSigma = np.min(s_theta_total) - 1
    maxSigma = np.max(s_theta_total) + 1

    p_bvp_num = minSigma + (maxSigma - minSigma)*p_bvp_num

    s_theta_total = s_theta_total.tolist()

    results = {
        "s_theta_total":s_theta_total,
        "z_span":z_span.tolist(),
        "p_bvp_num":p_bvp_num.tolist(),
        "preassure": round(preassure/1e6,2)
    }
    return results
