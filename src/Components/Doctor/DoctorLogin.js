import React,{useState} from 'react';
import { Form} from 'react-bootstrap';
import { FaEye, FaEyeSlash,FaUserMd } from 'react-icons/fa';
import styles from './DoctorLogin.module.css';
import { useNavigate } from 'react-router-dom';



const DoctorLogin = () => {

  const LoginDetails = [{email:"srijareddy1806@gmail.com",password:"Srija@1806"},{email:"abhilash818@gmail.com",password:"Abhi@818"}]
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const user = LoginDetails.find((login)=> login.email===email);
     if(user){
        if(user.password === password){
            alert("Login Successful");
            navigate('/patientlist');
        } else{
          setError("Invalid Credentials");
        }
     } else{
        setError("User Not Found");
     }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.main1}>
           <h1 className={styles.heading1}> <FaUserMd size={40}/>   Login</h1>
        <div className={styles.formdiv} >
        <Form onSubmit={handleLogin} className={styles.signupform} >
        <Form.Label className={styles.formlabel} htmlFor="email">Email:</Form.Label>
        <Form.Control
          className={styles.forminput} 
          placeholder='Enter Email'
          type="email"
          id="email"
          required
          value={email}
          onChange={handleEmailChange} />
        <Form.Label className={styles.formlabel} htmlFor="password">Password:</Form.Label>
        <div className={styles.passwordInput}>
        <Form.Control
          className={styles.forminput} 
          placeholder='Enter Password'
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
        <button type='submit' className={styles.signupbtn}>Login</button>
        {error&&<p className={styles.errortext}>{error}</p>}
      </Form>

        </div>
    </div>
  )
}

export default DoctorLogin;