import numpy as np
from scipy.integrate import solve_bvp
from numpy.random import randn

# ================================================================
def fun_measles(z,u,q,M):
    return np.vstack((
        u[1,:],
        u[2,:],
        u[3,:],
        u[0,:]*0 +  q(z,u)/M ))

# =================================================================

def deflection_beam(z_span,bc,M,q,verbose=2):
    
    u_span   = np.full((4, z_span.shape[0]), 1e-6*randn())
    f       = lambda z,u: fun_measles(z,u,q,M)
    res_span = solve_bvp(f, bc, z_span, u_span, verbose=verbose,tol=1e-6)
    return res_span
        
# =================================================================
eta = 1e3
eta = 1e5
theta = lambda x,eta: 0.5 + 0.5*np.tanh(eta*x)


#theta = lambda x,eta: (1- np.exp(-eta*x**2))*( 0.5 + 0.5*np.sign(x) )

#theta = lambda x,eta: 1-(1- np.exp(-eta*x**2))*( 0.5 + 0.5*np.sign(-x) )


# tt = lambda x,eta: 0.5 + 0.5*np.tanh(eta*x)
# eta = 1e5
# def thet(x,h):
#      return tt(x,eta)*x/h*tt(-x+h,eta) + tt(x-h,eta)
# theta = lambda x,h: thet(x+h,h)



ecos  = lambda x,beta: np.exp(-beta*x)*np.cos(beta*x)

class  pipeline:

    # properties
    # ================================================================
    def __init__(self, params,N_z=100,
                 chapa=False,
                 fsc_p=None,
                 sc_0=None,kf=1,
                 eta = 1e4,
                 asym=False):

        self.params = params.copy()
        self.params["measures"] = self.params["measures"].copy()

        self.modelparams = dict()
        self.eta = eta
        #compute model parameters
        mp = dict()
        t       = params["t"]
        R       = params["R"]
        A_s     = params["A_s"]
        E_s     = params["E_s"]
        s       = params["s"]
        E       = params["E"]

        E_tilde = E/ (1 - params["nu_c"]**2) # Pa - effective Young's modulus of concrete
        if not asym:
            mp['z_span'] = np.linspace(0,params["L"],N_z)
        else:
            mp['z_span'] = np.linspace(-params["L"],params["L"],2*N_z)

        mp['p_s'] = params["measures"]["ss_0"] *A_s/(s*params["R_c"])
        mp['M']      = E_tilde*t**3/12

        self.chapa = chapa
        if chapa:
            t_c = params["t_ch"] if "t_ch" in params else 0
            l  = params["l_ch"]  if "l_ch" in params else 0
            E_tilde_s = E_s/ (1 - params["nu_s"]**2) # Pa - effective Young's modulus of steel

            mp['M'] = mp['M'] - (t_c**2*l + l**3/12)*(E_tilde - E_tilde_s) # change !!
        
            nu_c = params["nu_c"]
            nu_s = params["nu_s"]

            mp["B"] = (-2*t_c*l/R)*(E_tilde*nu_c - E_tilde_s*nu_s) 
        
            term1 = E_s*A_s / (E_tilde*s*(t-l))
            term2 = E_tilde_s*l/(E_tilde*(t-l))

            k = (E_tilde*(t-l)/R**2)*(1 + term1 + term2)  #change !!
        else:
            k = t*(E_tilde/R**2)*(1+(A_s*E_s)/(E_tilde*s*t)) # dimensionless parameter

        mp['k']      = k*kf

        mp['beta']   = ((3*k)/(E_tilde*t**3))**(1/4) # dimensionless parameter
        
        # valiente ajusta fsc_p y sc_0 a mano
        
        if fsc_p is not None:
            mp["fsc_p"]  = fsc_p        # Valiente ajusta esto a mano
        else:
            mp["fsc_p"]  = E_tilde/(k*R)

        if sc_0 is not None:
            mp["sc_0"]    = sc_0
        else:
            mp["sc_0"]    = - mp["fsc_p"] * mp['p_s']


        mp["E_tilde"] = E_tilde

        # pvp
        p_bvp   = lambda z,Z:  mp['p_s']*theta( -np.abs(z) +Z,self.eta ) 
        self.p_bvp = p_bvp

        self.modelparams = mp
        self.result = None
        self.asym = asym
# =================================================================

