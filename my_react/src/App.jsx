
// import Header from './components/Header'
// import Footer from './components/Footer'
// import Card from './components/Card'
import './App.css'
// import Navbar from './components/Navbar'
// import Home from './inventoryscreen/Home'
//  import EmployeeList from './inventoryscreen/EmployeeList';
 import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './loginpage/Login';
import About from './loginpage/About';
import Contact from './loginpage/Contact';
import ControlledRegistrationForm from './ControlandUncontrol/Controlled';
import UncontrolledRegistrationForm from './ControlandUncontrol/UnControlled';
import MixedRegistrationForm from './FormCreation/Form';

function App() {
  return (
    <>
    <MixedRegistrationForm/>
    {/* <ControlledRegistrationForm/>
    <UncontrolledRegistrationForm/> */}
</>
//     <Router>
//       <nav className="navbar navbar-expand navbar-dark bg-dark mb-4">
//   <div className="container justify-content-center">
//     <div className="navbar-nav">
//       <Link className="nav-link" to="/">Login</Link>
//       <Link className="nav-link" to="/contact">Contact Us</Link>
//       <Link className="nav-link" to="/about">About</Link>
//     </div>
//   </div>
// </nav>

//       <div className="container">
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/about" element={<About />} />
//         </Routes>
//       </div>
//     </Router>

  );
}

export default App;
// function App() {


//   return (
//     <>
//       <div>
//         <Home/>
//         {/* <Header />
//         <h3>Hi , This is the app content.</h3>
//         <p> React app content can be added here.</p>
//         <div className='flex flex-wrap'>
//         <Card cardTitle="React Js Course" cardDescription="Module frontend course for 40 days"></Card>
//         <Card cardTitle="Full Stack Java Course" cardDescription="Module frontend course for 40 days"></Card>
//         <Card cardTitle="MEAN Course" cardDescription="Module frontend course for 40 days"></Card>
//         <Card cardTitle="MERN Course" cardDescription="Module frontend course for 40 days"></Card>
//          <Card cardTitle="Dev OPs Course" cardDescription="Module frontend course for 40 days"></Card>
//         <Card cardTitle="Cloud Computing Course" cardDescription="Module frontend course for 40 days"></Card>
//         <Card cardTitle="Dot Net Course" cardDescription="Module frontend course for 40 days"></Card>
//         <Card cardTitle="Python Course" cardDescription="Module frontend course for 40 days"></Card>
//           <Card cardTitle="Azure  Course" cardDescription="Module frontend course for 40 days"></Card>
//         <Card cardTitle="Angular Course" cardDescription="Module frontend course for 40 days"></Card>
//         <Card cardTitle="Data Analyst Course" cardDescription="Module frontend course for 40 days"></Card>
//         <Card cardTitle="Data Science Course" cardDescription="Module frontend course for 40 days"></Card>
//         </div>
       
//         <Footer /> */}
        
//       </div>
      
//     </>
//   )
// }

// export default App