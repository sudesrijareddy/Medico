import React, { useState } from 'react';
import { Form} from 'react-bootstrap';
import { FaEye, FaEyeSlash} from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './UpdatePassword.module.css';
import axios from 'axios';

const UpdatePassword = () => {
    const { patientId } = useParams(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newpassword,setNewPassword] = useState('');
 // const [error,setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
  try {
    // Fetch the existing patient details
    const response = await axios.get(`http://localhost:5050/patients/${patientId}`);
    const patientData = response.data;

    // Create an updated patient object with the new password
    const updatedPatient = {
      ...patientData,
      Password: newpassword, // Update the password
    };

    // Make a PUT request to update the patient with the updated details
    const updateResponse = await axios.put(
      `http://localhost:5050/patients/${patientId}`,
      updatedPatient
    );

    if (updateResponse.status === 200) {
      // Password updated successfully
      alert('Password updated successfully');
      navigate("/");
    } else {
      // Handle other response statuses or errors
      console.error('Error updating password');
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.error('Error:', error);
  }
};


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleNewPasswordChange = (e) =>{
    setNewPassword(e.target.value);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 
  return (
    <div className={styles.main1}>
           <h1 className={styles.heading1}> <CgProfile size={50}/>  Update Password</h1>
        <div className={styles.formdiv} >
        <Form  className={styles.signupform} >
        <Form.Label className={styles.formlabel} htmlFor="email">Email:</Form.Label>
        <Form.Control
          className={styles.forminput} 
          placeholder='Enter Email'
          type="email"
          id="email"
          required
          value={email}
          onChange={handleEmailChange} />
        <Form.Label className={styles.formlabel} htmlFor="password">Old Password:</Form.Label>
        <div className={styles.passwordInput}>
        <Form.Control
          className={styles.forminput} 
          placeholder='Enter Old Password'
          type={showPassword?'text':'password'}
          required
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <span className={styles.toggleicon} onClick={togglePasswordVisibility}>
          {showPassword ?  <FaEye color='#445069' size={25} />:<FaEyeSlash color='#445069' size={25}/> }
        </span>
        </div>
        <Form.Label className={styles.formlabel} htmlFor="newpassword">New Password:</Form.Label>
        <div className={styles.passwordInput}>
        <Form.Control
          className={styles.forminput} 
          placeholder='Enter New Password'
          type={showPassword?'text':'password'}
          required
          id="newpassword"
          value={newpassword}
          onChange={handleNewPasswordChange}
        />
        <span className={styles.toggleicon} onClick={togglePasswordVisibility}>
          {showPassword ?  <FaEye color='#445069' size={25} />:<FaEyeSlash color='#445069' size={25}/> }
        </span>
        </div>
        <button onClick={handleUpdatePassword} type='submit' className={styles.signupbtn}>Update Password</button>
      </Form>
      </div>
    </div>  
  )
}

export default UpdatePassword