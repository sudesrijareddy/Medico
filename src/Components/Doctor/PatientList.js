import React, { useEffect, useState } from 'react'
import { Col, Row,Card } from 'react-bootstrap';
import {useNavigate} from "react-router-dom"
import styles from './PatientList.module.css';
import {FaListAlt} from 'react-icons/fa';
import {BiSearch} from 'react-icons/bi';
import {CgProfile} from 'react-icons/cg';
const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false); // Track whether to show filtered data
  const [patients,setPatients] = useState([]);
  const navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:5050/patients');
            const data = await response.json();
            console.log(data);
            setPatients(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      }, []);

      const handleViewProfile = (patientId) => {
        // Navigate to the patient profile page with the patient ID as a parameter
        navigate(`/patientlist/${patientId}`);
      };
      
      const handleSubmit = () => {
        const lowerCaseTerm = searchTerm.toLowerCase();
        const filtered = patients.filter((patient) => {
          const diagnosisArray = patient.Diagnosis || [];
          const prescribedMedicationArray = patient.PrescribedMedication || [];
      
          // Check if any item in the Diagnosis array matches the search term
          const diagnosisMatch = diagnosisArray.some((diagnosis) =>
            typeof diagnosis === 'string' &&
            diagnosis.toLowerCase().includes(lowerCaseTerm)
          );
      
          // Check if any item in the PrescribedMedication array matches the search term
          const medicationMatch = prescribedMedicationArray.some((medication) =>
            typeof medication === 'string' &&
            medication.toLowerCase().includes(lowerCaseTerm)
          );
      
          return (
            patient.FullName.toLowerCase().includes(lowerCaseTerm) ||
            diagnosisMatch ||
            medicationMatch
          );
        });
      
        if (filtered.length === 0) {
          // If filtered data is empty, reset the filtering
          setFilteredPatients([]);
          setShowFiltered(false);
        } else {
          setFilteredPatients(filtered);
          setShowFiltered(true);
        }
        setSearchTerm("");
      };
      
      

  return (
    <div>
      <h1 className={styles.heading1}><FaListAlt/>  Patients List</h1>
      <div className={styles.listheader}>
        <button onClick={()=>navigate("/patientlist/addpatient")} className={styles.button}>Add Patient</button>
        <div>
        <input className={styles.inputfield} onChange={(e)=>setSearchTerm(e.target.value)} type='text' value={searchTerm} placeholder='Search Patients'/>
        <button className={styles.searchbtn} type='submit' onClick={handleSubmit}><BiSearch size={20}/></button>
        </div>
        <button onClick={()=>navigate("/doctorlogin")} className={styles.button}>Logout</button>
       </div> 
       <Row>
        {showFiltered
          ? filteredPatients.map((patient) => (
              <Col className={styles.cards} key={patient.id} md={6} sm={12} lg={3}>
                <Card className={styles.card} style={{ width: '18rem' }}>
                  <Card.Body>
                  <CgProfile size={40}/><br/>
                    <Card.Title>{patient.FullName}</Card.Title>
                    <Card.Title>{patient.Email}</Card.Title>
                    <Card.Title>{patient.Diagnosis}</Card.Title>
                    <button onClick={() => handleViewProfile(patient.id)} className={styles.profilebtn}>View Profile</button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          : patients.map((patient) => (
              <Col className={styles.cards} key={patient.Id} md={6} sm={12} lg={3}>
                <Card className={styles.card} style={{ width: '18rem' }}>
                  <Card.Body>
                    <CgProfile size={40}/><br/>
                    <Card.Title>{patient.FullName}</Card.Title>
                    <Card.Title>{patient.Email}</Card.Title>
                    <Card.Title>{patient.Diagnosis ? patient.Diagnosis.join(', ') : 'N/A'}</Card.Title>
                    <button onClick={() => handleViewProfile(patient.id)} className={styles.profilebtn}>View Profile</button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
      </Row>

    </div>
  )
}

export default PatientList