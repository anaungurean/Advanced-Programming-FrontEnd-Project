import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import leftSectionImage from './JavaLearningZone.png';

const Header: React.FC<{}> = () => {
  return (
    <nav className={styles.header}>
      <div className={styles.headerText}>Welcome to JavaLearnZone! Start your Java learning adventure now!</div>
    </nav>
  );
};

const LoginPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const url = `http://localhost:8085/users/login?email=${username}&password=${password}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
           console.log('Succesful lo');
        
      } else {
         setErrorMessage('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <>
      <div className={styles['main']}>
        <div className={styles['left--section']}>
          <img src={leftSectionImage} alt="" className={styles['image']} />
        </div>
        <div className={styles['right--section']}>
          <div className={styles['form']}>
            <p className={styles['heading']}>LOG IN</p>
            <form className={styles['input-field']} onSubmit={handleSubmit}>
              <div className={styles['input-field']}>
                <input type="text" className="input" id="email" name="emailFaculty" placeholder="Email Address" />
              </div>
              <div className={styles['input-field']}>
                <input type="password" className="input" id="password" name="password" placeholder="Password" />
              </div>
               {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
              <a className={styles['forgot-password']} href="/inregistrare">
                Forgot password?
              </a>
              <button type="submit">Submit</button>
              <p className={styles['sign-up']}>
                Don't have an account? <a href="SignUp.html">Sign Up</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const Login: React.FC<{}> = () => {
  return (
    <>
      <Header />
      <body className={styles['Body']}>
        <LoginPage />
      </body>
    </>
  );
};

export default Login;
