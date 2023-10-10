import React,{useState} from 'react'
import { Form } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import styles from './AddPatient.module.css';
import { FaEye, FaEyeSlash,FaUserMd } from 'react-icons/fa';
const AddPatient = () => {
  const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [Email,setEmail] = useState('');
    const [emailerror,setEmailError] = useState('');
    const [Password,setPassword] = useState('');
    const [passworderror,setPasswordError] = useState('');
    const [FullName,setFullName] = useState('');
    const [nameerror,setnameError] = useState('');
    const [Phone,setPhone] = useState('');
    const [phoneerror,setPhoneError] = useState('');
    const [Diagnosis,setDiagnosis] = useState([]);
    const [PrescribedMedication,setPrescribedMedication] = useState([]);
    const [City,setCity] = useState('');
    const [State,setState] = useState('');
    const [Country,setCountry] = useState('');
    const [Pincode,setPincode] =  useState('');


     //validating email   
      const handleEmail = (e)=>{
        const newEmail = e.target.value;
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
       if(!emailPattern.test(newEmail)){
        setEmailError("Invalid email pattern");
       } else{
        setEmailError("")
       }
       setEmail(newEmail);
      }
  //validating password
  const handlePassword = (e)=>{
    const newPassword = e.target.value;
    const passwordPattern1 = /[A-Z]/;
    const passwordpattern2 = /[a-z]/;
   if(!passwordPattern1.test(newPassword) || !passwordpattern2.test(newPassword) || newPassword.length<8){
    setPasswordError("password length must be 8, Include 1 uppercase and 1 lowercase");
   } else{
    setPasswordError("")
   }
   setPassword(newPassword);
  }
  //validating name
  const handleName = (e) =>{
    const newName = e.target.value;
    const namePattern = /^[A-Za-z]+ [A-Za-z]+$/;
   if(!namePattern.test(newName)){
    setnameError("Include first name followed by second name");
   } else{
    setnameError("")
   }
   setFullName(newName);
  }
  
  //validate phone
  const handlePhone = (e) =>{
    const newPhone = e.target.value;
    const phonePattern = /^\d{10}$/;
   if(!phonePattern.test(newPhone)){
    setPhoneError("must be 10 digits");
   } else{
    setPhoneError("")
   }
   setPhone(newPhone);
  }

  //handle diagnosis
   
  const handleDiagnosis = (e) => {
    const newDiag = e.target.value;
    if (newDiag.trim() !== '') {
      const newDiagnosis = newDiag.split(',')
      setDiagnosis(newDiagnosis);
    }
  };
  
  const handleMedication = (e) => {
    const newMedic = e.target.value;
    if (newMedic.trim() !== '') {
      const newMedication = newMedic.split(',')
      setPrescribedMedication(newMedication);
    }
  };
  

const handleSubmit = async (e) => {
  e.preventDefault();

  const patientData = {
    Email,
    Password,
    FullName,
    Phone,
    Diagnosis,
    PrescribedMedication,
    Address:{
      City,
      State,
      Country,
      Pincode
    }
  };

  try {
    const response = await axios.post('http://localhost:5050/patients', patientData);

    if (response.status === 201) {
      // The POST request was successful (status code 201)
      alert("patient added successfully");
      navigate("/patientlist");
      console.log('Patient data added successfully.');
      // You can perform further actions, such as redirecting the user or showing a success message.
    } else {
      // Handle other response statuses or errors
      console.error('Error adding patient data.');
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.error('Error:', error);
  }
};

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

  return (
    <div className={styles.main1}>
      <h1>Add Patient</h1>
        <div className={styles.formdiv}>
        <Form className={styles.loginform} onSubmit={handleSubmit} >
        <Form.Label className={styles.formlabel} htmlFor="email">Email:</Form.Label>
        <Form.Control
          className={styles.forminput} 
          placeholder='Enter Email'
          type="email"
          id="email"
          required
          value={Email}
          onChange={handleEmail} />
          {emailerror&&<p className={styles.error}>{emailerror}</p>}
        <Form.Label className={styles.formlabel} htmlFor="password">Password:</Form.Label>
        <div className={styles.passwordInput}>
        <Form.Control
          className={styles.forminput} 
          placeholder='Enter Password'
          type={showPassword?'text':'password'}
          required
          id="password"
          value={Password}
          onChange={handlePassword}
        />
        <span className={styles.toggleicon} onClick={togglePasswordVisibility}>
          {showPassword ?  <FaEye color='#445069' size={25} />:<FaEyeSlash color='#445069' size={25}/> }
        </span>
        </div>
        {passworderror && <p className={styles.error}>{passworderror}</p>}
        <Form.Label className={styles.formlabel} htmlFor="name">Full Name:</Form.Label>
        <Form.Control
          className={styles.forminput} 
          placeholder='Enter Full Name'
          type="text"
          id="name"
          required
          value={FullName}
          onChange={handleName} />
        {nameerror && <p className={styles.error}>{nameerror}</p>}
          <Form.Label className={styles.formlabel} htmlFor="phone">Phone:</Form.Label>
        <Form.Control
          className={styles.forminput} 
          placeholder='Enter PhoneNumber'
          type="text"
          id="phone"
          required
          value={Phone}
          onChange={handlePhone} />
          {phoneerror&&<p className={styles.error}>{phoneerror}</p>}
          <Form.Label className={styles.formlabel} htmlFor="Diagnosis">Diagnosis:</Form.Label>
        <Form.Control
          className={styles.forminput} 
          placeholder='Ex : Headache ,Fever '
          type="text"
          id="Diagnosis"
          required
          value={Diagnosis}
          onChange={handleDiagnosis} />
          <Form.Label className={styles.formlabel} htmlFor="Medication">Prescribed Medication:</Form.Label>
        <Form.Control
          className={styles.forminput} 
          placeholder='Ex: Paracetemol,Injections '
          type="text"
          id="Medication"
          required
          value={PrescribedMedication}
          onChange={handleMedication} />
          <Form.Label className={styles.formlabel} htmlFor="city">City:</Form.Label>
        <Form.Control
          className={styles.forminput} 
          placeholder='Enter City'
          type="text"
          id="city"
          value={City}
          onChange={(e)=>setCity(e.target.value)} />
          <Form.Label className={styles.formlabel} htmlFor="state">State:</Form.Label>
        <Form.Control
          className={styles.forminput} 
          placeholder='Enter State'
          type="text"
          id="state"
          value={State}
          onChange={(e)=>setState(e.target.value)} />
          <Form.Label className={styles.formlabel} htmlFor="country">Country:</Form.Label>
        <Form.Control
          className={styles.forminput} 
          placeholder='Enter Country'
          type="text"
          id="country"
          value={Country}
          onChange={(e)=>setCountry(e.target.value)} />
          <Form.Label className={styles.formlabel} htmlFor="pincode">PinCode:</Form.Label>
        <Form.Control
          className={styles.forminput} 
          placeholder='Enter Pincode'
          type="text"
          id="pincode"
          required
          value={Pincode}
          onChange={(e)=>setPincode(e.target.value)} /><br/>
        <button type='submit' className={styles.addbtn}>Add Patient</button>
      </Form>
        </div>
    </div>
  )
}

export default AddPatient