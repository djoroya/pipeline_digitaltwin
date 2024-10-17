import numpy as np
import datetime


def theta(x):
    eta = 10
    return 0.5 + 0.5*np.tanh(x*eta)

def windows(x,a,b):
    return theta(x-a) - theta(x-b)


def computedistribution(spiras):


    if np.sum(spiras) == len(spiras):
        return np.ones(len(spiras))/len(spiras)
    
    xspan = np.arange(0,len(spiras))
    sigma = 10

    if np.sum(spiras) == 0:
        mid = len(spiras)//2
        pro =  np.exp( - (xspan - xspan[mid])**2/sigma**2)
        pro = pro/np.sum(pro)
        return pro


    xpeeks = [ int(x) for x in xspan if spiras[x] > 0.5]
    dist = [ np.exp( -(xspan - xp)**2/sigma**2) for xp in xpeeks]
    dist = np.sum(dist, axis=0)

    dist[spiras == 1] = 0
    dist[0] = 0
    dist[-1] = 0
    # normalize
    dist = dist/np.sum(dist)

    return dist




def sim():
    nt = 1000
    tspan = np.linspace(0, 60, nt)


    pspan = 5.5*theta(np.sin(2*np.pi*tspan/(10)))  + 0.5

    pspan = pspan + 0.01*np.random.randn(len(tspan))


    date0 = datetime.datetime(2020, 1, 1, 0, 0, 0)
    date0_stamp = date0.timestamp()


    datestamp_span = date0_stamp + tspan

    # stamp to datetime 
    date_span = [datetime.datetime.fromtimestamp(ts) for ts in datestamp_span]
    long_time = tspan[-1] - tspan[0]

    nslots = 30

    spiras = np.zeros(nslots)

    rotura_prob = 0.01

    spiras_list = []
    for i in range(nt):
        if np.random.rand() < rotura_prob + 0.05*np.sum(spiras)/nslots:
            distribution = computedistribution(spiras)

            idx = np.random.choice(nslots, 1, p=distribution)
            spiras[idx] = 1
    
        spiras_list.append(spiras.copy().tolist())



    return {
        "tspan": tspan.tolist(),
        "pspan": pspan.tolist(),
        "date_span": date_span,
        "long_time": long_time,
        "spiras": spiras_list
    }