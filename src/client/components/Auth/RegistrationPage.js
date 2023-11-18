
import React from 'react';
import { useState } from 'react';


export default function RegistrationPage() {


  return (
    <div>
        <Helmet title='Create a new account.' />
        <form name='userForm' onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Name: </label>
            <input type='text' name='userName' value={this.name} onChange={this.handleNameChange} placeholder='John Doe' className='form-control' id='name' required></input>
            {hasErrors && errors.name && 
              <div id='nameErrors'>
                {errors.name.message}
              </div>
            }
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email: </label>
            <input type='email' name='userEmail' value={this.email} 
              onChange={this.handleEmailChange} onBlur={this.handleBlur}
              placeholder='johndoe@example.com' className='form-control' id='email' 
              required></input>
            { isEmailTouched && !isEmailValidated && 
              <div className="error">The email address format is incorrect. Please provide an email address in the format of 'example@example.com'.</div>
            }
            {hasErrors && errors.email && 
              <div id='emailErrors'>
                {errors.email.message}
              </div>
            }
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password: </label>
            <input type='password' name='userPassword' value={this.password} onChange={this.handlePasswordChange} className='form-control' id='password' required></input>
            <div id='passwordInfo'>
              <p>{ passwordLengthRequirement ? 
                <FontAwesomeIcon icon={faCheck} className={styles['valid']} /> : 
                <FontAwesomeIcon icon={faXmark} className={styles['invalid']}/>}
                  <span>  Must be at least 6 characters long.</span>
              </p>
              <p>{passwordSpecialCharacterRequirement ? 
                <FontAwesomeIcon icon={faCheck} className={styles['valid']} /> : 
                <FontAwesomeIcon icon={faXmark} className={styles['invalid']}/>}
                  <span>  Must contain a special character.</span>
              </p>
              <p>{passwordNumberRequirement ?
                <FontAwesomeIcon icon={faCheck} className={styles['valid']} /> : 
                <FontAwesomeIcon icon={faXmark} className={styles['invalid']}/>}
                  <span>  Must contain at least one number.</span>
              </p>
            </div>
            {hasErrors && errors.password && 
              <div id='passwordErrors'>
                {errors.password.message}
              </div>
            }
          </div>
          <button type="submit" disabled={!isEnabled} className='btn btn-md btn-default'>Submit</button>
        </form>
      </div>
  );
}

