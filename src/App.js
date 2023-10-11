import './App.css';
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import NavTab from './Components/TabSection/NavTab';
import DoctorLogin from './Components/Doctor/DoctorLogin';
import PatientLogin from './Components/Patient/PatientLogin';
import Home from './Components/TabSection/Home';
import PatientList from './Components/Doctor/PatientList';
import AddPatient from './Components/Doctor/AddPatient';
import PatientProfile from './Components/Doctor/PatientProfile';
import EditPatient from './Components/Doctor/EditPatient';
import UpdatePassword from './Components/Patient/UpdatePassword';
import ErrorPage from './Components/TabSection/ErrorPage';


function App() {
  return (
    <div className="App">
     {<BrowserRouter>
      <NavTab/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/doctorlogin" element={<DoctorLogin/>}/>
          <Route path="/patientlogin" element={<PatientLogin/>}/>
          <Route path="/patientlist" element={<PatientList/>}/>
          <Route path="/patientlist/:patientId" element={<PatientProfile/>} />
          <Route path='/patientlist/edit/:patientId' element={<EditPatient/>}/>
          <Route path='/patientlist/addpatient' element={<AddPatient/>}/>
          <Route path="/updatepassword/:patientId" element={<UpdatePassword/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>}    
    </div>
  );
}

export default App;
