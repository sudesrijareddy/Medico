import React,{useState,useEffect} from 'react'
import { Form } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import styles from './EditPatient.module.css';
import { FaEye, FaEyeSlash} from 'react-icons/fa';
const EditPatient = ({ patientData, onSave, onCancel }) => {
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
    const [editedData, setEditedData] = useState(patientData);

    
    useEffect(() => {
          setEditedData(patientData);
          setEmail(editedData.Email || '');
          setPassword(editedData.Password || '');
          setFullName(editedData.FullName || '');
          setPhone(editedData.Phone || '');
          setDiagnosis(editedData.Diagnosis || []);
          setPrescribedMedication(editedData.PrescribedMedication || []);
          setCity(editedData?.Address?.City || '');
          setState(editedData?.Address?.State || '');
          setCountry(editedData?.Address?.Country || '');
          setPincode(editedData?.Address?.Pincode || '');
        
      }, [patientData]);

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
  

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const editedPatientData = {
      Email: Email,
      Password: Password,
      FullName: FullName,
      Phone: Phone,
      Diagnosis: Diagnosis,
      PrescribedMedication: PrescribedMedication,
      Address: {
        City: City,
        State: State,
        Country: Country,
        Pincode: Pincode,
      },
    };
   console.log(editedPatientData);
    try {
      const response = await axios.put(
        `http://localhost:5050/patients/${patientData.id}`,
        editedPatientData
      );

      if (response.status === 200) {
        // The PUT request was successful (status code 200)
        console.log("before update");
        console.log(response.data);
        setEditedData(editedPatientData);
        alert('Patient data updated successfully');
        onSave(editedPatientData); // Pass the edited data back to the parent component
        console.log('Patient data updated successfully.');
      } else {
        // Handle other response statuses or errors
        console.error('Error updating patient data.');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error:', error);
    }
  };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

      const handleCancel = () => {
        onCancel(); // Call the onCancel function passed from the parent component
      };
    

  return (
    <div className={styles.main1}>
      <h1>Edit Patient</h1>
        <div className={styles.formdiv}>
        <Form className={styles.loginform} >
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
        <button onClick={handleCancel} type='submit' className={styles.addbtn}>Cancel</button>
        <button onClick={handleSaveChanges} type='submit' className={styles.addbtn}>Save Changes</button>

      </Form>
        </div>
    </div>
  )
}

export default EditPatient