import React,{useEffect, useState} from 'react'
import { Form} from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {FaUserAlt} from 'react-icons/fa';
import styles from './PatientLogin.module.css';
import axios from 'axios';
import PatientAccount from './PatientAccount';

const PatientLogin = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [patientsData, setPatientsData] = useState(null); // To store user data after successful login
  const [user,setUser] = useState({});
  const [isLogged,setIsLogged] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5050/patients');
        const data = await response.json();
        //console.log(data);
        setPatientsData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleLogin = ()=>{
    if (email==='' || password==='') {
      setError("Please enter both email and password.");
      setIsLogged(false);
      return;
    }
  
    const user = patientsData.find((user) => user.Email === email && user.Password === password);

    if (user) {
      // Login was successful, set the user data
      setUser(user);
      setIsLogged(true);
      setError(""); // Clear any previous error messages
      alert("Login successful!");
    } else {
      // Login failed
      setUser(null);
      setIsLogged(false);
      setError("Login failed. Check your credentials.");
    }
    }

  // Clear the error message when typing in the email field
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  // Clear the error message when typing in the password field
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
  {isLogged ? (<PatientAccount patientData={user}/>):(
    <div className={styles.main1}>
           <h1 className={styles.heading1}> <FaUserAlt size={37}/>   Login</h1>
        <div className={styles.formdiv} >
        <Form onSubmit={handleLogin} className={styles.signupform} >
        <Form.Label className={styles.formlabel} htmlFor="email">Email:</Form.Label>
        <Form.Control
          className={styles.forminput} 
          placeholder='Enter Email'
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange} />
        <Form.Label className={styles.formlabel} htmlFor="password">Password:</Form.Label>
        <div className={styles.passwordInput}>
        <Form.Control
          className={styles.forminput} 
          placeholder='Enter Password'
          type={showPassword?'text':'password'}
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <span className={styles.toggleicon} onClick={togglePasswordVisibility}>
          {showPassword ?  <FaEye color='#445069' size={25} />:<FaEyeSlash color='#445069' size={25}/> }
        </span>
        </div>
        <button type='submit' className={styles.signupbtn}>Login</button>
        {error&&<p className={styles.errortext}>{error}</p>}
      </Form>
        </div>
    </div>
  )}
   </div> 
  )
}

export default PatientLogin