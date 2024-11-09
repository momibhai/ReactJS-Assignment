import React, { useState, useEffect  } from 'react'
import '../assets/css/style.css';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/simple-datatables/style.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';


const LoginForm = () => {
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    // Inside your LoginForm component:
    const { state } = useLocation();
    const [showAlert, setShowAlert] = useState(false);
    const[response,setResponse] = useState('');
    const { login } = useContext(AuthContext);


    useEffect(() => {
      if (state && state.response) {
        setShowAlert(true);
        const timer = setTimeout(() => {
          setShowAlert(false);
        }, 5000); // Adjust the timeout duration as needed (5000ms = 5 seconds)
  
        // Cleanup the timeout to prevent memory leaks
        return () => clearTimeout(timer);
      }
    }, [state]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post('https://laravelreactjs.webmair.dev/api/login', { email, password });
        login(response.data.token);
        localStorage.setItem('username',response.data.username);
        navigate('/dashboard');
      } catch (error) {
        console.error('There was an error logging in!', error);
      }
    };
    


  return (
   <>
    <div className="container">

<section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

        <div className="d-flex justify-content-center py-4">
          <a href="index.html" className="logo d-flex align-items-center w-auto">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">NiceAdmin</span>
          </a>
        </div>

        <div className="card mb-3">

          <div className="card-body">

            <div className="pt-4 pb-2">
              <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
              <p className="text-center small">Enter your username & password to login</p>
            </div>

            {showAlert && (
              <div className="alert alert-success" role="alert">
                {state.response}
              </div>
                )}

            <form onSubmit={handleSubmit} className="row g-3 needs-validation" novalidate>

              <div className="col-12">
                <label for="yourUsername" className="form-label">Email</label>
                <div className="input-group has-validation">
                  <span className="input-group-text" id="inputGroupPrepend">@</span>
                  <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email" name="email" className="form-control" id="yourUsername" required />
                  <div className="invalid-feedback">Please enter your username.</div>
                </div>
              </div>

              <div className="col-12">
                <label for="yourPassword" className="form-label">Password</label>
                <input  value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" className="form-control" id="yourPassword" required />
                <div className="invalid-feedback">Please enter your password!</div>
              </div>

              <div className="col-12">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                  <label className="form-check-label" for="rememberMe">Remember me</label>
                </div>
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100" type="submit">Login</button>
              </div>
              <div className="col-12">
                <p className="small mb-0">Don't have account? <Link to="/signup">Create an account</Link></p>
              </div>
            </form>

          </div>
        </div>

        <div className="credits">
        
          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div>

      </div>
    </div>
  </div>

</section>

</div>
   </>
  )
}

export default LoginForm