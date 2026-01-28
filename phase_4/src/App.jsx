// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { EmployeeService } from './services/EmployeeService'
// import EmployeeList from "./components/EmployeeList"
// import { ServiceContext } from './context/ServiceContext'
// function App() {
//   const [count, setCount] = useState(0)
//   return (
//     <>
//       <div>
//         {/* <EmployeeList service={EmployeeService}/> */}
//         <ServiceContext.Provider value={EmployeeService}>
//           <EmployeeList/>
//         </ServiceContext.Provider>
//        </div>
//     </>
//   )
// }
// export default App

// import { useState } from "react";
// import { Suspense, lazy } from "react";
// const Dashboard = lazy(() => {
//   console.log(" Importing Dashboard...");
//   return import("./component/Dashboard");
// });
// function App() {
//   const [show, setShow] = useState(false);
//   return (
//     <div>
//       <button onClick={() => setShow(true)}>
//         Load Dashboard
//       </button>
//       {show && (
//         <Suspense fallback={<h2>Loading Dashboard...</h2>}>
//           <Dashboard />
//         </Suspense>
//       )}
//     </div>
//   );
// }
// export default App;

import { useState } from "react";
import NotificationPanel from "./component/NotificationPanel";
function App() {
 const [show, setShow] = useState(false);
  return (
    <>
      <div>
       {/* <Employee2/> */}
          <button onClick={() => setShow(!show)}>
        {show ? "Hide Notifications" : "Show Notifications"}
      </button>
      {show && <NotificationPanel />}
      </div>
     
    </>
  )
}
export default App