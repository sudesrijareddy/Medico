import React,{useEffect,useState} from 'react';
import { Col, Row,Card } from 'react-bootstrap';
import styles from './PatientProfile.module.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { CgProfile } from 'react-icons/cg';
import { useParams } from 'react-router-dom';
import EditPatient from './EditPatient';


const PatientProfile = () => {
    const { patientId } = useParams();
    const [patientData, setPatientData] = useState({});
    const [isEditing, setIsEditing] = useState(false); // Add state for tracking edit mode

    const navigate = useNavigate(); 

    const handleEditProfile = () => {
      setIsEditing(true);
    };
  
    const handleCancelEdit = () => {
      setIsEditing(false);
    };
  
    const handleSaveChanges = (editedData) => {
      setPatientData(editedData);
      setIsEditing(false); // Exit edit mode
    };

    useEffect(() => {
        // Fetch patient details
        axios.get(`http://localhost:5050/patients/${patientId}`)
          .then((response) => {
            setPatientData(response.data);
            // Determine if the user is a doctor (you need to implement this logic)
            //setIsDoctor(true); // Set to true if the user is a doctor
          })
          .catch((error) => {
            console.error('Error fetching patient data:', error);
          });
      }, [patientId]);

      const handleDeleteProfile = () => {
        // Show a confirmation dialog before deleting
        const isConfirmed = window.confirm('Are you sure you want to delete this patient profile?');
      
        if (isConfirmed) {
          // Send a DELETE request to delete the patient profile
          axios.delete(`http://localhost:5050/patients/${patientId}`)
            .then(() => {
              // Optionally, you can navigate to a different page after successful deletion
              navigate('/patientlist');
            })
            .catch((error) => {
              console.error('Error deleting patient profile:', error);
            });
        }
      };

  return (
    <div style={{marginTop:"20px"}}>
        <Row>
          {isEditing ? (
            <div>
            <EditPatient
              patientData={patientData}
              onSave={handleSaveChanges}
              onCancel={handleCancelEdit}
            />
          </div>
          ) : (
               <div>
                <h1 className={styles.heading1}>Patient Profile</h1>

              <Col className={styles.profile} sm={12} md={12}>
                  <Card className={styles.maincard} >
                    <CgProfile className={styles.icon} size={40}/><br/>
                    <Card.Body className={styles.card}>
                      <Card.Title><strong>Full Name: </strong>{patientData.FullName}</Card.Title>
                      <Card.Title><strong>Email: </strong>{patientData.Email}</Card.Title>
                      <Card.Title><strong>Password: </strong>{patientData.Password}</Card.Title>
                      <Card.Title><strong>Phone: </strong>{patientData.Phone}</Card.Title>
                      <Card.Title><strong>Diagnosis: </strong>{patientData.Diagnosis ? patientData.Diagnosis.join(', ') : 'N/A'}</Card.Title>
                      <Card.Title><strong>Prescribed Medication: </strong>{patientData.PrescribedMedication ? patientData.PrescribedMedication.join(', ') : 'N/A'}</Card.Title>
                      <Card.Title><strong>City: </strong>{patientData?.Address?.City??'unknown'}</Card.Title>
                      <Card.Title><strong>State: </strong>{patientData?.Address?.State??'unknown'}</Card.Title>
                      <Card.Title><strong>Country: </strong>{patientData?.Address?.Country??'unknown'}</Card.Title>
                      <Card.Title><strong>Pincode: </strong>{patientData?.Address?.Pincode??'unknown'}</Card.Title>
                    </Card.Body>
                    <div className={styles.btns}>
                      <button onClick={handleEditProfile} className={styles.profilebtn}>Edit Profile</button>
                      <button onClick={handleDeleteProfile}  className={styles.profilebtn}>Delete Profile</button>
                      </div>
                  </Card>
              </Col>
              </div>
              
          )}
            
        </Row>
    </div>
  )
}

export default PatientProfile