# =================================================================
    def solve(self,p_bvp,verbose
              =2):
        
        modelparams = self.modelparams
        if not self.asym:
            bc = lambda ua,ub: np.array([ub[3],   # u'''(inf)  = 0
                                        ub[2],    # u''(inf)   = 0        
                                        ua[1],    # u'(0)      = 0
                                        ua[3]] )  # u'''(0)    = 0
            
          
        else:
            bc = lambda ua,ub: np.array([ub[3],    # u'''(inf)  = 0
                                         ub[2],    # u''(inf)   = 0        
                                         ua[2],    # u'''(-inf) = 0
                                         ua[3]] )  # u''(-inf)  = 0	

        
        k = modelparams["k"]
        if self.chapa:
            B = modelparams["B"]
            qfcn = lambda z,u: -k*u[0,:] + p_bvp(z) - B*u[2,:]
        else:
            qfcn = lambda z,u: -k*u[0,:] + p_bvp(z)
        
        M = modelparams["M"]

        z_span = modelparams["z_span"]
        res_span = deflection_beam(z_span,bc,M,qfcn,verbose=verbose)
        self.result = res_span

        return res_span
# =================================================================

    def uZ_valiente(self,Z,p,analytical=True,no_p_s=False):

        p_s   = self.modelparams["p_s"]
        k     = self.modelparams["k"]
        z     = self.modelparams["z_span"]
        beta  = self.modelparams["beta"]
 
        if analytical:
            r1 = 2 - ecos(-np.abs(z) + Z,beta) -  ecos(np.abs(z) + Z,beta)
            r2 =     ecos(np.abs(z) - Z,beta ) -  ecos(np.abs(z) + Z,beta)

            u = r1*theta(-np.abs(z) + Z,1e5) + r2*theta(np.abs(z) - Z,1e5)

            u = p_s*u/(2*k) 
            d2udz = np.gradient(np.gradient(u,z),z)
        else:
            
            self.solve(lambda z: self.p_bvp(z,Z),verbose=0)

            u     = self.result.sol(z)[0] 
            d2udz = self.result.sol(z)[2]
        
        fsc_p    = self.modelparams["fsc_p"] 
        sc_0     = self.modelparams["sc_0"]

        s_theta = self.u2s(u,d2udz) + fsc_p*p + sc_0
        u = u - p_s/k + p/k

        if no_p_s:
            u = u + p_s/k - p/k
            s_theta = s_theta - fsc_p*p - sc_0


        return z,u,s_theta,self.p_bvp(z,Z)
    
    def u2s(self,u,d2udz):
        E_tilde = self.modelparams["E_tilde"]
        R      = self.params["R"]
        nu_c   = self.params["nu_c"]
        y      = self.params["t_c"] - self.params["t"]/2
        s_theta = E_tilde*(u/R - nu_c*y*d2udz)

        return s_theta

    def uN_valiente(self,N,p,analytical=True,no_p_s=False):
        Z = N*self.params["s"]/2
        z,u,st,pv = self.uZ_valiente(Z,p,analytical=analytical,no_p_s=no_p_s)
        return z,u,st,pv
# ============================================================================
# tomado de valiente
    def ts_unit(self,p,n):
        preassure = p 
        p = self.modelparams
        pp = self.params

        Z = n*self.params["s"]/2
        sc_0 = self.modelparams["sc_0"]
        fsc_p = self.modelparams["fsc_p"]
        f = p["E_tilde"]/(p["k"]*pp["R"])*p["p_s"]
        beta = self.modelparams["beta"]

        return sc_0 + fsc_p*preassure +f*(1 - np.exp(-beta*Z)*(np.cos(beta*Z) - 0.184*np.sin(beta*Z)))
# ============================================================================
    
    def s_theta(self):

        z_span = self.modelparams["z_span"]
        u       = self.result.sol(z_span)[0]
        du2_dz2 = self.result.sol(z_span)[2]
        
        return self.u2s(u,du2_dz2)
    
    def s_theta_total(self,p):
            
        sz       = self.s_theta()
        fsc_p    = self.modelparams["fsc_p"] 
        sc_0     = self.modelparams["sc_0"]
        sz_total = sz + fsc_p*p + sc_0
        return sz_total

    def u_total(self,p):
        k    = self.modelparams["k"]
        p_s  = self.modelparams["p_s"]
        u   = self.result.sol(self.modelparams["z_span"])[0]
        u = u - p_s/k + p/k
        return u
