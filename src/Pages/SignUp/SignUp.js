import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/login/login.svg'
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const SignUp = () => {
    const {createUser} = useContext(AuthContext)
    const handleSignUp=(event)=>{
        event.preventDefault();
     
       const form = event.target;
       const name = form.name.value;
       const email = form.email.value;
       const password = form.password.value;

        createUser(email, password)
        .then(result=>{
          const user = result.user;
          console.log(user);
          form.reset();
        })
        .catch(error=>{
          alert('password must be 6 character')
          console.log(error)
        })
   }
    return (
        <div className="w-full my-20">
        <div className="hero-content gap-20 grid md:grid-cols-2 flex-col lg:flex-row">
          <div className="text-center lg:text-left">
          
           <img src={logo} alt="" />
          </div>
          <div className="card py-12 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSignUp} className="card-body">
            <h1 className="text-5xl font-bold text-center">Sign Up</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" name='name' placeholder="Your Name" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' placeholder="Email" className="input input-bordered" required/>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input type="password" name='password' placeholder="Password" className="input input-bordered" required/>
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input className="btn btn-orange-600" type="submit"  value="Sign Up" />
              </div>
            </form>
            <p className='text-center'>Already have an account? <Link className='font-bold text-orange-600' to='/login'>Login</Link></p>
          </div>
        </div>
      </div>
    );
};

export default SignUp;