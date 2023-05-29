import React, { useState } from 'react';
import styles from '../LoginPage/LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import leftSectionImage from '../LoginPage/JavaLearningZone.png';

const Header: React.FC<{}> = () => {
  return (
    <nav className={styles.header}>
      <div className={styles.headerText}>Welcome to JavaLearnZone! Start your Java learning adventure now!</div>
    </nav>
  );
};

const SignupPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    const params = new URLSearchParams();
    params.append('firstName', firstName);
    params.append('lastName', lastName);
    params.append('email', email);
    params.append('password', password);

    const url = `http://localhost:8085/users/create?${params.toString()}`;
     console.log(url);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (response.ok) {
        console.log('Successful sign up');
        navigate('/');
        // Perform any necessary actions after successful sign up, such as redirecting to another page
      } else {
        setErrorMessage('This email is already registered.');
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
            <p className={styles['heading']}>SIGN UP</p>
            <form className={styles['input-field']} onSubmit={handleSubmit}>
              <div className={styles['input-field']}>
                <input type="text" className="input" id="firstName" name="firstName" placeholder="First Name" />
              </div>
              <div className={styles['input-field']}>
                <input type="text" className="input" id="lastName" name="lastName" placeholder="Last Name" />
              </div>
              <div className={styles['input-field']}>
                <input type="text" className="input" id="email" name="emailFaculty" placeholder="Email Address" />
              </div>
              <div className={styles['input-field']}>
                <input type="password" className="input" id="password" name="password" placeholder="Password" />
              </div>
              {errorMessage && <p className={styles['error-message']}>{errorMessage}</p>}
              <button type="submit">Submit</button>
              <p className={styles['sign-up']}>
                Already have an account? <a href="/">Log In</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const Signup: React.FC<{}> = () => {
  return (
    <>
      <Header />
      <body className={styles['Body']}>
        <SignupPage />
      </body>
    </>
  );
};

export default Signup;
