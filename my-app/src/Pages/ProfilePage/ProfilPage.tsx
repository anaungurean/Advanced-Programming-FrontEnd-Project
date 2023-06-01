import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Nav from '../NavBar/NavBar';
import Frame from '../../Components/Frame';
import styles from './ProfilPage.module.css';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Body: React.FC<{}> = () => {
  const [user, setUser] = useState<User>({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8085/users/66');
        const data = await response.json();
        setUser(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8085/users/66`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: 66,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password
        })
      });

      if (response.ok) {
        console.log('User data updated successfully');
      } else {
        console.error('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Profile Page</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          <span className={styles.bullet}>&#8226;</span> First Name:
          <input
            className={styles.input}
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.bullet}>&#8226;</span> Last Name:
          <input
            className={styles.input}
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
          <span className={styles.bullet}>&#8226;</span> Email:
          <input
            className={styles.input}
            type="text"
            name="email"
            value={user.email}
            disabled
          />
        </label>
        <label className={styles.label}>
          <span className={styles.bullet}>&#8226;</span> Password:
          <input
            className={styles.input}
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>

        <button className={styles.button} type="submit">Update</button>
      </form>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <body>
      <Nav />
      <Frame>
        <Body />
      </Frame>
    </body>
  );
};

export default ProfilePage;
