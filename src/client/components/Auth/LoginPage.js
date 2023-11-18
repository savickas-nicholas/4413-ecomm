
import React from 'react';
import { useState } from 'react';


export default function LoginPage() {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');
  
  // Validation //

  canBeSubmitted = () => {
    const { email, password } = this.state;
    return (email.length > 0 && password.length > 0);
  }

  // Event Handlers //

  handleEmailChange = (se) => {
    this.setState({email: se.target.value});
  }

  handlePasswordChange = (se) => {
    this.setState({password: se.target.value});
  }

  handleSubmit = (se) => {
    se.preventDefault();
    if(!this.canBeSubmitted()) { return; }
    const {email, password} = this.state;
    this.props.dispatch(login({email, password}));

  };

  return (
    <div>
      <Helmet title='Login to Your Account.' />
      <form name='loginForm' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email: </label>
          <input type='email' name='userEmail' value={this.email} onChange={this.handleEmailChange} placeholder='johndoe@example.com' className='form-control' id='email' required></input>
          {errors && errors.email && 
            <div id='emailErrors'>
              {errors.email}
            </div>
          }
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password: </label>
          <input type='password' name='userPassword' value={this.password} onChange={this.handlePasswordChange} className='form-control' id='password' required></input>
          {errors && errors.password && 
            <div id='passwordErrors'>
              {errors.password}
            </div>
          }
        </div>
        <button type='submit' disabled={!isEnabled} className='btn btn-md btn-default'>Login</button>
      </form>
    </div>
  );
}

