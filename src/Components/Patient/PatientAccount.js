import React from 'react'
import { Row ,Col,Card} from 'react-bootstrap'
import { CgProfile } from 'react-icons/cg';
import styles from './PatientAccount.module.css';
import { useNavigate } from 'react-router-dom';

const PatientAccount = ({patientData}) => {
    const navigate = useNavigate(); 

    const handlePassword = (patientId)=>{
        navigate(`/updatepassword/${patientId}`);
    }

  return (
    <div>
             <Row>
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
                      <button onClick={()=>handlePassword(patientData.id)} className={styles.profilebtn}>Update Password</button>
                      <button onClick={()=>navigate("/")}>Logout</button>
                      </div>
                  </Card>
              </Col>
            </Row>
    </div>
  )
}

export default PatientAccount