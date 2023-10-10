import React,{useState} from 'react'
import { Nav, Tab } from 'react-bootstrap';
import { FaUserMd, FaUser,FaStethoscope } from 'react-icons/fa';
import styles from './NavTab.module.css';
import { Link } from 'react-router-dom';

const NavTab = () => {
    const [activeTab, setActiveTab] = useState(''); // State to track active tab

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <div>
        <Nav className={styles.tabcontainer} variant="tabs">
        <Nav.Item>
          <Nav.Link style={{color:"lightcoral",fontWeight:"600",fontSize:"25px"}} to="/" as={Link} className={styles.brand}>
            <FaStethoscope/> Medico
          </Nav.Link>
        </Nav.Item>
        <Nav className={styles.tabs}>
        <Nav.Item>
          <Nav.Link
            as={Link}
            className={styles.tabheading}
            to="/doctorlogin"
            eventKey="doctor"
            active={activeTab === 'doctor'}
            onClick={() => handleTabChange('doctor')}
          >
            <FaUserMd /> Doctor
          </Nav.Link>
        </Nav.Item>
        <Nav.Item >
          <Nav.Link
            as={Link}
            className={styles.tabheading}
            to="/patientlogin"
            eventKey="patient"
            active={activeTab === 'patient'}
            onClick={() => handleTabChange('patient')}
          >
            <FaUser /> Patient
          </Nav.Link>
        </Nav.Item>
        </Nav>
      </Nav>

      <Tab.Content>
        <Tab.Pane eventKey="doctor">
          {/* Content for Doctor Tab */}
          <h2>Doctor View</h2>
          {/* Add your Doctor-specific content here */}
        </Tab.Pane>
        <Tab.Pane eventKey="patient">
          {/* Content for Patient Tab */}
          <h2>Patient View</h2>
          {/* Add your Patient-specific content here */}
        </Tab.Pane>
      </Tab.Content>
    </div>
  )
}

export default NavTab;