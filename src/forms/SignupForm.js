import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignupForm = () => {
  const navigate = useNavigate();
  const[response,setResponse] = useState('');

  const [formData,setformData] = useState({
    name:'',
    email:'',
    password:''
  })

  console.log(response);

  function handleChange(e){
    setformData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault();

      axios.post('https://laravelreactjs.webmair.dev/api/signup',formData)
      .then(res=>{
        console.log(res);
          setResponse(res.data.message);
          navigate('/login', { state: { response: res.data.message } });
      })
      .catch(error=>{
        console.log(error)
      })    

  }

  return (
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
                    <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                    <p className="text-center small">Enter your details to create your account</p>
                  </div>

                    {
                      response && 
                      (
                        <button className='btn border-t-cyan-300'>{response}</button>
                      )
                    }

                  <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
                    <div className="col-12">
                      <label htmlFor="yourUsername" className="form-label">Username</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>
                        <input type="text" name="name" onChange={handleChange} className="form-control" id="yourUsername" required />
                        <div className="invalid-feedback">Please enter your username.</div>
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="yourEmail" className="form-label">Email</label>
                      <input type="email" name="email" onChange={handleChange} className="form-control" id="yourEmail" required />
                      <div className="invalid-feedback">Please enter a valid email address!</div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="yourPassword" className="form-label">Password</label>
                      <input type="password" name="password" onChange={handleChange} className="form-control" id="yourPassword" required />
                      <div className="invalid-feedback">Please enter your password!</div>
                    </div>

                    <div className="col-12">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="terms" value="true" id="acceptTerms" required />
                        <label className="form-check-label" htmlFor="acceptTerms">I agree to the <a href="#">terms and conditions</a></label>
                        <div className="invalid-feedback">You must agree before submitting.</div>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary w-100" type="submit">Create Account</button>
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">Already have an account? <Link to="/login">Login</Link></p>
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
  );
};

export default SignupForm;
